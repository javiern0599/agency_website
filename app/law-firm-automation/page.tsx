import type { Metadata } from "next";
import { RelatedReading, posts } from "@/components/site/RelatedReading";
import Link from "next/link";
import { HiringSteps } from "@/components/site/HiringSteps";
import { FaqList } from "@/components/site/Faq";
import { CloseCta } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { Monogram } from "@/components/site/EngagementSheet";
import { ArrowButton, ArticleHeading, JsonLdScript, PageHero, TextLink, faqJsonLd, wrap } from "@/components/site/ui";
import { CALENDAR_URL, pricing, roles, type Faq } from "@/lib/site-content";

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
				url: "/og-ai-employees.jpg",
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
		images: ["/og-ai-employees.jpg"],
	},
};

const automations = [
	{
		title: "Client Intake",
		description:
			"Capture, qualify, and route new leads the moment they arrive — no manual data entry, no missed inquiries.",
	},
	{
		title: "Document Generation",
		description:
			"Auto-draft engagement letters, agreements, and filings from your templates and matter data.",
	},
	{
		title: "Billing & Invoicing",
		description:
			"Turn tracked time into accurate invoices and payment reminders without the month-end scramble.",
	},
	{
		title: "Client Communication",
		description:
			"Send timely updates, reminders, and follow-ups automatically so nothing slips through the cracks.",
	},
	{
		title: "Marketing & Follow-up",
		description:
			"Nurture prospects and past clients with sequences that run on their own, tied to your CRM.",
	},
	{
		title: "Reporting",
		description:
			"Pull matter, revenue, and pipeline data into clean dashboards updated without spreadsheets.",
	},
];

const differentiators = [
	{
		title: "Private & confidential",
		description:
			"Every firm runs in its own isolated environment — client data never mingles with other firms'.",
		href: "/security",
		linkLabel: "See how we protect your data",
	},
	{
		title: "Works with your stack",
		description:
			"We connect to Clio, DocuSign, Airtable, Outlook, and 1,000+ other tools your firm already relies on.",
		href: "/integrations",
		linkLabel: "Explore integrations",
	},
	{
		title: "Tailored to your firm",
		description:
			"No off-the-shelf software. Automations are built around how your practice actually operates.",
		href: "/case-studies",
		linkLabel: "See real results",
	},
];

const steps = [
	{
		title: "Map your workflow",
		body: "We start with a free discovery call to find where your firm loses the most time to manual work.",
	},
	{
		title: "Build & connect",
		body: "We build custom automations and connect them to the tools you already use — no rip-and-replace.",
	},
	{
		title: "Launch & support",
		body: "Your automations go live in a private environment, monitored and supported so they keep running.",
	},
];

const stack = [
	{ name: "Clio", logo: "/Vector.svg" },
	{ name: "DocuSign", logo: "/docusign-icon.png" },
	{ name: "Microsoft Outlook", logo: "/microsoft-outlook.svg" },
	{ name: "Slack", logo: "/slack-integration.svg" },
	{ name: "Airtable", logo: "/airtable.svg" },
	{ name: "Google Workspace", logo: "/google-workspace-integration.svg" },
];

const faqs: Faq[] = [
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
		answer: `We use transparent, fixed pricing — projects start at ${pricing.automation.build}, you pay once to build your automations, and ongoing support is optional from ${pricing.automation.support} a month. There is no hourly billing and no long-term contract required. See our pricing page for details.`,
		linkText: "pricing page",
		linkHref: "/pricing",
	},
];

function StackLedger() {
	return (
		<div className="bg-white px-7 py-8 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_24px_48px_-24px_rgba(15,23,42,0.25)] sm:px-9">
			<p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Your firm, connected</p>
			<ul className="mt-5 border-t border-ink">
				{stack.map((t, i) => (
					<Reveal as="li" key={t.name} delay={0.1 + i * 0.06} className="flex items-center gap-4 border-b border-rule py-3.5">
						<span className="grid h-9 w-9 shrink-0 place-items-center">
							<img src={t.logo} alt="" width={26} height={26} className="h-[26px] w-[26px] object-contain" />
						</span>
						<span className="font-serif text-[18px] text-ink">{t.name}</span>
					</Reveal>
				))}
			</ul>
			<p className="mt-4 text-[13px] text-muted-foreground">And the rest of your stack, through its API.</p>
		</div>
	);
}

