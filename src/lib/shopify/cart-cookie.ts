import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import type { Cart } from "@/types/shopify";

export const CART_COOKIE = "shopify_cart_id";

const CART_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 14, // 14 gün
};

export async function getCartIdFromCookies(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(CART_COOKIE)?.value;
}

export async function setCartIdCookie(cartId: string): Promise<void> {
  const jar = await cookies();
  jar.set(CART_COOKIE, cartId, CART_COOKIE_OPTIONS);
}

export async function clearCartIdCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(CART_COOKIE);
}

/**
 * Cookie'deki cart ID ile Shopify cart'ı yükler.
 * Cart geçersiz/expire olmuşsa null döner (cookie temizliği Server Action'da yapılır).
 */
export async function getCartFromCookies(): Promise<Cart | null> {
  const cartId = await getCartIdFromCookies();
  if (!cartId) return null;
  try {
    return await getCart(cartId);
  } catch {
    return null;
  }
}
