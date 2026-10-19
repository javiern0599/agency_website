import { HomeHero } from "@/components/site/HomeHero";
import { Roster } from "@/components/site/Roster";
import { Transcript } from "@/components/site/Transcript";
import { Limits } from "@/components/site/Limits";
import { CaseBrief } from "@/components/site/CaseBrief";
import { HiringSteps } from "@/components/site/HiringSteps";
import { FaqList } from "@/components/site/Faq";
import { CloseCta, CustomAndSecurity, Testimonial } from "@/components/site/Blocks";
import { ArticleHeading, JsonLdScript, TextLink, faqJsonLd, wrap } from "@/components/site/ui";
import { homeFaqs } from "@/lib/site-content";

export default function Home() {
	return (
		<div className="w-full">
			<JsonLdScript data={faqJsonLd(homeFaqs)} />
			<HomeHero />

			<section id="staff" className="bg-white py-24 sm:py-28">
				<div className={wrap}>
					<div className="grid gap-6 lg:grid-cols-12 lg:items-end">
						<div className="lg:col-span-8">
							<ArticleHeading n="I">The staff</ArticleHeading>
							<p className="mt-5 max-w-[60ch] text-[18px] leading-relaxed text-muted-foreground">
								Eight roles, each engaged on the same terms: written duties, written limits and a clause that says when a
								person takes over. Open any role to read its terms.
							</p>
						</div>
						<div className="lg:col-span-4 lg:text-right">
							<TextLink href="/ai-agents-for-law-firms">All roles in detail</TextLink>
						</div>
					</div>
					<div className="mt-14">
						<Roster />
					</div>
				</div>
			</section>

			<Transcript n="II" />
			<Limits n="III" />
			<CaseBrief n="IV" tinted />

			<section className="border-t border-rule bg-white py-24 sm:py-28">
				<div className={wrap}>
					<ArticleHeading n="V">How an engagement works</ArticleHeading>
					<HiringSteps />
				</div>
			</section>

			<CustomAndSecurity />
			<Testimonial />

			<section className="border-t border-rule bg-desk py-24 sm:py-28">
				<div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
					<div className="lg:col-span-4">
						<ArticleHeading n="VI">Questions</ArticleHeading>
					</div>
					<div className="lg:col-span-8">
						<FaqList faqs={homeFaqs} />
					</div>
				</div>
			</section>

			<CloseCta />
		</div>
	);
}
