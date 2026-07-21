"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import type { BlogCategory } from "@/lib/blog-categories";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
	categories: BlogCategory[];
	activeCategory?: string; // slug
	activeQuery?: string;
}

// Mirrors the project's FadeIn: fade up from y:20 with easeInOut over 0.5s.
const containerVariants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeInOut" as const },
	},
};

// Tighter stagger for the row of category pills.
const pillsContainerVariants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.04 } },
};

export default function BlogFilters({
	categories,
	activeCategory,
	activeQuery,
}: BlogFiltersProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [query, setQuery] = useState(activeQuery ?? "");
	const isFirstRender = useRef(true);

	// Keep the input in sync when the URL changes from outside (e.g. back button).
	useEffect(() => {
		setQuery(activeQuery ?? "");
	}, [activeQuery]);

	// Pushes a set of param updates to the URL, always resetting pagination.
	function commitParams(updates: Record<string, string | null>) {
		const params = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(updates)) {
			if (value === null || value === "") params.delete(key);
			else params.set(key, value);
		}
		params.delete("page"); // any filter/search change returns to page 1
		const qs = params.toString();
		startTransition(() => {
			router.push(qs ? `${pathname}?${qs}` : pathname, {
				scroll: false,
			});
		});
	}

	// Debounce search input so we don't push a URL on every keystroke.
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		const currentQ = searchParams.get("q") ?? "";
		if (query === currentQ) return;

		const timeout = setTimeout(() => {
			commitParams({ q: query.trim() || null });
		}, 350);
		return () => clearTimeout(timeout);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	function selectCategory(slug: string | null) {
		commitParams({ category: slug });
	}

	const chipBase =
		"inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors";

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="show"
			className={cn(
				"mb-12 flex flex-col gap-6",
				isPending && "opacity-70 transition-opacity",
			)}
		>
			{/* Search */}
			<motion.div
				variants={itemVariants}
				className="relative max-w-md mx-auto w-full"
			>
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
				<input
					type="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search posts..."
					aria-label="Search blog posts"
					className="w-full rounded-full border border-border bg-card pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow focus:shadow-lg focus:shadow-accent/10"
				/>
				{query && (
					<button
						type="button"
						onClick={() => setQuery("")}
						aria-label="Clear search"
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					>
						<X className="w-4 h-4" />
					</button>
				)}
			</motion.div>

			{/* Category chips */}
			{categories.length > 0 && (
				<motion.div
					variants={pillsContainerVariants}
					className="flex flex-wrap items-center justify-center gap-2"
				>
					<motion.button
						type="button"
						variants={itemVariants}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => selectCategory(null)}
						className={cn(
							chipBase,
							!activeCategory
								? "border-accent bg-accent/10 text-accent"
								: "border-border text-muted-foreground hover:border-accent/40 hover:text-accent",
						)}
					>
						All
					</motion.button>
					{categories.map((category) => {
						const isActive = category.slug === activeCategory;
						return (
							<motion.button
								key={category.slug}
								type="button"
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => selectCategory(category.slug)}
								className={cn(
									chipBase,
									isActive
										? "border-accent bg-accent/10 text-accent"
										: "border-border text-muted-foreground hover:border-accent/40 hover:text-accent",
								)}
							>
								{category.name}
							</motion.button>
						);
					})}
				</motion.div>
			)}
		</motion.div>
	);
}
