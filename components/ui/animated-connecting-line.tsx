"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

// Connector line that draws itself in on scroll — mirrors the animated
// connectors in Process.tsx on the home page. axis="x" scales in from the
// left (horizontal); axis="y" scales in from the top (vertical). Set the
// matching transform origin via className (origin-left / origin-top).
export function AnimatedConnectingLine({
	className,
	style,
	delay = 0.6,
	axis = "x",
}: {
	className?: string;
	style?: CSSProperties;
	delay?: number;
	axis?: "x" | "y";
}) {
	const initial =
		axis === "x"
			? { opacity: 0, scaleX: 0 }
			: { opacity: 0, scaleY: 0 };
	const whileInView =
		axis === "x"
			? { opacity: 1, scaleX: 1 }
			: { opacity: 1, scaleY: 1 };

	return (
		<motion.div
			initial={initial}
			whileInView={whileInView}
			transition={{ duration: axis === "x" ? 0.8 : 0.6, delay }}
			viewport={{ once: true }}
			className={className}
			style={style}
		/>
	);
}
