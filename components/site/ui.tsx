import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EngravedBand } from "./Engraving";

// Shared building blocks for the "Terms of Engagement" design.
// Caslon (font-serif) carries headings and documents; Public Sans (font-sans) the interface.

export const wrap = "mx-auto w-full max-w-[1240px] px-4 sm:px-6";

type ButtonProps = {
	children: React.ReactNode;
	href: string;
	variant?: "solid" | "inverse" | "plain" | "plainLight";
	className?: string;
};

/** Primary action. The arrow nudges right on hover; it never moves on touch. */
export function ArrowButton({ children, href, variant = "solid", className }: ButtonProps) {
	const external = href.startsWith("http");
	const styles = {
		solid: "bg-ink text-white hover:bg-deep",
		inverse: "bg-white text-ink hover:bg-desk",
		plain: "text-ink",
		plainLight: "text-white",
	}[variant];
	const plain = variant === "plain" || variant === "plainLight";
	// In-page anchors use a plain <a>: Next's <Link> ignores a second click on the same #hash,
	// while the browser re-scrolls to the section every time.
	const Comp = href.startsWith("#") ? "a" : Link;
	return (
		<Comp
			href={href}
			{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			className={cn(
				"group relative inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm py-3 text-[15px] font-medium transition-[background-color,transform] duration-150 ease-out active:scale-[0.98]",
				plain ? "px-0" : "px-5",
				styles,
				className,
			)}
		>
			{children}
			<ArrowRight
				aria-hidden
				className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
				strokeWidth={1.75}
			/>
			{plain && <GrowLine />}
		</Comp>
	);
}

/** The teal hairline that draws in from the left on hover (from the Swiss prototype). */
export function GrowLine({ className, thick }: { className?: string; thick?: boolean }) {
	return (
		<span
			aria-hidden
			className={cn(
				"pointer-events-none absolute inset-x-0 bottom-1 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out will-change-transform group-hover:scale-x-100 group-focus-visible:scale-x-100",
				thick ? "h-1" : "h-px",
				className,
			)}
		/>
	);
}

/** Inline text link with a resting underline that thickens into teal on hover. */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
	const external = href.startsWith("http");
	return (
		<Link
			href={href}
			{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			className={cn(
				"group inline-flex items-center gap-1.5 font-medium text-ink underline decoration-rule decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-accent",
				className,
			)}
		>
			{children}
			<ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.75} />
		</Link>
	);
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
	return <p className={cn("text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground", className)}>{children}</p>;
}

/** Section heading styled as an article of the agreement: "II. The staff". */
export function ArticleHeading({
	n,
	children,
	as: Tag = "h2",
	className,
}: {
	n?: string;
	children: React.ReactNode;
	as?: "h1" | "h2";
	className?: string;
}) {
	return (
		<Tag
			className={cn(
				"font-serif text-[clamp(2.1rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.015em] text-ink [text-wrap:balance]",
				className,
			)}
		>
			{n && <span className="mr-3 text-accent sm:mr-4">{n}.</span>}
			{children}
		</Tag>
	);
}

/** Visible marker for copy or figures Javier still has to confirm. Remove before launch. */
export function Placeholder({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-block border border-dashed border-muted-foreground/60 bg-desk px-2 py-0.5 font-sans text-[13px] not-italic text-muted-foreground">
			To confirm: {children}
		</span>
	);
}

/** Inner-page hero: white, closed by the engraved wave band. The rosette is reserved for the home hero and closing CTA. */
export function PageHero({
	eyebrow,
	title,
	lede,
	children,
	aside,
}: {
	eyebrow?: string;
	title: React.ReactNode;
	lede?: React.ReactNode;
	children?: React.ReactNode;
	aside?: React.ReactNode;
}) {
	return (
		<section className="relative overflow-hidden border-b border-rule bg-white">
<EngravedBand className="absolute inset-x-0 bottom-0 h-14 lg:h-24" />
			<div className={cn(wrap, "relative grid gap-12 pb-28 pt-16 sm:pt-20 lg:grid-cols-12 lg:items-center lg:pb-36")}>
				<div className={aside ? "lg:col-span-7" : "lg:col-span-8"}>
					{eyebrow && <Eyebrow className="text-accent-ink">{eyebrow}</Eyebrow>}
					<h1
						className={cn(
							"mt-4 animate-in fade-in slide-in-from-bottom-4 fill-mode-both font-serif text-[clamp(2.6rem,6vw,4.75rem)] leading-[1.04] tracking-[-0.02em] text-ink duration-700 ease-out [text-wrap:balance] motion-reduce:animate-none",
							!aside && "max-w-[20ch]",
						)}
					>
						{title}
					</h1>
					{lede && <p className={cn("mt-6 text-[19px] leading-[1.55] text-muted-foreground", aside ? "max-w-[46ch]" : "max-w-[56ch]")}>{lede}</p>}
					{children && <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">{children}</div>}
				</div>
				{aside && <div className="lg:col-span-5">{aside}</div>}
			</div>
		</section>
	);
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((f) => ({
			"@type": "Question",
			name: f.question,
			acceptedAnswer: { "@type": "Answer", text: f.answer },
		})),
	};
}

export function JsonLdScript({ data }: { data: object }) {
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
