import type { Metadata } from "next";

export const metadata: Metadata = {
	alternates: { canonical: "/pricing" },
	title: "Pricing",
	description:
		"AI employees for law firms from $2,500 setup and $500 a month per role, or custom automation from $2,000 per project. Fixed quotes, no hourly billing, no long-term contract.",
	keywords: [
		"AI employees for law firms pricing",
		"AI receptionist for law firms cost",
		"Legal Automation Pricing",
		"Law Firm Automation Cost",
		"Legal Tech Pricing",
		"Automation Investment",
		"PraxisFlow Pricing",
	],
	openGraph: {
		title: "Pricing | PraxisFlow",
		description:
			"AI employees for law firms from $2,500 setup and $500 a month per role, or custom automation from $2,000 per project. Fixed quotes, no hourly billing, no long-term contract.",
		url: "https://www.praxisflow.com/pricing",
		type: "website",
		images: [
			{
				url: "/og-image.webp",
				width: 1200,
				height: 630,
				alt: "PraxisFlow Pricing",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Pricing | PraxisFlow",
		description:
			"AI employees from $2,500 setup and $500 a month per role. Custom automation from $2,000. Fixed quotes, no long-term contract.",
		images: ["/og-image.webp"],
	},
};

export default function PricingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
