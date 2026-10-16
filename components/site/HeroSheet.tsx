"use client";

import { motion, useReducedMotion } from "motion/react";
import { roles } from "@/lib/site-content";
import { Seal } from "./Engraving";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * The hero's engagement sheet for the Intake Coordinator. Clauses arrive in order
 * and PraxisFlow's conformed signature is written in last: the page's one moment
 * of ceremony, shown once on load.
 */
export function HeroSheet({ seal }: { seal?: boolean }) {
	const reduce = useReducedMotion();
	const r = roles[0];
	const clauses = [
		{ h: "Duties", b: "Answers new inquiries on WhatsApp and website chat, qualifies them by the Firm's rules, books consultations and records each lead in the Firm's CRM." },
		{ h: "Hours and languages", b: "Every day, all hours. Multilingual: it replies in each client's language." },
		{ h: "Limits", b: r.never },
		{ h: "Hand-off", b: r.handsOff },
	];
	const rise = (delay: number) => ({
		initial: { opacity: 0, transform: reduce ? "none" : "translateY(16px)" },
		animate: { opacity: 1, transform: "translateY(0px)" },
		transition: { duration: 0.7, delay, ease },
	});
	return (
		<motion.div
			{...rise(0.1)}
			className="relative bg-white px-7 py-9 font-serif text-ink shadow-[0_1px_2px_rgba(15,23,42,0.06),0_24px_48px_-24px_rgba(15,23,42,0.3)] sm:px-10"
		>
			<p className="text-center font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Engagement of staff</p>
			<p className="mt-3 text-center text-[28px] leading-tight">{r.title}</p>
			<div className="mx-auto mt-5 h-px w-16 bg-ink" />
			<ol className="mt-6 space-y-4 text-[15px] leading-[1.55]">
				{clauses.map((c, i) => (
					<motion.li
						key={c.h}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease }}
						className="grid grid-cols-[1.5rem_1fr]"
					>
						<span className="text-accent-ink">{i + 1}.</span>
						<span>
							<span className="italic">{c.h}.</span> {c.b}
						</span>
					</motion.li>
				))}
			</ol>
			<div className="mt-8 grid grid-cols-2 gap-6 text-[13px]">
				{["For the Firm", "PraxisFlow"].map((who, i) => (
					<div key={who}>
						<div className="flex h-7 items-end border-b border-ink pb-1">
							{i === 1 && (
								<motion.span
									initial={{ clipPath: reduce ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)", opacity: reduce ? 0 : 1 }}
									animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
									transition={{ delay: 1.15, duration: 0.8, ease }}
									className="text-[15px] italic"
								>
									/s/ PraxisFlow
								</motion.span>
							)}
						</div>
						<p className="mt-1 font-sans text-muted-foreground">{who}</p>
					</div>
				))}
			</div>
			{seal && <Seal className="absolute -bottom-14 -right-3 h-24 w-24 sm:-right-12 sm:h-32 sm:w-32" />}
			<p className="absolute -bottom-10 left-0 max-w-[60%] font-sans text-[13px] leading-snug text-muted-foreground sm:max-w-none">
				Each role&apos;s rules, written down before it starts. Illustration.
			</p>
		</motion.div>
	);
}
