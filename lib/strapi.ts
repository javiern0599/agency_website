import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchAPI(
	path: string,
	urlParamsObject = {},
	options = {},
) {
	// Merge default and user options
	const mergedOptions = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${STRAPI_TOKEN}`,
		},
		...options,
	};

	// Build request URL
	const queryString = qs.stringify(urlParamsObject);
	const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ""}`;

	// Trigger API call
	const response = await fetch(requestUrl, mergedOptions);

	if (!response.ok) {
		console.error(`Error fetching from Strapi: ${response.statusText}`);
		throw new Error("Failed to fetch data from Strapi");
	}

	const data = await response.json();
	return data;
}
