import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowRight,
	Users,
	FileText,
	Receipt,
	MessageSquare,
	Megaphone,
	BarChart3,
	Lock,
	Plug,
	Settings,
	Search,
	Wrench,
	Rocket,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import LegalAutomationHero from "@/components/sections/LawFirmAutomationHero";
import LegalAutomationFAQ from "@/components/sections/LawFirmAutomationFAQ";
import { AnimatedConnectingLine } from "@/components/ui/animated-connecting-line";

// --- On-page SEO -----------------------------------------------------------
// Primary keyword: "law firm automation" (report's top low-difficulty service
// keyword). "legal automation" / "legal workflow automation" are secondary.
// The <title>, description, canonical, H1, and section H2s all reinforce it.
export const metadata: Metadata = {
	alternates: { canonical: "/law-firm-automation" },
	title: "Law Firm Automation",
	description:
		"Custom law firm automation that connects the tools your firm already uses. Automate client intake, billing, document generation, and follow-up — privately, securely, and without adding headcount.",
	keywords: [
		"law firm automation",
		"law firm automation services",
		"law firm workflow automation",
		"automate your law firm",
		"law office automation",
		"legal automation",
	],
	openGraph: {
		title: "Law Firm Automation | PraxisFlow",
		description:
			"Custom law firm automation that connects the tools your firm already uses. Automate intake, billing, documents, and follow-up — privately and securely.",
		url: "https://www.praxisflow.com/law-firm-automation",
		type: "website",
		images: [
			{
				url: "/og-image.webp",
				width: 1200,
				height: 630,
				alt: "Law Firm Automation | PraxisFlow",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Law Firm Automation | PraxisFlow",
		description:
			"Custom law firm automation that connects the tools your firm already uses. Automate intake, billing, documents, and follow-up.",
		images: ["/og-image.webp"],
	},
};

const CALENDAR_URL = "https://calendar.app.google/AtTiu5d3kd2EwumQ8";

const automations = [
	{
		icon: Users,
		title: "Client Intake",
		description:
			"Capture, qualify, and route new leads the moment they arrive — no manual data entry, no missed inquiries.",
	},
	{
		icon: FileText,
		title: "Document Generation",
		description:
			"Auto-draft engagement letters, agreements, and filings from your templates and matter data.",
	},
	{
		icon: Receipt,
		title: "Billing & Invoicing",
		description:
			"Turn tracked time into accurate invoices and payment reminders without the month-end scramble.",
	},
	{
		icon: MessageSquare,
		title: "Client Communication",
		description:
			"Send timely updates, reminders, and follow-ups automatically so nothing slips through the cracks.",
	},
	{
		icon: Megaphone,
		title: "Marketing & Follow-up",
		description:
			"Nurture prospects and past clients with sequences that run on their own, tied to your CRM.",
	},
	{
		icon: BarChart3,
		title: "Reporting",
		description:
			"Pull matter, revenue, and pipeline data into clean dashboards updated without spreadsheets.",
	},
];

const steps = [
	{
		number: "01",
		icon: Search,
		title: "Map your workflow",
		description:
			"We start with a free discovery call to find where your firm loses the most time to manual work.",
	},
	{
		number: "02",
		icon: Wrench,
		title: "Build & connect",
		description:
			"We build custom automations and connect them to the tools you already use — no rip-and-replace.",
	},
	{
		number: "03",
		icon: Rocket,
		title: "Launch & support",
		description:
			"Your automations go live in a private environment, monitored and supported so they keep running.",
	},
];

const differentiators = [
	{
		icon: Lock,
		title: "Private & confidential",
		description:
			"Every firm runs in its own isolated environment — client data never mingles with other firms'.",
		href: "/security",
		linkLabel: "See how we protect your data",
	},
	{
		icon: Plug,
		title: "Works with your stack",
		description:
			"We connect to Clio, DocuSign, Airtable, Outlook, and 1,000+ other tools your firm already relies on.",
		href: "/integrations",
		linkLabel: "Explore integrations",
	},
	{
		icon: Settings,
		title: "Tailored to your firm",
		description:
			"No off-the-shelf software. Automations are built around how your practice actually operates.",
		href: "/case-studies",
		linkLabel: "See real results",
	},
];

const faqs = [
	{
		question: "What is law firm automation?",
		answer: "Law firm automation (also called legal automation) is the use of software to handle repetitive, rules-based tasks in a law firm — such as client intake, document generation, billing, and follow-up — so your team spends less time on admin and more time on billable work.",
	},
	{
		question: "Do I need to replace the tools my firm already uses?",
		answer: "No. We connect to the tools you already rely on — practice management systems like Clio, e-signature tools like DocuSign, email, and more — and automate the work that happens between them. There is no new software for your team to learn.",
	},
	{
		question: "Is my client data secure?",
		answer: "Yes. Every firm gets a private, isolated environment protected by encryption, strict access controls, and regular backups. Your data is never shared with or mixed into other firms' systems.",
	},
	{
		question: "How long does it take to get started?",
		answer: "It starts with a free discovery call to map your workflows. Most first automations are built and launched in a matter of weeks, not months, depending on scope.",
	},
	{
		question: "How much does law firm automation cost?",
		answer: "We use transparent, fixed pricing — you pay once to build your automations, and ongoing support is optional. There is no hourly billing and no long-term contract required. See our pricing page for details.",
		linkText: "pricing page",
		linkHref: "/pricing",
	},
];

// FAQPage structured data — makes the Q&A eligible for rich results in Google.
const faqJsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map((f) => ({
		"@type": "Question",
		name: f.question,
		acceptedAnswer: {
			"@type": "Answer",
			text: f.answer,
		},
	})),
};

export default function LegalAutomationPage() {
	return (
		<div className="w-full bg-background">
			{/* FAQ structured data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>

			{/* Hero — split layout with animated "connect your stack" diagram */}
			<LegalAutomationHero />

			{/* Intro / keyword-rich context */}
			<section className="px-6 max-w-3xl mx-auto py-12">
				<FadeIn>
					<p className="text-lg text-muted-foreground leading-relaxed text-center">
						Law firms lose countless hours every week to manual,
						repetitive tasks. Legal workflow automation removes that
						drag by handling the busywork automatically — accurately
						and around the clock. Instead of forcing your team onto
						new software, we automate the work that happens between
						the tools you already trust, tailored to how your
						practice runs.
					</p>
				</FadeIn>
			</section>

			{/* What you can automate */}
			<section className="px-6 py-20 bg-secondary/40">
				<div className="max-w-7xl mx-auto">
					<FadeIn>
						<div className="text-center mb-14">
							<h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
								What you can automate
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto">
								From the first client touch to the final
								invoice, here's where firms reclaim the most
								time.
							</p>
						</div>
					</FadeIn>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{automations.map((item, index) => {
							const Icon = item.icon;
							return (
								<FadeIn key={item.title} delay={index * 0.05}>
									<div className="group relative bg-card border border-border p-8 rounded-2xl h-full overflow-hidden hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-300">
										<div className="absolute top-0 right-0 p-6 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
											<Icon className="w-24 h-24 text-accent" />
										</div>
										<div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 text-accent">
											<Icon className="w-6 h-6" />
										</div>
										<h3 className="text-lg font-medium text-foreground mb-2 relative z-10">
											{item.title}
										</h3>
										<p className="text-muted-foreground leading-relaxed relative z-10">
											{item.description}
										</p>
									</div>
								</FadeIn>
							);
						})}
					</div>
				</div>
			</section>

			{/* How it works — dark centerpiece (this is a real sequence) */}
			<section className="relative py-28 px-6 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white overflow-hidden">
				<div className="absolute inset-0 opacity-30 pointer-events-none">
					<div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-[150px]"></div>
					<div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]"></div>
				</div>

				<div className="max-w-6xl mx-auto relative z-10">
					<FadeIn>
						<div className="text-center mb-16">
							<h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 text-white">
								How law firm automation works with PraxisFlow
							</h2>
							<p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
								Three steps from your first call to automations
								running quietly in the background.
							</p>
						</div>
					</FadeIn>

					<div className="relative">
						{/* Horizontal connector (tablet + desktop, 3-col) — draws in from the left */}
						<AnimatedConnectingLine
							className="hidden md:block absolute top-[68px] left-[16%] right-[16%] h-[2px] origin-left"
							style={{
								background:
									"linear-gradient(to right, rgba(20,184,166,0.5) 0%, rgba(59,130,246,0.5) 50%, rgba(20,184,166,0.5) 100%)",
							}}
						/>

						<div className="grid md:grid-cols-3 gap-8">
							{steps.map((step, index) => {
								const Icon = step.icon;
								const isLast = index === steps.length - 1;
								return (
									<FadeIn
										key={step.number}
										delay={index * 0.1}
										className="relative"
									>
										<div className="group relative bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 h-full overflow-hidden">
											<div className="absolute top-4 right-6 text-6xl font-semibold text-white/[0.05] group-hover:text-white/[0.08] transition-colors select-none">
												{step.number}
											</div>
											<div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 text-teal-400 relative z-10">
												<Icon className="w-6 h-6" />
											</div>
											<h3 className="text-xl font-semibold mb-3 text-white relative z-10">
												{step.title}
											</h3>
											<p className="text-sm text-slate-400 leading-relaxed relative z-10">
												{step.description}
											</p>
										</div>

										{/* Vertical connector between stacked cards (mobile only) */}
										{!isLast && (
											<AnimatedConnectingLine
												axis="y"
												delay={0.2 + index * 0.1}
												className="md:hidden absolute left-1/2 -bottom-8 w-[2px] h-8 origin-top -translate-x-1/2"
												style={{
													background:
														"linear-gradient(to bottom, rgba(20,184,166,0.5), rgba(59,130,246,0.5))",
												}}
											/>
										)}
									</FadeIn>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Why firms choose us */}
			<section className="px-6 py-20">
				<div className="max-w-7xl mx-auto">
					<FadeIn>
						<div className="text-center mb-14">
							<h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
								Why law firms choose PraxisFlow
							</h2>
						</div>
					</FadeIn>

					<div className="grid md:grid-cols-3 gap-6">
						{differentiators.map((item, index) => {
							const Icon = item.icon;
							return (
								<FadeIn key={item.title} delay={index * 0.1}>
									<div className="group relative bg-card border border-border p-8 rounded-2xl h-full flex flex-col overflow-hidden hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-300">
										<div className="absolute top-0 right-0 p-6 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity">
											<Icon className="w-24 h-24 text-accent" />
										</div>
										<div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 text-accent">
											<Icon className="w-6 h-6" />
										</div>
										<h3 className="text-lg font-medium text-foreground mb-2 relative z-10">
											{item.title}
										</h3>
										<p className="text-muted-foreground leading-relaxed mb-5 flex-1 relative z-10">
											{item.description}
										</p>
										<Link
											href={item.href}
											className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all relative z-10"
										>
											{item.linkLabel}
											<ArrowRight className="w-4 h-4" />
										</Link>
									</div>
								</FadeIn>
							);
						})}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="px-6 py-20 bg-secondary/40">
				<div className="max-w-3xl mx-auto">
					<FadeIn>
						<h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-10 text-center">
							Law firm automation FAQ
						</h2>
					</FadeIn>

					<LegalAutomationFAQ faqs={faqs} />
				</div>
			</section>

			{/* Final CTA */}
			<section className="px-6 py-24">
				<div className="max-w-5xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
					<DotPattern
						width={20}
						height={20}
						cx={1}
						cy={1}
						cr={1}
						className={cn(
							"[mask-image:radial-gradient(520px_circle_at_center,white,transparent)]",
							"text-primary-foreground/15",
						)}
					/>
					<div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[110px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>

					<div className="relative z-10">
						<FadeIn>
							<h2 className="text-3xl md:text-5xl font-medium text-primary-foreground tracking-tight mb-6">
								Ready to automate your firm's busywork?
							</h2>
							<p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
								Book a free discovery call and we'll map exactly
								where your firm can reclaim hours with law firm
								automation.
							</p>
						</FadeIn>
						<FadeIn delay={0.15}>
							<Link
								href={CALENDAR_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block"
							>
								<ShimmerButton
									className="px-8 py-3.5 rounded-2xl font-medium"
									background="hsl(var(--background))"
									shimmerColor="#0d9488"
									shimmerDuration="2s"
									shimmerSize="0.30em"
								>
									<span className="flex items-center justify-center gap-2 text-foreground">
										Book a Free Discovery Call
										<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</span>
								</ShimmerButton>
							</Link>
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
