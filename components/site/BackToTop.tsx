"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Back-to-top arrow. Appears once the visitor is a screen or more down the page and sits
 * above the chat bubble in the bottom-right corner. State only changes when the
 * threshold is crossed, never per scroll frame.
 */
export function BackToTop() {
	const { scrollY } = useScroll();
	const reduce = useReducedMotion();
	const [visible, setVisible] = useState(false);

	useMotionValueEvent(scrollY, "change", (y) => {
		const next = y > window.innerHeight;
		setVisible((v) => (v === next ? v : next));
	});

	return (
		<button
			type="button"
			aria-label="Back to top"
			aria-hidden={!visible}
			tabIndex={visible ? 0 : -1}
			onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
			className={cn(
				"group fixed bottom-24 right-5 z-30 grid h-11 w-11 place-items-center border border-rule bg-white/95 text-ink shadow-[0_8px_24px_-12px_rgba(15,23,42,0.35)] backdrop-blur-sm",
				"transition-[opacity,transform,border-color,background-color,color] duration-200 ease-out hover:border-ink hover:bg-ink hover:text-white active:scale-[0.96]",
				"motion-reduce:transition-opacity",
				visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
			)}
		>
			<ArrowUp aria-hidden className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5" strokeWidth={1.75} />
		</button>
	);
}
