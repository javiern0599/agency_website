export const FB_PIXEL_ID = "1361940142522848";

// Logs standard virtual pageviews on single-page-app navigation changes
export const pageview = () => {
	if (typeof window !== "undefined" && window.fbq) {
		window.fbq("track", "PageView");
	}
};

// Logs conversion actions along with custom structural payload metrics
export const event = (name: string, options?: Record<string, any>) => {
	if (typeof window !== "undefined" && window.fbq) {
		window.fbq("track", name, options);
	}
};

// Logs personalized non-standard internal pipeline tracking milestones
export const customEvent = (name: string, options?: Record<string, any>) => {
	if (typeof window !== "undefined" && window.fbq) {
		window.fbq("trackCustom", name, options);
	}
};
