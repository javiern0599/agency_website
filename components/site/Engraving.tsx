"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/*
 * Engraved line work (guilloche), the site's graphic signature: the fine
 * patterns on diplomas and banknotes. Rules:
 * - it only ever sits in empty space; masks fade it out before it reaches text,
 *   and it is hidden on small screens except for the thin band;
 * - on dark sections it is thinner and fainter, so it reads engraved, not lit;
 * - it is static line work: no drawing animation. The desktop rosettes fade in
 *   once when they mount.
 * - the large rosettes are desktop-only, so they are not even rendered on small
 *   screens (keeps the HTML and hydration light on phones).
 */

/** True once mounted on a viewport of at least 1024px. False during SSR and on phones. */
function useDesktop() {
	const [desktop, setDesktop] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const update = () => setDesktop(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);
	return desktop;
}

const ease = [0.23, 1, 0.32, 1] as const;

function gcd(a: number, b: number): number {
	return b ? gcd(b, a % b) : a;
}

/** Hypotrochoid ("spirograph") path, the classic guilloche rosette curve. */
function spiro(R: number, r: number, d: number, steps: number) {
	const turns = r / gcd(R, r);
	let path = "";
	for (let i = 0; i <= steps; i++) {
		const t = (i / steps) * Math.PI * 2 * turns;
		const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
		const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
		path += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
	}
	return path;
}

// Computed once at module load; identical on server and client.
const ROSETTE = [spiro(300, 63, 140, 1400), spiro(300, 50, 110, 1400), spiro(220, 37, 96, 1400)];

function wavePaths(count: number) {
	return Array.from({ length: count }, (_, k) => {
		let d = "";
		for (let x = 0; x <= 1600; x += 10) {
			const y = 60 + Math.sin(x / 38 + k * 0.45) * (22 + k) + Math.sin(x / 110 + k) * 10;
			d += `${x ? "L" : "M"}${x} ${y.toFixed(1)}`;
		}
		return d;
	});
}
const WAVES_LG = wavePaths(14);
const WAVES_SM = wavePaths(7);

type Tone = "light" | "dark";
const strokeFor = (tone: Tone, faint = false) =>
	tone === "dark" ? "rgb(94 234 212 / 0.25)" : faint ? "rgb(13 148 136 / 0.22)" : "rgb(13 148 136 / 0.28)";

function Line({ d, stroke, width, scale = false }: { d: string; stroke: string; width: number; scale?: boolean }) {
	return <path d={d} fill="none" stroke={stroke} strokeWidth={width} vectorEffect={scale ? undefined : "non-scaling-stroke"} />;
}

/** Circular rosette. Place it in empty space and give it a mask that fades toward content. */
export function Rosette({
	className,
	tone = "light",
	style,
	stroke,
}: {
	className?: string;
	tone?: Tone;
	style?: React.CSSProperties;
	/** Override for a single placement, e.g. the home hero where most of the rosette sits behind the sheet. */
	stroke?: string;
}) {
	const desktop = useDesktop();
	if (!desktop) return null;
	return (
		<svg
			aria-hidden
			viewBox="-420 -420 840 840"
			className={cn("pointer-events-none animate-in fade-in duration-700 motion-reduce:animate-none", className)}
			style={style}
		>
			{ROSETTE.map((d, i) => (
				<Line key={i} d={d} stroke={stroke ?? strokeFor(tone)} width={tone === "dark" ? 0.6 : 0.9} scale />
			))}
		</svg>
	);
}

/** The wavy engraved border along the bottom of a hero. Fewer, fainter lines on small screens. */
export function EngravedBand({ className, tone = "light" }: { className?: string; tone?: Tone }) {
	const desktop = useDesktop();
	const waves = desktop ? WAVES_LG : WAVES_SM;
	return (
		<div aria-hidden className={cn("pointer-events-none", className)}>
			<svg key={desktop ? "lg" : "sm"} viewBox="0 0 1600 120" preserveAspectRatio="none" className="h-full w-full">
				{waves.map((d, i) => (
					<Line key={i} d={d} stroke={strokeFor(tone, !desktop)} width={desktop ? 0.7 : 0.6} />
				))}
			</svg>
		</div>
	);
}

/** PraxisFlow's seal. Used sparingly: the hero's engagement sheet, the role sheet, the footer. */
export function Seal({ className, animate = true }: { className?: string; animate?: boolean }) {
	const reduce = useReducedMotion();
	const id = useId().replace(/:/g, "");
	const still = reduce || !animate;
	return (
		<motion.svg
			aria-hidden
			viewBox="0 0 200 200"
			className={className}
			initial={{ opacity: still ? 1 : 0, transform: still ? "rotate(0deg)" : "rotate(-25deg) scale(0.96)" }}
			whileInView={{ opacity: 1, transform: "rotate(0deg) scale(1)" }}
			viewport={{ once: true }}
			transition={{ duration: still ? 0 : 1.1, delay: still ? 0 : 0.6, ease }}
		>
			<defs>
				<path id={`seal-${id}`} d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
			</defs>
			<circle cx="100" cy="100" r="96" fill="#0c665b" />
			<circle cx="100" cy="100" r="88" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="0.75" />
			<circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="0.75" />
			<text fill="white" fontSize="11" fontFamily="var(--font-public)" fontWeight={500}>
				{/* textLength = the path's circumference (2π × 74), so the ring closes exactly instead of overlapping. */}
				<textPath href={`#seal-${id}`} textLength={464.96} lengthAdjust="spacing">PRAXISFLOW · ENGAGEMENT OF STAFF · PRIVATE ENVIRONMENT ·&nbsp;</textPath>
			</text>
			<text x="100" y="114" textAnchor="middle" fill="white" fontSize="40" fontFamily="var(--font-caslon)">
				§
			</text>
		</motion.svg>
	);
}

/** Rosette centred behind the home hero's sheet, sized to stop short of the copy. Parent must be relative. */
export function AsideRosette() {
	return (
		<div aria-hidden className="absolute -left-[32.5%] top-1/2 hidden aspect-square w-[165%] -translate-y-1/2 opacity-90 lg:block">
			<Rosette className="h-full w-full" />
		</div>
	);
}
