import type { Metadata } from "next";
import { RelatedReading, posts } from "@/components/site/RelatedReading";
import { EngagementSheet } from "@/components/site/EngagementSheet";
import { Limits } from "@/components/site/Limits";
import { HiringSteps } from "@/components/site/HiringSteps";
import { FaqList } from "@/components/site/Faq";
import { CloseCta } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { ArrowButton, ArticleHeading, JsonLdScript, PageHero, TextLink, faqJsonLd, wrap } from "@/components/site/ui";
import { CALENDAR_URL, hero, roles, type Faq } from "@/lib/site-content";

// --- On-page SEO -----------------------------------------------------------
// Working primary keyword: "client onboarding for law firms" / "law firm client
// onboarding automation". Volumes still to be checked in Keyword Planner.
// Generic tool words only: no product names, so no firm feels left out.
const TITLE = "AI Client Onboarding for Law Firms";
const DESCRIPTION =
	"AI client onboarding for law firms: the moment a client signs, the Onboarding Specialist creates the client record, billing and matter folder, generates engagement documents from your templates and sends a welcome email. About 40 seconds per client.";

export const metadata: Metadata = {
	alternates: { canonical: "/ai-client-onboarding-for-law-firms" },
	title: TITLE,
	description: DESCRIPTION,
	keywords: [
		"client onboarding for law firms",
		"law firm client onboarding automation",
		"AI client onboarding",
		"automate new client intake law firm",
		"engagement letter automation",
	],
	openGraph: {
		title: `${TITLE} | PraxisFlow`,
		description: DESCRIPTION,
		url: "https://www.praxisflow.com/ai-client-onboarding-for-law-firms",
		type: "website",
		images: [{ url: "/og-ai-employees.jpg", width: 1200, height: 630, alt: `${TITLE} | PraxisFlow` }],
	},
	twitter: { card: "summary_large_image", title: `${TITLE} | PraxisFlow`, description: DESCRIPTION, images: ["/og-ai-employees.jpg"] },
};

const onboarding = roles.find((r) => r.slug === "onboarding-specialist")!;
const index = roles.indexOf(onboarding);

const steps = [
	{ h: "Starts", b: "The moment your firm confirms a new client, for example when the engagement is marked as signed in your CRM." },
	{ h: "Records", b: "Creates the client record and the matter, with the details already collected at intake." },
	{ h: "Billing", b: "Sets up the client's billing account and retainer the way your firm does it." },
	{ h: "Documents", b: "Generates the engagement documents from your templates, fills in the client's details and files them in the matter folder." },
	{ h: "Welcome", b: "Sends a welcome email written for the client's matter type, so every new client starts with the right first message." },
];

const faqs: Faq[] = [
	{
		question: "What is client onboarding automation for a law firm?",
		answer: "It is the set of steps that turns a signed client into an active matter, done automatically: the client record, billing, the matter folder, the engagement documents and the welcome email. The Onboarding Specialist does them the moment a client signs, the same way every time.",
	},
	{
		question: "What starts the onboarding?",
		answer: "Your firm confirming a new client, for example marking the engagement as signed in your CRM. We set the starting point with you during setup, so it fits how your team already works.",
	},
	{
		question: "Which documents can it prepare?",
		answer: "Any document your firm already prepares from a template, starting with the engagement documents. It fills in the client's details and files each document in the matter folder.",
	},
	{
		question: "Is the welcome email the same for every client?",
		answer: "No. It uses the template for the client's matter type, so each new client gets the first message your firm wrote for their kind of case.",
	},
	{
		question: "What happens if information is missing?",
		answer: "It asks your staff instead of guessing. Nothing is filled in with an assumption, and nothing is signed on the firm's behalf.",
	},
	{
		question: "Does it work with our software?",
		answer: "It works with the CRM, billing system, document templates, file storage and email your firm already uses. If a tool has no ready-made connection, we build one as part of the setup.",
	},
];

function ProofCard() {
	return (
		<div className="bg-white px-7 py-9 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_24px_48px_-24px_rgba(15,23,42,0.3)] sm:px-10">
			<p className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">At a law firm using it today</p>
			<p className="mt-6 font-serif text-[clamp(3rem,6vw,4.5rem)] leading-none tracking-[-0.02em] text-ink">40 seconds</p>
			<p className="mt-2 font-serif text-[20px] text-ink">to set up a new client</p>
			<div className="mt-7 border-t border-rule pt-5">
				<p className="font-serif text-[clamp(1.6rem,2.6vw,2rem)] leading-none text-muted-foreground line-through decoration-1">
					25 to 40 minutes
				</p>
				<p className="mt-2 text-[14px] text-muted-foreground">by hand, before</p>
			</div>
		</div>
	);
}

export default function AiClientOnboardingPage() {
	return (
		<div className="w-full">
			<JsonLdScript data={faqJsonLd(faqs)} />
			<PageHero
				eyebrow="The Onboarding Specialist"
				title="Every new client, set up the moment they sign."
				lede={onboarding.summary + " About 40 seconds per client, instead of 25 to 40 minutes by hand."}
				aside={<ProofCard />}
			>
				<ArrowButton href={CALENDAR_URL}>{hero.primary}</ArrowButton>
				<ArrowButton href="#steps" variant="plain">
					See the steps
				</ArrowButton>
			</PageHero>

			<section id="steps" className="bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>From signed client to day one</ArticleHeading>
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

			<section id="terms" className="border-t border-rule bg-desk py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>Its terms</ArticleHeading>
						<p className="mt-5 max-w-[36ch] text-[17px] leading-relaxed text-muted-foreground">
							Pairs naturally with the Intake Coordinator: one brings the client in, the other sets them up.
						</p>
						<TextLink href="/law-firm-intake-automation" className="mt-8">
							The Intake Coordinator
						</TextLink>
					</div>
					<div className="lg:col-span-8">
						<EngagementSheet role={onboarding} index={index} as="h2" showLink={false} className="shadow-[0_1px_2px_rgba(15,23,42,0.06)]" />
					</div>
				</div>
			</section>

			<Limits />

			<section className="border-t border-rule bg-desk py-24 sm:py-28">
				<div className={wrap}>
					<ArticleHeading>How an engagement works</ArticleHeading>
					<HiringSteps />
				</div>
			</section>

			<section className="border-t border-rule bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>Questions about client onboarding</ArticleHeading>
						<TextLink href="/ai-agents-for-law-firms" className="mt-8">
							Meet the rest of the staff
						</TextLink>
					</div>
					<div className="lg:col-span-8">
						<FaqList faqs={faqs} />
					</div>
				</div>
			</section>

			<RelatedReading items={[posts.hiddenCost, posts.immigrationOperations]} />

			<CloseCta title="Start with an Onboarding Specialist." body="One call to learn how your firm sets up a new client today. No commitment." />
		</div>
	);
}
