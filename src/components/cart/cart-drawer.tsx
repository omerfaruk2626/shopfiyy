"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCart } from "./cart-provider";
import { formatMoney, cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion/tokens";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isPending } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const lines = cart?.lines ?? [];
  const isEmpty = lines.length === 0;

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-[var(--overlay)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : motionTokens.duration.fast }}
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Alışveriş sepeti"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-[-12px_0_40px_rgba(42,38,34,0.12)]"
            initial={reduced ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduced ? undefined : { x: "100%" }}
            transition={{
              duration: motionTokens.duration.base,
              ease: motionTokens.ease.out,
            }}
          >
            <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
              <h2 className="font-serif text-xl">Sepetiniz</h2>
              <button
                ref={closeRef}
                type="button"
                onClick={closeCart}
                className="rounded-sm p-2 text-foreground transition-colors hover:bg-surface-secondary"
                aria-label="Sepeti kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              {isEmpty ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="text-muted-foreground">Sepetiniz henüz boş.</p>
                  <Link
                    href="/collections/yun-yorgan"
                    onClick={closeCart}
                    className="inline-flex h-12 items-center justify-center border border-border px-6 text-xs font-medium uppercase tracking-[0.1em] transition-colors hover:border-foreground"
                  >
                    Yorganları Keşfet
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {lines.map((line) => {
                    const img = line.merchandise.product.featuredImage;
                    return (
                      <li key={line.id} className="flex gap-4">
                        <Link
                          href={`/products/${line.merchandise.product.handle}`}
                          onClick={closeCart}
                          className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface-secondary"
                        >
                          {img?.url ? (
                            <Image
                              src={img.url}
                              alt={img.altText || line.merchandise.product.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          ) : (
                            <div className="texture-warm h-full w-full" />
                          )}
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link
                                href={`/products/${line.merchandise.product.handle}`}
                                onClick={closeCart}
                                className="font-medium leading-snug"
                              >
                                {line.merchandise.product.title}
                              </Link>
                              <p className="mt-1 text-caption text-muted">
                                {line.merchandise.selectedOptions
                                  .map((o) => o.value)
                                  .join(" / ")}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(line.id)}
                              className="text-caption text-muted hover:text-foreground"
                              aria-label="Ürünü kaldır"
                            >
                              Kaldır
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-border">
                              <button
                                type="button"
                                className="p-2 disabled:opacity-40"
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
                                className="p-2 disabled:opacity-40"
                                disabled={isPending}
                                onClick={() => updateItem(line.id, line.quantity + 1)}
                                aria-label="Adedi artır"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <p className="text-sm font-medium">
                              {formatMoney(
                                line.cost.totalAmount.amount,
                                line.cost.totalAmount.currencyCode,
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {!isEmpty && cart ? (
              <div className="border-t border-border-subtle px-5 py-5">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-muted">Ara toplam</span>
                  <span className="font-medium">
                    {formatMoney(
                      cart.cost.subtotalAmount.amount,
                      cart.cost.subtotalAmount.currencyCode,
                    )}
                  </span>
                </div>
                <a
                  href={cart.checkoutUrl}
                  className={cn(
                    "flex h-12 w-full items-center justify-center rounded-sm bg-foreground text-xs font-medium uppercase tracking-[0.12em] text-surface transition-colors hover:bg-anthracite",
                  )}
                >
                  Checkout
                </a>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="mt-3 block text-center text-caption text-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  Sepet sayfasına git
                </Link>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
