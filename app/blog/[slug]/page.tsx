import { fetchAPI } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { draftMode } from "next/headers";
import CommentsSection from "@/components/sections/CommentsSection";

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
			"https://www.praxisflow.com/og-ai-employees.jpg";

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
		<div className="w-full bg-white">
			{/* Back to Blog Link */}
			<section className="px-4 pt-10 sm:px-6">
				<div className="mx-auto max-w-3xl">
					<Link
						href="/blog"
						className="group inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors duration-200 hover:text-ink"
					>
						<ArrowLeft className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-x-1" strokeWidth={1.75} />
						Back to Blog
					</Link>
				</div>
			</section>

			{/* Article */}
			<article className="mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6">
				<Reveal>
					<header className="mb-10 border-b border-rule pb-8">
						<h1 className="mb-5 font-serif text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-ink [text-wrap:balance]">
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
									).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
								</span>
							)}
						</div>
					</header>

					{post.coverImage && (
						<div className="mb-8">
							<img
								src={post.coverImage.url}
								alt={post.title}
								className="aspect-[16/9] w-full object-cover"
							/>
						</div>
					)}

					{/* Content */}
					<div className="prose prose-lg max-w-none prose-headings:mb-4 prose-headings:mt-10 prose-headings:font-serif prose-headings:font-normal prose-headings:text-ink prose-p:my-4 prose-p:text-foreground prose-a:text-ink prose-a:decoration-accent prose-a:underline-offset-4 prose-blockquote:border-accent prose-blockquote:font-serif prose-strong:text-foreground prose-code:text-accent-ink prose-pre:bg-muted prose-ul:mt-4">
						<BlocksRenderer content={post.content} />
					</div>
				</Reveal>
			</article>

			<section className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
				<CommentsSection documentId={post.documentId} />
			</section>
		</div>
	);
}
