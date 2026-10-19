import type { Metadata } from "next";
import { EngagementSheet } from "@/components/site/EngagementSheet";
import { Limits } from "@/components/site/Limits";
import { HiringSteps } from "@/components/site/HiringSteps";
import { FaqList } from "@/components/site/Faq";
import { CloseCta } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { ArrowButton, ArticleHeading, JsonLdScript, PageHero, TextLink, faqJsonLd, wrap } from "@/components/site/ui";
import { CALENDAR_URL, hero, roles, type Faq } from "@/lib/site-content";

// --- On-page SEO -----------------------------------------------------------
// Working primary keyword: "AI receptionist for law firms". Secondary: "AI
// legal receptionist", "virtual receptionist for law firms". Volumes still to
// be checked in Keyword Planner.
const TITLE = "AI Receptionist for Law Firms";
const DESCRIPTION =
	"An AI receptionist for law firms that answers your phone line around the clock, qualifies new callers, recognizes existing clients, books consultations and transfers the call to your staff when a person is needed.";

export const metadata: Metadata = {
	alternates: { canonical: "/ai-receptionist-for-law-firms" },
	title: TITLE,
	description: DESCRIPTION,
	keywords: ["AI receptionist for law firms", "AI legal receptionist", "virtual receptionist for law firms", "law firm answering service AI"],
	openGraph: {
		title: `${TITLE} | PraxisFlow`,
		description: DESCRIPTION,
		url: "https://www.praxisflow.com/ai-receptionist-for-law-firms",
		type: "website",
		images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: `${TITLE} | PraxisFlow` }],
	},
	twitter: { card: "summary_large_image", title: `${TITLE} | PraxisFlow`, description: DESCRIPTION, images: ["/og-image.webp"] },
};

const receptionist = roles.find((r) => r.slug === "receptionist")!;
const index = roles.indexOf(receptionist);

const paths = [
	{
		title: "A new caller",
		steps: [
			"Answers, at any hour",
			"Asks the qualifying questions your firm would ask",
			"Creates the lead in your CRM",
			"Checks the calendar and books the consultation",
		],
	},
	{
		title: "An existing client",
		steps: [
			"Answers, at any hour",
			"Recognizes the client and looks up their matter",
			"Reschedules or cancels an appointment if asked",
			"Passes anything else to your staff",
		],
	},
];

const faqs: Faq[] = [
	{
		question: "What is an AI receptionist for a law firm?",
		answer: "An AI agent that answers the firm's phone line. It qualifies new callers, recognizes existing clients, checks availability, books, reschedules or cancels consultations, and transfers the call to a person when one is needed.",
	},
	{
		question: "Can it transfer a call to a person?",
		answer: "Yes. It transfers the call to your staff when the caller asks for a person, when it isn't sure, and on sensitive topics such as complaints, fee disputes and emergencies.",
	},
	{
		question: "Does it know our existing clients?",
		answer: "Yes. It recognizes existing clients and looks up their matter in your CRM, so a client calling about an appointment doesn't go through new-client questions.",
	},
	{
		question: "Will it give legal advice on the phone?",
		answer: "No. It never gives legal advice or tells a caller how their case will go. It offers a consultation with an attorney instead.",
	},
	{
		question: "Do we need the Intake Coordinator as well?",
		answer: "No. The Receptionist works on its own. Firms that also take inquiries on WhatsApp or website chat can add the Intake Coordinator, and the two share the same rules and CRM.",
		linkText: "Intake Coordinator",
		linkHref: "/law-firm-intake-automation",
	},
];

export default function AiReceptionistPage() {
	return (
		<div className="w-full">
			<JsonLdScript data={faqJsonLd(faqs)} />
			<PageHero
				eyebrow="The Receptionist"
				title="An AI receptionist for law firms that answers, day and night."
				lede={receptionist.summary}
			>
				<ArrowButton href={CALENDAR_URL}>{hero.primary}</ArrowButton>
				<ArrowButton href="#terms" variant="plain">
					Read its terms
				</ArrowButton>
			</PageHero>

			<section className="bg-white py-24 sm:py-28">
				<div className={wrap}>
					<ArticleHeading>Every call, handled one of two ways</ArticleHeading>
					<div className="mt-14 grid border-l border-t border-rule [&>*]:border-b [&>*]:border-r [&>*]:border-rule md:grid-cols-2">
						{paths.map((p, pi) => (
							<div key={p.title} className="bg-white p-7 sm:p-10">
								<h3 className="font-serif text-[26px] text-ink">{p.title}</h3>
								<ol className="mt-6 space-y-0 border-t border-rule">
									{p.steps.map((s, i) => (
										<Reveal as="li" key={s} delay={pi * 0.05 + i * 0.08} className="grid grid-cols-[2.5rem_1fr] border-b border-rule py-4 text-[17px] text-ink">
											<span className="font-sans text-[13px] font-medium tabular-nums leading-[1.9] text-accent-ink">
												{String(i + 1).padStart(2, "0")}
											</span>
											{s}
										</Reveal>
									))}
								</ol>
							</div>
						))}
					</div>
					<div className="mt-px border border-t-0 border-rule bg-ink px-7 py-6 text-white sm:px-10">
						<p className="font-serif text-[20px] leading-snug">
							On either path, the call goes to your staff the moment the caller asks for a person or the call needs one.
						</p>
					</div>
				</div>
			</section>

			<section id="terms" className="border-t border-rule bg-desk py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>Its terms</ArticleHeading>
						<p className="mt-5 max-w-[36ch] text-[17px] leading-relaxed text-muted-foreground">
							Offered on its own, or alongside the Intake Coordinator for firms that also take inquiries on WhatsApp and
							website chat.
						</p>
						<TextLink href="/law-firm-intake-automation" className="mt-8">
							The Intake Coordinator
						</TextLink>
					</div>
					<div className="lg:col-span-8">
						<EngagementSheet role={receptionist} index={index} as="h2" showLink={false} className="shadow-[0_1px_2px_rgba(15,23,42,0.06)]" />
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
						<ArticleHeading>Questions about AI receptionists</ArticleHeading>
						<TextLink href="/ai-agents-for-law-firms" className="mt-8">
							Meet the rest of the staff
						</TextLink>
					</div>
					<div className="lg:col-span-8">
						<FaqList faqs={faqs} />
					</div>
				</div>
			</section>

			<CloseCta title="Start with a Receptionist." body="One call to learn how your firm answers the phone. No commitment." />
		</div>
	);
}
