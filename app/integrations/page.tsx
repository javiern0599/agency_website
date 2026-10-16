"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CloseCta } from "@/components/site/Blocks";
import { HiringSteps } from "@/components/site/HiringSteps";
import { ArticleHeading, PageHero, wrap } from "@/components/site/ui";
import { allIntegrations, integrationCategories } from "@/lib/integrations-data";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

const howWeBuild = [
	{
		title: "Discovery",
		body: "We analyze your Legal Practice Management Systems and tech stack to identify integration opportunities that will save the most time for your team.",
	},
	{
		title: "Custom Build",
		body: "We configure enterprise-grade n8n workflows that prioritize data security and zero-loss transfers. Your integrations run on your n8n account for complete control.",
	},
	{
		title: "Ongoing Support",
		body: "We maintain and scale your integrations as your firm grows and your tools evolve, ensuring your automations remain reliable and effective.",
	},
];

export default function IntegrationsPage() {
	return (
		<div className="w-full">
			<PageHero
				eyebrow="1,000+ integration possibilities"
				title="Connect any tool. Automate everything."
				lede="Bridge the gap between your Practice Management System and your favorite productivity tools. Your integrations run on your n8n account for complete control and security."
			/>
			<Suspense fallback={<div className="min-h-[40rem] bg-white" />}>
				<Marketplace />
			</Suspense>

			<section className="border-t border-rule bg-desk py-24 sm:py-28">
				<div className={wrap}>
					<ArticleHeading>How we build integrations</ArticleHeading>
					<HiringSteps steps={howWeBuild} />
				</div>
			</section>

			<CloseCta title="Ready to automate your tech stack?" body="Let's talk about which integrations will have the most impact on your firm." />
		</div>
	);
}

function Marketplace() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const selected = searchParams.get("category") || "legal-essentials";
	const items = allIntegrations.filter((i) => i.category === selected).slice(0, 5);

	const select = (id: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("category", id);
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<section className="bg-white py-24 sm:py-28">
			<div className={wrap}>
				<ArticleHeading>Integration marketplace</ArticleHeading>
				<p className="mt-5 max-w-[60ch] text-[18px] leading-relaxed text-muted-foreground">
					Explore integrations by category. Each tool can be connected through our custom n8n workflows.
				</p>

				<div role="tablist" aria-label="Integration categories" className="mt-12 flex gap-x-6 gap-y-2 overflow-x-auto border-b border-rule pb-px [scrollbar-width:none] sm:flex-wrap">
					{integrationCategories.map((c) => {
						const active = c.id === selected;
						return (
							<button
								key={c.id}
								role="tab"
								aria-selected={active}
								onClick={() => select(c.id)}
								className={cn(
									"relative shrink-0 whitespace-nowrap py-3 text-[15px] transition-colors duration-200",
									active ? "text-ink" : "text-muted-foreground hover:text-ink",
								)}
							>
								{c.label}
								{active && (
									<motion.span layoutId="integration-tab" transition={{ duration: 0.25, ease }} className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
								)}
							</button>
						);
					})}
				</div>

				{/* Every category keeps the same footprint, so switching tabs never shifts the page (APIs has only two tools). */}
				<div className="mt-10 sm:min-h-[571px] lg:min-h-[381px]">
				<ul className="grid border-l border-t border-rule [&>*]:border-b [&>*]:border-r [&>*]:border-rule sm:grid-cols-2 lg:grid-cols-3">
					<AnimatePresence mode="popLayout" initial={false}>
						{items.map((it, i) => (
							<motion.li
								key={`${selected}-${it.name}`}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2, delay: i * 0.03 }}
								className="bg-white p-7"
							>
								<div className="flex items-center gap-4">
									<span className="grid h-11 w-11 shrink-0 place-items-center">
										{it.logo ? (
											<img src={it.logo} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
										) : (
											<span className="font-serif text-[24px] text-ink">{it.name[0]}</span>
										)}
									</span>
									<div>
										<h3 className="font-serif text-[20px] leading-tight text-ink">{it.name}</h3>
										<p className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{it.categoryLabel}</p>
									</div>
								</div>
								<p className="mt-4 line-clamp-3 min-h-[4.875em] text-[15px] leading-relaxed text-muted-foreground">{it.description}</p>
							</motion.li>
						))}
						<motion.li key="more" layout className="bg-ink p-7 text-white">
							<h3 className="font-serif text-[22px] leading-tight">1,000+ more connectors</h3>
							<p className="mt-3 text-[15px] leading-relaxed text-slate-300">
								If your software has an API, we can automate it. We specialize in connecting niche legal legacy systems with
								modern cloud infrastructure.
							</p>
						</motion.li>
					</AnimatePresence>
				</ul>
				</div>
			</div>
		</section>
	);
}
