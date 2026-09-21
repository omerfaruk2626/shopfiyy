"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { Container } from "@/components/ui/container";
import { formatMoney } from "@/lib/utils";

export function CartView() {
  const { cart, updateItem, removeItem, isPending } = useCart();
  const lines = cart?.lines ?? [];
  const isEmpty = lines.length === 0;

  return (
    <Container className="py-12 md:py-16">
      <h1 className="text-h1">Sepet</h1>

      {isEmpty ? (
        <div className="mt-12 max-w-md">
          <p className="text-muted-foreground">Sepetiniz henüz boş.</p>
          <Link
            href="/collections/yun-yorgan"
            className="mt-6 inline-flex h-12 items-center border border-border px-6 text-xs uppercase tracking-[0.1em] transition-colors hover:border-foreground"
          >
            Yorganları Keşfet
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <ul className="divide-y divide-border-subtle border-y border-border-subtle">
            {lines.map((line) => {
              const img = line.merchandise.product.featuredImage;
              return (
                <li key={line.id} className="flex gap-4 py-6 md:gap-6">
                  <Link
                    href={`/products/${line.merchandise.product.handle}`}
                    className="relative h-28 w-24 shrink-0 overflow-hidden bg-surface-secondary md:h-36 md:w-28"
                  >
                    {img?.url ? (
                      <Image
                        src={img.url}
                        alt={img.altText || line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    ) : (
                      <div className="texture-warm h-full w-full" />
                    )}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/products/${line.merchandise.product.handle}`}
                          className="font-medium"
                        >
                          {line.merchandise.product.title}
                        </Link>
                        <p className="mt-1 text-caption text-muted">
                          {line.merchandise.selectedOptions
                            .map((o) => o.value)
                            .join(" / ")}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatMoney(
                          line.cost.totalAmount.amount,
                          line.cost.totalAmount.currencyCode,
                        )}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          className="p-2"
                          disabled={isPending || line.quantity <= 1}
                          onClick={() =>
                            updateItem(line.id, Math.max(1, line.quantity - 1))
                          }
                          aria-label="Adedi azalt"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="p-2"
                          disabled={isPending}
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          aria-label="Adedi artır"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-caption text-muted hover:text-foreground"
                        onClick={() => removeItem(line.id)}
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit border border-border-subtle bg-surface p-6 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]">
            <h2 className="font-serif text-2xl">Özet</h2>
            <div className="mt-6 flex justify-between text-sm">
              <span className="text-muted">Ara toplam</span>
              <span className="font-medium">
                {cart
                  ? formatMoney(
                      cart.cost.subtotalAmount.amount,
                      cart.cost.subtotalAmount.currencyCode,
                    )
                  : "—"}
              </span>
            </div>
            <p className="mt-3 text-caption text-muted">
              Kargo ve vergiler checkout sırasında hesaplanır.
            </p>
            {cart?.checkoutUrl ? (
              <a
                href={cart.checkoutUrl}
                className="mt-6 flex h-12 w-full items-center justify-center bg-foreground text-xs uppercase tracking-[0.12em] text-surface transition-colors hover:bg-anthracite"
              >
                Checkout
              </a>
            ) : null}
          </aside>
        </div>
      )}
    </Container>
  );
}
