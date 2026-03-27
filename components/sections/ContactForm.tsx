"use client";

import React, { useState } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactForm() {
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		firm: "",
		message: "",
		fax: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [errorMessage, setErrorMessage] = useState("");

	const validateField = (name: string, value: string) => {
		let error = "";
		if (name === "name") {
			if (!value.trim()) error = "Name is required";
			else if (value.trim().length < 2)
				error = "Name must be at least 2 characters";
		} else if (name === "email") {
			if (!value.trim()) error = "Email is required";
			else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
				error = "Please enter a valid work email";
		} else if (name === "firm") {
			if (!value.trim()) error = "Firm name is required";
		} else if (name === "message") {
			if (!value.trim()) error = "Please tell us a bit about your needs";
			else if (value.trim().length < 10) error = "Message is too short";
		}
		return error;
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));

		const error = validateField(id, value);
		setErrors((prev) => ({ ...prev, [id]: error }));
	};

	const handleBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id } = e.target;
		setTouched((prev) => ({ ...prev, [id]: true }));
		const error = validateField(id, formData[id as keyof typeof formData]);
		setErrors((prev) => ({ ...prev, [id]: error }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate all fields before submission
		const newErrors: Record<string, string> = {};
		let hasErrors = false;
		Object.keys(formData).forEach((key) => {
			const error = validateField(
				key,
				formData[key as keyof typeof formData],
			);
			if (error) {
				newErrors[key] = error;
				hasErrors = true;
			}
		});

		if (hasErrors) {
			setErrors(newErrors);
			setTouched({ name: true, email: true, firm: true, message: true });
			return;
		}

		setStatus("loading");
		setErrorMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to send");
			}

			setStatus("success");
			setFormData({
				name: "",
				email: "",
				firm: "",
				message: "",
				fax: "",
			});
			setTouched({});
			setErrors({});
		} catch (error: any) {
			console.error("Form error:", error);
			setErrorMessage(error.message);
			setStatus("error");
		}
	};

	if (status === "success") {
		return (
			<div className="text-center py-12 space-y-4">
				<div className="flex justify-center">
					<CheckCircle2 className="w-16 h-16 text-teal-500 animate-in zoom-in duration-300" />
				</div>
				<h2 className="text-2xl font-bold text-foreground">
					Message Sent!
				</h2>
				<p className="text-muted-foreground">
					Thank you for reaching out. We'll get back to you shortly to
					schedule your workflow audit.
				</p>
				<button
					onClick={() => setStatus("idle")}
					className="text-primary font-medium hover:underline"
				>
					Send another message
				</button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-2">
					<label
						htmlFor="name"
						className="text-sm font-medium text-foreground"
					>
						Name
					</label>
					<input
						id="name"
						type="text"
						required
						value={formData.name}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="John Doe"
						disabled={status === "loading"}
						className={cn(
							"w-full px-4 py-3 bg-background border rounded-lg text-foreground focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors",
							touched.name && errors.name
								? "border-red-500 focus:ring-red-500/20"
								: "border-input focus:ring-ring",
						)}
					/>
					{touched.name && errors.name && (
						<p className="text-red-500 text-xs mt-1">
							{errors.name}
						</p>
					)}
				</div>
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="text-sm font-medium text-foreground"
					>
						Work Email
					</label>
					<input
						id="email"
						type="email"
						required
						value={formData.email}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="john@lawfirm.com"
						disabled={status === "loading"}
						className={cn(
							"w-full px-4 py-3 bg-background border rounded-lg text-foreground focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors",
							touched.email && errors.email
								? "border-red-500 focus:ring-red-500/20"
								: "border-input focus:ring-ring",
						)}
					/>
					{touched.email && errors.email && (
						<p className="text-red-500 text-xs mt-1">
							{errors.email}
						</p>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<label
					htmlFor="firm"
					className="text-sm font-medium text-foreground"
				>
					Firm Name
				</label>
				<input
					id="firm"
					type="text"
					required
					value={formData.firm}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Doe & Partners LLP"
					disabled={status === "loading"}
					className={cn(
						"w-full px-4 py-3 bg-background border rounded-lg text-foreground focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors",
						touched.firm && errors.firm
							? "border-red-500 focus:ring-red-500/20"
							: "border-input focus:ring-ring",
					)}
				/>
				{touched.firm && errors.firm && (
					<p className="text-red-500 text-xs mt-1">{errors.firm}</p>
				)}
			</div>

			<div className="space-y-2">
				<label
					htmlFor="message"
					className="text-sm font-medium text-foreground"
				>
					What is the biggest bottleneck in your current workflow?
				</label>
				<textarea
					id="message"
					rows={4}
					required
					value={formData.message}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Tell us about your current challenges..."
					disabled={status === "loading"}
					className={cn(
						"w-full px-4 py-3 bg-background border rounded-lg text-foreground focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors",
						touched.message && errors.message
							? "border-red-500 focus:ring-red-500/20"
							: "border-input focus:ring-ring",
					)}
				/>
				{touched.message && errors.message && (
					<p className="text-red-500 text-xs mt-1">
						{errors.message}
					</p>
				)}
			</div>

			<div className="hidden" aria-hidden="true">
				<input
					id="fax"
					type="text"
					tabIndex={-1}
					value={formData.fax}
					onChange={handleChange}
					autoComplete="off"
				/>
			</div>

			{status === "error" && (
				<p className="text-red-500 text-sm font-medium">
					{errorMessage ||
						"Something went wrong. Please try again or email us directly."}
				</p>
			)}

			<div className="pt-4">
				<ShimmerButton
					type="submit"
					disabled={status === "loading"}
					className="w-full disabled:opacity-70"
					background="hsl(var(--primary))"
					shimmerSize="0.30em"
					shimmerColor="#0d9488"
					shimmerDuration="2s"
				>
					<span className="flex items-center justify-center gap-2 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
						{status === "loading" ? (
							<>
								<Loader2 className="w-5 h-5 animate-spin" />
								Sending...
							</>
						) : (
							"Request Audit"
						)}
					</span>
				</ShimmerButton>
			</div>
		</form>
	);
}
