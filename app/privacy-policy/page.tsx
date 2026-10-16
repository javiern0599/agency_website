import React from "react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
	alternates: { canonical: "/privacy-policy" },
	title: "Privacy Policy",
	description: "Our commitment to protecting your data and privacy.",
	openGraph: {
		title: "Privacy Policy | PraxisFlow",
		description: "Our commitment to protecting your data and privacy.",
		url: "https://www.praxisflow.com/privacy-policy",
	},
};

export default function PrivacyPolicyPage() {
	const lastUpdated = "November 22, 2025";

	return (
		<div className="w-full bg-white">
			<PageHero eyebrow={`Legal · Last updated ${lastUpdated}`} title="Privacy Policy" />
			<main className="px-4 pb-24 pt-16 sm:px-6">
				<div className="mx-auto max-w-3xl">
					<Reveal delay={0.1}>
						<div className="space-y-12">
							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									1. Introduction
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									Welcome to PraxisFlow. We respect your
									privacy and are committed to protecting your
									personal data. This privacy policy will
									inform you as to how we look after your
									personal data when you visit our website and
									inform you of your privacy rights and how
									the law protects you.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									2. Information We Collect
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									We collect information in several ways:
								</p>
								<ul className="space-y-3 text-muted-foreground">
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											<strong className="text-foreground font-semibold">
												Information you provide:
											</strong>{" "}
											Contact details, company
											information, and communication
											preferences when you request our
											services.
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											<strong className="text-foreground font-semibold">
												Automatically collected:
											</strong>{" "}
											IP address, browser type, device
											information, and usage patterns
											through cookies and similar
											technologies.
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											<strong className="text-foreground font-semibold">
												Workflow data:
											</strong>{" "}
											Information about your legal
											workflows and automation
											requirements during discovery and
											implementation.
										</span>
									</li>
								</ul>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									3. How We Use Your Information
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									We use collected information to:
								</p>
								<ul className="space-y-3 text-muted-foreground">
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Provide, maintain, and improve our
											automation services
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Communicate about your account and
											services
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Send marketing communications (with
											your consent)
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Comply with legal obligations and
											protect our rights
										</span>
									</li>
								</ul>
								<p className="text-muted-foreground leading-relaxed mt-6">
									We will only use mobile phone numbers and
									SMS marketing consent for the purposes for
									which they were provided. We do not share
									phone numbers or opt-in consent with third
									parties or affiliates for marketing
									purposes.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									4. Data Security
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									We implement industry-standard security
									measures including encryption, secure data
									storage, and regular security audits. Your
									legal workflow data is protected with
									enterprise-grade encryption both in transit
									and at rest.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									5. Your Rights
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									Depending on your location, you may have
									rights to:
								</p>
								<ul className="space-y-3 text-muted-foreground">
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Access your personal information
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>Correct inaccurate data</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Request deletion of your data
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Opt-out of marketing communications
										</span>
									</li>
								</ul>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									6. Contact Us
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									If you have questions about this Privacy
									Policy, please contact us at{" "}
									<a
										href="mailto:privacy@praxisflow.com"
										className="text-accent-ink hover:text-accent-ink/80 font-medium"
									>
										privacy@praxisflow.com
									</a>
									.
								</p>
							</section>
						</div>
					</Reveal>
				</div>
			</main>
		</div>
	);
}
