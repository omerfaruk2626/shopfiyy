import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductCardData } from "@/types/shopify";
import { formatMoney, cn } from "@/lib/utils";

export function ProductCard({ product }: { product: ProductCardData }) {
  const primary = product.featuredImage;
  const secondary =
    product.images.find((img) => img.url && img.url !== primary?.url) ?? null;
  const price = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange.minVariantPrice;
  const showCompare =
    compare &&
    Number.parseFloat(compare.amount) > Number.parseFloat(price.amount);

  return (
    <article className="group">
      <Link href={product.url} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-secondary">
          {primary?.url ? (
            <>
              <Image
                src={primary.url}
                alt={primary.altText || product.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={cn(
                  "object-cover object-center transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]",
                  secondary?.url && "group-hover:opacity-0",
                )}
              />
              {secondary?.url ? (
                <Image
                  src={secondary.url}
                  alt={secondary.altText || product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover object-center opacity-0 transition-opacity duration-500 ease-[var(--ease-out)] group-hover:opacity-100"
                />
              ) : null}
            </>
          ) : (
            <div className="texture-warm flex h-full w-full items-end p-4">
              <span className="text-caption text-foreground/60">Görsel yakında</span>
            </div>
          )}

          {product.badge ? (
            <span className="absolute left-3 top-3 bg-surface/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground backdrop-blur-sm">
              {product.badge}
            </span>
          ) : null}

          {!product.availableForSale ? (
            <span className="absolute bottom-3 left-3 bg-anthracite/80 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-surface">
              Tükendi
            </span>
          ) : null}

          <span className="pointer-events-none absolute bottom-3 right-3 hidden translate-y-2 opacity-0 transition-all duration-300 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100 md:inline-flex">
            <span className="inline-flex h-10 w-10 items-center justify-center bg-surface text-foreground shadow-sm">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
        </div>

        <div className="mt-4 space-y-1">
          <h3 className="font-sans text-sm font-medium leading-snug text-foreground md:text-[0.95rem]">
            {product.title}
          </h3>
          <div className="flex items-baseline gap-2">
            <p className="text-sm">
              {formatMoney(price.amount, price.currencyCode)}
              {Number.parseFloat(product.priceRange.maxVariantPrice.amount) >
              Number.parseFloat(price.amount)
                ? " ’den itibaren"
                : ""}
            </p>
            {showCompare ? (
              <p className="text-caption text-muted line-through">
                {formatMoney(compare.amount, compare.currencyCode)}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
