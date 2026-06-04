export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // /v1/time
    if (path === "/v1/config/time") {
      return Response.json({
        time: new Date().toISOString(),
      });
    }

    // /v1/date
    if (path === "/v1/config/date") {
      return Response.json({
        date: new Date().toISOString().split("T")[0],
      });
    }

    // /v1/config/<key>
    if (path.startsWith("/v1/config/")) {
      const key = path.replace("/v1/config/", "");

      const value = await env.CONFIG_KV.get(key);

      if (!value) {
        return Response.json(
          { error: "Config not found" },
          { status: 404 }
        );
      }

      try {
        return Response.json(JSON.parse(value));
      } catch {
        return Response.json({ value });
      }
    }

    return Response.json(
      { error: "Not found" },
      { status: 404 }
    );
  },
};
