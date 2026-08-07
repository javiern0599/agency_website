import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Our own site. Preview links may only ever land somewhere on this domain.
const SITE_ORIGIN = "https://www.praxisflow.com";

function isOwnSite(hostname: string) {
	return (
		hostname === "praxisflow.com" || hostname.endsWith(".praxisflow.com")
	);
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const secret = searchParams.get("secret");
	const url = searchParams.get("url");

	// Validate the secret key matches your environment configuration
	if (secret !== process.env.PREVIEW_SECRET || !url) {
		return new Response(
			"Invalid preview token or missing redirection URL",
			{ status: 401 },
		);
	}

	// Close the open redirect: resolve the target against our own origin (so
	// relative paths like "/blog/slug" still work) and refuse anything that
	// points off praxisflow.com. This is what stops the endpoint from being
	// abused to bounce visitors to a phishing page under our domain — the
	// pattern Safe Browsing flags as a "deceptive page".
	let target: URL;
	try {
		target = new URL(url, SITE_ORIGIN);
	} catch {
		return new Response("Invalid redirection URL", { status: 400 });
	}

	if (!isOwnSite(target.hostname)) {
		return new Response("Redirection URL must stay on praxisflow.com", {
			status: 400,
		});
	}

	// Turn on Next.js Draft Mode (handles async unwrapping for modern Next.js 15 architectures)
	const draft = await draftMode();
	draft.enable();

	// Redirect the content editor smoothly to the content page (same-origin path only)
	redirect(`${target.pathname}${target.search}${target.hash}`);
}
