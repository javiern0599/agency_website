"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * Fades a block up into place the first time it scrolls into view.
 * With reduced motion it only fades.
 */
export function Reveal({
	children,
	className,
	delay = 0,
	as = "div",
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	as?: "div" | "li" | "section";
}) {
	const reduce = useReducedMotion();
	const Comp = motion[as];
	return (
		<Comp
			initial={{ opacity: 0, transform: reduce ? "none" : "translateY(16px)" }}
			whileInView={{ opacity: 1, transform: "translateY(0px)" }}
			viewport={{ once: true, margin: "0px 0px -10% 0px" }}
			transition={{ duration: 0.6, delay, ease }}
			className={className}
		>
			{children}
		</Comp>
	);
}
