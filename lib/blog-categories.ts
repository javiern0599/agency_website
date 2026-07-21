import { fetchAPI } from "@/lib/strapi";

export interface BlogCategory {
	name: string; // exact value stored in Strapi, used for filtering
	slug: string; // URL-safe form used in ?category=
}

// Turns "Legal Tech & Strategy" into "legal-tech-and-strategy".
export function slugifyCategory(name: string) {
	return name
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

// Derives the category list from published posts so it self-maintains as
// categories are added/removed in Strapi — no hardcoded enum to keep in sync.
// Categories with zero published posts intentionally do not appear as filters.
export async function getBlogCategories(): Promise<BlogCategory[]> {
	try {
		const res = await fetchAPI(
			"/posts",
			{
				fields: ["category"],
				pagination: { pageSize: 100 },
			},
			{ next: { revalidate: 60 } },
		);

		const names = new Set<string>();
		for (const post of res?.data ?? []) {
			const value = post?.category;
			if (Array.isArray(value)) {
				value.forEach((c: unknown) => {
					if (typeof c === "string" && c.trim()) names.add(c);
				});
			} else if (typeof value === "string" && value.trim()) {
				names.add(value);
			}
		}

		return Array.from(names)
			.sort((a, b) => a.localeCompare(b))
			.map((name) => ({ name, slug: slugifyCategory(name) }));
	} catch (error) {
		console.error("Failed to fetch blog categories:", error);
		return [];
	}
}
