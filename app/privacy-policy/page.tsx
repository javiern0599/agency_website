import React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
		<div className="w-full min-h-screen bg-background">
			<main className="relative pt-32 pb-20 px-6 overflow-hidden">
				{/* Background Elements */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
					<DotPattern
						width={20}
						height={20}
						cx={1}
						cy={1}
						cr={1}
						className={cn(
							"[mask-image:radial-gradient(800px_circle_at_top,white,transparent)]",
							"text-accent/10",
						)}
					/>
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
				</div>

				<div className="container mx-auto max-w-4xl">
					<FadeIn>
						<div className="text-center mb-16">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-8">
								<span className="flex h-2 w-2 rounded-full bg-accent"></span>
								Legal
							</div>
							<h1 className="text-4xl md:text-5xl font-medium text-foreground mb-6 tracking-tight">
								Privacy Policy
							</h1>
							<p className="text-muted-foreground">
								Last updated: {lastUpdated}
							</p>
						</div>
					</FadeIn>

					<FadeIn delay={0.1}>
						<div className="space-y-12 p-8 md:p-12 rounded-2xl">
							<section className="mb-12">
								<h2 className="text-2xl font-medium text-foreground mb-4">
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
								<h2 className="text-2xl font-medium text-foreground mb-4">
									2. Information We Collect
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									We collect information in several ways:
								</p>
								<ul className="space-y-3 text-muted-foreground">
									<li className="flex gap-3">
										<span className="text-accent font-bold">
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
										<span className="text-accent font-bold">
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
										<span className="text-accent font-bold">
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
								<h2 className="text-2xl font-medium text-foreground mb-4">
									3. How We Use Your Information
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									We use collected information to:
								</p>
								<ul className="space-y-3 text-muted-foreground">
									<li className="flex gap-3">
										<span className="text-accent font-bold">
											•
										</span>
										<span>
											Provide, maintain, and improve our
											automation services
										</span>
									</li>
									<li className="flex gap-3">
										<span className="text-accent font-bold">
											•
										</span>
										<span>
											Communicate about your account and
											services
										</span>
									</li>
									<li className="flex gap-3">
										<span className="text-accent font-bold">
											•
										</span>
										<span>
											Send marketing communications (with
											your consent)
										</span>
									</li>
									<li className="flex gap-3">
										<span className="text-accent font-bold">
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
								<h2 className="text-2xl font-medium text-foreground mb-4">
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
								<h2 className="text-2xl font-medium text-foreground mb-4">
									5. Your Rights
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-4">
									Depending on your location, you may have
									rights to:
								</p>
								<ul className="space-y-3 text-muted-foreground">
									<li className="flex gap-3">
										<span className="text-accent font-bold">
											•
										</span>
										<span>
											Access your personal information
										</span>
									</li>
									<li className="flex gap-3">
										<span className="text-accent font-bold">
											•
										</span>
										<span>Correct inaccurate data</span>
									</li>
									<li className="flex gap-3">
										<span className="text-accent font-bold">
											•
										</span>
										<span>
											Request deletion of your data
										</span>
									</li>
									<li className="flex gap-3">
										<span className="text-accent font-bold">
											•
										</span>
										<span>
											Opt-out of marketing communications
										</span>
									</li>
								</ul>
							</section>

							<section className="mb-12">
								<h2 className="text-2xl font-medium text-foreground mb-4">
									6. Contact Us
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									If you have questions about this Privacy
									Policy, please contact us at{" "}
									<a
										href="mailto:privacy@praxisflow.com"
										className="text-accent hover:text-accent/80 font-medium"
									>
										privacy@praxisflow.com
									</a>
									.
								</p>
							</section>
						</div>
					</FadeIn>
				</div>
			</main>
		</div>
	);
}
