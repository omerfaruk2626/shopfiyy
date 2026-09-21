/**
 * Development-only Shopify connection + catalog discovery.
 * Production bundle'a dahil değildir — yalnızca CLI: npm run shopify:discover
 *
 * Token ASLA loglanmaz.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const raw = readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));
loadEnvFile(resolve(process.cwd(), ".env"));

function normalizeDomain(raw) {
  return raw.replace(/^https?:\/\//i, "").replace(/\/$/, "").trim();
}

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? normalizeDomain(process.env.SHOPIFY_STORE_DOMAIN)
  : "";
const publicToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim() || "";
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim() || "";
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || "2025-01";
const useMock = process.env.USE_MOCK_DATA === "true";

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

if (useMock) {
  fail(
    "USE_MOCK_DATA=true. Discovery için .env.local içinde USE_MOCK_DATA=false yapın ve gerçek credentials girin.",
  );
}

if (!domain || (!publicToken && !privateToken)) {
  fail(
    "SHOPIFY_STORE_DOMAIN ve SHOPIFY_STOREFRONT_ACCESS_TOKEN (veya PRIVATE_TOKEN) gerekli.",
  );
}

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

function buildHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (privateToken) {
    headers["Shopify-Storefront-Private-Token"] = privateToken;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = publicToken;
  }
  return headers;
}

async function shopifyQuery(query, variables) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    fail(`HTTP ${response.status} — Storefront API isteği başarısız (token loglanmaz).`);
  }

  const json = await response.json();
  if (json.errors?.length) {
    console.error("GraphQL errors:", json.errors.map((e) => e.message).join("; "));
    fail("GraphQL hatası — credentials / scope / API version kontrol edin.");
  }
  return json.data;
}

const SHOP_QUERY = `#graphql
  query ShopPing {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;

const COLLECTIONS_QUERY = `#graphql
  query DiscoverCollections {
    collections(first: 50) {
      nodes {
        id
        handle
        title
        description
        image {
          url
          altText
        }
        seo {
          title
          description
        }
      }
    }
  }
`;

const PRODUCTS_QUERY = `#graphql
  query DiscoverProducts {
    products(first: 10) {
      nodes {
        id
        handle
        title
        description
        descriptionHtml
        productType
        vendor
        tags
        availableForSale
        featuredImage {
          url
          altText
          width
          height
        }
        images(first: 5) {
          nodes {
            url
            altText
          }
        }
        options {
          id
          name
          values
        }
        variants(first: 50) {
          nodes {
            id
            title
            availableForSale
            sku
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        seo {
          title
          description
        }
      }
    }
  }
`;

async function main() {
  console.log("\n========== STORE ==========");
  console.log(`Domain: ${domain}`);
  console.log(`API version: ${apiVersion}`);
  console.log(`Auth: ${privateToken ? "private token header" : "public storefront token header"}`);

  const shopData = await shopifyQuery(SHOP_QUERY);
  console.log("Shopify connection successful");
  console.log(`Shop name: ${shopData.shop.name}`);
  console.log(`Primary domain: ${shopData.shop.primaryDomain?.url ?? "(yok)"}`);

  console.log("\n========== COLLECTIONS ==========");
  const collectionsData = await shopifyQuery(COLLECTIONS_QUERY);
  const collections = collectionsData.collections.nodes;
  if (!collections.length) {
    console.log("(hiç collection yok)");
  } else {
    for (const c of collections) {
      console.log(`- handle: ${c.handle}`);
      console.log(`  title: ${c.title}`);
      console.log(`  id: ${c.id}`);
    }
  }

  console.log("\n========== PRODUCTS (first 10) ==========");
  const productsData = await shopifyQuery(PRODUCTS_QUERY);
  const products = productsData.products.nodes;

  const optionNames = new Set();

  if (!products.length) {
    console.log("(hiç ürün yok)");
  } else {
    for (const p of products) {
      console.log(`\n• ${p.title}`);
      console.log(`  handle: ${p.handle}`);
      console.log(`  id: ${p.id}`);
      console.log(`  type: ${p.productType || "(yok)"} | vendor: ${p.vendor || "(yok)"}`);
      console.log(`  availableForSale: ${p.availableForSale}`);
      console.log(
        `  price: ${p.priceRange.minVariantPrice.amount}–${p.priceRange.maxVariantPrice.amount} ${p.priceRange.minVariantPrice.currencyCode}`,
      );
      console.log(`  images: ${p.images.nodes.length} | featured: ${p.featuredImage ? "yes" : "no"}`);
      console.log(`  options:`);
      for (const opt of p.options) {
        optionNames.add(opt.name);
        console.log(`    - ${opt.name}: [${opt.values.join(", ")}]`);
      }
      console.log(`  variants (${p.variants.nodes.length}):`);
      for (const v of p.variants.nodes.slice(0, 8)) {
        const opts = v.selectedOptions.map((o) => `${o.name}=${o.value}`).join(", ");
        console.log(
          `    - ${v.id} | ${v.title} | ${v.price.amount} ${v.price.currencyCode} | sale=${v.availableForSale} | ${opts}`,
        );
      }
      if (p.variants.nodes.length > 8) {
        console.log(`    … +${p.variants.nodes.length - 8} more`);
      }
    }
  }

  console.log("\n========== OPTIONS (unique across sample) ==========");
  if (optionNames.size === 0) {
    console.log("(option yok)");
  } else {
    for (const name of optionNames) {
      console.log(`- ${name}`);
    }
  }

  console.log("\n========== METAFIELDS ==========");
  console.log(
    "Storefront API metafield'leri yalnızca bilinen namespace/key ile sorgulanır.",
  );
  console.log(
    "Admin → Settings → Custom data → Products içindeki tanımları paylaşın;",
  );
  console.log(
    "ardından siteConfig.shopify.metafieldIdentifiers doldurulacak.",
  );
  console.log(
    "\nDiscovery tamam. Navigation/config için COLLECTIONS handle listesini kullanın.\n",
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : "Unexpected error");
  process.exit(1);
});
