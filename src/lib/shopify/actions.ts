"use server";

import { cookies } from "next/headers";
import {
  addCartLines,
  createCart,
  getCart,
  removeCartLines,
  updateCartLines,
} from "@/lib/shopify";
import {
  CART_COOKIE,
  clearCartIdCookie,
  setCartIdCookie,
} from "@/lib/shopify/cart-cookie";
import type { Cart } from "@/types/shopify";

function isLikelyInvalidCartError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("cart") &&
    (msg.includes("not found") ||
      msg.includes("invalid") ||
      msg.includes("does not exist") ||
      msg.includes("bulunamadı"))
  );
}

/**
 * Geçersiz cart → cookie temizle → tek seferlik yeni cart oluştur.
 * Infinite retry yok.
 */
async function recoverCartWithLines(
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<Cart> {
  await clearCartIdCookie();
  const cart = await createCart(lines);
  await setCartIdCookie(cart.id);
  return cart;
}

export async function addToCartAction(input: {
  merchandiseId: string;
  quantity: number;
}): Promise<{ cart: Cart } | { error: string }> {
  try {
    const jar = await cookies();
    const cartId = jar.get(CART_COOKIE)?.value;
    const lines = [input];

    if (!cartId) {
      const cart = await createCart(lines);
      await setCartIdCookie(cart.id);
      return { cart };
    }

    const existing = await getCart(cartId);
    if (!existing) {
      // Expire / deleted cart — graceful recovery (1 kez)
      const cart = await recoverCartWithLines(lines);
      return { cart };
    }

    try {
      const cart = await addCartLines(cartId, lines);
      return { cart };
    } catch (error) {
      if (isLikelyInvalidCartError(error)) {
        const cart = await recoverCartWithLines(lines);
        return { cart };
      }
      throw error;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[addToCartAction]", error instanceof Error ? error.message : "error");
    }
    return { error: "Ürün sepete eklenirken bir sorun oluştu." };
  }
}

export async function updateCartLineAction(input: {
  lineId: string;
  quantity: number;
}): Promise<{ cart: Cart } | { error: string }> {
  try {
    const jar = await cookies();
    const cartId = jar.get(CART_COOKIE)?.value;
    if (!cartId) return { error: "Sepet bulunamadı." };

    const existing = await getCart(cartId);
    if (!existing) {
      await clearCartIdCookie();
      return { error: "Sepetinizin süresi dolmuş. Lütfen ürünü yeniden ekleyin." };
    }

    const cart = await updateCartLines(cartId, [
      { id: input.lineId, quantity: input.quantity },
    ]);
    return { cart };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[updateCartLineAction]",
        error instanceof Error ? error.message : "error",
      );
    }
    return { error: "Sepet güncellenirken bir sorun oluştu." };
  }
}

export async function removeCartLineAction(
  lineId: string,
): Promise<{ cart: Cart } | { error: string }> {
  try {
    const jar = await cookies();
    const cartId = jar.get(CART_COOKIE)?.value;
    if (!cartId) return { error: "Sepet bulunamadı." };

    const existing = await getCart(cartId);
    if (!existing) {
      await clearCartIdCookie();
      return { error: "Sepetinizin süresi dolmuş." };
    }

    const cart = await removeCartLines(cartId, [lineId]);
    return { cart };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[removeCartLineAction]",
        error instanceof Error ? error.message : "error",
      );
    }
    return { error: "Ürün sepetten çıkarılırken bir sorun oluştu." };
  }
}

export async function getCartAction(): Promise<Cart | null> {
  try {
    const jar = await cookies();
    const cartId = jar.get(CART_COOKIE)?.value;
    if (!cartId) return null;

    const cart = await getCart(cartId);
    if (!cart) {
      await clearCartIdCookie();
      return null;
    }
    return cart;
  } catch {
    return null;
  }
}
