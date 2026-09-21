"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product, ProductVariant } from "@/types/shopify";
import { formatMoney, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { Accordion } from "@/components/ui/accordion";
import { siteConfig } from "@/config/site";
import { trustElements } from "@/config/content";

function findVariant(
  product: Product,
  selected: Record<string, string>,
): ProductVariant | undefined {
  return product.variants.find((variant) =>
    variant.selectedOptions.every((opt) => selected[opt.name] === opt.value),
  );
}

function isOptionAvailable(
  product: Product,
  selected: Record<string, string>,
  optionName: string,
  value: string,
): boolean {
  const next = { ...selected, [optionName]: value };
  return product.variants.some(
    (variant) =>
      variant.availableForSale &&
      variant.selectedOptions.every((opt) => next[opt.name] === opt.value),
  );
}

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const initialSelected = useMemo(() => {
    const fromUrl: Record<string, string> = {};
    for (const option of product.options) {
      const param = searchParams.get(option.name.toLowerCase());
      if (param && option.values.includes(param)) {
        fromUrl[option.name] = param;
      }
    }

    const preferred =
      product.variants.find((v) => v.availableForSale) ?? product.variants[0];

    const selected: Record<string, string> = {};
    for (const option of product.options) {
      selected[option.name] =
        fromUrl[option.name] ??
        preferred?.selectedOptions.find((o) => o.name === option.name)?.value ??
        option.values[0];
    }
    return selected;
  }, [product, searchParams]);

  const [selected, setSelected] = useState(initialSelected);
  const variant = findVariant(product, selected);

  useEffect(() => {
    if (!variant) return;
    const params = new URLSearchParams(searchParams.toString());
    for (const opt of variant.selectedOptions) {
      params.set(opt.name.toLowerCase(), opt.value);
    }
    const next = params.toString();
    if (next !== searchParams.toString()) {
      router.replace(`${pathname}?${next}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync URL when variant changes
  }, [variant?.id]);

  const onSelect = useCallback((name: string, value: string) => {
    setSelected((prev) => ({ ...prev, [name]: value }));
    setError(null);
  }, []);

  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const compare = variant?.compareAtPrice;
  const showCompare =
    compare &&
    Number.parseFloat(compare.amount) > Number.parseFloat(price.amount);

  async function handleAdd() {
    if (!variant || !variant.availableForSale) {
      setError("Seçili kombinasyon stokta yok.");
      return;
    }
    startTransition(async () => {
      const result = await addItem(variant.id, quantity);
      if (!result.ok) {
        setError(result.error ?? "Sepete eklenemedi.");
      }
    });
  }

  const metafields = siteConfig.shopify.metafieldIdentifiers
    .map((identifier) => {
      const field = product.metafields.find(
        (m) => m.namespace === identifier.namespace && m.key === identifier.key,
      );
      if (!field?.value) return null;
      return { label: identifier.label, value: field.value };
    })
    .filter((field): field is { label: string; value: string } => Boolean(field));

  return (
    <div className="flex flex-col">
      <nav aria-label="Breadcrumb" className="text-caption text-muted">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Ana Sayfa
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/collections/all" className="hover:text-foreground">
              Ürünler
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{product.title}</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-h1">{product.title}</h1>

      <div className="mt-4 flex items-baseline gap-3">
        <p className="text-xl font-medium">
          {formatMoney(price.amount, price.currencyCode)}
        </p>
        {showCompare ? (
          <p className="text-muted line-through">
            {formatMoney(compare.amount, compare.currencyCode)}
          </p>
        ) : null}
      </div>

      {product.description ? (
        <p className="mt-5 text-body text-muted-foreground">{product.description}</p>
      ) : null}

      <div className="mt-8 space-y-6">
        {product.options.map((option) => (
          <fieldset key={option.id}>
            <legend className="text-eyebrow mb-3">{option.name}</legend>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const available = isOptionAvailable(
                  product,
                  selected,
                  option.name,
                  value,
                );
                const isSelected = selected[option.name] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={!available && !isSelected}
                    onClick={() => onSelect(option.name, value)}
                    className={cn(
                      "min-h-11 border px-4 text-sm transition-colors",
                      isSelected
                        ? "border-foreground bg-foreground text-surface"
                        : "border-border bg-transparent hover:border-foreground",
                      !available && "cursor-not-allowed opacity-35",
                    )}
                    aria-pressed={isSelected}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted">
        {variant?.availableForSale
          ? "Stokta"
          : "Seçili kombinasyon şu an stokta değil"}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex h-12 items-center border border-border">
          <button
            type="button"
            className="px-4"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Adedi azalt"
          >
            −
          </button>
          <span className="min-w-8 text-center text-sm" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            className="px-4"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Adedi artır"
          >
            +
          </button>
        </div>
        <Button
          size="lg"
          className="min-w-[12rem] flex-1"
          disabled={pending || !variant?.availableForSale}
          onClick={handleAdd}
        >
          {pending ? "Ekleniyor…" : "Sepete Ekle"}
        </Button>
      </div>

      {error ? (
        <p className="mt-3 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}

      <ul className="mt-8 grid gap-3 border-y border-border-subtle py-6 sm:grid-cols-2">
        {trustElements.slice(0, 4).map((item) => (
          <li key={item.title} className="text-sm">
            <span className="font-medium">{item.title}</span>
            <span className="text-muted"> — {item.description}</span>
          </li>
        ))}
      </ul>

      {metafields.length > 0 ? (
        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          {metafields.map((field) => (
            <div key={field.label} className="border-b border-border-subtle py-3">
              <dt className="text-caption text-muted">{field.label}</dt>
              <dd className="mt-1 text-sm">{field.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-10">
        <Accordion
          items={[
            {
              id: "details",
              title: "Ürün Detayları",
              content: product.descriptionHtml || product.description || "Detay yakında.",
              html: Boolean(product.descriptionHtml),
            },
            {
              id: "materials",
              title: "Malzeme & İçerik",
              content:
                metafields.map((m) => `${m.label}: ${m.value}`).join("\n") ||
                product.description ||
                "Malzeme bilgisi yakında eklenecek.",
            },
            {
              id: "care",
              title: "Bakım",
              content:
                metafields.find((m) => /bakım|care/i.test(m.label))?.value ||
                "Bakım bilgisi yakında eklenecek.",
            },
            {
              id: "shipping",
              title: "Kargo & İade",
              content:
                "Kargo ve iade koşulları mağaza politikasına göre uygulanır. Detaylar destek sayfalarında yer alacaktır.",
            },
          ]}
        />
      </div>

      {/* Sticky ATC — mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-surface/95 p-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <p className="min-w-0 flex-1 text-sm font-medium">
            {formatMoney(price.amount, price.currencyCode)}
          </p>
          <Button
            className="flex-1"
            disabled={pending || !variant?.availableForSale}
            onClick={handleAdd}
          >
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
