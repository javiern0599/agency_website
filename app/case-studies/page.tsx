import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CloseCta, Testimonial } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { PageHero, wrap } from "@/components/site/ui";
import { successCases } from "@/lib/successCases";

export const metadata: Metadata = {
	alternates: { canonical: "/case-studies" },
	title: "Case Studies",
	description:
		"Examples of intake, billing, marketing and follow-up automation we have built for law firms.",
	keywords: [
		"Legal Automation Case Studies",
		"Law Firm Success Stories",
		"Automation ROI",
		"Legal Tech Results",
	],
	openGraph: {
		title: "Case Studies | PraxisFlow",
		description:
			"Examples of intake, billing, marketing and follow-up automation we have built for law firms.",
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
			"Examples of intake, billing, marketing and follow-up automation we have built for law firms.",
		images: ["/og-image.webp"],
	},
};

export default function CaseStudiesPage() {
	return (
		<div className="w-full">
			<PageHero
				eyebrow="Case studies"
				title="Work we have built for law firms."
				lede="Examples of automation we have built for forward-thinking boutique law firms. Clients stay anonymous unless they have agreed to be named."
			/>

			<section className="bg-white py-20 sm:py-24">
				<ol className={`${wrap} border-t border-ink`}>
					{successCases.map((c, i) => (
						<Reveal as="li" key={c.id} className="border-b border-rule">
							<Link href={`/case-studies/${c.id}`} className="group relative grid gap-4 py-10 transition-colors duration-200 lg:grid-cols-12 lg:gap-8">
								<span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left will-change-transform scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
								<div className="lg:col-span-3">
									<p className="font-serif text-[15px] text-accent-ink">No. {i + 1}</p>
									<p className="mt-2 text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{c.industry}</p>
								</div>
								<div className="lg:col-span-6">
									<h2 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-ink">{c.title}</h2>
									<p className="mt-3 line-clamp-3 text-[16px] leading-relaxed text-muted-foreground">{c.challenge}</p>
								</div>
								<div className="flex flex-col justify-between gap-4 lg:col-span-3 lg:items-end lg:text-right">
									<p className="font-serif text-[19px] leading-snug text-ink">{c.keyResult}</p>
									<span className="inline-flex items-center gap-2 text-[14px] font-medium text-ink">
										Read the case study
										<ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.75} />
									</span>
								</div>
							</Link>
						</Reveal>
					))}
				</ol>
			</section>

			<Testimonial className="border-t border-rule bg-desk" />
			<CloseCta
				title="Want similar results for your firm?"
				body="Schedule a discovery call to explore which AI employees and automations fit your practice. Free consultation, no commitment required."
			/>
		</div>
	);
}
