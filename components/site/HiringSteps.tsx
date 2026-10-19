"use client";

import { motion, useReducedMotion } from "motion/react";
import { hiring } from "@/lib/site-content";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * The steps of an engagement as one ruled panel. When it scrolls into view the
 * steps arrive in order, left to right, so the sequence reads as a sequence.
 */
export function HiringSteps({ steps = hiring }: { steps?: { title: string; body: string }[] }) {
	const reduce = useReducedMotion();
	return (
		<motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.4 }} className="relative mt-14">
			<ol className={`grid border-l border-t border-rule [&>*]:border-b [&>*]:border-r [&>*]:border-rule ${steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4"}`}>
				{steps.map((h, i) => (
					<motion.li
						key={h.title}
						variants={{
							hidden: { opacity: 0, transform: reduce ? "none" : "translateY(10px)" },
							shown: { opacity: 1, transform: "translateY(0px)" },
						}}
						transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.12, ease }}
						className="bg-white p-7 sm:p-8"
					>
						<p className="font-sans text-[13px] font-medium tabular-nums text-accent-ink">Step {i + 1}</p>
						<h3 className="mt-3 font-serif text-[25px] leading-tight text-ink">{h.title}</h3>
						<p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{h.body}</p>
					</motion.li>
				))}
			</ol>
		</motion.div>
	);
}
