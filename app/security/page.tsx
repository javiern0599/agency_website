import React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Lock, Shield, Eye, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Security",
    description: "Your legal workflows and sensitive data are protected through dedicated infrastructure, strict access controls, and layered safeguards.",
    keywords: [
        "Legal Data Security",
        "Law Firm Compliance",
        "Automation Security",
        "Data Protection",
        "GDPR Compliance",
    ],
    openGraph: {
        title: "Security & Compliance | PraxisFlow",
        description: "Your legal workflows and sensitive data are protected through dedicated infrastructure and layered safeguards.",
        url: "https://www.praxisflow.com/security",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "PraxisFlow Security Standards",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Security & Compliance | PraxisFlow",
        description: "Your legal workflows and sensitive data are protected through dedicated infrastructure and layered safeguards.",
        images: ["/og-image.png"],
    },
};

export default function SecurityPage() {
    const lastUpdated = "November 25, 2025";

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
                                Security
                            </h1>
                            <p className="text-muted-foreground">
                                Last updated: {lastUpdated}
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="space-y-16">
                            {/* Intro */}
                            <div className="text-center max-w-3xl mx-auto">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Your legal workflows and sensitive data are protected through diligence, control, and layered technical safeguards.
                                </p>
                            </div>

                            {/* Key Features Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group relative">
                                    <div className="bg-card backdrop-blur-xl border-2 border-border p-8 rounded-2xl hover:border-accent/50 transition-all duration-300 h-full overflow-hidden">
                                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                                            <Lock className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">Dedicated Infrastructure</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Private, dedicated server environment ensuring your data is isolated from other clients and public internet traffic.
                                        </p>
                                    </div>
                                </div>

                                <div className="group relative">
                                    <div className="bg-card backdrop-blur-xl border-2 border-border p-8 rounded-2xl hover:border-accent/50 transition-all duration-300 h-full overflow-hidden">
                                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">Robust Encryption</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Industry-standard encryption safeguarding data at rest and in transit, including workflow credentials.
                                        </p>
                                    </div>
                                </div>

                                <div className="group relative">
                                    <div className="bg-card backdrop-blur-xl border-2 border-border p-8 rounded-2xl hover:border-accent/50 transition-all duration-300 h-full overflow-hidden">
                                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                                            <Eye className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">Strict Access Control</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Access restricted using cryptographic keys and Multi-Factor Authentication (MFA) for all critical accounts.
                                        </p>
                                    </div>
                                </div>

                                <div className="group relative">
                                    <div className="bg-card backdrop-blur-xl border-2 border-border p-8 rounded-2xl hover:border-accent/50 transition-all duration-300 h-full overflow-hidden">
                                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">Multi-layered Encrypted Backups</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Critical system data is encrypted and securely archived daily to an off-site storage vault for continuity.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Sections */}
                            <div className="space-y-12">
                                {/* Dedicated & Managed Infrastructure */}
                                <section>
                                    <h2 className="text-2xl font-medium text-foreground mb-6">1. Dedicated & Managed Infrastructure</h2>
                                    <p className="text-muted-foreground mb-6">
                                        Our workflows run on a private, dedicated server environment, ensuring your data is isolated from other clients and public internet traffic.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            <span><strong>Robust Encryption:</strong> All data, including workflow credentials and sensitive client information, is protected with industry-standard encryption standards, safeguarding data at rest and in transit.</span>,
                                            <span><strong>Platform Stability:</strong> The infrastructure is professionally managed and benefits from the physical and network security standards of our chosen VPS provider. We perform regular vulnerability scanning and patching to maintain system integrity.</span>
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-start">
                                                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                {/* Strict Access Control */}
                                <section>
                                    <h2 className="text-2xl font-medium text-foreground mb-6">2. Strict Access Control</h2>
                                    <p className="text-muted-foreground mb-6">
                                        Access to both the application and the underlying server is severely restricted using multiple authentication steps.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            <span><strong>Server Access (SSH):</strong> Access to the VPS is secured using cryptographic keys and is restricted to pre-authorized personnel. We enforce Multi-Factor Authentication (MFA) for all critical administrative accounts.</span>,
                                            <span><strong>Application Access (n8n):</strong> All users accessing the workflow application must utilize Multi-Factor Authentication (MFA).</span>,
                                            <span><strong>Audit Logging:</strong> All user activities, changes, and workflow executions are meticulously logged and retained, providing a clear audit trail for compliance and review.</span>
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-start">
                                                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                {/* Data Protection and Continuity */}
                                <section>
                                    <h2 className="text-2xl font-medium text-foreground mb-6">3. Data Protection and Continuity</h2>
                                    <p className="text-muted-foreground mb-6">
                                        We ensure your automated processes are resilient and your data is recoverable under any circumstance.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            <span><strong>Multi-Layered Backups:</strong> Critical system data and workflow configurations are encrypted on our server and then securely archived daily to an off-site storage vault.</span>,
                                            <span><strong>Least Privilege Access:</strong> We configure integrations to require only the minimum permissions and authorizations necessary for your workflows to run, ensuring only the necessary access to your platforms.</span>
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-start">
                                                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                {/* Legal Standards & Reporting*/}
                                <section>
                                    <h2 className="text-2xl font-medium text-foreground mb-6">4. Alignment with Legal Standards & Reporting</h2>
                                    <p className="text-muted-foreground mb-6">
                                        We ensure your automated processes are resilient and your data is recoverable under any circumstance.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            <span><strong>Regulatory Alignment:</strong> Our security controls and data handling procedures are built to align with the core principles of data protection regulations (like GDPR and HIPAA), focusing on confidentiality and data integrity.</span>,
                                            <span><strong>Custom Compliance:</strong> If you have specific regulatory requirements, we work directly with your compliance team to ensure our workflows adhere to your established protocols.</span>
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-start">
                                                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                {/* Report Issue */}
                                <section>
                                    <h2 className="text-2xl font-medium text-foreground mb-4">Report a Security Issue</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        If you discover a security vulnerability, please report it responsibly to{" "}
                                        <a href="mailto:security@praxisflow.com" className="text-accent hover:text-accent/80 font-medium">
                                            security@praxisflow.com
                                        </a>
                                        . We appreciate your help in keeping PraxisFlow secure.
                                    </p>
                                </section>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </main>
        </div>
    );
}
