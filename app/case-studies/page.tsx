import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

import { successCases } from "@/lib/successCases";

export const metadata: Metadata = {
	title: "Case Studies",
	description:
		"See how we've helped boutique law firms save thousands of hours and increase revenue through custom automation.",
	keywords: [
		"Legal Automation Case Studies",
		"Law Firm Success Stories",
		"Automation ROI",
		"Legal Tech Results",
	],
	openGraph: {
		title: "Case Studies | PraxisFlow",
		description:
			"See how we've helped boutique law firms save thousands of hours and increase revenue through custom automation.",
		url: "https://www.praxisflow.com/case-studies",
		type: "website",
		images: [
			{
				url: "/og-image.webp",
				width: 1200,
				height: 630,
				alt: "PraxisFlow Case Studies",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Case Studies | PraxisFlow",
		description:
			"See how we've helped boutique law firms save thousands of hours and increase revenue through custom automation.",
		images: ["/og-image.webp"],
	},
};

export default function CaseStudiesPage() {
	return (
		<div className="w-full min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative pt-32 pb-20 px-6 overflow-hidden">
				{/* DotPattern Background */}
				<DotPattern
					width={20}
					height={20}
					cx={1}
					cy={1}
					cr={1}
					className={cn(
						"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
						"text-accent/10",
					)}
				/>

				{/* Decorative blur effects */}
				<div className="absolute top-20 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] pointer-events-none"></div>
				<div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

				<div className="max-w-5xl mx-auto text-center relative z-10">
					<FadeIn>
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-8">
							<span className="flex h-2 w-2 rounded-full bg-accent"></span>
							Case Studies
						</div>
						<h1 className="text-4xl md:text-6xl font-medium text-foreground tracking-tight mb-6">
							Real-World <br />{" "}
							<span className="text-accent">Success Stories</span>
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							See examples of automation we have built for
							forward-thinking boutique law firms.
						</p>
					</FadeIn>
				</div>
			</section>

			{/* Case Studies Grid */}
			<section className="py-12 px-6">
				<div className="max-w-5xl mx-auto space-y-8">
					{successCases.map((study, idx) => (
						<FadeIn key={idx} delay={idx * 0.1}>
							<div className="relative p-8 rounded-2xl border border-border bg-card hover:border-accent transition-colors shadow-sm">
								<div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4 mb-4">
									<div className="flex gap-2 flex-wrap">
										<span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-border">
											{study.industry}
										</span>
									</div>
								</div>
								<h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
									{study.title}
								</h2>
								<p className="text-muted-foreground text-lg mb-6 line-clamp-3">
									{study.challenge}
								</p>
								<Link
									href={`/case-studies/${study.id}`}
									className="inline-flex items-center text-muted-foreground hover:text-primary font-semibold transition-colors group"
								>
									Read full case study{" "}
									<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</FadeIn>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 px-6 bg-secondary/50">
				<div className="max-w-5xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
					{/* DotPattern Background */}
					<DotPattern
						width={20}
						height={20}
						cx={1}
						cy={1}
						cr={1}
						className={cn(
							"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
							"text-primary-foreground/20",
						)}
					/>

					{/* Decorative circles */}
					<div className="absolute top-0 left-0 w-64 h-64 bg-accent rounded-full blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
					<div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/60 rounded-full blur-[100px] opacity-20 translate-x-1/2 translate-y-1/2"></div>

					<div className="relative z-10">
						<FadeIn>
							<h2 className="text-3xl md:text-5xl font-medium text-primary-foreground tracking-tight mb-6">
								Want Similar Results for Your Firm?
							</h2>
							<p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
								Schedule a discovery call to explore how we can
								custom-engineer an automation infrastructure for
								your practice.
							</p>
						</FadeIn>
						<FadeIn delay={0.2}>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Link
									href="https://calendar.app.google/AtTiu5d3kd2EwumQ8"
									target="_blank"
									rel="noopener noreferrer"
									className="w-full sm:w-auto"
								>
									<ShimmerButton
										className="w-full px-8 py-3.5 rounded-2xl font-medium"
										background="hsl(var(--background))"
										shimmerColor="#0d9488"
										shimmerDuration="2s"
										shimmerSize="0.30em"
									>
										<span className="flex items-center justify-center gap-2 text-foreground">
											Schedule a Discovery Call
										</span>
									</ShimmerButton>
								</Link>
							</div>
							<p className="mt-6 text-xs text-primary-foreground/50">
								Free consultation. No commitment required
							</p>
						</FadeIn>
					</div>
				</div>
			</section>
		</div>
	);
}
