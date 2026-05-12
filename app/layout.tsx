import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import JsonLd from "../components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from '@next/third-parties/google'
// import { ScrollProgress } from "@/components/ui/scroll-progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://www.praxisflow.com"),
	alternates: {
		canonical: "/", // this generates <link rel="canonical" href="https://www.praxisflow.com" />
	},
	title: {
		default:
			"Secure Legal Automation & Private Infrastructure | PraxisFlow",
		template: "%s | PraxisFlow",
	},
	description:
		"We simplify complex legal operations through intelligent, custom automation — freeing attorneys to focus on billable work.",
	keywords: [
		"Legal Automation",
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
		title: "PraxisFlow | Secure Legal Automation & Private Infrastructure ",
		description:
			"We simplify complex legal operations through intelligent, custom automation — freeing attorneys to focus on billable work.",
		siteName: "PraxisFlow",
		images: [
			{
				url: "/og-image.webp",
				width: 1200,
				height: 630,
				alt: "PraxisFlow",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "PraxisFlow | Secure Legal Automation & Private Infrastructure ",
		description:
			"We simplify complex legal operations through intelligent, custom automation — freeing attorneys to focus on billable work.",
		images: ["/og-image.webp"],
		creator: "@praxisflow",
	},
	icons: {
		icon: [
			// 1. svg for modern browsers
			{ url: "/isotipo-base.svg", type: "image/svg+xml" },

			// 2. Google search results
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{
				url: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},

			// 3. Fallback for older browsers
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
		<html lang="en">
			<body className={inter.className}>
				{/* <ScrollProgress /> */}
				<JsonLd />
				<Navbar />
				<main className="min-h-screen flex flex-col items-center justify-between">
					{children}
				</main>
				<Footer />
				<Analytics />
				<SpeedInsights />
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
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
			</body>
		</html>
	);
}
