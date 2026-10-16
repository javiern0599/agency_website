import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleHeading, wrap } from "./ui";
import { cn } from "@/lib/utils";

// Blog posts linked from the service pages. Internal links from strong pages help Google
// index posts it has "discovered" but not indexed yet. Titles mirror the live posts in Strapi;
// if a slug changes there, update it here.
export const posts = {
	fiveAutomations: { slug: "5-automations-every-firm-needs", title: "5 Automations Every Firm Needs to Implement Today" },
	hiddenCost: {
		slug: "the-hidden-cost-of-outdated-legal-operations",
		title: "The Hidden Cost of Outdated Legal Operations: And Why Modern Firms Are Rebuilding Their Internal Systems",
	},
	immigrationAgility: {
		slug: "the-new-competitive-advantage-in-immigration-law",
		title: "The New Competitive Advantage in Immigration Law Isn't AI, It's Operational Agility",
	},
	immigrationOperations: {
		slug: "the-next-generation-of-immigration-law-firms-will-compete-on-operations-not-hours",
		title: "The Next Generation of Immigration Law Firms Will Compete on Operations, Not Hours",
	},
	securityRethink: { slug: "why-large-law-firms-are-rethinking-legal-tech-security", title: "Why Large Law Firms Are Rethinking Legal Tech Security" },
} as const;

type Post = (typeof posts)[keyof typeof posts];

export function RelatedReading({ items, tinted }: { items: Post[]; tinted?: boolean }) {
	return (
		<section className={cn("border-t border-rule py-20 sm:py-24", tinted ? "bg-desk" : "bg-white")}>
			<div className={cn(wrap, "grid gap-10 lg:grid-cols-12")}>
				<div className="lg:col-span-4">
					<ArticleHeading>Related reading</ArticleHeading>
				</div>
				<ul className="border-t border-ink lg:col-span-8">
					{items.map((p) => (
						<li key={p.slug} className="border-b border-rule">
							<Link href={`/blog/${p.slug}`} className="group relative flex items-start justify-between gap-6 py-5">
								<span className="font-serif text-[19px] leading-snug text-ink sm:text-[21px]">{p.title}</span>
								<ArrowRight aria-hidden className="mt-1.5 h-4 w-4 shrink-0 text-ink transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.75} />
								<span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out will-change-transform group-hover:scale-x-100" />
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
