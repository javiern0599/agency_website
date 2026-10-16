import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Role } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { Seal } from "./Engraving";

/**
 * A role's "schedule" in the engagement: duties, limits, hand-off, tools.
 * Used inline on the roster page and inside the roster dialog on the home page.
 */
export function EngagementSheet({
	role,
	index,
	headingId,
	as: Heading = "h3",
	className,
	showLink = true,
	seal = false,
}: {
	role: Role;
	index: number;
	headingId?: string;
	as?: "h2" | "h3";
	className?: string;
	showLink?: boolean;
	seal?: boolean;
}) {
	return (
		<article className={cn("relative bg-white px-6 py-8 font-serif text-ink sm:px-10 sm:py-10", className)}>
			{seal && <Seal animate={false} className="absolute -bottom-5 -right-5 hidden h-16 w-16 sm:block" />}
			<div className="flex items-start justify-between gap-6">
				<div>
					<p className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
						Schedule {index + 1}
					</p>
					<Heading id={headingId} className="mt-2 text-[clamp(1.75rem,3vw,2.15rem)] leading-tight">
						{role.title}
					</Heading>
				</div>
				<Monogram initials={role.initials} />
			</div>
			<p className="mt-5 max-w-[52ch] text-[18px] leading-[1.5] sm:text-[19px]">{role.summary}</p>
			<dl className="mt-8 grid gap-6 text-[16px] leading-[1.55] sm:grid-cols-2">
				<div className="sm:col-span-2">
					<dt className="italic text-accent-ink">Duties</dt>
					<dd>
						<ol className="mt-2 space-y-1.5">
							{role.does.map((d, i) => (
								<li key={d} className="grid grid-cols-[1.75rem_1fr]">
									<span className="text-muted-foreground">({String.fromCharCode(97 + i)})</span>
									<span>{d}</span>
								</li>
							))}
						</ol>
					</dd>
				</div>
				<div>
					<dt className="italic text-accent-ink">Shall not</dt>
					<dd className="mt-1">{role.never}</dd>
				</div>
				<div>
					<dt className="italic text-accent-ink">Hand-off</dt>
					<dd className="mt-1">{role.handsOff}</dd>
				</div>
				<div className="sm:col-span-2">
					<dt className="italic text-accent-ink">Works in</dt>
					<dd className="mt-1 font-sans text-[14px] text-muted-foreground">{role.worksIn}</dd>
				</div>
				{role.figure && (
					<div className="border-t border-rule pt-5 sm:col-span-2">
						<dt className="sr-only">Typical result</dt>
						<dd className="text-[21px] leading-snug">{role.figure}</dd>
					</div>
				)}
			</dl>
			{showLink && role.href && (
				<Link
					href={role.href}
					className="group mt-8 inline-flex items-center gap-1.5 font-sans text-[14px] font-medium underline decoration-rule underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-accent"
				>
					Read the full terms
					<ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" strokeWidth={1.75} />
				</Link>
			)}
		</article>
	);
}

export function Monogram({ initials, inverse, className }: { initials: string; inverse?: boolean; className?: string }) {
	return (
		<span
			aria-hidden
			className={cn(
				"grid h-14 w-14 shrink-0 place-items-center border font-serif text-[18px] tracking-[0.08em]",
				inverse ? "border-white/60 text-white" : "border-ink text-ink",
				className,
			)}
		>
			{initials}
		</span>
	);
}
