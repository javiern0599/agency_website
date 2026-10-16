import { ArrowButton, Eyebrow, wrap } from "@/components/site/ui";
import { EngravedBand } from "@/components/site/Engraving";

export default function NotFound() {
	return (
		<div className="relative w-full overflow-hidden border-b border-rule bg-white">
			<EngravedBand className="absolute inset-x-0 bottom-0 h-14 lg:h-24" />
			<div className={`${wrap} relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center pb-32 pt-20`}>
				<Eyebrow className="text-accent-ink">Error 404</Eyebrow>
				<h1 className="mt-4 max-w-[18ch] font-serif text-[clamp(2.6rem,6vw,4.75rem)] leading-[1.04] tracking-[-0.02em] text-ink">
					Page not found.
				</h1>
				<p className="mt-6 max-w-[48ch] text-[19px] leading-relaxed text-muted-foreground">
					The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
				</p>
				<div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
					<ArrowButton href="/">Return home</ArrowButton>
					<ArrowButton href="/ai-agents-for-law-firms" variant="plain">Meet the staff</ArrowButton>
				</div>
			</div>
		</div>
	);
}
