import { Suspense } from "react";
import type { Metadata } from "next";
import { Libre_Caslon_Text, Public_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { BackToTop } from "@/components/site/BackToTop";
import JsonLd from "../components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "@/components/seo/MetaPixel";
import { HashScroll } from "@/components/ui/hash-scroll";
import { FB_PIXEL_ID } from "@/lib/fpixel";

// Caslon for headings and the "documents"; Public Sans for everything you operate.
const caslon = Libre_Caslon_Text({
	subsets: ["latin"],
	weight: ["400", "700"],
	style: ["normal", "italic"],
	variable: "--font-caslon",
});
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public" });

const SITE_DESCRIPTION =
	"AI employees for law firms: intake, reception, drafting and follow-up. They work in your firm's tools, in a private environment, and hand off to your people.";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.praxisflow.com"),
	alternates: {
		canonical: "/",
	},
	title: {
		default: "AI Employees for Law Firms | PraxisFlow",
		template: "%s | PraxisFlow",
	},
	description: SITE_DESCRIPTION,
	keywords: [
		"AI employees for law firms",
		"AI agents for law firms",
		"AI legal intake",
		"Law Firm Automation",
		"Legal Tech",
		"Workflow Automation",
		"PraxisFlow",
	],
	authors: [{ name: "PraxisFlow Team" }],
	creator: "PraxisFlow",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://praxisflow.com",
		title: "AI Employees for Law Firms | PraxisFlow",
		description: SITE_DESCRIPTION,
		siteName: "PraxisFlow",
		images: [
			{
				url: "/og-ai-employees.jpg",
				width: 1200,
				height: 630,
				alt: "PraxisFlow: AI employees for law firms",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "AI Employees for Law Firms | PraxisFlow",
		description: SITE_DESCRIPTION,
		images: ["/og-ai-employees.jpg"],
		creator: "@praxisflow",
	},
	icons: {
		icon: [
			{ url: "/isotipo-base.svg", type: "image/svg+xml" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{
				url: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{ url: "/favicon.ico", sizes: "any" },
		],
		apple: [
			{
				url: "/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-scroll-behavior="smooth">
			<head>
				{/* Meta Pixel Server Noscript Fallback Injection */}
				<noscript>
					<img
						height="1"
						width="1"
						style={{ display: "none" }}
						src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
						alt=""
					/>
				</noscript>
			</head>
			<body className={`${caslon.variable} ${publicSans.variable} font-sans antialiased`}>
				{/* Initializes the Meta Pixel event listeners across router shifts */}
				{/* FIX: Wrap MetaPixel in a Suspense boundary. 
                  This catches the CSR bailout and lets the static 404 page compile perfectly.
                */}
				<Suspense fallback={null}>
					<MetaPixel />
				</Suspense>

				<JsonLd />
				<HashScroll />
				<SiteHeader />
				<main>
					{children}
				</main>
				<SiteFooter />
				<BackToTop />
				<Analytics />
				<SpeedInsights />

				{/* Chatwoot Live Chat SDK */}
				<Script strategy="afterInteractive">
					{`
                        (function(d,t) {
                            var BASE_URL="https://chat.praxisflow.com";
                            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                            g.src=BASE_URL+"/packs/js/sdk.js";
                            g.async = true;
                            s.parentNode.insertBefore(g,s);
                            g.onload=function(){
                                window.chatwootSDK.run({
                                    websiteToken: 'm6VPYKPLTetKeZBwYqk4A6Bj',
                                    baseUrl: BASE_URL
                                })
                            }
                        })(document,"script");
                    `}
				</Script>
				<GoogleAnalytics
					gaId={process.env.NEXT_PUBLIC_GA_ID as string}
				/>
			</body>
		</html>
	);
}
