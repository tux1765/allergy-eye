export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname === "/api/name") {
			return new Response(JSON.stringify({ name: "Cloudflare" }), {
				headers: { "Content-Type": "application/json" },
			});
		}

		return new Response(null, { status: 404 });
	},
};