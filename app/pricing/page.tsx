import { FaqList } from "@/components/site/Faq";
import { CloseCta } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { ArrowButton, ArticleHeading, JsonLdScript, PageHero, faqJsonLd, wrap } from "@/components/site/ui";
import { CALENDAR_URL, pricing, type Faq } from "@/lib/site-content";

// Two ways to work with PraxisFlow, each with a "from" price. Figures live in
// lib/site-content.ts (pricing) and are proposals until approved.

type Track = {
	n: string;
	title: string;
	priced: string;
	lede: string;
	lines: { label: string; value: string; note: string }[];
	extra?: string;
	groups: { title: string; items: string[] }[];
	cta: string;
};

const tracks: Track[] = [
	{
		n: "Track 1",
		title: "AI employees",
		priced: "Priced per role",
		lede: "A role built into your tools, tested with your staff, then maintained and improved for you every month.",
		lines: [
			{ label: "Setup", value: pricing.role.setup, note: "once, per role" },
			{ label: "Monthly", value: pricing.role.monthly, note: "a month per role, optional" },
		],
		extra: `Each additional role: from ${pricing.extraRole.setup} setup and ${pricing.extraRole.monthly} a month.`,
		groups: [
			{
				title: "Setup includes",
				items: [
					"Onboarding form and a call to learn your rules and wording",
					"Build in your private environment, connected to your tools",
					"Scripted test conversations before anything goes live",
					"Shadow mode: it drafts, your staff approve",
				],
			},
			{
				title: "Optional support includes",
				items: [
					"Maintaining your firm's own server: security, updates, backups",
					"Keeping AI costs low on your firm's own AI account",
					"Automatic alerts if something fails, and we fix it",
					"Ongoing tuning, and updates when your tools change",
				],
			},
		],
		cta: "Price my first role",
	},
	{
		n: "Track 2",
		title: "Custom automation",
		priced: "Priced per project",
		lede: "A workflow only your firm has, built once at a fixed price. Ongoing support is your choice.",
		lines: [
			{ label: "Build", value: pricing.automation.build, note: "fixed price, per project" },
			{ label: "Support", value: pricing.automation.support, note: "a month, optional" },
		],
		groups: [
			{
				title: "The build includes",
				items: [
					"Workflow audit and solution design",
					"Development and connection to your tools",
					"Testing with real cases from your firm",
					"Hands-on training for your team",
				],
			},
			{
				title: "Optional support includes",
				items: [
					"Infrastructure monitoring and maintenance",
					"Small changes and adjustments",
					"Priority support channels",
					"Quarterly optimization reviews",
				],
			},
		],
		cta: "Price my project",
	},
];

const drivers = [
	{ title: "Channels", body: "WhatsApp, website chat, phone, email: each channel a role works in adds setup." },
	{ title: "Tools", body: "How many systems the role reads from and writes to, and whether they have an API." },
	{ title: "Rules", body: "How many qualification rules, hand-off cases and approved wordings the role follows." },
	{ title: "Volume", body: "How many conversations, calls or documents the role handles in a month." },
];

