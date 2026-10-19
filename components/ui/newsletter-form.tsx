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
				className="flex w-full flex-col gap-2 sm:flex-row"
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
					className="w-full rounded-sm border border-rule bg-white px-3 py-2.5 text-sm text-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent"
					aria-label="Email address"
				/>
				<button
					type="submit"
					className="grid place-items-center rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-deep disabled:cursor-not-allowed disabled:opacity-70"
					disabled={status === "loading"}
				>
					{status === "loading" ? (
						<>
							<Loader2 className="h-5 w-5 animate-spin" aria-label="Subscribing" />
						</>
					) : (
						"Subscribe"
					)}
				</button>
			</form>

			{message && (
				<p
					className={`mt-3 text-sm ${status === "error" ? "text-red-700" : "text-accent-ink"}`}
				>
					{message}
				</p>
			)}

			<p className="mt-3 text-xs text-muted-foreground">Unsubscribe at any time.</p>
		</div>
	);
}
