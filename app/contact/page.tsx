import React from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
    title: "Contact",
    description: "Start your firm's transformation. Schedule a free workflow audit to identify your biggest automation opportunities.",
    keywords: [
        "Contact PraxisFlow",
        "Legal Automation Consultation",
        "Workflow Audit",
        "Law Firm Automation Help",
    ],
    openGraph: {
        title: "Contact Us | PraxisFlow",
        description: "Start your firm's transformation. Schedule a free workflow audit to identify your biggest automation opportunities.",
        url: "https://www.praxisflow.com/contact",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Contact PraxisFlow",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us | PraxisFlow",
        description: "Start your firm's transformation. Schedule a free workflow audit to identify your biggest automation opportunities.",
        images: ["/og-image.png"],
    },
};

export default function ContactPage() {
    return (
        <div className="w-full min-h-screen bg-background pt-24 pb-12 px-4 flex items-center justify-center">
            <div className="max-w-2xl w-full space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-border shadow-lg">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">Start Your Transformation</h1>
                    <p className="text-lg text-muted-foreground">
                        Schedule a free workflow audit to identify your firm's biggest automation opportunities.
                    </p>
                </div>

                <ContactForm />

                <div className="text-center pt-4 border-t border-border">
                    <p className="text-muted-foreground text-sm">
                        Prefer to email us directly? <a href="mailto:contact@praxisflow.com" className="text-primary hover:underline">contact@praxisflow.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
