import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { CALENDAR_URL } from "@/lib/site-content";
import { wrap } from "./ui";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; href: string; external?: boolean };

// Four even groups: they sit 4-across on desktop and 2 x 2 on phones, so no column is left alone.
const columns: { title: string; links: FooterLink[] }[] = [
	{
		title: "AI employees",
		links: [
			{ label: "All roles", href: "/ai-agents-for-law-firms" },
			{ label: "Intake Coordinator", href: "/law-firm-intake-automation" },
			{ label: "Onboarding Specialist", href: "/ai-client-onboarding-for-law-firms" },
			{ label: "Receptionist", href: "/ai-receptionist-for-law-firms" },
		],
	},
	{
		title: "Services",
		links: [
			{ label: "Law firm automation", href: "/law-firm-automation" },
			{ label: "Integrations", href: "/integrations" },
			{ label: "Case studies", href: "/case-studies" },
			{ label: "Pricing", href: "/pricing" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About", href: "/about" },
			{ label: "Security", href: "/security" },
			{ label: "Blog", href: "/blog" },
		],
	},
	{
		title: "Get in touch",
		links: [
			{ label: "Book a call", href: CALENDAR_URL, external: true },
			{ label: "Contact", href: "/contact" },
			{ label: "+1 (617) 315-6878", href: "https://wa.me/message/6NX4JMQ4A7L7I1", external: true },
		],
	},
];

const socials = [
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/praxisflowstrategies", Icon: Linkedin },
	{ label: "Facebook", href: "https://www.facebook.com/profile.php?id=61572337974311", Icon: Facebook },
	{ label: "Instagram", href: "https://www.instagram.com/praxisflowstrategies/", Icon: Instagram },
	{ label: "YouTube", href: "https://youtube.com/@praxisflow?si=CSOvYqiwZv8DRbUM", Icon: Youtube },
];

const heading = "text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground";

export default function SiteFooter() {
	return (
		<footer className="border-t border-rule bg-white text-[14px]">
			<div className={cn(wrap, "grid gap-12 py-16 lg:grid-cols-12 lg:gap-8")}>
				<div className="lg:col-span-4 lg:pr-8">
					<Link href="/" aria-label="PraxisFlow home" className="inline-block">
						<img src="/PraxisFlow-Logotipo-Base.svg" alt="PraxisFlow" width={140} height={28} className="h-7 w-auto" />
					</Link>
					<p className="mt-4 max-w-[34ch] leading-relaxed text-muted-foreground">
						AI employees for law firms, built in a private environment for each firm.
					</p>
					<div className="mt-8">
						<h2 className={heading}>Newsletter</h2>
						<p className="mb-4 mt-3 text-muted-foreground">Occasional notes on AI and automation for law firms.</p>
						<NewsletterForm />
					</div>
				</div>

				<nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
					{columns.map((col) => (
						<div key={col.title}>
							<h2 className={heading}>{col.title}</h2>
							<ul className="mt-4 space-y-2.5">
								{col.links.map((l) => (
									<li key={l.label}>
										<Link
											href={l.href}
											{...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
											className="whitespace-nowrap tabular-nums text-ink underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-accent"
										>
											{l.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
			</div>

			<div className="border-t border-rule">
				<div className={cn(wrap, "flex flex-col gap-4 py-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between")}>
					<p>© {new Date().getFullYear()} PraxisFlow Strategies LLC. All rights reserved.</p>
					<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
						<Link href="/privacy-policy" className="transition-colors duration-200 hover:text-ink">
							Privacy policy
						</Link>
						<Link href="/terms-of-use" className="transition-colors duration-200 hover:text-ink">
							Terms of use
						</Link>
						<div className="-mx-2 flex items-center">
							{socials.map(({ label, href, Icon }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noreferrer"
									aria-label={label}
									className="grid h-9 w-9 place-items-center transition-colors duration-200 hover:text-accent-ink"
								>
									<Icon className="h-4 w-4" strokeWidth={1.5} />
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
