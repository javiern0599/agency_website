import type { Metadata } from "next";
import { RelatedReading, posts } from "@/components/site/RelatedReading";
import { HeroSheet } from "@/components/site/HeroSheet";
import { Transcript } from "@/components/site/Transcript";
import { Limits } from "@/components/site/Limits";
import { CaseBrief } from "@/components/site/CaseBrief";
import { HiringSteps } from "@/components/site/HiringSteps";
import { FaqList } from "@/components/site/Faq";
import { CloseCta } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { ArrowButton, ArticleHeading, JsonLdScript, PageHero, TextLink, faqJsonLd, wrap } from "@/components/site/ui";
import { CALENDAR_URL, hero, roles, type Faq } from "@/lib/site-content";

// --- On-page SEO -----------------------------------------------------------
// Primary keyword: "law firm intake automation" (Brandgrowth report's intake page).
// Secondary: "client intake automation for law firms", "law firm client intake
// automation", "AI legal intake". Ahrefs (Oct 2026): all <100/month, intent matches.
// Avoids plain "AI intake", which Harvey and Legora now use for in-house request routing.
const TITLE = "Law Firm Intake Automation";
const DESCRIPTION =
	"Law firm intake automation with an AI Intake Coordinator that answers every new inquiry on WhatsApp and website chat, day and night, in the language each client writes in. It qualifies leads by your rules, books consultations and records each lead in your CRM.";

export const metadata: Metadata = {
	alternates: { canonical: "/law-firm-intake-automation" },
	title: TITLE,
	description: DESCRIPTION,
	keywords: ["law firm intake automation", "client intake automation for law firms", "law firm client intake automation", "legal client intake automation", "AI legal intake"],
	openGraph: {
		title: `${TITLE} | PraxisFlow`,
		description: DESCRIPTION,
		url: "https://www.praxisflow.com/law-firm-intake-automation",
		type: "website",
		images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: `${TITLE} | PraxisFlow` }],
	},
	twitter: { card: "summary_large_image", title: `${TITLE} | PraxisFlow`, description: DESCRIPTION, images: ["/og-image.webp"] },
};

const intake = roles[0];

const steps = [
	{ h: "Answers", b: "Every new inquiry on WhatsApp and your website chat, at any hour, in the language each client writes in." },
	{ h: "Qualifies", b: "Asks the questions your firm would ask and applies your own rules to the answers." },
	{ h: "Books", b: "Offers open times from your calendar, books the consultation, then sends the confirmation and reminders." },
	{ h: "Records", b: "Creates the lead in your CRM with the facts collected and the full conversation attached." },
	{ h: "Reports", b: "Sends the owner a summary of the day's inquiries, including anything it handed to your staff." },
];

const faqs: Faq[] = [
	{
		question: "What is law firm intake automation?",
		answer: "Law firm intake automation uses an AI agent to answer a law firm's new inquiries, ask the qualifying questions, book the consultation and record the lead in the firm's CRM, so no inquiry waits for office hours.",
	},
	{
		question: "Which channels does the Intake Coordinator answer?",
		answer: "WhatsApp and your website chat. For phone calls, the Receptionist answers your line and can work alongside the Intake Coordinator.",
		linkText: "Receptionist",
		linkHref: "/ai-receptionist-for-law-firms",
	},
	{
		question: "Which languages does it speak?",
		answer: "It is multilingual: it replies in the language each client writes in, so a firm with Spanish- or Portuguese-speaking clients is covered from day one.",
	},
	{
		question: "Will it tell a prospective client whether they have a case?",
		answer: "No. It never gives legal advice, quotes fees you haven't approved or promises outcomes. When someone asks, it explains that only an attorney can assess that and offers a consultation instead.",
	},
	{
		question: "When does a person take over?",
		answer: "When someone asks for a person, when the agent isn't sure, and on sensitive topics such as complaints, fee disputes and emergencies. It hands the conversation to your staff and stops replying.",
	},
	{
		question: "Does it work with our CRM and calendar?",
		answer: "Yes. It connects to the CRM and calendar your firm already uses. If a tool has no ready-made connection, we build one as part of the setup.",
	},
];

export default function AiLegalIntakePage() {
	return (
		<div className="w-full">
			<JsonLdScript data={faqJsonLd(faqs)} />
			<PageHero
				eyebrow="The Intake Coordinator"
				title="Law firm intake automation that answers every inquiry, day and night."
				lede={intake.summary + " It qualifies each lead by your rules, books the consultation and records everything in your CRM."}
				aside={<HeroSheet seal />}
			>
				<ArrowButton href={CALENDAR_URL}>{hero.primary}</ArrowButton>
				<ArrowButton href="#intake" variant="plain">
					See an intake
				</ArrowButton>
			</PageHero>

			<section className="bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>From first message to booked consultation</ArticleHeading>
					</div>
					<ol className="border-t border-ink lg:col-span-8">
						{steps.map((s, i) => (
							<Reveal as="li" key={s.h} delay={i * 0.05} className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[3rem_10rem_1fr] sm:gap-4">
								<span className="font-sans text-[13px] font-medium tabular-nums text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
								<h3 className="font-serif text-[22px] leading-tight text-ink">{s.h}</h3>
								<p className="text-[17px] leading-relaxed text-muted-foreground">{s.b}</p>
							</Reveal>
						))}
					</ol>
				</div>
			</section>

			<Transcript id="intake" n="" title="What an intake looks like" variant="intake" />

			<section className="bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>Its own terms</ArticleHeading>
					</div>
					<dl className="grid gap-8 font-serif text-[19px] leading-[1.5] text-ink sm:grid-cols-2 lg:col-span-8">
						<div className="border-t border-ink pt-5">
							<dt className="italic text-accent-ink">Shall not</dt>
							<dd className="mt-2">{intake.never}</dd>
						</div>
						<div className="border-t border-ink pt-5">
							<dt className="italic text-accent-ink">Hand-off</dt>
							<dd className="mt-2">{intake.handsOff}</dd>
						</div>
						<div className="border-t border-ink pt-5 sm:col-span-2">
							<dt className="italic text-accent-ink">Works in</dt>
							<dd className="mt-2 font-sans text-[16px] text-muted-foreground">{intake.worksIn}</dd>
						</div>
					</dl>
				</div>
			</section>

			<Limits tinted />
			<CaseBrief />

			<section className="border-t border-rule bg-desk py-24 sm:py-28">
				<div className={wrap}>
					<ArticleHeading>How an engagement works</ArticleHeading>
					<HiringSteps />
				</div>
			</section>

			<section className="border-t border-rule bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>Questions about law firm intake automation</ArticleHeading>
						<TextLink href="/ai-agents-for-law-firms" className="mt-8">
							Meet the rest of the staff
						</TextLink>
					</div>
					<div className="lg:col-span-8">
						<FaqList faqs={faqs} />
					</div>
				</div>
			</section>

			<RelatedReading items={[posts.fiveAutomations, posts.immigrationAgility]} />

			<CloseCta title="Start with an Intake Coordinator." body="One call to learn your intake rules and your tools. No commitment." />
		</div>
	);
}
