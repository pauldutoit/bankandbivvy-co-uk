import siteConfig from "../data/site.config.json";

// Amazon search link with the affiliate tag baked in - fallback whenever
// we do not have (or trust) a specific ASIN yet. Never quote prices from
// search results; product data changes daily and we have no live sync.
export function amazonSearchLink(query: string): string {
  const params = new URLSearchParams({
    k: query,
    tag: siteConfig.amazonAssociateTag,
  });
  return `https://www.${siteConfig.amazonMarketplace}/s?${params.toString()}`;
}

// Direct /dp/ASIN link with the affiliate tag. When the ASIN is missing
// or malformed, falls back to a keyword search built from brand + product
// so the CTA still works. ASIN validation is loose - Amazon ASINs are 10
// alphanumeric uppercase characters.
export function amazonProductLink(args: {
  asin: string;
  brand: string;
  product: string;
}): string {
  const asin = args.asin?.trim();
  if (asin && /^[A-Z0-9]{10}$/.test(asin)) {
    const params = new URLSearchParams({ tag: siteConfig.amazonAssociateTag });
    return `https://www.${siteConfig.amazonMarketplace}/dp/${asin}?${params.toString()}`;
  }
  return amazonSearchLink(`${args.brand} ${args.product}`);
}

// Prime free-trial landing page with the affiliate tag (Amazon Associates bounty).
// Check in Associates that the Prime bounty is active on the account.
export function amazonPrimeLink(): string {
  const params = new URLSearchParams({
    primeCampaignId: "prime_assoc_ft",
    tag: siteConfig.amazonAssociateTag,
  });
  return `https://www.${siteConfig.amazonMarketplace}/amazonprime?${params.toString()}`;
}

// Format a numeric price for display. Marketplace suffix decides the
// currency symbol; add more when adding marketplaces.
export function money(price: number | null): string {
  if (price == null) return "price not confirmed";
  const symbol =
    siteConfig.amazonMarketplace === "amazon.com" ? "$" :
    siteConfig.amazonMarketplace === "amazon.co.uk" ? "£" :
    "€";
  return `${symbol}${price.toLocaleString(siteConfig.locale)}`;
}

export function stars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.25 && rating - full < 0.75;
  const empty = 5 - full - (half ? 1 : 0);
  return "★".repeat(full) + (half ? "⯪" : "") + "☆".repeat(empty);
}
