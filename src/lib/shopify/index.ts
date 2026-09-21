import "server-only";

import { isMockMode, shopifyFetch } from "./client";
import {
  normalizeCart,
  normalizeCollection,
  normalizeProduct,
  normalizeProductCard,
} from "./mappers";
import { mockShopify } from "./mock/data";
import {
  cartCreateMutation,
  cartLinesAddMutation,
  cartLinesRemoveMutation,
  cartLinesUpdateMutation,
  getCartQuery,
} from "./mutations/cart";
import { getCollectionByHandleQuery, getCollectionsQuery } from "./queries/collections";
import {
  getProductByHandleQuery,
  getProductHandlesQuery,
  getProductsQuery,
  searchProductsQuery,
} from "./queries/products";
import type { Cart, Collection, Product, ProductCardData } from "@/types/shopify";
import { siteConfig } from "@/config/site";

/** Cache tags — webhook ile on-demand revalidation için hazır */
export const SHOPIFY_TAGS = {
  products: "shopify-products",
  collections: "shopify-collections",
  product: (handle: string) => `shopify-product-${handle}`,
  collection: (handle: string) => `shopify-collection-${handle}`,
} as const;

const CATALOG_REVALIDATE = 60 * 15; // 15 dk
const CART_CACHE = "no-store" as const;

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (isMockMode()) return mockShopify.getProductByHandle(handle);

  const data = await shopifyFetch<{
    product: Parameters<typeof normalizeProduct>[0] | null;
  }>({
    query: getProductByHandleQuery,
    variables: { handle },
    tags: [SHOPIFY_TAGS.products, SHOPIFY_TAGS.product(handle)],
    revalidate: CATALOG_REVALIDATE,
  });

  return data.product ? normalizeProduct(data.product) : null;
}

export async function getProducts(limit = 24): Promise<ProductCardData[]> {
  if (isMockMode()) return mockShopify.getProducts(limit);

  const data = await shopifyFetch<{
    products: { nodes: Array<Parameters<typeof normalizeProductCard>[0]> };
  }>({
    query: getProductsQuery,
    variables: { first: limit },
    tags: [SHOPIFY_TAGS.products],
    revalidate: CATALOG_REVALIDATE,
  });

  return data.products.nodes.map(normalizeProductCard);
}

export async function searchProducts(
  query: string,
  limit = 12,
): Promise<ProductCardData[]> {
  if (isMockMode()) return mockShopify.searchProducts(query, limit);
  if (!query.trim()) return [];

  const data = await shopifyFetch<{
    search: {
      nodes: Array<Parameters<typeof normalizeProductCard>[0] | Record<string, never>>;
    };
  }>({
    query: searchProductsQuery,
    variables: { query, first: limit },
    cache: "no-store",
  });

  return data.search.nodes
    .filter((node): node is Parameters<typeof normalizeProductCard>[0] =>
      Boolean(node && "id" in node && "handle" in node),
    )
    .map(normalizeProductCard);
}

export async function getCollectionByHandle(
  handle: string,
  first = 48,
): Promise<Collection | null> {
  if (!handle.trim()) return null;
  if (isMockMode()) return mockShopify.getCollectionByHandle(handle);

  const data = await shopifyFetch<{
    collection: Parameters<typeof normalizeCollection>[0] | null;
  }>({
    query: getCollectionByHandleQuery,
    variables: { handle, first },
    tags: [SHOPIFY_TAGS.collections, SHOPIFY_TAGS.collection(handle)],
    revalidate: CATALOG_REVALIDATE,
  });

  return data.collection ? normalizeCollection(data.collection) : null;
}

/**
 * Gerçek modda handle yoksa boş dizi döner.
 * Mock modda vitrinleri dolu göstermek için varsayılan handle kullanılır.
 */
export async function getFeaturedProducts(): Promise<ProductCardData[]> {
  const handle =
    siteConfig.shopify.collectionFeatured || (isMockMode() ? "featured" : "");
  if (!handle) return [];

  const collection = await getCollectionByHandle(handle, 8);
  return collection?.products ?? [];
}

export async function getBestSellers(): Promise<ProductCardData[]> {
  const handle =
    siteConfig.shopify.collectionBestSellers || (isMockMode() ? "best-sellers" : "");
  if (!handle) return [];

  const collection = await getCollectionByHandle(handle, 8);
  return collection?.products ?? [];
}

