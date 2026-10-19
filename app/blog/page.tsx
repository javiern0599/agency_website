import { fetchAPI } from "@/lib/strapi";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { PageHero, wrap } from "@/components/site/ui";
import { BlogPagination } from "@/components/ui/blog-pagination";
import BlogFilters from "@/components/sections/BlogFilters";
import { getBlogCategories } from "@/lib/blog-categories";
import type { Metadata } from "next";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
	alternates: { canonical: "/blog" },
	title: "Blog", // This plugs into the root layout's "%s | PraxisFlow" template automatically!
	description:
		"Insights, updates, and thoughts on legal automation, private infrastructure, and operational efficiency.",
	keywords: [
		"Legal Tech Blog",
		"Law Firm Automation Insights",
		"Workflow Automation Blueprints",
		"PraxisFlow Engineering",
	],
	openGraph: {
		title: "PraxisFlow Blog | Legal Automation & Technology",
		description:
			"Insights, updates, and thoughts on legal automation, private infrastructure, and operational efficiency.",
		url: "https://www.praxisflow.com/blog",
		type: "website",
	},
};

export const dynamic = "force-dynamic";

export default async function BlogPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string; category?: string; q?: string }>;
}) {
	const {
		page: pageParam,
		category: categoryParam,
		q: queryParam,
	} = await searchParams;

	// Parse and clamp the requested page to a valid positive integer.
	const parsedPage = Number.parseInt(pageParam ?? "1", 10);
	const requestedPage =
		Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

	const searchQuery = queryParam?.trim() || undefined;

	// Load the available categories and resolve the active slug to its exact
	// Strapi value (the multi-select stores display names, not slugs).
	const categories = await getBlogCategories();
	const activeCategory = categoryParam
		? categories.find((c) => c.slug === categoryParam)
		: undefined;

	// Build Strapi filters. Category is a multi-select array, so $containsi
	// (substring match) is the operator that matches; $eq/$in do not.
	const filters: Record<string, unknown> = {};
	if (activeCategory) {
		filters.category = { $containsi: activeCategory.name };
	}
	if (searchQuery) {
		// Posts have no top-level description field, so search targets the title.
		filters.title = { $containsi: searchQuery };
	}

	const isFiltering = Boolean(activeCategory || searchQuery);

	let posts = [];
	let currentPage = requestedPage;
	let pageCount = 1;
	let fetchFailed = false;

	try {
		// Fetch a single page of posts, populating the coverImage and author
		const postsData = await fetchAPI(
			"/posts",
			{
				populate: ["coverImage", "author"],
				sort: ["publishDate:desc"],
				...(Object.keys(filters).length > 0 && { filters }),
				pagination: {
					page: requestedPage,
					pageSize: PAGE_SIZE,
				},
			},
			{
				next: {
					revalidate: 60, // Revalidate every 60 seconds
				},
			},
		);

		posts = postsData.data;
		// Strapi returns the resolved pagination meta, which may clamp the page.
		currentPage = postsData.meta?.pagination?.page ?? requestedPage;
		pageCount = postsData.meta?.pagination?.pageCount ?? 1;
	} catch (error) {
		console.error("Failed to fetch blog posts:", error);
		fetchFailed = true;
		// posts remains empty array
	}

	// Changes whenever the result set changes so the grid remounts and every
	// visible card re-runs its entrance animation together (not just new ones).
	const resultsKey = `${activeCategory?.slug ?? "all"}:${searchQuery ?? ""}:${currentPage}`;

	return (
		<div className="w-full bg-white">
			<PageHero
				eyebrow="Blog"
				title="Notes on AI and automation for law firms."
				lede="Insights, updates, and thoughts on legal automation and technology."
			/>

			{/* Blog Posts Grid */}
			<section className="pb-24 pt-14">
				<div className={wrap}>
					<BlogFilters
						categories={categories}
						activeCategory={activeCategory?.slug}
						activeQuery={searchQuery}
					/>

					{Array.isArray(posts) && posts.length > 0 ? (
						<div
							key={resultsKey}
							className="grid grid-cols-1 border-l border-t border-rule [&>*]:border-b [&>*]:border-r [&>*]:border-rule md:grid-cols-2 lg:grid-cols-3"
						>
							{posts.map((post: any, idx: number) => (
								<Reveal
									delay={0.1 + idx * 0.05}
									key={post.documentId}
									className="h-full"
								>
									<Link
										href={`/blog/${post.slug}`}
										className="block h-full"
									>
										<div className="group relative flex h-full flex-col bg-white p-6 transition-colors duration-200 hover:bg-slate-50">
											<span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left will-change-transform scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
											{post.coverImage && (
												<img
													src={post.coverImage.url}
													alt={post.title}
													className="mb-5 aspect-[16/10] w-full object-cover"
												/>
											)}

											<h2 className="mb-5 line-clamp-3 font-serif text-[22px] leading-snug text-ink">
												{post.title}
											</h2>

											<div className="mt-auto">
												<p className="text-muted-foreground text-sm">
													By{" "}
													{post.author?.name ||
														"PraxisFlow"}
												</p>
												{post.publishDate && (
													<p className="text-muted-foreground text-xs mt-1">
														{new Date(
															post.publishDate,
														).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
													</p>
												)}
											</div>
										</div>
									</Link>
								</Reveal>
							))}
						</div>
					) : isFiltering && !fetchFailed ? (
						<div className="border-t border-ink py-10">
							<h2 className="mb-2 font-serif text-[26px] text-ink">
								No matching posts
							</h2>
							<p className="text-muted-foreground mb-4">
								No posts match your current search or category.
								Try a different term or clear the filters.
							</p>
							<Link
								href="/blog"
								className="inline-flex items-center text-sm font-medium text-ink underline decoration-accent underline-offset-4"
							>
								Clear filters
							</Link>
						</div>
					) : (
						<div className="border-t border-ink py-10">
							<h2 className="mb-2 font-serif text-[26px] text-ink">
								No posts available
							</h2>
							<p className="text-muted-foreground">
								We couldn't load posts right now. Please check
								your Strapi backend or try again later.
							</p>
						</div>
					)}

					{Array.isArray(posts) && posts.length > 0 && (
						<BlogPagination
							currentPage={currentPage}
							pageCount={pageCount}
							params={{
								category: activeCategory?.slug,
								q: searchQuery,
							}}
						/>
					)}
				</div>
			</section>
		</div>
	);
}
