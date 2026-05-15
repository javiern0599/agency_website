"use client";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { ShimmerButton } from "../ui/shimmer-button";
import { Ripple } from "../ui/ripple";
import { FadeIn } from "../ui/fade-in";
import { sendGAEvent } from "@next/third-parties/google";

export default function Hero() {
	return (
		<section className="relative pt-32 pb-20 md:pt-48 md:pb-16 px-6 max-w-7xl mx-auto text-center bg-background overflow-hidden">
			{/* Ripple Background Effect */}
			<Ripple
				mainCircleSize={420}
				mainCircleOpacity={0.15}
				numCircles={8}
				className="mt-[65px]"
			/>

			{/* Content */}
			<div className="relative z-10">
				<FadeIn>
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-8 animate-fade-in-up">
						<span className="flex h-2 w-2 rounded-full bg-accent"></span>
						Revenue-First Workflows
					</div>

					<h1 className="text-5xl md:text-7xl font-medium text-foreground tracking-tighter mb-6 max-w-4xl mx-auto leading-[1.1]">
						Automate the process.
						<br />
						<span className="text-accent">
							Elevate the practice.
						</span>
					</h1>

					<p className="text-lg md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
						We build bespoke automation workflows for boutique law
						firms. Reclaim valuable time by automating processes
						critical to law firm revenue generation.
					</p>
				</FadeIn>
				<FadeIn delay={0.2}>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							href="https://calendar.app.google/AtTiu5d3kd2EwumQ8"
							target="_blank"
							rel="noopener noreferrer"
							className="w-full sm:w-auto"
							onClick={() =>
								sendGAEvent("event", "hero_cta_click", {
									event_category: "engagement",
									event_label: "Let's Talk Growth",
								})
							}
						>
							<ShimmerButton
								className="w-full px-8 py-3.5 rounded-2xl font-medium"
								background="hsl(var(--primary))"
								shimmerColor="#0d9488"
								shimmerDuration="2s"
								shimmerSize="0.30em"
							>
								<span className="flex items-center justify-center gap-2 text-primary-foreground">
									Let's talk growth
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</span>
							</ShimmerButton>
						</Link>
						{/* <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium text-muted-foreground border border-border hover:bg-secondary transition-all flex items-center justify-center gap-2">
                        <PlayCircle className="w-4 h-4" />
                        View Demo
                        </button> */}
					</div>
				</FadeIn>
			</div>
		</section>
	);
}
