"use client";

import { useRef } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Check,
	Users,
	FileText,
	Scale,
	Zap,
	AlertCircle,
	BarChart3,
	MessageSquareQuote,
	Heart,
} from "lucide-react";
import { notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { successCases } from "@/lib/successCases";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";

// Icon mapping based on automation category
const getIndustryIcon = (industry: string) => {
	if (industry.includes("Intake")) return Users;
	if (industry.includes("Marketing")) return Zap;
	if (industry.includes("Billing")) return Scale;
	if (industry.includes("Retention")) return Heart;
	return Zap;
};

export default function CaseStudyDetail({
	params,
}: {
	params: { id: string };
}) {
	const caseStudy = successCases.find((study) => study.id === params.id);
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start center", "end center"],
	});

	const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	if (!caseStudy) {
		notFound();
	}

	const Icon = getIndustryIcon(caseStudy.industry);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<main className="min-h-screen bg-background selection:bg-accent/20 selection:text-accent w-full">
			{/* Hero Section */}
			<section className="pt-32 px-6 bg-background">
				<div className="max-w-4xl mx-auto">
					<Link
						href="/case-studies"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
					>
						<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
						Back to Case Studies
					</Link>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<motion.div variants={itemVariants} className="mb-6">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
									<Icon className="w-6 h-6" />
								</div>
								<div>
									<p className="text-xs font-medium text-accent uppercase tracking-wider">
										{caseStudy.industry}
									</p>
								</div>
							</div>
						</motion.div>

						<motion.h1
							variants={itemVariants}
							className="text-5xl md:text-6xl font-medium text-foreground tracking-tighter mb-6 leading-[1.1]"
						>
							{caseStudy.title}
						</motion.h1>

						<motion.div
							variants={itemVariants}
							className="flex flex-col gap-6"
						>
							<p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
								Discover how we transformed their operations
								through intelligent automation.
							</p>

							<div className="flex flex-wrap gap-4 items-center">
								<div>
									<p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
										Key Result
									</p>
									<p className="text-2xl font-semibold text-accent">
										{caseStudy.keyResult}
									</p>
								</div>
								<div className="h-10 w-px bg-border"></div>
								<div>
									<p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
										Timeline
									</p>
									<p className="text-lg font-medium text-foreground">
										{caseStudy.timeline}
									</p>
								</div>
							</div>

							<div className="flex flex-wrap gap-2 pt-2">
								{caseStudy.software.map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
									>
										{tech}
									</span>
								))}
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Sequential Narrative Section */}
			<section className="px-6 bg-background">
				<div className="max-w-4xl mx-auto">
					<motion.div
						ref={containerRef}
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="relative space-y-16 pt-8 pb-8"
					>
						{/* Connecting Line - Scroll Driven */}
						<div
							className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-border/30"
							style={{ top: "32px" }}
						>
							<motion.div
								className="w-full bg-accent origin-top"
								style={{ height: lineHeight }}
							/>
						</div>

						{/* Challenge */}
						<motion.div variants={itemVariants}>
							<div className="flex items-start gap-4">
								<motion.div
									initial={{
										color: "hsl(var(--muted-foreground))",
									}}
									whileInView={{
										color: "hsl(var(--accent))",
									}}
									viewport={{
										margin: "0px 0px -50% 0px",
										once: false,
									}}
									transition={{ duration: 0.3 }}
									className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1 relative z-10 border border-border"
								>
									<AlertCircle className="w-5 h-5" />
								</motion.div>
								<div>
									<h2 className="text-2xl font-medium text-foreground mb-3">
										The Challenge
									</h2>
									<p className="text-lg text-muted-foreground leading-relaxed">
										{caseStudy.challenge}
									</p>
								</div>
							</div>
						</motion.div>

						{/* Solution */}
						<motion.div variants={itemVariants}>
							<div className="flex items-start gap-4">
								<motion.div
									initial={{
										color: "hsl(var(--muted-foreground))",
									}}
									whileInView={{
										color: "hsl(var(--accent))",
									}}
									viewport={{
										margin: "0px 0px -50% 0px",
										once: false,
									}}
									transition={{ duration: 0.3 }}
									className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1 relative z-10 border border-border"
								>
									<Zap className="w-5 h-5" />
								</motion.div>
								<div>
									<h2 className="text-2xl font-medium text-foreground mb-3">
										Our Solution
									</h2>
									<p className="text-lg text-muted-foreground leading-relaxed">
										{caseStudy.solution}
									</p>
								</div>
							</div>
						</motion.div>

						{/* Results */}
						<motion.div variants={itemVariants}>
							<div className="flex items-start gap-4">
								<motion.div
									initial={{
										color: "hsl(var(--muted-foreground))",
									}}
									whileInView={{
										color: "hsl(var(--accent))",
									}}
									viewport={{
										margin: "0px 0px -50% 0px",
										once: false,
									}}
									transition={{ duration: 0.3 }}
									className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1 relative z-10 border border-border"
								>
									<BarChart3 className="w-5 h-5" />
								</motion.div>
								<div className="flex-1">
									<h2 className="text-2xl font-medium text-foreground mb-4">
										Results & Impact
									</h2>
									<ul className="space-y-3">
										{caseStudy.results.map(
											(result, index) => (
												<li
													key={index}
													className="flex gap-3 text-lg text-muted-foreground"
												>
													<Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
													<span>{result}</span>
												</li>
											),
										)}
									</ul>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Testimonial Section (Preserved Design) */}
			{caseStudy.testimonial && (
				<section className="py-20 px-6 bg-background">
					<div className="max-w-4xl mx-auto">
						<div className="bg-accent/5 border border-accent/10 p-8 md:p-12 rounded-2xl relative overflow-hidden">
							<FadeIn margin="-100px">
								<div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
									<MessageSquareQuote className="w-48 h-48 text-accent" />
								</div>
								<blockquote className="text-xl md:text-2xl font-medium text-foreground mb-8 relative z-10 leading-relaxed">
									"{caseStudy.testimonial}"
								</blockquote>
								<footer className="flex items-center gap-4">
									<div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-lg">
										{caseStudy.testimonialAuthor?.charAt(0)}
									</div>
									<div>
										<p className="font-bold text-foreground">
											{caseStudy.testimonialAuthor}
										</p>
										<p className="text-sm text-muted-foreground">
											{caseStudy.testimonialRole}
										</p>
									</div>
								</footer>
							</FadeIn>
						</div>
					</div>
				</section>
			)}

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
		</main>
	);
}
