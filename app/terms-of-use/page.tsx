import React from "react";
import { Reveal } from "@/components/site/Reveal";
import { PageHero } from "@/components/site/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
	alternates: { canonical: "/terms-of-use" },
	title: "Terms of Use",
	description: "Terms and conditions for using PraxisFlow services.",
	openGraph: {
		title: "Terms of Use | PraxisFlow",
		description: "Terms and conditions for using PraxisFlow services.",
		url: "https://www.praxisflow.com/terms-of-use",
	},
};

export default function TermsOfUsePage() {
	const lastUpdated = "November 22, 2025";

	return (
		<div className="w-full bg-white">
			<PageHero eyebrow={`Legal · Last updated ${lastUpdated}`} title="Terms of Use" />
			<main className="px-4 pb-24 pt-16 sm:px-6">
				<div className="mx-auto max-w-3xl">
					<Reveal delay={0.1}>
						<div className="space-y-12 p-8 md:p-12">
							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									1. Acceptance of Terms
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									By accessing and using PraxisFlow's
									services, you accept and agree to be bound
									by the terms and provision of this
									agreement. If you do not agree to abide by
									the above, please do not use this service.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									2. Description of Services
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									PraxisFlow provides custom workflow
									automation solutions for boutique law firms.
									Our services include discovery, development,
									delivery, and ongoing support for legal
									process automation.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									3. User Responsibilities
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									As a user, you agree to:
								</p>
								<ul className="space-y-3 text-muted-foreground">
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Provide accurate and complete
											information
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Maintain confidentiality of login
											credentials
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Use services only for lawful
											purposes
										</span>
									</li>
									<li className="flex gap-3">
										<span className="font-bold text-accent-ink">
											•
										</span>
										<span>
											Not engage in unauthorized access or
											misuse
										</span>
									</li>
								</ul>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									4. Intellectual Property Rights
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									All content, features, and functionality of
									our services are owned by PraxisFlow, its
									licensors, or other providers of such
									material and are protected by copyright and
									other intellectual property laws.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									5. Limitation of Liability
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									To the fullest extent permitted by law,
									PraxisFlow shall not be liable for any
									indirect, incidental, special,
									consequential, or punitive damages resulting
									from your use of or inability to use the
									services.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									6. Modifications to Terms
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									PraxisFlow reserves the right to modify
									these terms at any time. Changes are
									effective immediately upon posting to the
									website. Your continued use of the service
									constitutes acceptance of the modified
									terms.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									7. Governing Law
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									These terms and conditions are governed by
									and construed in accordance with the laws of
									the jurisdiction in which PraxisFlow
									operates, and you irrevocably submit to the
									exclusive jurisdiction of the courts in that
									location.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="mb-4 font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-tight text-ink">
									8. Contact Us
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									If you have questions about these Terms,
									please contact us at{" "}
									<a
										href="mailto:legal@praxisflow.com"
										className="text-accent-ink hover:text-accent-ink/80 font-medium"
									>
										legal@praxisflow.com
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
