import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CloseCta } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { TextLink, wrap } from "@/components/site/ui";
import { EngravedBand } from "@/components/site/Engraving";
import { successCases } from "@/lib/successCases";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
	return successCases.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const c = successCases.find((s) => s.id === id);
	if (!c) return {};
	const description = c.challenge.split(". ")[0] + ".";
	return {
		title: c.title,
		description,
		alternates: { canonical: `/case-studies/${c.id}` },
		openGraph: {
			title: `${c.title} | PraxisFlow`,
			description,
			url: `https://www.praxisflow.com/case-studies/${c.id}`,
			type: "article",
			images: [{ url: "/og-ai-employees.jpg", width: 1200, height: 630, alt: c.title }],
		},
	};
}

export default async function CaseStudyDetail({ params }: Props) {
	const { id } = await params;
	const c = successCases.find((s) => s.id === id);
	if (!c) notFound();
	const isIntake = c.id === "ai-whatsapp-intake";

	return (
		<div className="w-full">
			<section className="relative overflow-hidden border-b border-rule bg-white">
				<EngravedBand className="absolute inset-x-0 bottom-0 h-14 lg:h-20" />
				<div className={`${wrap} relative pb-28 pt-10 lg:pb-32`}>
					<Link href="/case-studies" className="group inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors duration-200 hover:text-ink">
						<ArrowLeft aria-hidden className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-x-1" strokeWidth={1.75} />
						All case studies
					</Link>
					<p className="mt-10 text-[12px] font-medium uppercase tracking-[0.16em] text-accent-ink">{c.industry}</p>
					<h1 className="mt-4 max-w-[22ch] font-serif text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-ink [text-wrap:balance]">
						{c.title}
					</h1>
					<dl className="mt-12 grid max-w-[52rem] border-t border-rule bg-white sm:grid-cols-3 sm:border-l [&>*]:border-b [&>*]:border-rule sm:[&>*]:border-r">
						{[
							["Client", c.clientName.charAt(0).toUpperCase() + c.clientName.slice(1)],
							["Key result", c.keyResult],
							["Timeline", c.timeline],
						].map(([k, v]) => (
							<div key={k} className="px-5 py-4 max-sm:px-0">
								<dt className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{k}</dt>
								<dd className="mt-1.5 font-serif text-[18px] leading-snug text-ink">{v}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			<article className="bg-white py-20 sm:py-24">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="space-y-14 lg:col-span-8">
						{[
							["The challenge", c.challenge],
							["Our solution", c.solution],
						].map(([h, body]) => (
							<Reveal key={h}>
								<h2 className="font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] text-ink">{h}</h2>
								<p className="mt-4 max-w-[64ch] text-[18px] leading-relaxed text-muted-foreground">{body}</p>
							</Reveal>
						))}
						<Reveal>
							<h2 className="font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] text-ink">Results & impact</h2>
							<ul className="mt-6 divide-y divide-rule border-y border-rule">
								{c.results.map((r) => (
									<li key={r} className="py-4 font-serif text-[20px] leading-snug text-ink">
										{r}
									</li>
								))}
							</ul>
						</Reveal>
					</div>
					<aside className="lg:col-span-3 lg:col-start-10">
						<div className="lg:sticky lg:top-24">
							<h2 className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Built with</h2>
							<ul className="mt-4 border-t border-rule">
								{c.software.map((s) => (
									<li key={s} className="border-b border-rule py-2.5 text-[15px] text-ink">
										{s}
									</li>
								))}
							</ul>
							{isIntake && (
								<TextLink href="/law-firm-intake-automation" className="mt-8">
									The Intake Coordinator
								</TextLink>
							)}
						</div>
					</aside>
				</div>
			</article>

			{c.testimonial && (
				<section className="border-t border-rule bg-white py-20">
					<figure className="mx-auto max-w-[860px] px-4 sm:px-6">
						<blockquote className="font-serif text-[clamp(1.35rem,2.4vw,1.8rem)] italic leading-[1.45] text-ink">
							&ldquo;{c.testimonial}&rdquo;
						</blockquote>
						<figcaption className="mt-6 text-[15px] text-muted-foreground">
							{c.testimonialAuthor}, {c.testimonialRole}
						</figcaption>
					</figure>
				</section>
			)}

			<CloseCta
				title="Want similar results for your firm?"
				body="Schedule a discovery call to explore which AI employees and automations fit your practice. Free consultation, no commitment required."
			/>
		</div>
	);
}
