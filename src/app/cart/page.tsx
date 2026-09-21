import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Sepet",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartView />;
}
