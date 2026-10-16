import { successCases } from "@/lib/successCases";
import { ArticleHeading, TextLink, wrap } from "./ui";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** The anonymous intake case study, set as a short brief. */
export function CaseBrief({ n, tinted }: { n?: string; tinted?: boolean }) {
	const c = successCases.find((s) => s.id === "ai-whatsapp-intake")!;
	return (
		<section className={cn("border-t border-rule py-24 sm:py-28", tinted ? "bg-desk" : "bg-white")}>
			<div className={cn(wrap, "grid gap-12 lg:grid-cols-12")}>
				<div className="lg:col-span-5">
					<ArticleHeading n={n}>In practice</ArticleHeading>
					<p className="mt-5 max-w-[40ch] text-[18px] leading-relaxed text-muted-foreground">
						The Intake Coordinator at {c.clientName}, answering leads from the firm&apos;s social media ads.
					</p>
					<TextLink href={`/case-studies/${c.id}`} className="mt-8">
						Read the case study
					</TextLink>
				</div>
				<Reveal className="lg:col-span-7">
					<div className="border-t border-ink pt-6 font-serif">
						<p className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">The problem</p>
						<p className="mt-2 text-[19px] leading-[1.55] text-ink">{c.challenge}</p>
						<p className="mt-8 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">What changed</p>
						<ul className="mt-3 divide-y divide-rule border-y border-rule">
							{c.results.map((r) => (
								<li key={r} className="py-3 text-[19px] leading-snug text-ink">
									{r}
								</li>
							))}
						</ul>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
