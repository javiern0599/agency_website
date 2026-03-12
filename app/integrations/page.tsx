"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Search,
	Cog,
	CheckCircle,
	MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { FadeIn } from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {
	integrationCategories,
	allIntegrations,
} from "@/lib/integrations-data";

export default function IntegrationsPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-background flex items-center justify-center">
					<div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
				</div>
			}
		>
			<IntegrationsContent />
		</Suspense>
	);
}

function IntegrationsContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const selectedCategory = searchParams.get("category") || "legal-essentials";

	const filteredIntegrations = allIntegrations.filter(
		(integration) => integration.category === selectedCategory,
	);

	const handleCategoryClick = (categoryId: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("category", categoryId);
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<>
			<Navbar />
			<main>
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
								1000+ Integration Possibilities
							</div>

							<h1 className="text-4xl md:text-6xl font-medium text-foreground tracking-tight mb-6">
								Connect any tool{" "}
								<br className="hidden md:block" />
								<span className="text-accent">
									Automate everything
								</span>
							</h1>

							<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
								Bridge the gap between your Practice Management
								System and your favorite productivity tools.
								Your integrations run on your n8n account for
								complete control and security.
							</p>
						</FadeIn>
					</div>
				</section>

				{/* Master Integrations Hub - Category Filtering */}
				<section className="px-6 max-w-7xl mx-auto pt-12 mb-24">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="mb-16"
					>
						<h2 className="text-3xl md:text-4xl font-medium text-[#0f172a] tracking-tight mb-4">
							Integration Marketplace
						</h2>
						<p className="text-slate-500 max-w-xl text-lg">
							{selectedCategory === "common"
								? "Strategic connections for the modern practice. Every integration is custom-built for reliability and security."
								: "Explore integrations by category. Each tool can be connected through our custom n8n workflows."}
						</p>
					</motion.div>

					{/* Category Filter Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
						{integrationCategories.map((category, index) => {
							const isSelected = selectedCategory === category.id;
							return (
								<motion.button
									key={category.id}
									onClick={() =>
										handleCategoryClick(category.id)
									}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.05,
									}}
									viewport={{ once: true }}
									className={`p-6 rounded-2xl border transition-shadow transition-colors duration-300 text-center group cursor-pointer ${
										isSelected
											? "border-teal-500 bg-teal-50 shadow-md"
											: "border-slate-200 bg-white hover:border-teal-500/30 hover:shadow-md"
									}`}
								>
									<p
										className={`text-sm font-medium ${isSelected ? "text-teal-700" : "text-[#0f172a]"}`}
									>
										{category.label}
									</p>
								</motion.button>
							);
						})}
					</div>

					{/* Filtered Integrations Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredIntegrations
							.slice(0, 5)
							.map((integration, index) => (
								<motion.div
									key={`${integration.name}-${index}`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									className="group p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow transition-colors duration-300 hover:border-teal-500/30"
								>
									<div
										className={`w-12 h-12 rounded-lg ${integration.color} flex items-center justify-center mb-4 overflow-hidden`}
									>
										{integration.logo ? (
											<div className="p-2.5 w-full h-full flex items-center justify-center">
												<Image
													src={integration.logo}
													alt={integration.name}
													width={32}
													height={32}
													className="w-full h-full object-contain"
												/>
											</div>
										) : (
											<span className="text-2xl font-bold">
												{integration.name[0]}
											</span>
										)}
									</div>
									<h3 className="text-xl font-medium text-[#0f172a] mb-2">
										{integration.name}
									</h3>
									<p className="text-sm text-slate-500 mb-4 leading-relaxed">
										{integration.description}
									</p>
									<span className="inline-block text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
										{integration.categoryLabel}
									</span>
								</motion.div>
							))}

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 5 * 0.1 }}
							className="group p-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm hover:shadow-md transition-shadow transition-colors duration-300 hover:border-teal-500/30 flex flex-col justify-between"
						>
							<div>
								<div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center mb-4">
									<MoreHorizontal className="w-6 h-6 text-slate-500" />
								</div>
								<h3 className="text-xl font-medium text-[#0f172a] mb-2">
									+1,000 Enterprise Connectors
								</h3>
								<p className="text-sm text-slate-600 mb-4 leading-relaxed">
									If your software has an API, we can automate
									it. We specialize in connecting niche legal
									legacy systems with modern cloud
									infrastructure.
								</p>
							</div>
						</motion.div>
					</div>
				</section>

				{/* How It Works */}
				<section className="px-6 max-w-7xl mx-auto mb-24">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="bg-[#0f172a] text-white rounded-2xl p-12 md:p-16"
					>
						<h2 className="text-3xl md:text-4xl font-medium mb-12 text-center">
							How We Build Integrations
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="space-y-4">
								<div className="w-12 h-12 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
									<Search className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-medium">
									Discovery
								</h3>
								<p className="text-slate-300 leading-relaxed">
									We analyze your Legal Practice Management
									Systems and tech stack to identify
									integration opportunities that will save the
									most time for your team.
								</p>
							</div>

							<div className="space-y-4">
								<div className="w-12 h-12 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
									<Cog className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-medium">
									Custom Build
								</h3>
								<p className="text-slate-300 leading-relaxed">
									We configure enterprise-grade n8n workflows
									that prioritize data security and zero-loss
									transfers. Your integrations run on your n8n
									account for complete control.
								</p>
							</div>

							<div className="space-y-4">
								<div className="w-12 h-12 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
									<CheckCircle className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-medium">
									Ongoing Support
								</h3>
								<p className="text-slate-300 leading-relaxed">
									We maintain and scale your integrations as
									your firm grows and your tools evolve,
									ensuring your automations remain reliable
									and effective.
								</p>
							</div>
						</div>
					</motion.div>
				</section>

				{/* CTA */}
				<section className="px-6 max-w-7xl mx-auto text-center mb-24">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl md:text-4xl font-medium text-[#0f172a] mb-6">
							Ready to automate your tech stack?
						</h2>
						<p className="text-slate-500 max-w-xl mx-auto mb-8 text-lg">
							Let's talk about which integrations will have the
							most impact on your firm.
						</p>
						<Link
							href="https://calendar.app.google/AtTiu5d3kd2EwumQ8"
							target="_blank"
							rel="noopener noreferrer"
							className="w-full sm:w-auto inline-block"
						>
							<ShimmerButton
								className="w-full px-8 py-3.5 rounded-2xl font-medium"
								background="hsl(var(--primary))"
								shimmerColor="#0d9488"
								shimmerDuration="2s"
								shimmerSize="0.30em"
							>
								<span className="flex items-center justify-center gap-2 text-primary-foreground">
									Schedule a Free Discovery Call
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</span>
							</ShimmerButton>
						</Link>
					</motion.div>
				</section>
			</main>
		</>
	);
}
