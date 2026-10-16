"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

/**
 * Maps scroll progress through a tall section to a discrete step index.
 * State only changes when the step changes (a handful of times), never per frame.
 * Below `lg`, or with reduced motion, the sequence renders complete and unpinned.
 */
export function useScrollSteps(count: number) {
	const ref = useRef<HTMLElement>(null);
	const reduce = useReducedMotion();
	const [desktop, setDesktop] = useState(false);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
	const [step, setStep] = useState(0);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const update = () => setDesktop(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	useMotionValueEvent(scrollYProgress, "change", (v) => {
		const next = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
		setStep((prev) => (prev === next ? prev : next));
	});

	const pinned = desktop && !reduce;
	return { ref, step: pinned ? step : count - 1, pinned, progress: scrollYProgress };
}
