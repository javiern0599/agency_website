import { fetchAPI } from "@/lib/strapi";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import next from "next";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
	let posts = [];

	try {
		// Fetch posts and populate the coverImage and author
		const postsData = await fetchAPI(
			"/posts",
			{
				populate: ["coverImage", "author"],
				sort: ["publishDate:desc"],
			},
			{
				next: {
					revalidate: 60, // Revalidate every 60 seconds
				},
			},
		);

		posts = postsData.data;
	} catch (error) {
		console.error("Failed to fetch blog posts:", error);
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{posts.map((post: any) => (
							/* 1. Add h-full to the wrapper elements */
							<FadeIn
								delay={0.3}
								key={post.documentId}
								className="h-full"
							>
								<Link
									href={`/blog/${post.slug}`}
									className="block h-full"
								>
									{/* 2. Make the card a flex column with h-full */}
									<div className="group flex flex-col h-full border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent/20 transition-all duration-300 bg-card">
										{post.coverImage && (
											<img
												src={post.coverImage.url}
												alt={post.title}
												className="w-full h-48 object-cover rounded-md mb-4  transition-transform duration-300"
											/>
										)}

										{/* 3. Replaced whitespace-nowrap with line-clamp-2 */}
										<h2 className="text-xl font-semibold text-foreground mb-4 group-hover:text-accent transition-colors line-clamp-2">
											{post.title}
										</h2>

										{/* 4. Use mt-auto to push this metadata block to the absolute bottom of the card */}
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
				</div>
			</section>
		</div>
	);
}
