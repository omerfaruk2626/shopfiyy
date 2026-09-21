/**
 * Hızlı bağlantı testi (development CLI).
 * npm run shopify:ping
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

const domain = (process.env.SHOPIFY_STORE_DOMAIN || "")
  .replace(/^https?:\/\//i, "")
  .replace(/\/$/, "")
  .trim();
const publicToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim() || "";
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim() || "";
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || "2025-01";

if (!domain || (!publicToken && !privateToken)) {
  console.error("Credentials eksik. .env.local dosyasını doldurun.");
  process.exit(1);
}

const headers = { "Content-Type": "application/json" };
if (privateToken) {
  headers["Shopify-Storefront-Private-Token"] = privateToken;
} else {
  headers["X-Shopify-Storefront-Access-Token"] = publicToken;
}

const response = await fetch(
  `https://${domain}/api/${apiVersion}/graphql.json`,
  {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: `{ shop { name primaryDomain { url } } }`,
    }),
  },
);

if (!response.ok) {
  console.error(`HTTP ${response.status} — bağlantı başarısız (token loglanmaz).`);
  process.exit(1);
}

const json = await response.json();
if (json.errors?.length) {
  console.error("GraphQL error:", json.errors.map((e) => e.message).join("; "));
  process.exit(1);
}

console.log("Shopify connection successful");
console.log(`Shop: ${json.data.shop.name}`);
console.log(`Domain: ${json.data.shop.primaryDomain?.url ?? domain}`);
