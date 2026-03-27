import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, firm, message, fax } = await req.json();

        // Honeypot check
        if (fax) {
            console.warn("Honeypot activated. Bot detected.");
            return NextResponse.json({
                success: true,
                message: "Spam filtered",
            });
        }

        // Basic Validation
        if (!name || !email || !firm || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        // ==========================================
        // 1. PRIMARY ROUTE: Send to n8n Webhook
        // ==========================================
        
        // Ensure you add this variable to your .env file:
        // N8N_WEBHOOK_URL="https://n8n.yourdomain.com/webhook/contact-form"
        const n8nUrl = process.env.N8N_WEBHOOK_URL;
        let n8nSuccess = false;

        if (n8nUrl) {
            try {
                const n8nResponse = await fetch(n8nUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        firm,
                        message,
                        source: 'Website Contact Form',
                        timestamp: new Date().toISOString()
                    }),
                });

                if (n8nResponse.ok) {
                    n8nSuccess = true;
                    console.log("Successfully sent lead to n8n");
                } else {
                    console.error("n8n responded with error:", n8nResponse.status);
                }
            } catch (err) {
                console.error("Failed to connect to n8n webhook:", err);
            }
        } else {
            console.warn("N8N_WEBHOOK_URL is not set in environment variables.");
        }

        // ==========================================
        // 2. FALLBACK/NOTIFICATION: Send via Resend
        // ==========================================
        
        // If n8n failed, we MUST send an email so the lead isn't lost.
        // Even if n8n succeeded, you might still want an immediate email notification.
        // You can remove this block if your n8n workflow handles all email notifications.
        
        if (!process.env.RESEND_API_KEY) {
             if(n8nSuccess) {
                 return NextResponse.json({ success: true, message: "Sent to n8n, email skipped" });
             }
             return NextResponse.json({ error: "Resend API key is missing and n8n failed" }, { status: 500 });
        }

        const { data, error } = await resend.emails.send({
            from: "PraxisFlow Leads <onboarding@mail.praxisflow.com>", // Update this to your verified domain when ready
            to: ["contact@praxisflow.com"],
            subject: n8nSuccess 
                ? `[n8n Logged] New Lead: ${firm}` 
                : `[URGENT - n8n Failed] New Lead: ${firm}`,
            replyTo: email,
            html: `
                <h2>New Contact Request</h2>
                <p><strong>Status:</strong> ${n8nSuccess ? "✅ Logged in Airtable via n8n" : "❌ n8n Failed - Manual Entry Required"}</p>
                <hr />
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Firm:</strong> ${firm}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
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

        return NextResponse.json({ success: true, n8nSuccess, resendData: data });

    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}