import { fetchAPI } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}) {
	try {
		// Fetch SEO data for the <head>
		const postsData = await fetchAPI("/posts", {
			filters: { slug: { $eq: params.slug } },
			populate: ["seo"],
		});

		const post = postsData.data[0];
		if (!post) return {};

		return {
			title: post.seo?.metaTitle || post.title,
			description: post.seo?.metaDescription,
		};
	} catch (error) {
		console.error("Failed to fetch post metadata:", error);
		return {};
	}
}

export default async function SinglePostPage({
	params,
}: {
	params: { slug: string };
}) {
	let post = null;

	try {
		// Fetch the actual post content
		const postsData = await fetchAPI("/posts", {
			filters: { slug: { $eq: params.slug } },
			populate: ["coverImage", "author"], // Note: 'content' is populated by default in Strapi 5
		});

		post = postsData.data[0];
	} catch (error) {
		console.error("Failed to fetch post:", error);
	}

	if (!post) {
		notFound(); // Triggers the Next.js 404 page
	}

	return (
		<div className="w-full min-h-screen bg-background">
			{/* Back to Blog Link */}
			<section className="pt-32 px-6">
				<div className="max-w-4xl mx-auto">
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
					>
						<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
						Back to Blog
					</Link>
				</div>
			</section>

			{/* Article */}
			<article className="max-w-4xl mx-auto py-10 px-6">
				<FadeIn>
					<header className="mb-8">
						<h1 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
							{post.title}
						</h1>
						<div className="flex items-center gap-4 text-muted-foreground text-sm">
							{post.author?.name && (
								<span>By {post.author.name}</span>
							)}
							{post.publishDate && (
								<span>
									{new Date(
										post.publishDate,
									).toLocaleDateString()}
								</span>
							)}
						</div>
					</header>

					{post.coverImage && (
						<div className="mb-8">
							<img
								src={post.coverImage.url}
								alt={post.title}
								className="w-full h-64 md:h-96 object-cover rounded-lg"
							/>
						</div>
					)}

					{/* Content */}
					{/* We tighten the paragraph margins (my-4) and heading margins to pull content closer together */}
					<div className="prose prose-lg max-w-none prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4 prose-p:text-foreground prose-p:my-4 prose-strong:text-foreground prose-a:text-accent hover:prose-a:text-accent/80 prose-blockquote:border-accent prose-code:text-accent prose-pre:bg-muted prose-ul:mt-4">
						<BlocksRenderer content={post.content} />
					</div>
				</FadeIn>
			</article>
		</div>
	);
}
