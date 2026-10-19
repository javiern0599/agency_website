// Site copy for the AI employees positioning.
// Role copy follows the specs Javier confirmed on 2026-10-14. No numbers or
// results for roles that are not built yet; the only role figure used is the
// confirmed onboarding time. LexSelect is the only client named anywhere.

export const CALENDAR_URL = "https://calendar.app.google/AtTiu5d3kd2EwumQ8";

// Six links: what we offer, proof, price, trust, who we are. Blog lives in the footer
// (its readers mostly arrive from search, not from the menu).
export const nav = [
	{ label: "AI Employees", href: "/ai-agents-for-law-firms" },
	{ label: "Custom Automation", href: "/law-firm-automation" },
	{ label: "Case Studies", href: "/case-studies" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Security", href: "/security" },
	{ label: "About", href: "/about" },
];

export const hero = {
	title: "AI employees for law firms.",
	sub: "AI staff for intake, reception, drafting and follow-up. We build each one, set it up in your firm's tools and maintain it for you.",
	primary: "Book a discovery call",
	secondary: "Meet the staff",
	short: "Book a call",
};

export type Role = {
	slug: string;
	title: string;
	initials: string;
	summary: string;
	does: string[];
	worksIn: string;
	never: string;
	handsOff: string;
	figure?: string;
	href?: string;
};

export const roles: Role[] = [
	{
		slug: "intake-coordinator",
		title: "Intake Coordinator",
		initials: "IC",
		summary:
			"Answers every new inquiry on WhatsApp and your website chat, day and night, in each client's own language.",
		does: [
			"Qualifies each lead by your firm's own rules and collects the facts",
			"Books the consultation, then sends the confirmation and reminders",
			"Creates the lead in your CRM with the full conversation attached",
			"Sends the owner a summary of the day's inquiries",
		],
		worksIn: "WhatsApp, website chat, your CRM, email and calendar",
		never: "Quotes fees you haven't approved, promises outcomes or decides conflicts.",
		handsOff:
			"When someone asks for a person, when it isn't sure, or on a sensitive topic. Then it goes quiet.",
		href: "/law-firm-intake-automation",
	},
	{
		slug: "onboarding-specialist",
		title: "Onboarding Specialist",
		initials: "OS",
		summary:
			"Sets up each new client the moment they sign: records, billing, matter folder, engagement documents and a welcome email.",
		does: [
			"Starts when your firm confirms a new client in your CRM",
			"Creates the client record, billing account and matter",
			"Generates engagement documents from your templates and files them",
			"Sends a welcome email written for the matter type",
		],
		worksIn: "Your CRM, billing system, document templates, file storage and email",
		never: "Signs anything on the firm's behalf.",
		handsOff: "When something is missing or unclear, it asks your staff instead of guessing.",
		figure: "About 40 seconds per new client, down from 25 to 40 minutes by hand.",
		href: "/ai-client-onboarding-for-law-firms",
	},
	{
		slug: "receptionist",
		title: "Receptionist",
		initials: "RC",
		summary:
			"Answers your phone line around the clock, books consultations and puts a person on the line when one is needed.",
		does: [
			"Qualifies new callers and creates the lead",
			"Recognizes existing clients and looks up their matter",
			"Checks availability, then books, reschedules or cancels consultations",
		],
		worksIn: "Your phone line, calendar and CRM. Works alone or alongside the Intake Coordinator.",
		never: "Gives legal advice or tells a caller how their case will go.",
		handsOff: "Transfers the call to your staff when the caller asks or the call needs a person.",
		href: "/ai-receptionist-for-law-firms",
	},
	{
		slug: "ai-paralegal",
		title: "AI Paralegal",
		initials: "PL",
		summary:
			"Prepares first drafts, document summaries and exhibit lists from the intake record and your firm's templates.",
		does: [
			"Drafts from the intake record and your templates",
			"Summarizes documents and builds exhibit lists",
			"Writes everything to the matter folder",
		],
		worksIn: "Your templates, matter folders and CRM",
		never: "Sends anything to a client, a court or opposing counsel.",
		handsOff: "Every draft goes to an attorney for review before it is used.",
	},
	{
		slug: "docketing-clerk",
		title: "Deadline and Docketing Clerk",
		initials: "DC",
		summary:
			"Reads court notices as they arrive by email and proposes the calendar entries, with the source notice attached.",
		does: [
			"Reads court notices from the firm's inbox",
			"Proposes calendar entries with the source attached",
			"Keeps a record of what was proposed and confirmed",
		],
		worksIn: "Your inbox and the firm calendar",
		never: "Puts a deadline on the calendar without a person confirming it.",
		handsOff: "A person confirms every entry before it counts.",
	},
	{
		slug: "case-status-assistant",
		title: "Case Status Assistant",
		initials: "CS",
		summary:
			"Answers the question every client asks, where is my case, on WhatsApp and email, using your firm's approved wording.",
		does: [
			"Answers from the status fields in your CRM",
			"Uses only wording the firm has approved",
			"Sends an update on its own when a status changes",
		],
		worksIn: "WhatsApp, email and your CRM",
		never: "Predicts outcomes or timelines.",
		handsOff: "Any question beyond the case status goes to your staff.",
	},
	{
		slug: "follow-up-coordinator",
		title: "Follow-up Coordinator",
		initials: "FC",
		summary:
			"Keeps in touch with leads who haven't booked, for weeks if needed, until they book or say no.",
		does: [
			"Sends a multi-week email sequence written for your practice",
			"Stops the moment the lead replies",
			"Records every touch in your CRM",
		],
		worksIn: "Email and your CRM",
		never: "Keeps writing after someone replies or asks to stop.",
		handsOff: "Every reply goes straight to your team.",
	},
	{
		slug: "filings-clerk",
		title: "Filings Clerk",
		initials: "FL",
		summary:
			"Turns a newly submitted complaint into a structured matter in your CRM, with every citation checked against the page it came from.",
		does: [
			"Splits the PDF into page-level sections using LexSelect's document parsing",
			"Extracts the matter data in a fixed structure",
			"Checks every citation against the text of its page",
			"Creates the matter as Ready or Needs review, with an email summary",
		],
		worksIn: "LexSelect, your CRM and email",
		never: "Files anything with a court.",
		handsOff: "Anything it cannot verify is marked Needs review for your staff.",
	},
];

export type MoreRole = { title: string; line: string; never?: string };

export const moreRoles: MoreRole[] = [
	{ title: "Inbox and Records Clerk", line: "Files every email and attachment to the right client or lead in your CRM." },
	{ title: "Billing Clerk", line: "Records payments and retainers from email into your CRM." },
	{
		title: "Records Summarizer",
		line: "Turns medical, police and employment records into a dated summary for the attorney, with every entry linked to its source page.",
		never: "Draws legal conclusions. The attorney reviews every summary.",
	},
	{
		title: "Timekeeping Assistant",
		line: "Drafts time entries for each matter from your emails, calls and calendar, so attorneys review and approve instead of reconstructing their day.",
		never: "Submits or sends a bill.",
	},
];

export const sharedNever = [
	"Give legal advice",
	"Sign or file anything",
	"Contact courts or opposing counsel",
	"Move money",
	"Delete records",
];

export const sharedHandOff =
	"Every role hands off when someone asks for a person, when it isn't sure, and on sensitive topics: complaints, fee disputes and emergencies.";

export const hiring = [
	{ title: "Onboarding", body: "A short form and a call to learn your rules, your tools and the wording you approve." },
	{ title: "Build and test", body: "We build the role in your private environment and run it through scripted test conversations." },
	{ title: "Shadow mode", body: "It drafts, your staff approve. Nothing goes out on its own until you're satisfied." },
	{ title: "Live, and maintained", body: "We maintain it, fix it if anything fails and keep it running as your tools change." },
];

// Illustrative intake conversation. Fictional names and details.
export type Msg = { from: "lead" | "agent"; text: string; time?: string; limit?: boolean };

export const conversation: Msg[] = [
	{
		from: "lead",
		time: "Saturday, 9:47 PM",
		text: "Hi, my wife has her green card interview coming up and we'd like a lawyer to help us prepare.",
	},
	{
		from: "agent",
		text: "Thanks for reaching out. I can book you a consultation with one of our attorneys. What's your name, and when is the interview?",
	},
	{
		from: "lead",
		text: "I'm Daniel. The letter says November 14, here in Boston. Do you think she'll be approved?",
	},
	{
		from: "agent",
		limit: true,
		text: "Only an attorney can assess that; I can't give legal opinions. I can book you a consultation this week: Tuesday 10:00 AM or Wednesday 2:30 PM?",
	},
	{ from: "lead", text: "Tuesday at 10 works." },
	{
		from: "agent",
		text: "You're booked for Tuesday at 10:00 AM by video. You'll get a confirmation by email and a reminder on Monday.",
	},
];

export const booking = {
	title: "Consultation with Daniel",
	when: "Tuesday, 10:00 to 10:30 AM",
	where: "Video call",
	note: "Green card interview on Nov 14. Booked by the Intake Coordinator on WhatsApp.",
};

export const crmRecord: [string, string][] = [
	["Name", "Daniel"],
	["Channel", "WhatsApp"],
	["Matter type", "Family-based adjustment of status"],
	["Key date", "USCIS interview, Nov 14, Boston"],
	["Status", "Consult booked"],
	["Conversation", "Attached"],
];

export const summaryEmail = {
	subject: "Intake summary for Saturday",
	lines: [
		"Daniel: green card interview Nov 14. Consult booked Tuesday 10:00 AM.",
		"One conversation handed to staff: a question about fees.",
	],
};

// The home page sequence continues past intake: the client signs and the
// Onboarding Specialist sets them up. Generic tool words only (no product names).
export const onboardingRun = {
	when: "Thursday, 9:05 AM",
	trigger: "Started when the team marked the engagement as signed in the CRM.",
	steps: [
		"Client record created in the CRM",
		"Billing account and retainer set up",
		"Matter folder created in the firm's file storage",
		"Engagement documents generated from the firm's templates and filed",
		"Welcome email sent, written for the matter type",
	],
	result: "Done in about 40 seconds. By hand, it took 25 to 40 minutes.",
};

export const ownerSummary = {
	subject: "Daily summary for Thursday",
	lines: [
		"Daniel: engagement signed this morning after Tuesday's consultation. Client set up.",
		"One inquiry handed to staff: a question about fees.",
	],
};

export const testimonial = {
	quote: "PraxisFlow ran one of the most thorough evaluations of LexSelect we've seen. They tested on real court filings, checked every citation against the source and provided detailed feedback our team could act on immediately. Their technical rigour and attention to detail stood out.",
	name: "Morgan Maguire",
	title: "Co-Founder & CEO, LexSelect",
	photo: "/testimonials/morgan-maguire.webp",
	logo: "/testimonials/lexselect-logo.svg",
	url: "https://www.lexselect.io",
};

export const customWork = {
	title: "Custom automation and integrations",
	body: "The same engine that runs every role, built around a workflow only your firm has. We connect Clio, Filevine, Outlook, SharePoint, Airtable and the rest of your stack.",
	href: "/law-firm-automation",
};

export const security = {
	title: "A private environment for each firm",
	body: "Every role runs on your firm's own server, on AWS or Hetzner, never shared with another firm. We maintain it for you, and your client data stays yours: encrypted, backed up and monitored.",
	href: "/security",
};

// Pricing. Proposed 2026-10-15 from a market check, NOT yet approved by Javier's partner.
// Reference points: self-serve AI receptionists ~$95-500/month; done-for-you agent builds
// ~$500-5,000+ setup plus $100-3,000/month; a template seller at $1,497 per agent, one-off,
// no ongoing support. PraxisFlow sits above template sellers because every role is
// integrated into the firm's own tools, tested in shadow mode, hosted privately and tuned
// every month. Change the figures here and every page that shows them follows.
export const pricing = {
	role: { setup: "$2,500", monthly: "$500" },
	extraRole: { setup: "$1,500", monthly: "$300" },
	automation: { build: "$2,000", support: "$250" },
	annualDiscount: "10%",
};

export type Faq = { question: string; answer: string; linkText?: string; linkHref?: string };

export const homeFaqs: Faq[] = [
	{
		question: "What is an AI employee?",
		answer: "An AI agent built for one role in your firm, such as intake or reception. It works in the tools you already use, follows written rules your firm approves, and hands the conversation to a person when it should.",
	},
	{
		question: "Are these real people?",
		answer: "No. They are AI agents we build, set up and maintain in your firm's own environment. The staff language is how we define each one: written duties, written limits, and when a person takes over.",
	},
	{
		question: "Will it give legal advice?",
		answer: "No. None of our AI employees give legal advice, sign or file anything, contact courts or opposing counsel, move money or delete records. When someone asks for an opinion, the agent says only an attorney can give one and offers a consultation instead.",
	},
	{
		question: "What happens when it isn't sure?",
		answer: "It hands off. Every role passes the conversation to your staff when someone asks for a person, when it isn't sure, and on sensitive topics such as complaints, fee disputes and emergencies.",
	},
	{
		question: "Where does our client data live?",
		answer: "On your firm's own server, on Amazon Web Services (AWS) or Hetzner, never shared with another firm. We maintain it for you, and if you ever want it in your own name, we hand it over. Data is encrypted, backed up and monitored. Our security page has the details.",
		linkText: "security page",
		linkHref: "/security",
	},
	{
		question: "Do we have to change our software?",
		answer: "No. Each role works inside the tools you already use, such as WhatsApp, your phone line, Microsoft 365 or Google, and your CRM.",
	},
	{
		question: "Which role should we start with?",
		answer: "Usually the Intake Coordinator, because an inquiry nobody answers tonight is often a client who calls another firm tomorrow. On a discovery call we look at where your firm loses the most time and recommend a first role from there.",
	},
	{
		question: "What does it cost?",
		answer: `An AI employee starts at ${pricing.role.setup} to set up and ${pricing.role.monthly} a month per role, which covers maintenance, monitoring and tuning. Your firm's server and AI usage are billed separately, by the providers. Custom automation starts at ${pricing.automation.build} as a fixed-price project. Your exact price is agreed after a discovery call, before any work starts. Our pricing page has the details.`,
		linkText: "pricing page",
		linkHref: "/pricing",
	},
];
