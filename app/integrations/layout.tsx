import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Integrations",
    description: "Connect any tool and automate everything. Bridge the gap between your Practice Management System and 1000+ productivity tools with custom n8n workflows.",
    keywords: [
        "Legal Integrations",
        "Practice Management Integrations",
        "n8n Workflows",
        "Legal Tech Integrations",
        "Clio Integration",
        "Law Firm Software Integration",
    ],
    openGraph: {
        title: "Integrations | PraxisFlow",
        description: "Connect any tool and automate everything. Bridge the gap between your Practice Management System and 1000+ productivity tools with custom n8n workflows.",
        url: "https://www.praxisflow.com/integrations",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "PraxisFlow Integrations",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Integrations | PraxisFlow",
        description: "Connect any tool and automate everything. Bridge the gap between your Practice Management System and 1000+ productivity tools.",
        images: ["/og-image.png"],
    },
}

export default function IntegrationsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
