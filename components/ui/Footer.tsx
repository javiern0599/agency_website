"use client";

import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import { NewsletterForm } from "./newsletter-form";
import { FadeIn } from "./fade-in";

export default function Footer() {
	return (
		<footer className="bg-background border-t border-border pt-16 pb-8">
			<div className="max-w-7xl mx-auto px-6">
				<FadeIn className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-start">
					{/* Left: logo + description + socials */}
					<div>
						<div className="mb-3">
							<a href="/" className="inline-block">
								<Image
									src="/PraxisFlow-Logotipo-Base.svg"
									alt="PraxisFlow Logo"
									width={100}
									height={100}
									className="rounded"
								/>
							</a>
						</div>
						<p className="text-sm text-muted-foreground max-w-xs mb-4">
							Automating the legal industry, one workflow at a
							time. Secure, efficient, and tailored for growth.
						</p>
						<div className="flex md:flex-col lg:flex-row gap-4">
							<div className="flex items-center gap-4 text-muted-foreground mb-2">
								<a
									href="https://www.linkedin.com/company/praxisflowstrategies"
									target="_blank"
									rel="noreferrer"
									className="hover:text-accent transition-colors"
								>
									<Linkedin className="w-5 h-5" />
								</a>
								<a
									href="https://www.facebook.com/profile.php?id=61572337974311"
									target="_blank"
									rel="noreferrer"
									className="hover:text-accent transition-colors"
								>
									<Facebook className="w-5 h-5" />
								</a>
								<a
									href="https://www.instagram.com/praxisflowstrategies/"
									target="_blank"
									rel="noreferrer"
									className="hover:text-accent transition-colors"
								>
									<Instagram className="w-5 h-5" />
								</a>
								<a
									href="https://youtube.com/@praxisflow?si=CSOvYqiwZv8DRbUM"
									target="_blank"
									rel="noreferrer"
									className="text-muted-foreground/90 hover:text-accent transition-colors"
								>
									<Youtube className="w-6 h-6" />
								</a>
							</div>
							<div>
								<a
									href="https://wa.me/message/6NX4JMQ4A7L7I1"
									target="_blank"
									rel="noreferrer"
									className="text-sm hover:text-accent transition-colors"
								>
									+1 (617) 315-6878
								</a>
							</div>
						</div>
					</div>

					{/* Center: three compact link columns */}
					<div className="md:ml-[-15px] xl:ml-[-50px]">
						<div className="grid grid-cols-3 gap-6 md:gap-10 lg:gap-6">
							<div>
								<h3 className="font-medium text-foreground mb-2 text-sm">
									Product
								</h3>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>
										<a
											href="/integrations"
											className="hover:text-accent transition-colors"
										>
											Integrations
										</a>
									</li>
									<li>
										<a
											href="/pricing"
											className="hover:text-accent transition-colors"
										>
											Pricing
										</a>
									</li>
									<li>
										<a
											href="/case-studies"
											className="hover:text-accent transition-colors"
										>
											Case Studies
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="font-medium text-foreground mb-2 text-sm">
									Company
								</h3>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>
										<a
											href="/about"
											className="hover:text-accent transition-colors"
										>
											About
										</a>
									</li>
									<li>
										<a
											href="/#process"
											className="hover:text-accent transition-colors"
										>
											Process
										</a>
									</li>
									<li>
										<a
											href="/contact"
											className="hover:text-accent transition-colors"
										>
											Contact
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="font-medium text-foreground mb-2 text-sm">
									Legal
								</h3>
								<ul className="space-y-2 text-sm text-muted-foreground">
									<li>
										<a
											href="/privacy-policy"
											className="hover:text-accent transition-colors"
										>
											Privacy Policy
										</a>
									</li>
									<li>
										<a
											href="/terms-of-use"
											className="hover:text-accent transition-colors"
										>
											Terms of Use
										</a>
									</li>
									<li>
										<a
											href="/security"
											className="hover:text-accent transition-colors"
										>
											Security
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Right: newsletter form */}
					<div>
						<h3 className="font-medium text-foreground mb-2 text-sm">
							Subscribe to our newsletter
						</h3>
						<NewsletterForm />
					</div>
				</FadeIn>

				<FadeIn delay={0.2}>
					<div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
						<p className="text-xs text-muted-foreground">
							© {new Date().getFullYear()} PraxisFlow Strategies
							LLC. All rights reserved.
						</p>
						<div className="flex items-center gap-2 mt-4 md:mt-0">
							<div className="w-2 h-2 rounded-full bg-accent"></div>
							<span className="text-xs text-muted-foreground font-medium">
								All systems operational
							</span>
						</div>
					</div>
				</FadeIn>
			</div>
		</footer>
	);
}