const pricingFaqs: Faq[] = [
	{
		question: "What does the monthly fee for an AI employee cover?",
		answer: "Maintaining your firm's own server (security, updates and backups), monitoring, ongoing tuning and changes when your tools change. It also covers support when you need a change to the role's rules or wording. Two things are billed separately: the server itself, at the hosting provider's price, and AI usage, which your firm pays directly to the AI provider. If we build the role in an automation platform your firm already uses, such as n8n Cloud, there is no server to maintain and monthly support is optional.",
	},
	{
		question: "Who pays for the AI itself?",
		answer: "Your firm does, directly. You open your own account with the AI provider, for example OpenAI, and we connect your roles to it. You pay only for what you use, see every charge on your own bill, and keep the account if you ever move on. We help you set it up and keep usage efficient.",
	},
	{
		question: "Can we start with one role and add more later?",
		answer: `Yes, and most firms do. Additional roles share the environment and connections already in place, so they start from ${pricing.extraRole.setup} to set up and ${pricing.extraRole.monthly} a month.`,
	},
	{
		question: "Is infrastructure management optional?",
		answer: "It depends on your setup. If you already use an automation platform such as n8n Cloud, Zapier or Make, we can build your workflows there, and management is optional: you can look after it yourself or use our support for troubleshooting and small changes. If we set up a server of your own instead, we maintain it for you, and that is included in the monthly fee. This option provides enterprise-grade security built to align with data-protection principles, 24/7 monitoring, automated backups, and performance optimization—making it a superior choice for firms prioritizing data protection and seamless operations.",
	},
	{
		question: "Am I locked in? What happens if I want to cancel?",
		answer: "Absolutely not. You own your n8n instance and data. If you decide to transition away, we provide full support to migrate your infrastructure to your preferred provider with minimal downtime and a standard 30-day notice. If you would like the server in your own name, we hand it over to you, with your workflows and data, so nothing has to be rebuilt. We believe in keeping clients through results, not contracts.",
	},
	{
		question: "Is there a minimum contract length?",
		answer: `The setup or build is a fixed project. Monthly fees are month-to-month with a 30-day notice for changes, giving you flexibility while ensuring we can plan and optimize effectively. For annual commitments, we offer a ${pricing.annualDiscount} discount on the monthly fee.`,
	},
	{
		question: "Is the monthly fee for n8n software licensing?",
		answer: "No. n8n is free, open-source software (Apache 2.0 license). Your server is billed separately, at the price of the provider it runs on: Amazon Web Services (AWS) or Hetzner. The monthly fee covers maintaining it: security hardening, 24/7 uptime monitoring, encrypted backups kept off-site, software updates and priority support. The server and your n8n instance are yours.",
	},
	{
		question: "Do you offer performance-based or ROI guarantees?",
		answer: "We're confident in our work and willing to discuss ROI projections during discovery. While we don't offer percentage guarantees (since results depend on implementation, firm adoption, and market factors), we commit to transparent measurement and optimization. We track KPIs like time saved, error reduction, and revenue impact quarterly and adjust our approach if targets aren't being met.",
	},
	{
		question: "What happens if we need additional integrations or changes mid-project?",
		answer: "Changes are handled through change requests during implementation, or folded into the monthly support. For minor adjustments, they're typically included in your monthly fee. Significant new integrations are scoped separately and can be added later, ensuring predictability and flexibility.",
	},
	{
		question: "Why do you use n8n instead of platforms like Zapier or Make?",
		answer: "We choose n8n for its flexibility, data ownership, and predictable cost model. With self-hosted n8n, your automation runs on private infrastructure under your control rather than in a shared workflow SaaS platform. That means we can support more complex logic without per-task usage charges, so your automation costs remain predictable as your firm grows.",
	},
	{
		question: "What if our tech stack has tools that n8n does not support?",
		answer: "n8n supports 1,000+ integrations and has powerful HTTP request capabilities that work with any tool with an API. If a tool isn't directly supported, we can build a custom integration using HTTP requests or webhooks. During our complimentary discovery meeting, we map your entire tech stack and identify any custom integration needs upfront.",
	},
];

