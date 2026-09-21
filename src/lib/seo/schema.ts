import { siteConfig } from "@/config/site";
import type { Product } from "@/types/shopify";
import { absoluteUrl } from "@/lib/utils";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Yalnızca gerçek Shopify verisi.
 * rating / reviewCount üretilmez.
 * sku / brand yoksa property eklenmez.
 */
export function productSchema(product: Product) {
  const variant =
    product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  const images = product.images.map((img) => img.url).filter(Boolean);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
  };

  if (product.description) {
    schema.description = product.description;
  }

  if (images.length) {
    schema.image = images;
  }

  if (variant?.sku) {
    schema.sku = variant.sku;
  }

  if (product.vendor) {
    schema.brand = { "@type": "Brand", name: product.vendor };
  }

  if (variant?.price) {
    schema.offers = {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.handle}`),
      priceCurrency: variant.price.currencyCode,
      price: variant.price.amount,
      availability: variant.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    };
  }

  return schema;
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    datePublished: input.datePublished,
  };
}
