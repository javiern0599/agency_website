"use client";

import { useEffect } from "react";

/*
 * Lands a fresh page load on its #hash target (e.g. /#testimonials).
 *
 * globals.css turns on smooth scrolling while a :target exists, so on a cold
 * load the browser animates down from the top while the page is still
 * hydrating, and the animation gets cut short somewhere above the section
 * (sometimes still on the hero). Jump there instantly instead. Sections above
 * keep changing height for a moment as images and fonts load, so re-check the
 * position for the first two seconds and correct it, unless the visitor has
 * already started scrolling.
 */
const SETTLE_MS = 2000;
const CHECK_EVERY_MS = 100;

export function HashScroll() {
	useEffect(() => {
		const id = decodeURIComponent(window.location.hash.slice(1));
		if (!id) return;

		const html = document.documentElement;
		const offset = parseFloat(getComputedStyle(html).scrollPaddingTop) || 0;
		let userScrolled = false;
		const markScrolled = () => {
			userScrolled = true;
		};
		const jump = () => {
			const el = document.getElementById(id);
			if (!el || userScrolled) return;
			if (Math.abs(el.getBoundingClientRect().top - offset) <= 2) return;
			const previous = html.style.scrollBehavior;
			html.style.scrollBehavior = "auto";
			el.scrollIntoView({ block: "start" });
			html.style.scrollBehavior = previous;
		};

		const events = ["wheel", "touchstart", "keydown"] as const;
		events.forEach((e) =>
			window.addEventListener(e, markScrolled, { once: true, passive: true }),
		);
		jump();
		const timer = window.setInterval(jump, CHECK_EVERY_MS);
		const stop = window.setTimeout(
			() => window.clearInterval(timer),
			SETTLE_MS,
		);

		return () => {
			window.clearInterval(timer);
			window.clearTimeout(stop);
			events.forEach((e) => window.removeEventListener(e, markScrolled));
		};
	}, []);

	return null;
}
