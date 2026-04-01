"use client";
import {
	Check,
	Rocket,
	ShieldCheck,
	ArrowRight,
	ArrowRightIcon,
} from "lucide-react";
import { ShimmerButton } from "../ui/shimmer-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShinyButton } from "../ui/shiny-button";
import { AnimatedShinyText } from "../ui/animated-shiny-text";

export function Pricing() {
	return (
		<section id="pricing" className="pt-12 pb-24 max-w-7xl mx-auto px-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
				className="text-center mb-16 max-w-3xl mx-auto"
			>
				<h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
					Your Investment in Intelligent Automation
				</h2>
				<p className="text-muted-foreground text-lg">
					Every firm is unique. Our solutions are custom-tailored to
					your specific needs, delivering measurable ROI and ongoing
					support.
				</p>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
				{/* Phase 1: Implementation */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					viewport={{ once: true }}
					className="p-8 md:p-10 rounded-2xl border border-border bg-card flex flex-col h-full relative overflow-hidden group hover:border-accent transition-colors"
				>
					<div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
						<Rocket className="w-24 h-24 text-accent" />
					</div>

					<div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
						<Rocket className="w-6 h-6" />
					</div>

					<h3 className="font-medium text-foreground text-xl mb-2">
						Phase 1: Custom Implementation
					</h3>
					<p className="text-accent font-medium text-sm mb-6 uppercase tracking-wider">
						One-time Project Fee
					</p>

					<p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
						A one-time project fee based on the complexity of your
						automation needs and the estimated return on investment.
						This includes discovery, design, development, and
						training.
					</p>

					<div className="pt-8 border-t border-border">
						<p className="text-sm text-muted-foreground italic">
							"Tailored to your firm's specific infrastructure."
						</p>
					</div>
				</motion.div>

				{/* Phase 2: Maintenance */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					viewport={{ once: true }}
					className="p-8 md:p-10 rounded-2xl border border-border bg-secondary flex flex-col h-full relative overflow-hidden group hover:border-accent transition-colors"
				>
					<div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
						<ShieldCheck className="w-24 h-24 text-accent" />
					</div>

					<div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center mb-6 text-accent shadow-sm">
						<ShieldCheck className="w-6 h-6" />
					</div>

					<h3 className="font-medium text-foreground text-xl mb-2">
						Phase 2: Ongoing Partnership
					</h3>
					<p className="text-accent font-medium text-sm mb-6 uppercase tracking-wider">
						Predictable Monthly Fee
					</p>

					<p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
						A predictable monthly fee for continuous monitoring,
						maintenance, updates, and dedicated support for your
						automated infrastructure. Ensures uninterrupted
						efficiency and peace of mind.
					</p>

					<div className="pt-8 border-t border-border">
						<p className="text-sm text-muted-foreground italic">
							"Continuous optimization and priority support."
						</p>
					</div>
				</motion.div>
			</div>

			{/* What's Included */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				viewport={{ once: true }}
				className="bg-primary rounded-2xl p-8 md:p-12 text-center md:text-left relative overflow-hidden"
			>
				{/* Decorative background elements */}
				<div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

				<div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
					<div className="md:w-1/3">
						<h3 className="text-2xl md:text-3xl font-medium text-primary-foreground mb-4">
							What's Included
						</h3>
						<p className="text-primary-foreground/70 mb-8">
							Our comprehensive engagement model ensures you get
							value from day one and sustainable growth forever.
						</p>
						<Link 
                            href="https://calendar.app.google/AtTiu5d3kd2EwumQ8"
							target="_blank"
							rel="noopener noreferrer"
                            className="inline-block">
							<div className="group relative overflow-hidden rounded-2xl bg-accent px-8 py-4 transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20">
								<AnimatedShinyText className="inline-flex items-center justify-center gap-2 text-lg font-medium text-primary-foreground transition ease-out hover:text-primary-foreground/90 hover:duration-300 bg-gradient-to-r from-transparent via-white/80 via-50% to-transparent dark:via-white/80">
									<span>Schedule a Free Discovery Call</span>
									<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
								</AnimatedShinyText>
							</div>
						</Link>
						<p className="text-primary-foreground/60 text-sm mt-4">
							Let's explore your firm's unique potential for
							automation and discuss a tailored investment that
							delivers clear ROI.
						</p>
					</div>

					<div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
						{[
							"Comprehensive Workflow Audit",
							"ROI Projections & Feasibility Study",
							"Custom Solution Design & Development",
							"Hands-on Team Training",
							"Dedicated Account Management",
							"Proactive System Maintenance",
							"Priority Support Channels",
							"Quarterly Optimization Reviews",
						].map((benefit, index) => (
							<div key={index} className="flex items-start gap-3">
								<div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
									<Check className="w-3 h-3 text-teal-400" />
								</div>
								<span className="text-primary-foreground/80">
									{benefit}
								</span>
							</div>
						))}
					</div>
				</div>
			</motion.div>

			{/* Small Project Disclaimer */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				viewport={{ once: true }}
				className="text-center max-w-2xl mx-auto pt-12"
			>
				<p className="text-muted-foreground">
					<span className="font-medium text-foreground">
						No project is too small.
					</span>{" "}
					If you have an idea to improve your workflow, we may be able
					to do it.{" "}
					<Link
						href="/contact"
						className="text-accent hover:underline underline-offset-4"
					>
						Schedule a free consultation
					</Link>{" "}
					and talk to us.
				</p>
			</motion.div>
		</section>
	);
}
