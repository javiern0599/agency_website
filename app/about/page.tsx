"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import {
	Zap,
	Users,
	TrendingUp,
	Target,
	Shield,
	HeartHandshake,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function AboutPage() {
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
							About Us
						</div>
						<h1 className="text-4xl md:text-6xl font-medium text-foreground tracking-tight mb-6">
							Engineering the Future of <br />{" "}
							<span className="text-accent">
								Legal Operations
							</span>
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Combining technical engineering with firsthand legal
							expertise, we bridge the gap between technology and
							law to modernize legal operations through
							intelligent automation.
						</p>
					</FadeIn>
				</div>
			</section>

			{/* Mission Section */}
			<section className="pt-12 pb-24 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<FadeIn>
							<div className="space-y-6">
								<h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight">
									Our Mission
								</h2>
								<div className="space-y-4 text-muted-foreground leading-relaxed">
									<p>
										The legal industry is burdened by
										administrative friction. Our mission is
										to eliminate that friction through
										intelligent automation, allowing
										attorneys to return to the work they
										were trained to do.
									</p>
									<p>
										We believe that boutique firms should
										have access to the same operational
										efficiency as Big Law, without the
										massive overhead.
									</p>
								</div>
								<div className="flex gap-4 pt-4">
									<div className="flex items-center gap-2 text-accent">
										<Target className="w-5 h-5" />
										<span className="font-medium">
											Precision-Driven
										</span>
									</div>
									<div className="flex items-center gap-2 text-accent">
										<Zap className="w-5 h-5" />
										<span className="font-medium">
											Efficiency-Focused
										</span>
									</div>
								</div>
							</div>
						</FadeIn>

						<FadeIn delay={0.2}>
							<div className="relative h-96 rounded-2xl overflow-hidden group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-700/50 hover:border-accent/30 transition-colors">
								{/* Decorative gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-blue-500/10"></div>

								{/* DotPattern */}
								<DotPattern
									width={20}
									height={20}
									cx={1}
									cy={1}
									cr={1}
									className={cn(
										"[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
										"text-white/10",
									)}
								/>

								{/* Decorative icon - positioned in card corner */}
								<div className="absolute bottom-6 right-6 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
									<HeartHandshake className="w-8 h-8 text-white/60" />
								</div>

								<div className="absolute inset-0 flex items-center justify-center p-10">
									<div className="space-y-6 relative z-10 max-w-md">
										<h3 className="text-2xl font-semibold text-white">
											Why we do what we do
										</h3>
										<p className="text-slate-300 leading-relaxed">
											We started PraxisFlow to eliminate
											the daily frustrations caused by
											manual, repetitive work. Our
											motivation comes from seeing firms
											thrive once they are freed from
											mundane tasks, allowing them to
											focus on innovation, strategy, and
											better serving their clients.
										</p>
									</div>
								</div>
							</div>
						</FadeIn>
					</div>
				</div>
			</section>

			{/* Philosophy Section with Colored Cards */}
			<section className="py-24 px-6 bg-secondary/50">
				<div className="max-w-7xl mx-auto">
					<FadeIn>
						<h2 className="text-3xl md:text-4xl font-medium text-foreground text-center mb-4 tracking-tight">
							Our Philosophy
						</h2>
						<p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
							Three core principles guide everything we build and
							deliver.
						</p>
					</FadeIn>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Card 1 - Teal */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							viewport={{ once: true }}
							className="group relative"
						>
							<div className="bg-card backdrop-blur-xl border-2 border-border p-8 rounded-2xl hover:border-teal-500/50 transition-all duration-300 h-full overflow-hidden">
								<div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
									<Shield className="w-24 h-24 text-teal-500" />
								</div>

								<div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 text-teal-400">
									<Shield className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-semibold text-foreground mb-3">
									Precision First
								</h3>
								<p className="text-muted-foreground leading-relaxed relative z-10">
									In law, details matter. Our automations are
									built with zero-tolerance for error and
									rigorous testing protocols.
								</p>
							</div>
						</motion.div>

						{/* Card 2 - Blue */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							viewport={{ once: true }}
							className="group relative"
						>
							<div className="bg-card backdrop-blur-xl border-2 border-border p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300 h-full overflow-hidden">
								<div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
									<Users className="w-24 h-24 text-blue-500" />
								</div>

								<div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
									<Users className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-semibold text-foreground mb-3">
									Human-Centric
								</h3>
								<p className="text-muted-foreground leading-relaxed relative z-10">
									We don't just automate tasks; we optimize
									the socio-technical system of your firm so
									your legal team can focus on high-value
									judgment, not low-value labor
								</p>
							</div>
						</motion.div>

						{/* Card 3 - Violet */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							viewport={{ once: true }}
							className="group relative"
						>
							<div className="bg-card backdrop-blur-xl border-2 border-border p-8 rounded-2xl hover:border-violet-500/50 transition-all duration-300 h-full overflow-hidden">
								<div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
									<TrendingUp className="w-24 h-24 text-violet-500" />
								</div>

								<div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6 text-violet-400">
									<TrendingUp className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-semibold text-foreground mb-3">
									Future-Proof
								</h3>
								<p className="text-muted-foreground leading-relaxed relative z-10">
									We build scalable systems that grow with
									your firm, adapting to new challenges and
									technologies.
								</p>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24 px-6">
				<div className="max-w-5xl mx-auto bg-primary rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
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
								Let's discuss how we can build a custom
								automation infrastructure tailored to your
								firm's unique needs.
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
								Free consultation. No commitment required.
							</p>
						</FadeIn>
					</div>
				</div>
			</section>
		</div>
	);
}
