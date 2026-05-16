import { fetchAPI } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { draftMode } from "next/headers";

export const dynamic = "force-dynamic";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	try {
		const { slug } = await params;

		// Populate 'seo', the default 'coverImage', and the nested 'metaImage' inside your seo component
		const postsData = await fetchAPI("/posts", {
			filters: { slug: { $eq: slug } },
			populate: ["seo", "seo.metaImage", "coverImage"],
		});

		const post = postsData.data[0];
		if (!post) return {};

		// Clean variable mapping with intelligent layout fallbacks
		const title = post.seo?.metaTitle || post.title;
		const description =
			post.seo?.metaDescription ||
			post.description ||
			"Read the latest article on the PraxisFlow blog.";
		const canonicalUrl =
			post.seo?.canonicalURL || `https://www.praxisflow.com/blog/${slug}`;
		const keywords = post.seo?.keywords || undefined; // If undefined, next.js uses layout keywords automatically

		// 3-Tier Image Fallback Pipeline (Checks metaImage, then coverImage, then layout default)
		// Change 'metaImage' to 'metalmage' below if your Strapi key has the lowercase 'l' typo!
		const imageUrl =
			post.seo?.metaImage?.url ||
			post.coverImage?.url ||
			"https://www.praxisflow.com/og-image.webp";

		return {
			title: title, // This cleanly inherits the "%s | PraxisFlow" template formatting from layout.tsx
			description: description,
			...(keywords && { keywords }), // Only overwrites keywords if explicitly provided in Strapi
			alternates: { canonical: canonicalUrl },

			openGraph: {
				title: title,
				description: description,
				url: canonicalUrl,
				siteName: "PraxisFlow",
				locale: "en_US",
				type: "article",
				images: [
					{
						url: imageUrl,
						width: 1200,
						height: 630,
						alt: title,
					},
				],
			},

			twitter: {
				card: "summary_large_image",
				title: title,
				description: description,
				images: [imageUrl],
			},
		};
	} catch (error) {
		console.error("Failed to fetch post metadata:", error);
		return {};
	}
}

export default async function SinglePostPage({
	params,
}: {
	params: Promise<{ slug: string }>; // 1. Updated type to Promise
}) {
	const { slug } = await params;
	const isDraft = (await draftMode()).isEnabled; // Detects if preview is running

	let post = null;

	try {
		const postsData = await fetchAPI(
			"/posts",
			{
				filters: { slug: { $eq: slug } },
				populate: ["coverImage", "author"],
				// If draft mode is active, fetch status='draft' from Strapi 5
				status: isDraft ? "draft" : "published",
			},
			{
				// Bypass all server data caching if previewing an unreleased change
				cache: isDraft ? "no-store" : undefined,
			},
		);

		post = postsData.data[0];
	} catch (error) {
		console.error("Failed to fetch post:", error);
	}

	if (!post) {
		notFound();
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
					<div className="prose prose-lg max-w-none prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4 prose-p:text-foreground prose-p:my-4 prose-strong:text-foreground prose-a:text-accent hover:prose-a:text-accent/80 prose-blockquote:border-accent prose-code:text-accent prose-pre:bg-muted prose-ul:mt-4">
						<BlocksRenderer content={post.content} />
					</div>
				</FadeIn>
			</article>
		</div>
	);
}
