import { CloseCta } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { ArticleHeading, PageHero, wrap } from "@/components/site/ui";

const principles = [
	{
		title: "Precision First",
		body: "In law, details matter. Our automations are built with zero-tolerance for error and rigorous testing protocols.",
	},
	{
		title: "Human-Centric",
		body: "We don't just automate tasks; we optimize the socio-technical system of your firm so your legal team can focus on high-value judgment, not low-value labor.",
	},
	{
		title: "Future-Proof",
		body: "We build scalable systems that grow with your firm, adapting to new challenges and technologies.",
	},
];

export default function AboutPage() {
	return (
		<div className="w-full">
			<PageHero
				eyebrow="About us"
				title="Engineering the future of legal operations."
				lede="Combining technical engineering with firsthand legal expertise, we bridge the gap between technology and law to modernize legal operations through intelligent automation."
			/>

			<section className="bg-white py-24 sm:py-28">
				<div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
					<div className="lg:col-span-6">
						<ArticleHeading>Our mission</ArticleHeading>
						<div className="mt-8 space-y-5 text-[18px] leading-relaxed text-muted-foreground">
							<p>
								The legal industry is burdened by administrative friction. Our mission is to eliminate that friction through
								intelligent automation, allowing attorneys to return to the work they were trained to do.
							</p>
							<p>
								We believe that boutique firms should have access to the same operational efficiency as Big Law, without the
								massive overhead.
							</p>
						</div>
					</div>
					<Reveal className="lg:col-span-5 lg:col-start-8">
						<div className="bg-ink px-8 py-10 text-white sm:px-10">
							<h2 className="font-serif text-[28px] leading-tight">Why we do what we do</h2>
							<p className="mt-5 text-[17px] leading-relaxed text-slate-300">
								We started PraxisFlow to eliminate the daily frustrations caused by manual, repetitive work. Our motivation
								comes from seeing firms thrive once they are freed from mundane tasks, allowing them to focus on innovation,
								strategy, and better serving their clients.
							</p>
						</div>
					</Reveal>
				</div>
			</section>

			<section className="border-t border-rule bg-desk py-24 sm:py-28">
				<div className={wrap}>
					<ArticleHeading>Our philosophy</ArticleHeading>
					<p className="mt-5 text-[18px] text-muted-foreground">Three core principles guide everything we build and deliver.</p>
					<ol className="mt-14 grid border-l border-t border-rule [&>*]:border-b [&>*]:border-r [&>*]:border-rule md:grid-cols-3">
						{principles.map((p, i) => (
							<Reveal as="li" key={p.title} delay={i * 0.08} className="bg-white p-7 sm:p-9">
								<p className="font-serif text-[15px] text-accent-ink">{["I", "II", "III"][i]}.</p>
								<h3 className="mt-3 font-serif text-[25px] text-ink">{p.title}</h3>
								<p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{p.body}</p>
							</Reveal>
						))}
					</ol>
				</div>
			</section>

			<CloseCta
				title="Ready to modernize your practice?"
				body="Let's discuss which AI employees and automations fit your firm. Free consultation, no commitment required."
			/>
		</div>
	);
}