export async function getAllProductHandles() {
  if (isMockMode()) return mockShopify.getProductHandles();

  const data = await shopifyFetch<{
    products: { nodes: Array<{ handle: string; updatedAt: string }> };
  }>({
    query: getProductHandlesQuery,
    variables: { first: 250 },
    tags: [SHOPIFY_TAGS.products],
    revalidate: CATALOG_REVALIDATE,
  });

  return data.products.nodes;
}

export async function getAllCollectionHandles() {
  if (isMockMode()) return mockShopify.getCollections();

  const data = await shopifyFetch<{
    collections: {
      nodes: Array<{ handle: string; title: string; updatedAt: string }>;
    };
  }>({
    query: getCollectionsQuery,
    variables: { first: 100 },
    tags: [SHOPIFY_TAGS.collections],
    revalidate: CATALOG_REVALIDATE,
  });

  return data.collections.nodes;
}

type CartUserErrors = Array<{ field?: string[] | null; message: string }>;

function assertNoCartErrors(userErrors: CartUserErrors | undefined) {
  if (userErrors?.length) {
    throw new Error(
      userErrors.map((e) => e.message).join(", ") || "Sepet işlemi başarısız.",
    );
  }
}

export async function createCart(
  lines: Array<{ merchandiseId: string; quantity: number }> = [],
): Promise<Cart> {
  if (isMockMode()) return mockShopify.createCart(lines);

  const data = await shopifyFetch<{
    cartCreate: {
      cart: Parameters<typeof normalizeCart>[0] | null;
      userErrors: CartUserErrors;
    };
  }>({
    query: cartCreateMutation,
    variables: {
      lines: lines.map((line) => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      })),
    },
    cache: CART_CACHE,
  });

  assertNoCartErrors(data.cartCreate.userErrors);
  if (!data.cartCreate.cart) throw new Error("Sepet oluşturulamadı.");
  return normalizeCart(data.cartCreate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (isMockMode()) return mockShopify.getCart(cartId);

  const data = await shopifyFetch<{
    cart: Parameters<typeof normalizeCart>[0] | null;
  }>({
    query: getCartQuery,
    variables: { cartId },
    cache: CART_CACHE,
  });

  return data.cart ? normalizeCart(data.cart) : null;
}

export async function addCartLines(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<Cart> {
  if (isMockMode()) {
    const cart = mockShopify.addLines(cartId, lines);
    if (!cart) throw new Error("Sepet bulunamadı.");
    return cart;
  }

  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: Parameters<typeof normalizeCart>[0] | null;
      userErrors: CartUserErrors;
    };
  }>({
    query: cartLinesAddMutation,
    variables: {
      cartId,
      lines: lines.map((line) => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      })),
    },
    cache: CART_CACHE,
  });

  assertNoCartErrors(data.cartLinesAdd.userErrors);
  if (!data.cartLinesAdd.cart) throw new Error("Ürün sepete eklenemedi.");
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<Cart> {
  if (isMockMode()) {
    const cart = mockShopify.updateLines(cartId, lines);
    if (!cart) throw new Error("Sepet bulunamadı.");
    return cart;
  }

  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: Parameters<typeof normalizeCart>[0] | null;
      userErrors: CartUserErrors;
    };
  }>({
    query: cartLinesUpdateMutation,
    variables: { cartId, lines },
    cache: CART_CACHE,
  });

  assertNoCartErrors(data.cartLinesUpdate.userErrors);
  if (!data.cartLinesUpdate.cart) throw new Error("Sepet güncellenemedi.");
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  if (isMockMode()) {
    const cart = mockShopify.removeLines(cartId, lineIds);
    if (!cart) throw new Error("Sepet bulunamadı.");
    return cart;
  }

  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: Parameters<typeof normalizeCart>[0] | null;
      userErrors: CartUserErrors;
    };
  }>({
    query: cartLinesRemoveMutation,
    variables: { cartId, lineIds },
    cache: CART_CACHE,
  });

  assertNoCartErrors(data.cartLinesRemove.userErrors);
  if (!data.cartLinesRemove.cart) throw new Error("Ürün sepetten çıkarılamadı.");
  return normalizeCart(data.cartLinesRemove.cart);
}
