"use client";

import { forwardRef, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check, Scale } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

const CALENDAR_URL = "https://calendar.app.google/AtTiu5d3kd2EwumQ8";

// A circular node used in the beam diagram.
const Circle = forwardRef<
	HTMLDivElement,
	{ className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"z-10 flex items-center justify-center rounded-full bg-white shadow-[0_4px_24px_-6px_rgba(0,0,0,0.6)]",
				className,
			)}
		>
			{children}
		</div>
	);
});
Circle.displayName = "Circle";

// Shared beam styling — teal, slow, so pulses flow outward from the firm.
const beamBase = {
	duration: 5,
	pathColor: "#334155",
	pathOpacity: 0.4,
	gradientStartColor: "#2dd4bf",
	gradientStopColor: "#5eead4",
} as const;

export default function LegalAutomationHero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const centerRef = useRef<HTMLDivElement>(null);
	const clioRef = useRef<HTMLDivElement>(null);
	const docusignRef = useRef<HTMLDivElement>(null);
	const outlookRef = useRef<HTMLDivElement>(null);
	const slackRef = useRef<HTMLDivElement>(null);
	const airtableRef = useRef<HTMLDivElement>(null);
	const workspaceRef = useRef<HTMLDivElement>(null);

	return (
		<section className="relative pt-28 pb-16 md:pt-36 px-6 overflow-hidden">
			<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
				{/* Left: copy + CTA */}
				<div className="text-center lg:text-left">
					<FadeIn>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
							<span className="flex h-2 w-2 rounded-full bg-accent"></span>
							Done-for-you automation
						</div>

						<h1 className="text-4xl md:text-6xl font-medium text-foreground tracking-tighter mb-6 leading-[1.05]">
							Law Firm Automation
						</h1>

						<p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-light">
							We build custom law firm automation that connects the
							tools your firm already uses — so intake, billing,
							documents, and follow-up run themselves. More billable
							hours, fewer errors, no new headcount.
						</p>
					</FadeIn>

					<FadeIn delay={0.15}>
						<div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 mb-10 text-sm text-muted-foreground">
							{[
								"Connect your existing tools",
								"Private & confidential",
								"Tailored to your workflow",
							].map((item) => (
								<span
									key={item}
									className="inline-flex items-center gap-2"
								>
									<Check className="w-4 h-4 text-accent" />
									{item}
								</span>
							))}
						</div>
					</FadeIn>

					<FadeIn delay={0.2}>
						<Link
							href={CALENDAR_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block"
						>
							<ShimmerButton
								className="px-8 py-3.5 rounded-2xl font-medium"
								background="hsl(var(--primary))"
								shimmerColor="#0d9488"
								shimmerDuration="2s"
								shimmerSize="0.30em"
							>
								<span className="flex items-center justify-center gap-2 text-primary-foreground">
									Book a Free Discovery Call
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</span>
							</ShimmerButton>
						</Link>
					</FadeIn>
				</div>

				{/* Right: firm at the center, beams flowing out to each tool */}
				<FadeIn delay={0.2}>
					<div
						ref={containerRef}
						className="relative flex h-[400px] md:h-[480px] w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-10 shadow-2xl"
					>
						{/* Ambient glow */}
						<div className="pointer-events-none absolute inset-0 opacity-40">
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-500/25 rounded-full blur-[130px]"></div>
						</div>

						{/* Caption */}
						<span className="absolute top-5 left-0 right-0 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
							Your practice, connected
						</span>

						<div className="relative z-10 flex size-full max-h-[240px] max-w-md flex-col items-stretch justify-between">
							{/* Top row */}
							<div className="flex flex-row items-center justify-between">
								<Circle
									ref={clioRef}
									className="size-11 md:size-12 p-2.5"
								>
									<img
										src="/Vector.svg"
										alt="Clio"
										className="h-full w-full object-contain"
									/>
								</Circle>
								<Circle
									ref={docusignRef}
									className="size-11 md:size-12 p-2.5"
								>
									<img
										src="/docusign-icon.png"
										alt="DocuSign"
										className="h-full w-full object-contain"
									/>
								</Circle>
							</div>

							{/* Middle row — the firm at center */}
							<div className="flex flex-row items-center justify-between">
								<Circle
									ref={outlookRef}
									className="size-11 md:size-12 p-2.5"
								>
									<img
										src="/microsoft-outlook.svg"
										alt="Microsoft Outlook"
										className="h-full w-full object-contain"
									/>
								</Circle>

								<div className="relative flex items-center">
									<span className="absolute inset-0 rounded-full bg-teal-400/20 blur-xl animate-pulse"></span>
									<Circle
										ref={centerRef}
										className="size-16 md:size-20 text-slate-800 ring-2 ring-teal-400/40 shadow-[0_0_40px_-8px_rgba(45,212,191,0.6)]"
									>
										<Scale className="h-7 w-7 md:h-8 md:w-8" />
									</Circle>
								</div>

								<Circle
									ref={slackRef}
									className="size-11 md:size-12 p-2.5"
								>
									<img
										src="/slack-integration.svg"
										alt="Slack"
										className="h-full w-full object-contain"
									/>
								</Circle>
							</div>

							{/* Bottom row */}
							<div className="flex flex-row items-center justify-between">
								<Circle
									ref={airtableRef}
									className="size-11 md:size-12 p-2.5"
								>
									<img
										src="/airtable.svg"
										alt="Airtable"
										className="h-full w-full object-contain"
									/>
								</Circle>
								<Circle
									ref={workspaceRef}
									className="size-11 md:size-12 p-2"
								>
									<img
										src="/google-workspace-integration.svg"
										alt="Google Workspace"
										className="h-full w-full object-contain"
									/>
								</Circle>
							</div>
						</div>

						{/* Beams: from the firm (center) outward to each tool */}
						<AnimatedBeam
							containerRef={containerRef}
							fromRef={centerRef}
							toRef={clioRef}
							curvature={75}
							endYOffset={-10}
							delay={0}
							{...beamBase}
						/>
						<AnimatedBeam
							containerRef={containerRef}
							fromRef={centerRef}
							toRef={outlookRef}
							delay={1.2}
							{...beamBase}
						/>
						<AnimatedBeam
							containerRef={containerRef}
							fromRef={centerRef}
							toRef={airtableRef}
							curvature={-75}
							endYOffset={10}
							delay={2.4}
							{...beamBase}
						/>
						<AnimatedBeam
							containerRef={containerRef}
							fromRef={centerRef}
							toRef={docusignRef}
							curvature={75}
							endYOffset={-10}
							delay={0.6}
							{...beamBase}
						/>
						<AnimatedBeam
							containerRef={containerRef}
							fromRef={centerRef}
							toRef={slackRef}
							delay={1.8}
							{...beamBase}
						/>
						<AnimatedBeam
							containerRef={containerRef}
							fromRef={centerRef}
							toRef={workspaceRef}
							curvature={-75}
							endYOffset={10}
							delay={3}
							{...beamBase}
						/>
					</div>
				</FadeIn>
			</div>
		</section>
	);
}
