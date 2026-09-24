import type { APIRoute } from "astro";
import siteConfig from "../data/site.config.json";
import categories from "../data/categories.json";
import products from "../data/products.json";
import compares from "../data/compare.json";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") ?? `https://${siteConfig.domain}`;
  const body =
    `# ${siteConfig.siteName}\n\n` +
    `> ${siteConfig.niche}. Written by ${siteConfig.authorName}. Independent - funded by Amazon Associates commissions, editorial not influenced by manufacturers.\n\n` +
    `## Buying guides\n\n` +
    `- [How to choose your first bivvy](${siteUrl}/guides/how-to-choose-first-bivvy/): The four specs that decide whether a bivvy lasts a decade.\n` +
    `- [What a UK carp season costs](${siteUrl}/guides/uk-carp-session-costs/): Honest annual budget for three angler profiles.\n` +
    `- [Boilies explained](${siteUrl}/guides/boilies-explained/): Shelf-life vs freezer, fishmeal vs birdfood, and when to switch bait.\n` +
    `- [Carp rig fundamentals](${siteUrl}/guides/carp-rig-fundamentals/): Hair, chod, zig, safe leadcore - the four rigs every UK angler should know.\n` +
    `- [UK carp welfare & legal basics](${siteUrl}/guides/uk-carp-welfare-and-legal-basics/): Rod licence, close season, safe rigs, retention rules, best-practice fish care.\n\n` +
    `## Head-to-head comparisons\n\n` +
    `- [Compare index](${siteUrl}/compare/): All UK carp gear head-to-head comparisons.\n` +
    compares.map((c: any) => {
      const left = products.find((p: any) => p.slug === c.leftSlug);
      const right = products.find((p: any) => p.slug === c.rightSlug);
      return left && right ? `- [${left.name} vs ${right.name}](${siteUrl}/compare/${c.slug}/): ${c.tagline}` : "";
    }).filter(Boolean).join("\n") + `\n\n` +
    `## Data & tools\n\n` +
    `- [Session cost calculator](${siteUrl}/tools/session-cost-calculator/): Interactive calculator for your annual UK carp fishing budget.\n` +
    `- [Bait quantity calculator](${siteUrl}/tools/bait-quantity-calculator/): Interactive calculator for kg of boilies per session and per year.\n` +
    `- [UK carp records](${siteUrl}/data/uk-carp-records/): Historical BRFC data - Walker's Clarissa (1952) to Nixon's Waterside Common (2026 ratified record).\n` +
    `- [UK carp fishing stats](${siteUrl}/data/uk-carp-fishing-stats/): Rod licence sales, market size and participation trends from EA and Angling Trust data.\n` +
    `- [Famous UK carp waters](${siteUrl}/data/famous-uk-carp-waters/): Twelve historic and contemporary UK carp waters - Redmire, Wraysbury, Conningbrook, Waterside, Yateley, Linear, Elphicks and more.\n` +
    `- [When to buy carp gear](${siteUrl}/data/when-to-buy-carp-gear/): Amazon UK 2026 promotional calendar and seasonality data per gear category.\n\n` +
    `## Categories\n\n` +
    categories.map((c: any) => `- [${c.name}](${siteUrl}/gear/${c.slug}/): ${c.tagline}`).join("\n") +
    `\n\n## Reviews\n\n` +
    products.map((p: any) => `- [${p.name}](${siteUrl}/reviews/${p.slug}/): ${p.verdict}`).join("\n") +
    `\n\n## About & legal\n\n` +
    `- [About](${siteUrl}/about/)\n` +
    `- [Affiliate disclosure](${siteUrl}/affiliate-disclosure/)\n` +
    `- [Privacy](${siteUrl}/privacy/)\n` +
    `- [Legal notice](${siteUrl}/legal-notice/)\n` +
    `- [Contact](${siteUrl}/contact/)\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
