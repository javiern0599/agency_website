import { CALENDAR_URL, customWork, hero, security, testimonial } from "@/lib/site-content";
import { ArrowButton, wrap } from "./ui";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import { EngravedBand, Rosette } from "./Engraving";

/** LexSelect's public testimonial, verbatim. The only named client on the site. */
export function Testimonial({ className }: { className?: string }) {
	return (
		<section className={cn("bg-white py-24 sm:py-28", className)}>
			<Reveal>
				<figure className="mx-auto max-w-[920px] px-4 sm:px-6">
					<blockquote className="text-center font-serif text-[clamp(1.35rem,2.4vw,1.9rem)] italic leading-[1.45] text-ink">
						&ldquo;{testimonial.quote}&rdquo;
					</blockquote>
					<figcaption className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-4">
						<div className="flex items-center gap-3">
							<img src={testimonial.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
							<div>
								<p className="font-medium text-ink">{testimonial.name}</p>
								<p className="text-[14px] text-muted-foreground">{testimonial.title}</p>
							</div>
						</div>
						<span aria-hidden className="hidden h-8 w-px bg-rule sm:block" />
						<a href={testimonial.url} target="_blank" rel="noopener noreferrer" className="opacity-80 transition-opacity duration-200 hover:opacity-100">
							<img src={testimonial.logo} alt="LexSelect" className="h-5 w-auto" />
						</a>
					</figcaption>
				</figure>
			</Reveal>
		</section>
	);
}

/** Custom automation and the private environment, side by side on the ink band. */
export function CustomAndSecurity({ id = "custom" }: { id?: string }) {
	return (
		<section id={id} className="bg-ink py-24 text-white">
			<div className={cn(wrap, "grid gap-16 lg:grid-cols-2")}>
				{[customWork, security].map((c, i) => (
					<Reveal key={c.title} delay={i * 0.08}>
						<h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">{c.title}</h2>
						<p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-slate-300">{c.body}</p>
						<ArrowButton href={c.href} variant="inverse" className="mt-8">
							{i === 0 ? "Custom automation" : "How we protect your data"}
						</ArrowButton>
					</Reveal>
				))}
			</div>
		</section>
	);
}

/** Closing call to action on the desk surface. */
export function CloseCta({
	title = "Start with your first AI employee.",
	body = "Start with the Intake Coordinator, or tell us where your firm loses the most time. One call, no commitment.",
}: {
	title?: string;
	body?: string;
}) {
	return (
		<section className="relative overflow-hidden bg-ink py-24 text-white sm:py-28">
			<div aria-hidden className="absolute -right-40 top-1/2 hidden aspect-square h-[170%] -translate-y-1/2 lg:block">
				<Rosette tone="dark" className="h-full w-full" />
			</div>
			<EngravedBand tone="dark" className="absolute inset-x-0 bottom-0 h-12 lg:hidden" />
			<div className={cn(wrap, "relative")}>
				<Reveal>
					<h2 className="max-w-[18ch] font-serif text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-white [text-wrap:balance]">
						{title}
					</h2>
					<p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-slate-300">{body}</p>
					<div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
						<ArrowButton href={CALENDAR_URL} variant="inverse">{hero.primary}</ArrowButton>
						<ArrowButton href="/contact" variant="plainLight">Write to us instead</ArrowButton>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
