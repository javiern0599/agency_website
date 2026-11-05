// Server-side helpers shared by the public form routes (/api/contact, /api/newsletter).
// Nov 2026: a scanner showed that form fields reached email HTML unescaped, so anyone
// could make our pipeline send a PraxisFlow-branded email with their own link in it.

const HTML_ESCAPES: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

export function escapeHtml(value: string): string {
	return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

// Trim, drop control characters (keeps \n and \t when multiline), cap the length.
export function cleanText(
	value: unknown,
	maxLength: number,
	{ multiline = false }: { multiline?: boolean } = {},
): string {
	if (typeof value !== "string") return "";
	const controls = multiline
		? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
		: /[\u0000-\u001F\u007F]/g;
	let out = value.replace(/\r\n?/g, "\n").replace(controls, multiline ? "" : " ");
	out = out.replace(/[ \t]+/g, " ").trim();
	return out.slice(0, maxLength);
}

const EMAIL_RE = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export function isValidEmail(email: string): boolean {
	return email.length <= 254 && EMAIL_RE.test(email);
}

// Name and firm are echoed back in the confirmation email. Refuse markup, template
// syntax and links there: escaping stops HTML, but mail clients still autolink URLs.
const UNSAFE_SHORT_FIELD = /[<>{}]|:\/\/|\bwww\.|\[|\]/i;

export function isSafeShortField(value: string): boolean {
	return !UNSAFE_SHORT_FIELD.test(value);
}

export function clientIp(req: Request): string {
	return (
		req.headers.get("x-real-ip") ||
		req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
		"unknown"
	);
}

// Best-effort, per-instance limiter. Vercel can run several instances, so this slows a
// script down but isn't a hard cap; the Turnstile check is the real gate.
const buckets = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
	const now = Date.now();
	const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
	if (hits.length >= limit) {
		buckets.set(key, hits);
		return true;
	}
	hits.push(now);
	buckets.set(key, hits);
	if (buckets.size > 5000) {
		for (const [k, v] of buckets) {
			if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
		}
	}
	return false;
}

// Cloudflare Turnstile. Enforced only when TURNSTILE_SECRET_KEY is set, so deploying
// this before the keys exist doesn't break the forms.
export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
	const secret = process.env.TURNSTILE_SECRET_KEY;
	if (!secret) {
		console.warn("TURNSTILE_SECRET_KEY is not set; skipping captcha check.");
		return true;
	}
	if (typeof token !== "string" || !token || token.length > 2048) return false;
	try {
		const body = new URLSearchParams({ secret, response: token });
		if (ip !== "unknown") body.set("remoteip", ip);
		const res = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{ method: "POST", body },
		);
		const data = (await res.json()) as { success?: boolean };
		return data.success === true;
	} catch (err) {
		console.error("Turnstile verification failed:", err);
		return false;
	}
}

// Headers for calls to the n8n webhooks. n8n checks X-Webhook-Secret with Header Auth.
export function n8nHeaders(): Record<string, string> {
	const headers: Record<string, string> = { "Content-Type": "application/json" };
	const secret = process.env.N8N_WEBHOOK_SECRET;
	if (secret) headers["X-Webhook-Secret"] = secret;
	else console.warn("N8N_WEBHOOK_SECRET is not set; calling n8n without it.");
	return headers;
}
