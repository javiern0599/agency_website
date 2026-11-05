import { NextResponse } from "next/server";
import {
	clientIp,
	cleanText,
	isValidEmail,
	n8nHeaders,
	rateLimited,
	verifyTurnstile,
} from "@/lib/form-security";

export async function POST(req: Request) {
	try {
		const body = await req.json().catch(() => null);
		if (!body || typeof body !== "object") {
			return NextResponse.json({ error: "Invalid request" }, { status: 400 });
		}

		// Honeypot
		if (body.fax) {
			console.warn("Honeypot activated. Bot detected.");
			return NextResponse.json({
				success: true,
				message: "Spam filtered",
			});
		}

		const ip = clientIp(req);
		if (rateLimited(`newsletter:${ip}`, 5, 10 * 60 * 1000)) {
			return NextResponse.json(
				{ error: "Too many requests. Please try again in a few minutes." },
				{ status: 429 },
			);
		}

		const email = cleanText(body.email, 254).toLowerCase();
		if (!email || !isValidEmail(email)) {
			return NextResponse.json(
				{ error: "Invalid email" },
				{ status: 400 },
			);
		}

		if (!(await verifyTurnstile(body.turnstileToken, ip))) {
			return NextResponse.json(
				{ error: "Verification failed. Please refresh the page and try again." },
				{ status: 403 },
			);
		}

		const webhook = process.env.N8N_NEWSLETTER_WEBHOOK;
		let forwarded = false;

		if (webhook) {
			try {
				const r = await fetch(webhook, {
					method: "POST",
					headers: n8nHeaders(),
					body: JSON.stringify({
						email,
						source: "Website Newsletter Form",
						timestamp: new Date().toISOString(),
					}),
				});

				if (r.ok) forwarded = true;
				else
					console.error(
						"Newsletter webhook responded with non-OK",
						r.status,
					);
			} catch (err) {
				console.error("Failed to forward to newsletter webhook:", err);
			}
		} else {
			console.warn(
				"No newsletter webhook configured (N8N_NEWSLETTER_WEBHOOK). Skipping forwarding.",
			);
		}

		return NextResponse.json({
			success: true,
			forwarded,
			message:
				"You are now subscribed! Check your inbox for confirmation.",
		});
	} catch (err) {
		console.error("Newsletter API Error:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
