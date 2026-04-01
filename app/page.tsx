import Hero from "../components/sections/Hero";
import Integrations from "../components/sections/Integrations";
import Services from "../components/sections/Services";
import Process from "../components/sections/Process";
import { PathwaysToEngagement } from "../components/sections/PathwaysToEngagement";
// import Testimonials from "../components/sections/Testimonials";
import { FAQsHomepage } from "../components/sections/HomeFaqs";
import Security from "../components/sections/Security";
import CTA from "../components/sections/CTA";

export default function Home() {
	return (
		<div className="flex flex-col w-full">
			<Hero />
			<Integrations />
			<Services />
			<Process />
			<PathwaysToEngagement />
			{/* <Testimonials /> */}
			<Security />
			<FAQsHomepage />
			<CTA />
		</div>
	);
}
