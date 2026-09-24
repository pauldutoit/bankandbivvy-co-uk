import siteConfig from "../data/site.config.json";

export function breadcrumbListJsonLd(
  items: { label: string; url: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.url,
    })),
  };
}

export function productJsonLd(args: {
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  url: string;
  summary: string;
  amazonUrl: string;
  currency?: string;
}): object {
  const currency =
    args.currency ??
    (siteConfig.amazonMarketplace === "amazon.com" ? "USD" :
     siteConfig.amazonMarketplace === "amazon.co.uk" ? "GBP" :
     "EUR");
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.name,
    description: args.description,
    category: args.category,
    brand: { "@type": "Brand", name: args.brand },
    url: args.url,
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: String(args.price),
      url: args.amazonUrl,
      availability: "https://schema.org/InStock",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(args.rating),
        bestRating: "5",
      },
      author: { "@type": "Organization", name: siteConfig.siteName },
      reviewBody: args.summary,
    },
  };
}

export function websiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: `https://${siteConfig.domain}/`,
    inLanguage: siteConfig.locale,
  };
}

export function faqJsonLd(items: { q: string; a: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
