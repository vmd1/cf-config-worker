export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);

    if (url.pathname.startsWith("/v1/config/")) {
      const key = url.pathname.split("/").pop();

      const config = await env.CONFIG_KV.get(key, "json");

      if (!config) {
        return Response.json(
          { error: "Not found" },
          {
            status: 404,
            headers: corsHeaders,
          }
        );
      }

      return Response.json(config, {
        headers: corsHeaders,
      });
    }

    return Response.json(
      { error: "Not found" },
      {
        status: 404,
        headers: corsHeaders,
      }
    );
  },
};
