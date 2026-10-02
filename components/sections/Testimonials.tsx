import { FadeIn } from "../ui/fade-in";

// Real testimonials only, each approved by the person quoted. With a single
// quote the section is a slim band; give it a heading and a grid once there
// are more.
const testimonial = {
	quote: "PraxisFlow ran one of the most thorough evaluations of LexSelect we've seen. They tested on real court filings, checked every citation against the source and provided detailed feedback our team could act on immediately. Their technical rigour and attention to detail stood out.",
	name: "Morgan Maguire",
	title: "Co-Founder & CEO, LexSelect",
	photo: "/testimonials/morgan-maguire.webp",
	logo: "/testimonials/lexselect-logo.svg",
	company: "LexSelect",
	url: "https://www.lexselect.io",
};

export default function Testimonials() {
	return (
		<section
			className="py-16 px-6 bg-slate-50 border-y border-border"
			id="testimonials"
		>
			<FadeIn>
				<figure className="max-w-3xl mx-auto text-center">
					<p className="text-sm font-medium uppercase tracking-wider text-teal-600 mb-6">
						Partner perspective
					</p>
					<blockquote className="text-lg md:text-xl leading-relaxed text-[#0f172a]">
						&ldquo;{testimonial.quote}&rdquo;
					</blockquote>
					<figcaption className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
						<div className="flex items-center gap-3">
							<img
								src={testimonial.photo}
								alt={testimonial.name}
								width={44}
								height={44}
								className="w-11 h-11 rounded-full object-cover bg-slate-100"
							/>
							<div className="text-left">
								<p className="text-sm font-medium text-[#0f172a]">
									{testimonial.name}
								</p>
								<p className="text-sm text-slate-600">
									{testimonial.title}
								</p>
							</div>
						</div>
						<span
							className="hidden sm:block h-8 w-px bg-border"
							aria-hidden="true"
						/>
						<a
							href={testimonial.url}
							target="_blank"
							rel="noopener noreferrer"
							className="opacity-80 hover:opacity-100 transition-opacity"
						>
							<img
								src={testimonial.logo}
								alt={testimonial.company}
								width={118}
								height={20}
								className="h-5 w-auto"
							/>
						</a>
					</figcaption>
				</figure>
			</FadeIn>
		</section>
	);
}
