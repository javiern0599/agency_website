"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, Check } from "lucide-react";
import { booking, conversation, crmRecord, onboardingRun, ownerSummary, summaryEmail } from "@/lib/site-content";
import { useScrollSteps } from "./use-scroll-steps";
import { ArticleHeading } from "./ui";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;
const EXHIBITS = 3;
const STEPS = conversation.length + EXHIBITS;

function Exhibit({ label, show, children }: { label: string; show: boolean; children: React.ReactNode }) {
	return (
		<motion.div
			initial={false}
			animate={{ opacity: show ? 1 : 0.5, transform: show ? "translateY(0px)" : "translateY(8px)" }}
			transition={{ duration: 0.45, ease }}
			className={cn(
				"relative px-6 pb-5 pt-7 font-serif",
				show
					? "bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_36px_-22px_rgba(15,23,42,0.35)]"
					: "border border-dashed border-rule bg-transparent",
			)}
		>
			<motion.span
				initial={false}
				animate={{ opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(1.15)" }}
				transition={{ duration: 0.25, ease }}
				className="absolute -top-3 right-5 border border-accent bg-white px-2 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-ink"
			>
				{label}
			</motion.span>
			<div className={show ? "" : "invisible"} aria-hidden={!show}>
				{children}
			</div>
		</motion.div>
	);
}

const kicker = "font-sans text-[12px] uppercase tracking-[0.14em] text-muted-foreground";

/** Intake only: the calendar entry, the CRM record and the owner's summary. */
function IntakeExhibits({ shown }: { shown: (i: number) => boolean }) {
	return (
		<>
			<Exhibit label="Exhibit B" show={shown(conversation.length)}>
				<p className={kicker}>Calendar</p>
				<p className="mt-1 text-[22px]">{booking.title}</p>
				<p className="mt-1 text-[15px]">
					{booking.when} · {booking.where}
				</p>
				<p className="mt-2 font-sans text-[13px] text-muted-foreground">{booking.note}</p>
			</Exhibit>
			<Exhibit label="Exhibit C" show={shown(conversation.length + 1)}>
				<p className={kicker}>CRM record</p>
				<dl className="mt-2 grid grid-cols-[8.5rem_1fr] gap-y-1 text-[15px]">
					{crmRecord.map(([k, v]) => (
						<div key={k} className="contents">
							<dt className="font-sans text-[13px] text-muted-foreground">{k}</dt>
							<dd className={k === "Status" ? "text-accent-ink" : ""}>{v}</dd>
						</div>
					))}
				</dl>
			</Exhibit>
			<Exhibit label="Exhibit D" show={shown(conversation.length + 2)}>
				<p className={kicker}>Email to the owner</p>
				<p className="mt-1 text-[19px]">{summaryEmail.subject}</p>
				<ul className="mt-2 space-y-1 font-sans text-[14px] text-ink/80">
					{summaryEmail.lines.map((l) => (
						<li key={l}>{l}</li>
					))}
				</ul>
			</Exhibit>
		</>
	);
}

/** The whole new-client story: consult booked, client set up by the Onboarding Specialist, owner's summary. */
function ClientExhibits({ shown }: { shown: (i: number) => boolean }) {
	return (
		<>
			<Exhibit label="Exhibit B" show={shown(conversation.length)}>
				<p className={kicker}>Consultation booked · Intake Coordinator</p>
				<p className="mt-1 text-[21px]">{booking.title}</p>
				<p className="mt-1 text-[15px]">
					{booking.when} · {booking.where}
				</p>
				<p className="mt-2 font-sans text-[13px] text-muted-foreground">Lead created in the CRM with the full conversation attached.</p>
			</Exhibit>
			<Exhibit label="Exhibit C" show={shown(conversation.length + 1)}>
				<p className={kicker}>New client set up · Onboarding Specialist</p>
				<p className="mt-1 font-sans text-[13px] text-muted-foreground">
					{onboardingRun.when}. {onboardingRun.trigger}
				</p>
				<ul className="mt-3 space-y-1.5 text-[15px] leading-snug">
					{onboardingRun.steps.map((s) => (
						<li key={s} className="grid grid-cols-[1.25rem_1fr]">
							<Check aria-hidden className="mt-1 h-3.5 w-3.5 text-accent-ink" strokeWidth={2} />
							{s}
						</li>
					))}
				</ul>
				<p className="mt-3 border-t border-rule pt-3 text-[17px] text-accent-ink">{onboardingRun.result}</p>
			</Exhibit>
			<Exhibit label="Exhibit D" show={shown(conversation.length + 2)}>
				<p className={kicker}>Email to the owner</p>
				<p className="mt-1 text-[19px]">{ownerSummary.subject}</p>
				<ul className="mt-2 space-y-1 font-sans text-[14px] text-ink/80">
					{ownerSummary.lines.map((l) => (
						<li key={l}>{l}</li>
					))}
				</ul>
			</Exhibit>
		</>
	);
}

/**
 * Scroll sequence: a WhatsApp conversation (the lead on the left, the Intake
 * Coordinator on the right), then three exhibits arrive. "client" (home page)
 * follows the new client through onboarding; "intake" (intake page) stays on intake.
 * On desktop it advances with scroll; on small screens and with reduced motion it
 * renders complete.
 */
export function Transcript({
	n = "II",
	title = "A new client, from first message to day one",
	id = "work",
	variant = "client",
}: {
	n?: string;
	title?: string;
	id?: string;
	variant?: "client" | "intake";
}) {
	const { ref, step, pinned } = useScrollSteps(STEPS);
	const shown = (i: number) => step >= i;
	const visible = conversation.slice(0, Math.min(step + 1, conversation.length));

	return (
		<section
			ref={ref as React.RefObject<HTMLElement>}
			id={id}
			className="relative bg-desk"
			style={{ height: pinned ? `${STEPS * 55}vh` : "auto" }}
		>
			<div
				className={cn(
					pinned && "sticky top-16 h-[calc(100dvh-4rem)]",
					"mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-10",
				)}
			>
				<div className="flex flex-col lg:col-span-7 lg:min-h-0">
					<ArticleHeading n={n}>{title}</ArticleHeading>
					<p className="mt-3 text-[15px] text-muted-foreground">
						Exhibit A. Illustrative WhatsApp conversation. Names and details are fictional.
						{pinned && step < STEPS - 1 && (
							<span className="mt-1 flex items-center gap-1.5 font-medium text-accent-ink">
								Scroll down to see how it plays out
								<ArrowDown aria-hidden className="h-3.5 w-3.5 motion-safe:animate-bounce" strokeWidth={2} />
							</span>
						)}
					</p>
					<div className="mt-6 flex flex-1 flex-col overflow-hidden bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] lg:min-h-0">
						<div className="relative z-10 flex shrink-0 items-center justify-between gap-4 border-b border-rule bg-white px-5 py-3 text-[12px] text-muted-foreground">
							<span>
								<span className="font-medium text-ink">Daniel</span>, prospective client
							</span>
							<span className="text-right">
								<span className="font-medium text-accent-ink">Intake Coordinator</span>, for the firm
							</span>
						</div>
						<ol className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-4 py-5 font-serif sm:px-5">
							<AnimatePresence initial={false}>
								{visible.map((m, i) => {
									const agent = m.from === "agent";
									const ghost = pinned && step < conversation.length && i < step;
									return (
										<motion.li
											key={i}
											layout="position"
											initial={{ opacity: 0, transform: "translateY(14px)" }}
											animate={{ opacity: ghost ? 0.45 : 1, transform: "translateY(0px)" }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.4, ease }}
											className={cn(
												"w-[88%] shrink-0 px-4 py-3 sm:w-[78%]",
												agent ? "ml-auto border-r-2 border-accent bg-accent/[0.07]" : "mr-auto border-l-2 border-ink/70 bg-desk",
											)}
										>
											<p
												className={cn(
													"font-sans text-[11px] font-semibold uppercase tracking-[0.12em]",
													agent ? "text-accent-ink" : "text-muted-foreground",
												)}
											>
												{agent ? "Intake Coordinator" : "Daniel"}
												{m.time && <span className="ml-2 font-normal normal-case tracking-normal text-muted-foreground">{m.time}</span>}
											</p>
											<p className="mt-0.5 text-[16px] leading-[1.45] text-ink">{m.text}</p>
											{m.limit && (
												<p className="mt-2 font-sans text-[12px] font-medium text-accent-ink">
													Declines a legal opinion and offers the consultation instead.
												</p>
											)}
										</motion.li>
									);
								})}
							</AnimatePresence>
						</ol>
					</div>
				</div>

				<div className="flex flex-col justify-center gap-7 lg:col-span-5">
					{variant === "client" ? <ClientExhibits shown={shown} /> : <IntakeExhibits shown={shown} />}
				</div>
			</div>
		</section>
	);
}
