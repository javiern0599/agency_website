import React from "react";

const JsonLd = () => {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		name: "PraxisFlow",
		url: "https://www.praxisflow.com",
		logo: "https://www.praxisflow.com/favicon-32x32.png",
		description:
			"We simplify complex legal operations through intelligent, custom automation.",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Westford",
			addressRegion: "MA",
			addressCountry: "US",
		},
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer service",
			email: "contact@praxisflow.com",
		},
		sameAs: [
			"https://twitter.com/praxisflow",
			"https://www.linkedin.com/company/praxisflow",
		],
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
};

export default JsonLd;
