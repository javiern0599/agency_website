"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { moreRoles, roles } from "@/lib/site-content";
import { EngagementSheet } from "./EngagementSheet";
import { cn } from "@/lib/utils";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * The staff as an index of sections (§1, §2...) beside the selected role's
 * engagement sheet. Below lg there is no room for the side panel, so each
 * index entry opens its sheet in place, directly under the role's name.
 */
export function Roster() {
	const [active, setActive] = useState(0);
	const [openMobile, setOpenMobile] = useState<number | null>(null);
	const role = roles[active];

	return (
		<>
			<div className="grid gap-10 lg:grid-cols-12">
				<ol className="lg:col-span-4" aria-label="AI employees">
					{roles.map((r, i) => {
						const isActive = i === active;
						const isOpen = openMobile === i;
						return (
							<li key={r.slug} className="border-t border-rule last:border-b lg:last:border-b-0">
								<button
									type="button"
									onClick={() => {
										setActive(i);
										setOpenMobile(isOpen ? null : i);
									}}
									onMouseEnter={() => setActive(i)}
									aria-expanded={isOpen}
									aria-controls={`sheet-${r.slug}`}
									className={cn(
										"group relative grid w-full grid-cols-[2.75rem_1fr_auto] items-baseline py-4 text-left text-ink transition-colors duration-200",
										!isActive && "lg:text-muted-foreground lg:hover:text-ink",
									)}
								>
									<span className={cn("font-serif text-[14px] text-accent-ink", !isActive && "lg:text-muted-foreground")}>§{i + 1}</span>
									<span className="font-serif text-[20px] leading-tight sm:text-[22px]">{r.title}</span>
									<Plus
										aria-hidden
										className={cn("h-5 w-5 text-accent-ink transition-transform duration-200 ease-out lg:hidden", isOpen && "rotate-45")}
										strokeWidth={1.5}
									/>
									<span
										aria-hidden
										className={cn(
											"absolute inset-x-0 -bottom-px hidden h-0.5 origin-left will-change-transform bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 lg:block",
											isActive ? "scale-x-100" : "scale-x-0",
										)}
									/>
								</button>
								<div
									id={`sheet-${r.slug}`}
									className={cn(
										"grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none lg:hidden",
										isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
									)}
								>
									<div className="overflow-hidden" inert={!isOpen || undefined}>
										<div className="bg-desk p-2 pb-4 sm:p-4">
											<EngagementSheet role={r} index={i} className="shadow-[0_1px_2px_rgba(15,23,42,0.06)]" />
										</div>
									</div>
								</div>
							</li>
						);
					})}
				</ol>

				<div className="hidden lg:col-span-8 lg:block">
					<div className="bg-desk p-6">
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={role.slug}
								initial={{ opacity: 0, transform: "translateY(10px)" }}
								animate={{ opacity: 1, transform: "translateY(0px)" }}
								exit={{ opacity: 0, transform: "translateY(-6px)" }}
								transition={{ duration: 0.22, ease }}
							>
								<EngagementSheet role={role} index={active} seal className="min-h-[34rem] shadow-[0_1px_2px_rgba(15,23,42,0.06)]" />
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>

			<div id="more-roles" className="mt-20 grid scroll-mt-6 gap-8 border-t border-ink pt-8 lg:grid-cols-12">
				<div className="lg:col-span-4">
					<h3 className="font-serif text-[26px] leading-tight text-ink">More roles on request</h3>
					<p className="mt-2 max-w-[34ch] text-[15px] text-muted-foreground">Engaged on the same terms as the rest of the staff.</p>
				</div>
				<ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:col-span-8">
					{moreRoles.map((m) => (
						<li key={m.title}>
							<p className="font-serif text-[20px] text-ink">{m.title}</p>
							<p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{m.line}</p>
							{m.never && (
								<p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
									<span className="font-serif italic text-accent-ink">Shall not: </span>
									{m.never}
								</p>
							)}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
