import React from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { ArrowButton, Eyebrow, wrap } from "@/components/site/ui";
import { CALENDAR_URL } from "@/lib/site-content";
import { EngravedBand } from "@/components/site/Engraving";

export const metadata: Metadata = {
	alternates: { canonical: "/contact" },
	title: "Contact",
	description:
		"Start your firm's transformation. Schedule a free workflow audit to identify your biggest automation opportunities.",
	keywords: [
		"Contact PraxisFlow",
		"Legal Automation Consultation",
		"Workflow Audit",
		"Law Firm Automation Help",
	],
	openGraph: {
		title: "Contact Us | PraxisFlow",
		description:
			"Start your firm's transformation. Schedule a free workflow audit to identify your biggest automation opportunities.",
		url: "https://www.praxisflow.com/contact",
		type: "website",
		images: [
			{
				url: "/og-ai-employees.jpg",
				width: 1200,
				height: 630,
				alt: "Contact PraxisFlow",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Contact Us | PraxisFlow",
		description:
			"Start your firm's transformation. Schedule a free workflow audit to identify your biggest automation opportunities.",
		images: ["/og-ai-employees.jpg"],
	},
};

export default function ContactPage() {
	return (
		<div className="relative min-h-[calc(100dvh-4rem)] w-full overflow-hidden bg-desk">
			<EngravedBand className="absolute inset-x-0 bottom-0 h-14 lg:h-24" />
			<div className={`${wrap} relative grid gap-12 pb-28 pt-16 sm:pt-20 lg:grid-cols-12 lg:pb-36`}>
				<div className="lg:col-span-5">
					<Eyebrow className="text-accent-ink">Contact</Eyebrow>
					<h1 className="mt-4 font-serif text-[clamp(2.6rem,5.5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-ink [text-wrap:balance]">
						Start your transformation
					</h1>
					<p className="mt-6 max-w-[40ch] text-[19px] leading-relaxed text-muted-foreground">
						Schedule a free workflow audit to identify your firm&apos;s biggest automation opportunities.
					</p>
					<div className="mt-10 space-y-3 border-t border-rule pt-6 text-[16px] text-muted-foreground">
						<p>
							Prefer to email us directly?{" "}
							<a href="mailto:contact@praxisflow.com" className="text-ink underline decoration-accent underline-offset-4">
								contact@praxisflow.com
							</a>
						</p>
						<p>
							Or call us at{" "}
							<a href="tel:+16173156878" className="text-ink underline decoration-accent underline-offset-4 tabular-nums">
								+1 (617) 315-6878
							</a>
						</p>
					</div>
					<div className="mt-8">
						<ArrowButton href={CALENDAR_URL} variant="plain">
							Or book a call directly
						</ArrowButton>
					</div>
				</div>
				<div className="lg:col-span-6 lg:col-start-7">
					<div className="bg-white px-6 py-8 text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.06),0_24px_48px_-24px_rgba(15,23,42,0.2)] sm:px-10 sm:py-10">
						<ContactForm />
					</div>
				</div>
			</div>
		</div>
	);
}
