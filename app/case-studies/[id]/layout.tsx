import type { Metadata } from "next";
import { successCases } from "@/lib/successCases";

// The detail page itself is a client component, so per-case metadata (title,
// description, and a self-referencing canonical) is set here in a colocated
// layout. Without this, these pages inherit the root canonical "/" and the
// site-wide default title.
export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const caseStudy = successCases.find((study) => study.id === id);

	if (!caseStudy) {
		return {
			title: "Case Study",
			alternates: { canonical: `/case-studies/${id}` },
		};
	}

	const description =
		caseStudy.challenge.length > 155
			? `${caseStudy.challenge.slice(0, 152).trimEnd()}…`
			: caseStudy.challenge;

	return {
		title: caseStudy.title,
		description,
		alternates: { canonical: `/case-studies/${id}` },
		openGraph: {
			title: `${caseStudy.title} | PraxisFlow`,
			description,
			url: `https://www.praxisflow.com/case-studies/${id}`,
			type: "article",
			images: [
				{
					url: "/og-image.webp",
					width: 1200,
					height: 630,
					alt: caseStudy.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${caseStudy.title} | PraxisFlow`,
			description,
			images: ["/og-image.webp"],
		},
	};
}

export default function CaseStudyDetailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
