import React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
                            "text-accent/10"
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
                                Terms of Use
                            </h1>
                            <p className="text-muted-foreground">
                                Last updated: {lastUpdated}
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="space-y-12 p-8 md:p-12">
                            <section className="mb-12">
                                <h2 className="text-2xl font-medium text-foreground mb-4">1. Acceptance of Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    By accessing and using PraxisFlow's services, you accept and agree to be bound by the terms and provision
                                    of this agreement. If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-medium text-foreground mb-4">2. Description of Services</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    PraxisFlow provides custom workflow automation solutions for boutique law firms. Our services include
                                    discovery, development, delivery, and ongoing support for legal process automation.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-medium text-foreground mb-4">3. User Responsibilities</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">As a user, you agree to:</p>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex gap-3">
                                        <span className="text-accent font-bold">•</span>
                                        <span>Provide accurate and complete information</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-accent font-bold">•</span>
                                        <span>Maintain confidentiality of login credentials</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-accent font-bold">•</span>
                                        <span>Use services only for lawful purposes</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-accent font-bold">•</span>
                                        <span>Not engage in unauthorized access or misuse</span>
                                    </li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-medium text-foreground mb-4">4. Intellectual Property Rights</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    All content, features, and functionality of our services are owned by PraxisFlow, its licensors, or other
                                    providers of such material and are protected by copyright and other intellectual property laws.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-medium text-foreground mb-4">5. Limitation of Liability</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    To the fullest extent permitted by law, PraxisFlow shall not be liable for any indirect, incidental,
                                    special, consequential, or punitive damages resulting from your use of or inability to use the services.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-medium text-foreground mb-4">6. Modifications to Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    PraxisFlow reserves the right to modify these terms at any time. Changes are effective immediately upon
                                    posting to the website. Your continued use of the service constitutes acceptance of the modified terms.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-medium text-foreground mb-4">7. Governing Law</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
                                    in which PraxisFlow operates, and you irrevocably submit to the exclusive jurisdiction of the courts in
                                    that location.
                                </p>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-medium text-foreground mb-4">8. Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have questions about these Terms, please contact us at{" "}
                                    <a href="mailto:legal@praxisflow.com" className="text-accent hover:text-accent/80 font-medium">
                                        legal@praxisflow.com
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