export default function LegalAutomationPage() {
	return (
		<div className="w-full">
			<JsonLdScript data={faqJsonLd(faqs)} />
			<PageHero
				eyebrow="Done-for-you automation"
				title="Law Firm Automation"
				lede="We build custom law firm automation that connects the tools your firm already uses — so intake, billing, documents, and follow-up run themselves. More billable hours, fewer errors, no new headcount."
				aside={<StackLedger />}
			>
				<ArrowButton href={CALENDAR_URL}>Book a free discovery call</ArrowButton>
				<ArrowButton href="#what" variant="plain">
					What you can automate
				</ArrowButton>
			</PageHero>

			<section className="bg-white py-20 sm:py-24">
				<div className={wrap}>
					<p className="max-w-[62ch] font-serif text-[clamp(1.35rem,2.2vw,1.65rem)] leading-[1.5] text-ink">
						Law firms lose countless hours every week to manual, repetitive tasks. Legal workflow automation removes that
						drag by handling the busywork automatically — accurately and around the clock. Instead of forcing your team
						onto new software, we automate the work that happens between the tools you already trust, tailored to how
						your practice runs.
					</p>
				</div>
			</section>

			<section id="what" className="border-t border-rule bg-desk py-24 sm:py-28">
				<div className={wrap}>
					<ArticleHeading>What you can automate</ArticleHeading>
					<p className="mt-5 max-w-[56ch] text-[18px] leading-relaxed text-muted-foreground">
						From the first client touch to the final invoice, here&apos;s where firms reclaim the most time.
					</p>
					<ul className="mt-14 grid border-l border-t border-rule [&>*]:border-b [&>*]:border-r [&>*]:border-rule sm:grid-cols-2 lg:grid-cols-3">
						{automations.map((a, i) => (
							<Reveal as="li" key={a.title} delay={(i % 3) * 0.05} className="bg-white p-7 sm:p-8">
								<h3 className="font-serif text-[23px] text-ink">{a.title}</h3>
								<p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{a.description}</p>
							</Reveal>
						))}
					</ul>
				</div>
			</section>

			<section className="border-t border-rule bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-5">
						<ArticleHeading>Or engage an AI employee</ArticleHeading>
						<p className="mt-5 max-w-[44ch] text-[18px] leading-relaxed text-muted-foreground">
							Some of this work is a whole role. Our AI employees take it on with written duties, written limits and a
							hand-off to your people.
						</p>
						<TextLink href="/ai-agents-for-law-firms" className="mt-8">
							Meet the staff
						</TextLink>
					</div>
					<ul className="grid self-start border-l border-t border-rule [&>*]:border-b [&>*]:border-r [&>*]:border-rule sm:grid-cols-2 lg:col-span-7">
						{roles.map((r) => (
							<li key={r.slug}>
								<Link
									href={r.href ?? `/ai-agents-for-law-firms#${r.slug}`}
									className="group relative flex h-full items-center gap-4 bg-white px-5 py-4 transition-colors duration-200 hover:bg-slate-50"
								>
									<Monogram initials={r.initials} className="h-10 w-10 text-[14px]" />
									<span className="font-serif text-[18px] text-ink">{r.title}</span>
									<span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left will-change-transform scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
								</Link>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="border-t border-rule bg-desk py-24 sm:py-28">
				<div className={wrap}>
					<ArticleHeading>How law firm automation works with PraxisFlow</ArticleHeading>
					<p className="mt-5 max-w-[56ch] text-[18px] leading-relaxed text-muted-foreground">
						Three steps from your first call to automations running quietly in the background.
					</p>
					<HiringSteps steps={steps} />
				</div>
			</section>

			<section className="bg-ink py-24 text-white sm:py-28">
				<div className={wrap}>
					<h2 className="font-serif text-[clamp(2.1rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.015em]">Why law firms choose PraxisFlow</h2>
					<ul className="mt-14 grid gap-12 md:grid-cols-3">
						{differentiators.map((d, i) => (
							<Reveal as="li" key={d.title} delay={i * 0.06} className="border-t border-white/25 pt-6">
								<h3 className="font-serif text-[24px]">{d.title}</h3>
								<p className="mt-3 text-[16px] leading-relaxed text-slate-300">{d.description}</p>
								<Link href={d.href} className="group mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium underline decoration-white/30 underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-accent">
									{d.linkLabel}
									<span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
								</Link>
							</Reveal>
						))}
					</ul>
				</div>
			</section>

			<section className="bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>Law firm automation FAQ</ArticleHeading>
					</div>
					<div className="lg:col-span-8">
						<FaqList faqs={faqs} />
					</div>
				</div>
			</section>

			<RelatedReading items={[posts.fiveAutomations, posts.hiddenCost, posts.immigrationOperations]} />

			<CloseCta
				title="Ready to automate your firm's busywork?"
				body="Book a free discovery call and we'll map exactly where your firm can reclaim hours with law firm automation."
			/>
		</div>
	);
}
