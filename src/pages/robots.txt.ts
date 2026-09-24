import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap.xml", site);
  const llmsTxt = new URL("llms.txt", site);
  const body =
    `User-agent: *\nAllow: /\n\n` +
    `Sitemap: ${sitemap}\n` +
    `# LLM/AI crawler guide: ${llmsTxt}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
};
