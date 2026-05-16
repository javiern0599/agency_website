import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

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

	// Turn on Next.js Draft Mode (handles async unwrapping for modern Next.js 15 architectures)
	const draft = await draftMode();
	draft.enable();

	// Redirect the content editor smoothly to the content page
	redirect(url);
}
