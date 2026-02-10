import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Pricing",
    description: "Transparent, value-based investment for legal automation. No hourly billing, no surprises. Just clear ROI and a partnership built on trust.",
    keywords: [
        "Legal Automation Pricing",
        "Law Firm Automation Cost",
        "Legal Tech Pricing",
        "Automation Investment",
        "PraxisFlow Pricing",
    ],
    openGraph: {
        title: "Pricing | PraxisFlow",
        description: "Transparent, value-based investment for legal automation. No hourly billing, no surprises. Just clear ROI and a partnership built on trust.",
        url: "https://www.praxisflow.com/pricing",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "PraxisFlow Pricing",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing | PraxisFlow",
        description: "Transparent, value-based investment for legal automation. No hourly billing, no surprises.",
        images: ["/og-image.png"],
    },
}

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