function TrackSheet({ t, i }: { t: Track; i: number }) {
	return (
		<Reveal as="li" delay={i * 0.08} className="flex flex-col bg-white p-7 sm:p-10">
			<p className="text-[13px] font-medium text-accent-ink">{t.n}</p>
			<h2 className="mt-3 font-serif text-[clamp(1.9rem,3.2vw,2.5rem)] leading-tight text-ink">{t.title}</h2>
			<p className="mt-1 text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{t.priced}</p>
			<p className="mt-5 max-w-[44ch] text-[16px] leading-relaxed text-muted-foreground">{t.lede}</p>

			<dl className="mt-8 grid grid-cols-2 border-y border-ink">
				{t.lines.map((l, j) => (
					<div key={l.label} className={j === 0 ? "border-r border-rule py-5 pr-5" : "py-5 pl-5"}>
						<dt className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{l.label}</dt>
						<dd className="mt-2">
							<span className="text-[13px] text-muted-foreground">from </span>
							<span className="font-serif text-[clamp(2rem,3.4vw,2.6rem)] leading-none tabular-nums text-ink">{l.value}</span>
							<span className="mt-1.5 block text-[13px] text-muted-foreground">{l.note}</span>
						</dd>
					</div>
				))}
			</dl>
			{t.extra && <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">{t.extra}</p>}

			<div className="mt-8 grid gap-8 sm:grid-cols-2">
				{t.groups.map((g) => (
					<div key={g.title}>
						<h3 className="font-serif text-[18px] italic text-accent-ink">{g.title}</h3>
						<ul className="mt-3 space-y-2.5 text-[15px] leading-snug text-ink">
							{g.items.map((item) => (
								<li key={item} className="grid grid-cols-[1rem_1fr] gap-1.5">
									<span aria-hidden className="mt-[0.6em] h-px w-2.5 bg-accent" />
									{item}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="mt-auto pt-10">
				<ArrowButton href={CALENDAR_URL}>{t.cta}</ArrowButton>
			</div>
		</Reveal>
	);
}

export default function PricingPage() {
	return (
		<div className="w-full">
			<JsonLdScript data={faqJsonLd(pricingFaqs)} />
			<PageHero
				eyebrow="Pricing"
				title="Clear prices, agreed before any work starts."
				lede="Two ways to work with us: AI employees priced per role, or custom automation priced per project. Every quote is fixed after a discovery call, with no hourly billing and no long-term contract."
			>
				<ArrowButton href={CALENDAR_URL}>Book a discovery call</ArrowButton>
				<ArrowButton href="#tracks" variant="plain">
					See the prices
				</ArrowButton>
			</PageHero>

			<section id="tracks" className="bg-desk py-24 sm:py-28">
				<div className={wrap}>
					<ol className="grid border-l border-t border-rule [&>*]:border-b [&>*]:border-r [&>*]:border-rule lg:grid-cols-2">
						{tracks.map((t, i) => (
							<TrackSheet key={t.title} t={t} i={i} />
						))}
					</ol>
					<p className="mt-8 max-w-[75ch] border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-ink">
						<span className="font-medium">When the monthly fee applies.</span>{" "}
						For both tracks, monthly support is optional when we
						build in an automation platform your firm already uses, such as n8n Cloud. It is required when your roles or
						automations run on your firm&apos;s own server, which we set up and maintain for you.
					</p>
					<p className="mt-4 text-[14px] text-muted-foreground">
						Prices in US dollars. Billed separately: your firm's server, at the price of the provider it runs on, and AI usage, paid directly to the AI provider through your firm's own account. Annual commitments get {pricing.annualDiscount} off the monthly fee.
					</p>
				</div>
			</section>

			<section className="border-t border-rule bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>What sets your price</ArticleHeading>
						<p className="mt-5 max-w-[36ch] text-[17px] leading-relaxed text-muted-foreground">
							The &ldquo;from&rdquo; prices cover a role or project with one channel and a standard set of tools. These
							are what move it.
						</p>
					</div>
					<dl className="grid gap-x-10 border-t border-ink sm:grid-cols-2 lg:col-span-8">
						{drivers.map((d) => (
							<div key={d.title} className="border-b border-rule py-6">
								<dt className="font-serif text-[22px] text-ink">{d.title}</dt>
								<dd className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{d.body}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<section className="bg-desk py-16">
				<div className={wrap}>
					<p className="max-w-[60ch] font-serif text-[22px] leading-snug text-ink">
						<span className="italic">No project is too small.</span> If you have an idea to improve your workflow, we may be
						able to do it.{" "}
						<a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4">
							Schedule a free consultation
						</a>{" "}
						and talk to us.
					</p>
				</div>
			</section>

			<section className="border-t border-rule bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading>Frequently asked questions</ArticleHeading>
						<p className="mt-5 text-[17px] text-muted-foreground">Everything you need to know about our services, security, and pricing model.</p>
					</div>
					<div className="lg:col-span-8">
						<FaqList faqs={pricingFaqs} />
					</div>
				</div>
			</section>

			<CloseCta />
		</div>
	);
}
