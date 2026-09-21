/**
 * Shopify Storefront API yapılandırması.
 * Token'lar yalnızca server-side kullanılır — NEXT_PUBLIC_ öneki YOK.
 */

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

/** my-store.myshopify.com — protokol/path temizlenir */
export function normalizeStoreDomain(raw: string): string {
  return raw
    .replace(/^https?:\/\//i, "")
    .replace(/\/$/, "")
    .trim();
}

export function getShopifyConfig() {
  const rawDomain = readEnv("SHOPIFY_STORE_DOMAIN");
  const domain = rawDomain ? normalizeStoreDomain(rawDomain) : undefined;
  /** Public Storefront access token (X-Shopify-Storefront-Access-Token) */
  const storefrontToken = readEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  /**
   * Opsiyonel private Storefront token (server-only).
   * Header: Shopify-Storefront-Private-Token
   * Public token yerine veya yanında kullanılabilir.
   */
  const privateToken = readEnv("SHOPIFY_STOREFRONT_PRIVATE_TOKEN");
  const apiVersion = readEnv("SHOPIFY_STOREFRONT_API_VERSION") || "2025-01";
  const useMockFlag = readEnv("USE_MOCK_DATA");

  const hasCredentials = Boolean(domain && (storefrontToken || privateToken));

  /**
   * Mock: USE_MOCK_DATA=true VEYA credentials yokken (ve false zorlanmamışsa).
   * Böylece Shopify bağlanmadan site gezilebilir.
   * USE_MOCK_DATA=false + credentials yok → gerçek API (hata = error state, demo yok).
   */
  const useMockData =
    useMockFlag === "true" ||
    (!hasCredentials && useMockFlag !== "false");

  return {
    domain,
    storefrontToken,
    privateToken,
    apiVersion,
    hasCredentials,
    useMockData,
    endpoint: domain ? `https://${domain}/api/${apiVersion}/graphql.json` : null,
  };
}

export function assertShopifyConfigured() {
  const config = getShopifyConfig();
  if (config.useMockData) {
    throw new Error(
      "Mock modundayken gerçek Shopify client çağrılmamalı. isMockMode() ile ayırın.",
    );
  }
  if (!config.hasCredentials || !config.endpoint) {
    throw new Error(
      "Shopify credentials eksik. SHOPIFY_STORE_DOMAIN ve SHOPIFY_STOREFRONT_ACCESS_TOKEN (veya SHOPIFY_STOREFRONT_PRIVATE_TOKEN) tanımlayın.",
    );
  }
  return config;
}

export function buildStorefrontHeaders(): Record<string, string> {
  const config = assertShopifyConfigured();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Private token öncelikli (server-only) — Shopify Headless önerisi
  if (config.privateToken) {
    headers["Shopify-Storefront-Private-Token"] = config.privateToken;
  } else if (config.storefrontToken) {
    headers["X-Shopify-Storefront-Access-Token"] = config.storefrontToken;
  }

  return headers;
}
