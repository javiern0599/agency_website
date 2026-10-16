"use client";

import { motion, useReducedMotion } from "motion/react";
import { sharedHandOff } from "@/lib/site-content";
import { ArticleHeading, wrap } from "./ui";

const ease = [0.23, 1, 0.32, 1] as const;

const rules = ["No legal advice.", "No signing or filing.", "No contact with courts or opposing counsel.", "No moving money.", "No deleting records."];

/** The clause that binds every role: one rule per line, each sliding in as it reaches view. */
export function Limits({ n, tinted }: { n?: string; tinted?: boolean }) {
	const reduce = useReducedMotion();
	return (
		<section id="limits" className={`border-t border-rule py-24 sm:py-28 ${tinted ? "bg-desk" : "bg-white"}`}>
			<div className={wrap}>
				<ArticleHeading n={n}>Terms that apply to every role</ArticleHeading>
				<p className="mt-10 text-[13px] font-medium uppercase tracking-[0.16em] text-accent-ink">Every role, every time</p>
				<ul className="mt-5 space-y-1">
					{rules.map((r, i) => (
						<motion.li
							key={r}
							initial={{ opacity: 0, transform: reduce ? "none" : "translateX(-16px)" }}
							whileInView={{ opacity: 1, transform: "translateX(0px)" }}
							viewport={{ once: true, amount: 0.8 }}
							transition={{ delay: i * 0.06, duration: 0.5, ease }}
							className="font-serif text-[clamp(1.9rem,4.6vw,3.75rem)] leading-[1.12] tracking-[-0.015em] text-ink"
						>
							{r}
						</motion.li>
					))}
				</ul>
				<p className="mt-12 max-w-[60ch] text-[18px] leading-relaxed text-muted-foreground">{sharedHandOff}</p>
			</div>
		</section>
	);
}
