"use client";

import { Loader2 } from "lucide-react";
import React, { useState } from "react";

export function NewsletterForm() {
	const [email, setEmail] = useState("");
	const [fax, setFax] = useState("");
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [message, setMessage] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setMessage("");
		if (!email) {
			setStatus("error");
			setMessage("Please enter an email address.");
			return;
		}

		setStatus("loading");

		try {
			const res = await fetch("/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, fax }),
			});

			const data = await res.json();

			if (res.ok) {
				setStatus("success");
				setMessage(
					data?.message ||
						"Thanks! You are now subscribed. Check your inbox for confirmation.",
				);
				setEmail("");
			} else {
				setStatus("error");
				setMessage(
					data?.error || "Subscription failed. Please try again.",
				);
			}
		} catch (err) {
			console.error(err);
			setStatus("error");
			setMessage("Network error — please try again later.");
		}
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col lg:flex-row gap-2 w-full lg:gap-3"
			>
				{/* Honeypot (hidden from users, visible in DOM for bots) */}
				<div
					style={{
						position: "absolute",
						left: "-10000px",
						width: "1px",
						height: "1px",
						overflow: "hidden",
					}}
					aria-hidden="true"
				>
					<label>Fax</label>
					<input
						type="text"
						name="fax"
						value={fax}
						onChange={(e) => setFax(e.target.value)}
						autoComplete="off"
						tabIndex={-1}
						aria-hidden="true"
					/>
				</div>
				<label className="sr-only">Email</label>
				<input
					type="email"
					placeholder="Your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border border-border rounded-md px-3 py-2 w-full text-sm bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
					aria-label="Email address"
				/>
				<button
					type="submit"
					className="bg-accent text-white rounded-md px-4 py-2 text-sm hover:bg-accent/90 transition-colors shadow-sm disabled:bg-accent/70 disabled:cursor-not-allowed"
					disabled={status === "loading"}
				>
					{status === "loading" ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
						</>
					) : (
						"Subscribe"
					)}
				</button>
			</form>

			{message && (
				<p
					className={`mt-3 text-sm ${status === "error" ? "text-red-500" : "text-green-600"}`}
				>
					{message}
				</p>
			)}

			<p className="text-xs text-muted-foreground mt-4 md:max-w-xs">
				Get the latest insights and workflow automation updates.
				Unsubscribe at any time.
			</p>
		</div>
	);
}
