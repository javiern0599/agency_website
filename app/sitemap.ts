import { MetadataRoute } from "next";
import { fetchAPI } from "@/lib/strapi";

// Turn the function async so we can query Strapi safely during builds
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://www.praxisflow.com";

	// 1. Core Core and Index Pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`, // The main blog index view
			lastModified: new Date(),
			changeFrequency: "daily", // Crawlers should check this often for fresh content links
			priority: 0.9,
		},
		{
			url: `${baseUrl}/case-studies`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/integrations`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/pricing`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/security`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/privacy-policy`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: `${baseUrl}/terms-of-use`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];

	// 2. Dynamic Article Feed Generation
	try {
		const postsData = await fetchAPI("/posts", {
			fields: ["slug", "updatedAt"], // Grab only necessary fields to optimize execution speed
			pagination: { limit: 1000 }, // Cap safe data payload bounds
		});

		const dynamicBlogPosts: MetadataRoute.Sitemap = postsData.data.map(
			(post: any) => ({
				url: `${baseUrl}/blog/${post.slug}`,
				// Gracefully fall back to current time if system timestamp isn't initialized
				lastModified: post.updatedAt
					? new Date(post.updatedAt)
					: new Date(),
				changeFrequency: "weekly",
				priority: 0.7,
			}),
		);

		// Combine core routes with your live article objects
		return [...staticPages, ...dynamicBlogPosts];
	} catch (error) {
		console.error("Failed to generate dynamic sitemap segments:", error);
		// Fallback safely to your static architecture map if API calls drop out during compiling
		return staticPages;
	}
}
