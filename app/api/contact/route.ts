import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
	clientIp,
	cleanText,
	escapeHtml,
	isSafeShortField,
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

		// Honeypot check
		if (body.fax) {
			console.warn("Honeypot activated. Bot detected.");
			return NextResponse.json({
				success: true,
				message: "Spam filtered",
			});
		}

		const ip = clientIp(req);
		if (rateLimited(`contact:${ip}`, 5, 10 * 60 * 1000)) {
			return NextResponse.json(
				{ error: "Too many requests. Please try again in a few minutes." },
				{ status: 429 },
			);
		}

		const name = cleanText(body.name, 100);
		const email = cleanText(body.email, 254).toLowerCase();
		const firm = cleanText(body.firm, 150);
		const message = cleanText(body.message, 5000, { multiline: true });

		// Validation
		if (!name || !email || !firm || !message) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}
		if (!isValidEmail(email)) {
			return NextResponse.json(
				{ error: "Please enter a valid work email" },
				{ status: 400 },
			);
		}
		if (!isSafeShortField(name) || !isSafeShortField(firm)) {
			return NextResponse.json(
				{ error: "Name and firm can't contain links or special characters" },
				{ status: 400 },
			);
		}

		if (!(await verifyTurnstile(body.turnstileToken, ip))) {
			return NextResponse.json(
				{ error: "Verification failed. Please refresh the page and try again." },
				{ status: 403 },
			);
		}

		// ==========================================
		// 1. PRIMARY ROUTE: Send to n8n Webhook
		// ==========================================

		const n8nUrl = process.env.N8N_WEBHOOK_URL;
		let n8nSuccess = false;

		if (n8nUrl) {
			try {
				const n8nResponse = await fetch(n8nUrl, {
					method: "POST",
					headers: n8nHeaders(),
					body: JSON.stringify({
						name,
						email,
						firm,
						message,
						source: "Website Contact Form",
						timestamp: new Date().toISOString(),
					}),
				});

				if (n8nResponse.ok) {
					n8nSuccess = true;
					console.log("Successfully sent lead to n8n");
				} else {
					console.error(
						"n8n responded with error:",
						n8nResponse.status,
					);
				}
			} catch (err) {
				console.error("Failed to connect to n8n webhook:", err);
			}
		} else {
			console.warn(
				"N8N_WEBHOOK_URL is not set in environment variables.",
			);
		}

		// ==========================================
		// 2. FALLBACK/NOTIFICATION: Send via Resend
		// ==========================================

		if (!process.env.RESEND_API_KEY) {
			if (n8nSuccess) {
				return NextResponse.json({
					success: true,
					message: "Sent to n8n, email skipped",
				});
			}
			return NextResponse.json(
				{ error: "Resend API key is missing and n8n failed" },
				{ status: 500 },
			);
		}

		const resend = new Resend(process.env.RESEND_API_KEY);
		const { error } = await resend.emails.send({
			from: "PraxisFlow Leads <onboarding@mail.praxisflow.com>",
			to: ["contact@praxisflow.com"],
			// cleanText already removed line breaks from firm, so it can't add headers.
			subject: n8nSuccess
				? `[n8n Logged] New Lead: ${firm}`
				: `[URGENT - n8n Failed] New Lead: ${firm}`,
			replyTo: email,
			html: `
                <h2>New Contact Request</h2>
                <p><strong>Status:</strong> ${n8nSuccess ? "✅ Logged in Airtable via n8n" : "❌ n8n Failed - Manual Entry Required"}</p>
                <hr />
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Firm:</strong> ${escapeHtml(firm)}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            `,
		});

		if (error && !n8nSuccess) {
			// Both n8n and Resend failed
			console.error("Resend API Error:", error);
			return NextResponse.json(
				{ error: "Failed to process lead" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("API Route Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
