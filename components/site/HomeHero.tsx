"use client";

import { motion, useReducedMotion } from "motion/react";
import { CALENDAR_URL, hero } from "@/lib/site-content";
import { ArrowButton, wrap } from "./ui";
import { HeroSheet } from "./HeroSheet";
import { AsideRosette } from "./Engraving";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

export function HomeHero() {
	const reduce = useReducedMotion();
	const rise = (delay: number) => ({
		initial: { opacity: 0, transform: reduce ? "none" : "translateY(16px)" },
		animate: { opacity: 1, transform: "translateY(0px)" },
		transition: { duration: 0.7, delay, ease },
	});
	return (
		<section className="relative overflow-hidden border-b border-rule bg-white">
			<div className={cn(wrap, "relative grid items-center gap-14 pb-20 pt-14 sm:pt-16 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:pb-16 lg:pt-10")}>
				<div className="lg:col-span-7">
					<h1
						className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out motion-reduce:animate-none font-serif text-[clamp(3rem,7vw,5.75rem)] leading-[1.02] tracking-[-0.02em] text-ink [text-wrap:balance]"
					>
						{hero.title}
					</h1>
					<motion.p {...rise(0.08)} className="mt-7 max-w-[34ch] text-[20px] leading-[1.5] text-muted-foreground">
						{hero.sub}
					</motion.p>
					<motion.div {...rise(0.16)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
						<ArrowButton href={CALENDAR_URL}>{hero.primary}</ArrowButton>
						<ArrowButton href="#staff" variant="plain">
							{hero.secondary}
						</ArrowButton>
					</motion.div>
				</div>
				<div className="relative lg:col-span-5">
					<AsideRosette />
					<HeroSheet seal />
				</div>
			</div>
		</section>
	);
}
