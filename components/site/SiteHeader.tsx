"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CALENDAR_URL, hero, nav } from "@/lib/site-content";
import { ArrowButton, wrap } from "./ui";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const reduce = useReducedMotion();

	useEffect(() => setOpen(false), [pathname]);

	// The page behind stays scrollable. Escape closes the menu, and so does starting to
	// scroll: scrolling means the visitor chose to read the page rather than pick a link.
	useEffect(() => {
		if (!open) return;
		const startY = window.scrollY;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		const onScroll = () => Math.abs(window.scrollY - startY) > 8 && setOpen(false);
		window.addEventListener("keydown", onKey);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("scroll", onScroll);
		};
	}, [open]);

	const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

	return (
		<>
		<header className="sticky top-0 z-40 border-b border-rule bg-white/95 backdrop-blur-sm">
			<div className={cn(wrap, "flex h-16 items-center justify-between gap-6")}>
				<Link href="/" aria-label="PraxisFlow home" className="shrink-0">
					<img src="/PraxisFlow-Logotipo-Base.svg" alt="PraxisFlow" width={140} height={28} className="h-7 w-auto" />
				</Link>

				<nav aria-label="Main" className="hidden items-center gap-7 text-[14px] lg:flex">
					{nav.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							aria-current={isActive(item.href) ? "page" : undefined}
							className={cn(
								"group relative py-2 transition-colors duration-200",
								isActive(item.href) ? "text-ink" : "text-muted-foreground hover:text-ink",
							)}
						>
							{item.label}
							<span
								aria-hidden
								className={cn(
									"absolute inset-x-0 bottom-0 h-px origin-left will-change-transform bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100",
									isActive(item.href) ? "scale-x-100" : "scale-x-0",
								)}
							/>
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<div className="hidden sm:block">
						<ArrowButton href={CALENDAR_URL} className="py-2.5 text-[14px]">
							{hero.short}
						</ArrowButton>
					</div>
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label={open ? "Close menu" : "Open menu"}
						className="relative grid h-11 w-11 place-items-center lg:hidden"
					>
						<span
							aria-hidden
							className={cn(
								"absolute h-px w-5 bg-ink transition-transform duration-200 ease-out",
								open ? "rotate-45" : "-translate-y-[4px]",
							)}
						/>
						<span
							aria-hidden
							className={cn(
								"absolute h-px w-5 bg-ink transition-transform duration-200 ease-out",
								open ? "-rotate-45" : "translate-y-[4px]",
							)}
						/>
					</button>
				</div>
			</div>
		</header>

			{/* Outside <header> on purpose: the header's backdrop blur would otherwise trap these fixed layers inside its 64px. */}
			{/* Opens with the links arriving one by one; closes in one quick motion (exits should be faster than entrances). */}
			<AnimatePresence>
				{open && (
					<motion.button
						key="menu-backdrop"
						type="button"
						aria-label="Close menu"
						tabIndex={-1}
						onClick={() => setOpen(false)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
						exit={{ opacity: 0, transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] } }}
						className="fixed inset-x-0 bottom-0 top-16 z-30 bg-ink/30 lg:hidden"
					/>
				)}
				{open && (
					<motion.div
						key="menu-panel"
						id="mobile-menu"
						initial={{ opacity: 0, transform: reduce ? "none" : "translateY(-8px)" }}
						animate={{ opacity: 1, transform: "translateY(0px)", transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
						exit={{ opacity: 0, transform: reduce ? "none" : "translateY(-8px)", transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] } }}
						className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-rule bg-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.35)] lg:hidden"
					>
						<nav aria-label="Mobile" className={cn(wrap, "flex flex-col pb-6 pt-2")}>
							{nav.map((item, i) => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setOpen(false)}
									aria-current={isActive(item.href) ? "page" : undefined}
									style={{ animationDelay: `${i * 40}ms` }}
									className={cn(
										"animate-in fade-in slide-in-from-bottom-2 fill-mode-both border-b border-rule py-3.5 font-serif text-[22px] duration-300 motion-reduce:animate-none",
										isActive(item.href) ? "text-accent-ink" : "text-ink",
									)}
								>
									{item.label}
								</Link>
							))}
							<div
								style={{ animationDelay: `${nav.length * 40}ms` }}
								className="mt-6 animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300 motion-reduce:animate-none"
							>
								<ArrowButton href={CALENDAR_URL} className="w-full justify-between">
									{hero.primary}
								</ArrowButton>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
