import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, fax } = await req.json();

		// Honeypot
		if (fax) {
			console.warn("Honeypot activated. Bot detected.");
			return NextResponse.json({
				success: true,
				message: "Spam filtered",
			});
		}

		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email" },
				{ status: 400 },
			);
		}

		const webhook = process.env.N8N_NEWSLETTER_WEBHOOK;
		let forwarded = false;

		if (webhook) {
			try {
				const r = await fetch(webhook, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
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
						await r.text(),
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
