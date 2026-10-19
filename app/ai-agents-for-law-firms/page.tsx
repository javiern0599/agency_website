import type { Metadata } from "next";
import { RelatedReading, posts } from "@/components/site/RelatedReading";
import { EngagementSheet } from "@/components/site/EngagementSheet";
import { HiringSteps } from "@/components/site/HiringSteps";
import { Limits } from "@/components/site/Limits";
import { FaqList } from "@/components/site/Faq";
import { CloseCta } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { ArrowButton, ArticleHeading, JsonLdScript, PageHero, faqJsonLd, wrap } from "@/components/site/ui";
import { CALENDAR_URL, hero, moreRoles, roles, type Faq } from "@/lib/site-content";

// --- On-page SEO -----------------------------------------------------------
// Primary keyword: "AI agents for law firms" (Ahrefs <100/month; "best ai agents
// for law firms" >100). Secondary: "AI for law firms", the broadest term with the
// most Google Trends interest (Oct 2026), and "AI employees for law firms".
const TITLE = "AI Agents for Law Firms";
const DESCRIPTION =
	"AI for law firms, built as AI agents engaged like staff: intake, reception, drafting, docketing, client updates, onboarding, follow-up and filings. Each works in your tools, in a private environment, and hands off to your people.";

export const metadata: Metadata = {
	alternates: { canonical: "/ai-agents-for-law-firms" },
	title: TITLE,
	description: DESCRIPTION,
	keywords: ["AI agents for law firms", "AI for law firms", "best AI agents for law firms", "AI employees for law firms", "legal AI agents"],
	openGraph: {
		title: `${TITLE} | PraxisFlow`,
		description: DESCRIPTION,
		url: "https://www.praxisflow.com/ai-agents-for-law-firms",
		type: "website",
		images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: `${TITLE} | PraxisFlow` }],
	},
	twitter: { card: "summary_large_image", title: `${TITLE} | PraxisFlow`, description: DESCRIPTION, images: ["/og-image.webp"] },
};

const faqs: Faq[] = [
	{
		question: "What can AI agents do for a law firm?",
		answer: "They take on defined, repeatable parts of a role: answering and qualifying new inquiries, answering the phone, drafting from templates, proposing deadlines from court notices, answering status questions, setting up new clients, following up with leads and turning complaints into structured matters. Each works inside the tools your firm already uses.",
	},
	{
		question: "Are these real people?",
		answer: "No. They are AI agents we build, set up and maintain in your firm's own environment. We call them staff because each one is defined like a role: written duties, written limits, and when a person takes over.",
	},
	{
		question: "Do AI agents replace our staff?",
		answer: "No. Each agent covers a defined part of a role and hands the work to your people when a person is needed. Attorneys review every draft, and a person confirms every deadline.",
	},
	{
		question: "How is an AI agent different from a chatbot?",
		answer: "A chatbot answers questions. An AI agent does the work around the answer: it books the consultation, creates the record in your CRM, files the document and tells your staff what happened, within written limits your firm approves.",
	},
	{
		question: "Are AI agents safe for client data?",
		answer: "Each firm's agents run in a private environment dedicated to that firm, never shared with another. Data is encrypted, backed up and monitored, and integrations get only the access they need. Our security page has the details.",
		linkText: "security page",
		linkHref: "/security",
	},
	{
		question: "Can an AI agent give legal advice?",
		answer: "Ours never do. No role gives legal advice, signs or files anything, contacts courts or opposing counsel, moves money or deletes records. When asked for an opinion, the agent offers a consultation with an attorney instead.",
	},
	{
		question: "Which AI agent should a law firm start with?",
		answer: "We usually suggest the Intake Coordinator, since it answers every new inquiry the moment it arrives. On a discovery call we look at where your firm loses the most time and recommend a first role from there.",
	},
];

export default function AiAgentsPage() {
	return (
		<div className="w-full">
			<JsonLdScript data={faqJsonLd(faqs)} />
			<PageHero
				eyebrow="AI employees"
				title="AI agents for law firms, engaged like staff."
				lede="Each role comes with written duties, written limits and a clause that says when a person takes over. They work in your tools, in a private environment built for your firm."
			>
				<ArrowButton href={CALENDAR_URL}>{hero.primary}</ArrowButton>
				<ArrowButton href="#roles" variant="plain">
					See all roles
				</ArrowButton>
			</PageHero>

			<section className="bg-white py-20 sm:py-24">
				<div className={wrap}>
					<p className="max-w-[62ch] font-serif text-[clamp(1.35rem,2.2vw,1.65rem)] leading-[1.5] text-ink">
						An AI agent for a law firm is software that does one role&apos;s routine work from start to finish: it reads the
						message, decides what the firm&apos;s rules say to do, does it in the firm&apos;s own systems and reports back.
						What it may not do is written down before it starts, and a person takes over whenever judgment is needed.
					</p>
				</div>
			</section>

			<section id="roles" className="border-t border-rule bg-desk py-20 sm:py-24">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<nav aria-label="Roles" className="lg:col-span-3">
						<div className="lg:sticky lg:top-24">
							<h2 className="font-serif text-[28px] leading-tight text-ink">The staff</h2>
							<ol className="mt-6 border-t border-rule">
								{roles.map((r, i) => (
									<li key={r.slug} className="border-b border-rule">
										<a
											href={`#${r.slug}`}
											className="group grid grid-cols-[2.25rem_1fr] items-baseline py-3 text-[15px] text-muted-foreground transition-colors duration-200 hover:text-ink"
										>
											<span className="font-serif text-[13px] text-accent-ink">§{i + 1}</span>
											<span className="relative">
												{r.title}
											</span>
										</a>
									</li>
								))}
								<li className="border-b border-rule">
									<a href="#more-roles" className="grid grid-cols-[2.25rem_1fr] py-3 text-[15px] text-muted-foreground transition-colors duration-200 hover:text-ink">
										<span />
										More roles on request
									</a>
								</li>
							</ol>
						</div>
					</nav>
					<div className="space-y-8 lg:col-span-9">
						{roles.map((r, i) => (
							<Reveal key={r.slug}>
								<div id={r.slug} className="scroll-mt-6">
									<EngagementSheet role={r} index={i} as="h2" className="shadow-[0_1px_2px_rgba(15,23,42,0.06)]" />
								</div>
							</Reveal>
						))}
						<div id="more-roles" className="scroll-mt-6 bg-white px-6 py-8 sm:px-10 sm:py-10">
							<h2 className="font-serif text-[clamp(1.75rem,3vw,2.15rem)] leading-tight text-ink">More roles on request</h2>
							<ul className="mt-6 divide-y divide-rule border-t border-rule">
								{moreRoles.map((m) => (
									<li key={m.title} className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
										<h3 className="font-serif text-[20px] text-ink">{m.title}</h3>
										<div className="text-[16px] leading-relaxed text-muted-foreground">
											<p>{m.line}</p>
											{m.never && (
												<p className="mt-1.5">
													<span className="font-serif italic text-accent-ink">Shall not: </span>
													{m.never}
												</p>
											)}
										</div>
									</li>
								))}
							</ul>
						</div>
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
						<ArticleHeading>Questions about AI agents for law firms</ArticleHeading>
					</div>
					<div className="lg:col-span-8">
						<FaqList faqs={faqs} />
					</div>
				</div>
			</section>

			<RelatedReading items={[posts.fiveAutomations, posts.immigrationAgility, posts.hiddenCost]} />

			<CloseCta />
		</div>
	);
}
