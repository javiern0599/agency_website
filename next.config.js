/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			// Left over from the domain's previous owner (a static site); Search Console reports it as a 404.
			{ source: "/index.html", destination: "/", permanent: true },
		];
	},
};

module.exports = nextConfig;
