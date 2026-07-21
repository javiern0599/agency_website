import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
	currentPage: number;
	pageCount: number;
	// Active filters to carry across page links (e.g. category, q).
	params?: Record<string, string | undefined>;
}

// Builds a /blog href for the given page, preserving any active filter params.
// Page 1 omits the page param so the first page keeps a clean, canonical URL.
function hrefForPage(page: number, params: Record<string, string | undefined>) {
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value) search.set(key, value);
	}
	if (page > 1) search.set("page", String(page));
	const qs = search.toString();
	return qs ? `/blog?${qs}` : "/blog";
}

// Builds a compact page list with ellipsis gaps, e.g. [1, "…", 4, 5, 6, "…", 12].
function getPageItems(currentPage: number, pageCount: number) {
	const delta = 1; // pages to show on each side of the current page
	const items: (number | "ellipsis")[] = [];
	let last = 0;

	for (let page = 1; page <= pageCount; page++) {
		const isEdge = page === 1 || page === pageCount;
		const isNearCurrent = Math.abs(page - currentPage) <= delta;

		if (isEdge || isNearCurrent) {
			if (last && page - last > 1) items.push("ellipsis");
			items.push(page);
			last = page;
		}
	}

	return items;
}

export function BlogPagination({
	currentPage,
	pageCount,
	params = {},
}: BlogPaginationProps) {
	if (pageCount <= 1) return null;

	const hasPrev = currentPage > 1;
	const hasNext = currentPage < pageCount;
	const pageItems = getPageItems(currentPage, pageCount);

	const baseControl =
		"inline-flex items-center justify-center h-10 min-w-10 px-3 rounded-md border text-sm font-medium transition-colors";

	return (
		<nav
			aria-label="Blog pagination"
			className="mt-16 flex items-center justify-center gap-2"
		>
			{hasPrev ? (
				<Link
					href={hrefForPage(currentPage - 1, params)}
					rel="prev"
					aria-label="Previous page"
					className={cn(
						baseControl,
						"border-border text-foreground hover:border-accent/40 hover:text-accent",
					)}
				>
					<ChevronLeft className="w-4 h-4" />
				</Link>
			) : (
				<span
					aria-hidden="true"
					className={cn(
						baseControl,
						"border-border text-muted-foreground/40 cursor-not-allowed",
					)}
				>
					<ChevronLeft className="w-4 h-4" />
				</span>
			)}

			{pageItems.map((item, index) =>
				item === "ellipsis" ? (
					<span
						key={`ellipsis-${index}`}
						className="inline-flex items-center justify-center h-10 min-w-10 px-2 text-sm text-muted-foreground"
					>
						…
					</span>
				) : item === currentPage ? (
					<span
						key={item}
						aria-current="page"
						className={cn(
							baseControl,
							"border-accent bg-accent/10 text-accent",
						)}
					>
						{item}
					</span>
				) : (
					<Link
						key={item}
						href={hrefForPage(item, params)}
						aria-label={`Go to page ${item}`}
						className={cn(
							baseControl,
							"border-border text-foreground hover:border-accent/40 hover:text-accent",
						)}
					>
						{item}
					</Link>
				),
			)}

			{hasNext ? (
				<Link
					href={hrefForPage(currentPage + 1, params)}
					rel="next"
					aria-label="Next page"
					className={cn(
						baseControl,
						"border-border text-foreground hover:border-accent/40 hover:text-accent",
					)}
				>
					<ChevronRight className="w-4 h-4" />
				</Link>
			) : (
				<span
					aria-hidden="true"
					className={cn(
						baseControl,
						"border-border text-muted-foreground/40 cursor-not-allowed",
					)}
				>
					<ChevronRight className="w-4 h-4" />
				</span>
			)}
		</nav>
	);
}
