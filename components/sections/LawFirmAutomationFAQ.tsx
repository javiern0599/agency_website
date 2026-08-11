"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

interface Faq {
	question: string;
	answer: string;
	// Optional: turn a phrase inside the answer into an internal link.
	linkText?: string;
	linkHref?: string;
}

function AnswerText({ faq }: { faq: Faq }) {
	if (faq.linkText && faq.linkHref && faq.answer.includes(faq.linkText)) {
		const [before, after] = faq.answer.split(faq.linkText);
		return (
			<>
				{before}
				<Link
					href={faq.linkHref}
					className="text-accent underline underline-offset-2 hover:text-accent/80"
				>
					{faq.linkText}
				</Link>
				{after}
			</>
		);
	}
	return <>{faq.answer}</>;
}

export default function LegalAutomationFAQ({ faqs }: { faqs: Faq[] }) {
	// Single-open accordion: opening one closes the others. First open by default.
	const [openItem, setOpenItem] = useState<number | null>(0);

	const toggle = (index: number) =>
		setOpenItem((prev) => (prev === index ? null : index));

	return (
		<div className="space-y-4">
			{faqs.map((faq, index) => {
				const isOpen = openItem === index;
				return (
					<FadeIn key={faq.question} delay={index * 0.05}>
						<div
							className={cn(
								"bg-card border rounded-2xl overflow-hidden transition-colors duration-300",
								isOpen
									? "border-accent/50"
									: "border-border hover:border-accent/40",
							)}
						>
							<button
								type="button"
								onClick={() => toggle(index)}
								aria-expanded={isOpen}
								className="flex w-full items-center justify-between gap-4 p-6 text-left"
							>
								<h3 className="text-lg font-medium text-foreground">
									{faq.question}
								</h3>
								<ChevronDown
									className={cn(
										"w-5 h-5 shrink-0 text-accent transition-transform duration-300",
										isOpen && "rotate-180",
									)}
								/>
							</button>

							<AnimatePresence initial={false}>
								{isOpen && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{
											duration: 0.3,
											ease: "easeInOut",
										}}
										className="overflow-hidden"
									>
										<p className="px-6 pb-6 text-muted-foreground leading-relaxed">
											<AnswerText faq={faq} />
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</FadeIn>
				);
			})}
		</div>
	);
}
