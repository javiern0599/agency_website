import { fetchAPI } from "@/lib/strapi";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BlogPagination } from "@/components/ui/blog-pagination";
import BlogFilters from "@/components/sections/BlogFilters";
import { getBlogCategories } from "@/lib/blog-categories";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
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

	return (
		<div className="w-full min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative pt-32 pb-20 px-6 overflow-hidden">
				{/* DotPattern Background */}
				<DotPattern
					width={20}
					height={20}
					cx={1}
					cy={1}
					cr={1}
					className={cn(
						"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
						"text-accent/10",
					)}
				/>

				{/* Decorative blur effects */}
				<div className="absolute top-20 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] pointer-events-none"></div>
				<div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

				<div className="max-w-5xl mx-auto text-center relative z-10">
					<FadeIn>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-8">
							<span className="flex h-2 w-2 rounded-full bg-accent"></span>
							Blog
						</div>
						<h1 className="text-4xl md:text-6xl font-medium text-foreground tracking-tight mb-6">
							PraxisFlow <span className="text-accent">Blog</span>
						</h1>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Insights, updates, and thoughts on legal automation
							and technology.
						</p>
					</FadeIn>
				</div>
			</section>

			{/* Blog Posts Grid */}
			<section className="pb-20 px-6 pt-10">
				<div className="max-w-6xl mx-auto">
					<BlogFilters
						categories={categories}
						activeCategory={activeCategory?.slug}
						activeQuery={searchQuery}
					/>

					{Array.isArray(posts) && posts.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{posts.map((post: any) => (
								<FadeIn
									delay={0.3}
									key={post.documentId}
									className="h-full"
								>
									<Link
										href={`/blog/${post.slug}`}
										className="block h-full"
									>
										<div className="group flex flex-col h-full border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent/20 transition-all duration-300 bg-card">
											{post.coverImage && (
												<img
													src={post.coverImage.url}
													alt={post.title}
													className="w-full h-48 object-cover rounded-md mb-4  transition-transform duration-300"
												/>
											)}

											<h2 className="text-xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors line-clamp-2">
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
														).toLocaleDateString()}
													</p>
												)}
											</div>
										</div>
									</Link>
								</FadeIn>
							))}
						</div>
					) : isFiltering && !fetchFailed ? (
						<div className="rounded-lg border border-border bg-card p-8 text-center">
							<h2 className="text-2xl font-semibold text-foreground mb-2">
								No matching posts
							</h2>
							<p className="text-muted-foreground mb-4">
								No posts match your current search or category.
								Try a different term or clear the filters.
							</p>
							<Link
								href="/blog"
								className="inline-flex items-center text-accent hover:underline text-sm font-medium"
							>
								Clear filters
							</Link>
						</div>
					) : (
						<div className="rounded-lg border border-border bg-card p-8 text-center">
							<h2 className="text-2xl font-semibold text-foreground mb-2">
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
