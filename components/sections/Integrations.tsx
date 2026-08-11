import { Marquee } from "../ui/marquee";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FadeIn } from "../ui/fade-in";

const integrations = [
	{ icon: "/salesforce.svg", className: "h-12" },
	{ icon: "/slack.svg" },
	{ icon: "/zoho.svg" },
	{ icon: "/clio.svg" },
	{ icon: "/docusign.svg", className: "h-12" },
	{ icon: "/airtable_logo.svg" },
	{ icon: "/wordpress.svg", className: "h-12" },
];

export default function SocialProof() {
	return (
		<section
			id="integrations"
			className="py-8 border-y border-border bg-secondary/50 overflow-hidden"
		>
			<div className="max-w-7xl mx-auto px-6 text-center">
				<FadeIn margin="0px">
					<p className="text-xs font-semibold text-primary uppercase tracking-widest mb-8">
						Seamlessly integrated with your stack
					</p>
					<Marquee pauseOnHover className="[--duration:40s]">
						{integrations.map((integration, idx) => (
							<div
								key={idx}
								className="group flex items-center justify-center gap-2 mx-12 opacity-80 hover:opacity-100 transition-all grayscale hover:grayscale-0 duration-300"
							>
								<Image
									src={integration.icon}
									alt="Integration Logo"
									width={120}
									height={50}
									className={cn(
										"h-8 w-auto object-contain transition-all duration-300",
										integration.className,
									)}
								/>
							</div>
						))}
					</Marquee>
				</FadeIn>
			</div>
		</section>
	);
}
