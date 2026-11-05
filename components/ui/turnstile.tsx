"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Cloudflare Turnstile widget. Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is
// unset, so the forms keep working until the keys are added in Vercel.

declare global {
	interface Window {
		turnstile?: {
			render: (el: HTMLElement, opts: Record<string, unknown>) => string;
			reset: (id?: string) => void;
			remove: (id?: string) => void;
		};
	}
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
	if (window.turnstile) return Promise.resolve();
	if (!scriptPromise) {
		scriptPromise = new Promise((resolve, reject) => {
			const s = document.createElement("script");
			s.src = SCRIPT_SRC;
			s.async = true;
			s.defer = true;
			s.onload = () => resolve();
			s.onerror = () => {
				scriptPromise = null;
				reject(new Error("Turnstile failed to load"));
			};
			document.head.appendChild(s);
		});
	}
	return scriptPromise;
}

export const turnstileEnabled = Boolean(SITE_KEY);

export type TurnstileHandle = { reset: () => void };

type Props = {
	onToken: (token: string) => void;
	className?: string;
};

export const Turnstile = forwardRef<TurnstileHandle, Props>(function Turnstile(
	{ onToken, className },
	ref,
) {
	const container = useRef<HTMLDivElement>(null);
	const widgetId = useRef<string | null>(null);
	const onTokenRef = useRef(onToken);
	onTokenRef.current = onToken;

	useImperativeHandle(ref, () => ({
		reset: () => {
			onTokenRef.current("");
			if (widgetId.current && window.turnstile) {
				window.turnstile.reset(widgetId.current);
			}
		},
	}));

	useEffect(() => {
		if (!SITE_KEY) return;
		let cancelled = false;
		loadScript()
			.then(() => {
				if (cancelled || !container.current || !window.turnstile) return;
				widgetId.current = window.turnstile.render(container.current, {
					sitekey: SITE_KEY,
					appearance: "interaction-only",
					callback: (token: string) => onTokenRef.current(token),
					"expired-callback": () => onTokenRef.current(""),
					"error-callback": () => onTokenRef.current(""),
				});
			})
			.catch((err) => console.error(err));
		return () => {
			cancelled = true;
			if (widgetId.current && window.turnstile) {
				window.turnstile.remove(widgetId.current);
			}
			widgetId.current = null;
		};
	}, []);

	if (!SITE_KEY) return null;
	return <div ref={container} className={className} />;
});
