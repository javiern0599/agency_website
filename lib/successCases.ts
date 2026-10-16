// Figures are marketing figures, phrased "typically" / "up to" (Javier, 2026-10-14).
// The intake client stays anonymous until they give permission to be named.

export interface CaseStudy {
	id: string;
	clientName: string;
	title: string;
	industry: string;
	challenge: string;
	solution: string;
	results: string[];
	testimonial?: string;
	testimonialAuthor?: string;
	testimonialRole?: string;
	software: string[];
	timeline: string;
	keyResult: string;
}

export const successCases: CaseStudy[] = [
	{
		id: "ai-whatsapp-intake",
		clientName: "a Boston immigration law firm",
		title: "AI-Powered WhatsApp Intake & Qualification Bot",
		industry: "Intake",
		challenge:
			"Managing a high volume of leads from social media ads was overwhelming the manual intake team. Response times were lagging, and many inquiries were unqualified, wasting valuable attorney time on non-viable cases.",
		solution:
			"We deployed a sophisticated n8n-powered WhatsApp chatbot using the official Business API. Featuring persistent memory and human-like interaction, the bot qualifies leads in real-time. Successful leads are automatically synced to Airtable, an intake email is dispatched, and consultations are scheduled via Outlook and Calendly integration. The system seamlessly escalates complex queries to the human team when necessary.",
		results: [
			"Every ad lead answered instantly, day or night",
			"Typically no staff time spent on first-round qualification",
			"Up to 50% more scheduled intake appointments",
			"Seamless human escalation for high-value inquiries",
		],
		software: [
			"n8n",
			"WhatsApp Business API",
			"Airtable",
			"Outlook",
			"Calendly",
		],
		timeline: "4 weeks development",
		keyResult: "Instant 24/7 Lead Qualification",
	},
	{
		id: "marketing-command-center",
		clientName: "Professional Services Client",
		title: "Multi-Platform Social Media Automation Hub",
		industry: "Marketing",
		challenge:
			"Maintaining a consistent social media presence across multiple platforms was a fragmented, time-consuming process. The firm lacked a centralized system for scheduling posts and tracking engagement metrics effectively.",
		solution:
			"We developed a 'Marketing Command Center' leveraging Airtable and n8n. The team simply populates an Airtable record with copy, media (carousels, images, or videos), and scheduled times. n8n automatically handles the cross-platform distribution. Post-publication, a secondary workflow retrieves engagement metrics and populates an automated dashboard for performance monitoring.",
		results: [
			"Centralized management for 5+ social platforms",
			"Up to 80% less time spent on manual posting",
			"Automated performance tracking and ROI analysis",
			"Consistent brand presence with zero-effort scheduling",
		],
		software: [
			"n8n",
			"Airtable",
			"Instagram API",
			"LinkedIn API",
			"Facebook Graph API",
		],
		timeline: "3 weeks development",
		keyResult: "Up to 80% Faster Content Deployment",
	},
	{
		id: "billing-revenue-automation",
		clientName: "Legal Services Client",
		title: "Zero-Touch Payment & Revenue Tracking System",
		industry: "Billing & Invoicing",
		challenge:
			"Manual reconciliation of payments received via practice management tools was error-prone and delayed financial reporting. Tracking revenue by case type and date required hours of manual spreadsheet updates every month.",
		solution:
			"We architected an automated billing bridge between DocketWise, n8n, and Airtable. The moment a payment confirmation is detected, the workflow identifies the client, links the payment to their record, and categorizes revenue by case type and date. This creates a real-time financial overview of the firm's health without any manual data entry.",
		results: [
			"Real-time, autonomous payment reconciliation",
			"Zero manual data entry for billing records",
			"Instant visibility into revenue by practice area/date",
			"Eliminated human error in financial tracking",
		],
		software: ["n8n", "DocketWise", "Airtable", "Webhooks"],
		timeline: "2 weeks development",
		keyResult: "Fully Automated Reconciliation",
	},
	{
		id: "lead-nurture-engine",
		clientName: "High-Growth Firm",
		title: "Automated Lead Nurture & Conversion Sequence",
		industry: "Marketing",
		challenge:
			"Leads who expressed interest but didn't immediate book a strategy session were often falling through the cracks. Manual follow-up was inconsistent, and simple plain-text emails failed to maintain the professional authority needed to close.",
		solution:
			"We implemented a sophisticated email follow-up engine. Leads who haven't scheduled a strategy session are automatically entered into a tailored sequence. The system uses high-end, styled HTML templates addressing practice-specific pain points. These 'authority-building' touches keep the firm top-of-mind and increase conversion rates without any staff intervention.",
		results: [
			"Up to 40% more leads converted to consultations",
			"Consistent, high-authority brand communication",
			"Dynamic logic based on lead interest type",
			"Significant reduction in manual sales follow-ups",
		],
		software: ["n8n", "Airtable", "SMTP", "HTML/CSS Branding"],
		timeline: "3 weeks development",
		keyResult: "Up to 40% Higher Conversion",
	},
];

export async function getSuccessCaseData(
	id: string,
): Promise<CaseStudy | undefined> {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 100));
	return successCases.find((c) => c.id === id);
}
