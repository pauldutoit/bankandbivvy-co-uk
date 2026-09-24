import type { APIRoute } from "astro";
import siteConfig from "../data/site.config.json";
import categories from "../data/categories.json";
import products from "../data/products.json";
import compares from "../data/compare.json";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") ?? `https://${siteConfig.domain}`;

  const urls: string[] = [
    `${siteUrl}/`,
    `${siteUrl}/about/`,
    `${siteUrl}/contact/`,
    `${siteUrl}/affiliate-disclosure/`,
    `${siteUrl}/privacy/`,
    `${siteUrl}/legal-notice/`,
    `${siteUrl}/guides/how-to-choose-first-bivvy/`,
    `${siteUrl}/guides/uk-carp-session-costs/`,
    `${siteUrl}/guides/boilies-explained/`,
    `${siteUrl}/guides/carp-rig-fundamentals/`,
    `${siteUrl}/guides/uk-carp-welfare-and-legal-basics/`,
    `${siteUrl}/tools/session-cost-calculator/`,
    `${siteUrl}/tools/bait-quantity-calculator/`,
    `${siteUrl}/data/uk-carp-records/`,
    `${siteUrl}/data/uk-carp-fishing-stats/`,
    `${siteUrl}/data/famous-uk-carp-waters/`,
    `${siteUrl}/data/when-to-buy-carp-gear/`,
    `${siteUrl}/compare/`,
    ...categories.map((c: any) => `${siteUrl}/gear/${c.slug}/`),
    ...products.map((p: any) => `${siteUrl}/reviews/${p.slug}/`),
    ...compares.map((c: any) => `${siteUrl}/compare/${c.slug}/`),
  ];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .sort()
      .map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`)
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
