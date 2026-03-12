"use client";
import { DotPattern } from "../ui/dot-pattern";
import { ShimmerButton } from "../ui/shimmer-button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FadeIn } from "../ui/fade-in";

export default function CTA() {
	return (
		<section className="py-24 px-6 bg-background">
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
							Ready to Modernize Your Practice?
						</h2>
						<p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
							Join the forward-thinking boutique firms that are
							leveraging automation to scale without the burnout.
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
	);
}
