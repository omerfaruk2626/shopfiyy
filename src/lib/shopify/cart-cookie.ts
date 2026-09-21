import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import type { Cart } from "@/types/shopify";

export const CART_COOKIE = "shopify_cart_id";

const CART_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 14,
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
 * Layout'u asla çökertmez — cart yüklenemezse null döner.
 */
export async function getCartFromCookies(): Promise<Cart | null> {
  try {
    const cartId = await getCartIdFromCookies();
    if (!cartId) return null;
    return await getCart(cartId);
  } catch {
    return null;
  }
}
