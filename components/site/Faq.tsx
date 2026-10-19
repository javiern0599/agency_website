"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/site-content";
import { cn } from "@/lib/utils";

function Answer({ faq }: { faq: Faq }) {
	if (faq.linkText && faq.linkHref && faq.answer.includes(faq.linkText)) {
		const [before, after] = faq.answer.split(faq.linkText);
		return (
			<>
				{before}
				<Link href={faq.linkHref} className="text-ink underline decoration-accent underline-offset-4">
					{faq.linkText}
				</Link>
				{after}
			</>
		);
	}
	return <>{faq.answer}</>;
}

/** Single-open accordion. Answers stay in the DOM for search engines and find-in-page. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
	const [open, setOpen] = useState<number | null>(0);
	const id = useId();
	return (
		<dl className="border-t border-ink">
			{faqs.map((f, i) => {
				const isOpen = open === i;
				return (
					<div key={f.question} className="border-b border-rule">
						<dt>
							<button
								type="button"
								id={`${id}-q${i}`}
								aria-expanded={isOpen}
								aria-controls={`${id}-a${i}`}
								onClick={() => setOpen(isOpen ? null : i)}
								className="group flex w-full items-start justify-between gap-6 py-6 text-left"
							>
								<span className="font-serif text-[20px] leading-snug text-ink sm:text-[22px]">{f.question}</span>
								<Plus
									aria-hidden
									className={cn("mt-1.5 h-5 w-5 shrink-0 text-accent-ink transition-transform duration-200 ease-out", isOpen && "rotate-45")}
									strokeWidth={1.5}
								/>
							</button>
						</dt>
						<dd
							id={`${id}-a${i}`}
							role="region"
							aria-labelledby={`${id}-q${i}`}
							className={cn(
								"grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none",
								isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
							)}
						>
							<div className="overflow-hidden">
								<p className="max-w-[68ch] pb-7 text-[17px] leading-relaxed text-muted-foreground">
									<Answer faq={f} />
								</p>
							</div>
						</dd>
					</div>
				);
			})}
		</dl>
	);
}
