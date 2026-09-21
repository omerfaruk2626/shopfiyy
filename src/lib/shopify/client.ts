import "server-only";

import { assertShopifyConfigured, buildStorefrontHeaders, getShopifyConfig } from "./config";

export class ShopifyError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ShopifyError";
  }
}

type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{ message: string; extensions?: { code?: string } }>;
};

/**
 * Server-only Storefront GraphQL client.
 * Access token asla client bundle'a sızmamalıdır (server-only + NEXT_PUBLIC yok).
 */
export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
  revalidate,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  const config = assertShopifyConfigured();

  const next: NextFetchRequestConfig = {};
  if (tags) next.tags = tags;
  if (revalidate !== undefined) next.revalidate = revalidate;

  let response: Response;
  try {
    response = await fetch(config.endpoint!, {
      method: "POST",
      headers: buildStorefrontHeaders(),
      body: JSON.stringify({ query, variables }),
      cache,
      next: Object.keys(next).length > 0 ? next : undefined,
    });
  } catch {
    throw new ShopifyError(
      "Shopify mağazasına bağlanılamadı. Lütfen daha sonra tekrar deneyin.",
    );
  }

  if (!response.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Shopify HTTP]", response.status, response.statusText);
    }
    throw new ShopifyError(
      "Shopify Storefront API isteği başarısız oldu.",
      response.status,
    );
  }

  let json: ShopifyResponse<T>;
  try {
    json = (await response.json()) as ShopifyResponse<T>;
  } catch {
    throw new ShopifyError("Shopify yanıtı okunamadı.");
  }

  if (json.errors?.length) {
    if (process.env.NODE_ENV === "development") {
      // Token asla loglanmaz — yalnızca GraphQL mesajları
      console.error(
        "[Shopify GraphQL]",
        json.errors.map((e) => e.message),
      );
    }
    throw new ShopifyError(
      "Ürün bilgileri şu anda alınamıyor. Lütfen daha sonra tekrar deneyin.",
      undefined,
      json.errors,
    );
  }

  if (!json.data) {
    throw new ShopifyError("Shopify boş yanıt döndürdü.");
  }

  return json.data;
}

export function isMockMode() {
  return getShopifyConfig().useMockData;
}
