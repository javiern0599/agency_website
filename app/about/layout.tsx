import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us",
    description: "Engineering the future of legal operations. We simplify complex workflows through intelligent automation, allowing attorneys to focus on billable work.",
    keywords: [
        "About PraxisFlow",
        "Legal Automation Agency",
        "Legal Operations",
        "Law Firm Efficiency",
        "Automation Engineers",
    ],
    openGraph: {
        title: "About Us | PraxisFlow",
        description: "Engineering the future of legal operations. We simplify complex workflows through intelligent automation.",
        url: "https://www.praxisflow.com/about",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "About PraxisFlow",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | PraxisFlow",
        description: "Engineering the future of legal operations. We simplify complex workflows through intelligent automation.",
        images: ["/og-image.png"],
    },
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
