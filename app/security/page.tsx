import type { Metadata } from "next";
import { RelatedReading, posts } from "@/components/site/RelatedReading";
import { Reveal } from "@/components/site/Reveal";
import { PageHero, wrap } from "@/components/site/ui";

export const metadata: Metadata = {
	alternates: { canonical: "/security" },
	title: "Security",
	description:
		"Your legal workflows and sensitive data are protected through dedicated infrastructure, strict access controls, and layered safeguards.",
	keywords: [
		"Legal Data Security",
		"Law Firm Compliance",
		"Automation Security",
		"Data Protection",
		"GDPR Compliance",
	],
	openGraph: {
		title: "Security & Compliance | PraxisFlow",
		description:
			"Your legal workflows and sensitive data are protected through dedicated infrastructure and layered safeguards.",
		url: "https://www.praxisflow.com/security",
		type: "website",
		images: [
			{
				url: "/og-image.webp",
				width: 1200,
				height: 630,
				alt: "PraxisFlow Security Standards",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Security & Compliance | PraxisFlow",
		description:
			"Your legal workflows and sensitive data are protected through dedicated infrastructure and layered safeguards.",
		images: ["/og-image.webp"],
	},
};

const highlights = [
	{ title: "Dedicated Infrastructure", body: "Your firm gets its own server on Amazon Web Services (AWS) or Hetzner, never shared with another firm." },
	{ title: "Robust Encryption", body: "Industry-standard encryption safeguarding data at rest and in transit, including workflow credentials." },
	{ title: "Strict Access Control", body: "Access restricted using cryptographic keys and Multi-Factor Authentication (MFA) for all critical accounts." },
	{ title: "Multi-layered Encrypted Backups", body: "Critical system data is encrypted and securely archived daily to an off-site storage vault for continuity." },
];

const sections = [
	{
		title: "Dedicated & Managed Infrastructure",
		intro: "Our workflows run in a private environment dedicated to your firm, ensuring your data is isolated from other clients and public internet traffic.",
		items: [
			["Your Own Server", "Your firm gets its own server on Amazon Web Services (AWS) or Hetzner, never shared with another firm. We set it up and maintain it for you. If you ever want it in your own name, we hand it over, with your workflows and data."],
			["Robust Encryption", "All data, including workflow credentials and sensitive client information, is protected with industry-standard encryption standards, safeguarding data at rest and in transit."],
			["Platform Stability", "The infrastructure is professionally managed and benefits from the physical and network security standards of the provider it runs on, AWS or Hetzner. We perform regular vulnerability scanning and patching to maintain system integrity."],
		],
	},
	{
		title: "Strict Access Control",
		intro: "Access to both the application and the underlying server is severely restricted using multiple authentication steps.",
		items: [
			["Server Access (SSH)", "Access to each server is secured using cryptographic keys and is restricted to pre-authorized personnel. We enforce Multi-Factor Authentication (MFA) for all critical administrative accounts."],
			["Application Access (n8n)", "All users accessing the workflow application must utilize Multi-Factor Authentication (MFA)."],
			["Audit Logging", "All user activities, changes, and workflow executions are meticulously logged and retained, providing a clear audit trail for compliance and review."],
		],
	},
	{
		title: "Data Protection and Continuity",
		intro: "We ensure your automated processes are resilient and your data is recoverable under any circumstance.",
		items: [
			["Multi-Layered Backups", "Critical system data and workflow configurations are encrypted on our server and then securely archived daily to an off-site storage vault."],
			["Least Privilege Access", "We configure integrations to require only the minimum permissions and authorizations necessary for your workflows to run, ensuring only the necessary access to your platforms."],
		],
	},
	{
		title: "Alignment with Legal Standards & Reporting",
		intro: "We ensure your automated processes are resilient and your data is recoverable under any circumstance.",
		items: [
			["Regulatory Alignment", "Our security controls and data handling procedures are built to align with the core principles of data protection regulations (like GDPR and HIPAA), focusing on confidentiality and data integrity."],
			["Custom Compliance", "If you have specific regulatory requirements, we work directly with your compliance team to ensure our workflows adhere to your established protocols."],
		],
	},
];

export default function SecurityPage() {
	const lastUpdated = "October 15, 2026";
	return (
		<div className="w-full">
			<PageHero
				eyebrow={`Legal · Last updated ${lastUpdated}`}
				title="Security"
				lede="Your legal workflows and sensitive data are protected through diligence, control, and layered technical safeguards."
			/>

			<section className="bg-desk py-20 sm:py-24">
				<div className={wrap}>
					<ul className="grid border-l border-t border-rule [&>*]:border-b [&>*]:border-r [&>*]:border-rule sm:grid-cols-2 lg:grid-cols-4">
						{highlights.map((h, i) => (
							<Reveal as="li" key={h.title} delay={i * 0.05} className="bg-white p-7">
								<h2 className="font-serif text-[21px] leading-tight text-ink">{h.title}</h2>
								<p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{h.body}</p>
							</Reveal>
						))}
					</ul>
				</div>
			</section>

			<section className="border-t border-rule bg-white pb-24 pt-20 sm:pb-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
						<ol className="sticky top-24 space-y-3 border-l border-rule pl-5 text-[14px] text-muted-foreground">
							{sections.map((s, i) => (
								<li key={s.title}>
									<a href={`#section-${i + 1}`} className="transition-colors duration-200 hover:text-ink">
										{i + 1}. {s.title}
									</a>
								</li>
							))}
							<li>
								<a href="#report" className="transition-colors duration-200 hover:text-ink">Report a security issue</a>
							</li>
						</ol>
					</nav>
					<div className="max-w-[70ch] space-y-16 lg:col-span-8 lg:col-start-5">
						{sections.map((s, i) => (
							<section key={s.title} id={`section-${i + 1}`} className="scroll-mt-6">
								<h2 className="font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight text-ink">
									<span className="mr-3 text-accent">{i + 1}.</span>
									{s.title}
								</h2>
								<p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{s.intro}</p>
								<dl className="mt-6 border-t border-rule">
									{s.items.map(([k, v]) => (
										<div key={k} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
											<dt className="font-serif text-[18px] italic text-ink">{k}</dt>
											<dd className="text-[16px] leading-relaxed text-muted-foreground">{v}</dd>
										</div>
									))}
								</dl>
							</section>
						))}
						<section id="report" className="scroll-mt-6 border-t-2 border-ink pt-8">
							<h2 className="font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight text-ink">Report a Security Issue</h2>
							<p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
								If you discover a security vulnerability, please report it responsibly to{" "}
								<a href="mailto:security@praxisflow.com" className="text-ink underline decoration-accent underline-offset-4">
									security@praxisflow.com
								</a>
								. We appreciate your help in keeping PraxisFlow secure.
							</p>
						</section>
					</div>
				</div>
			</section>
			<RelatedReading items={[posts.securityRethink]} />
		</div>
	);
}
