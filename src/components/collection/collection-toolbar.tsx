"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "featured", label: "Öne çıkan" },
  { value: "price-asc", label: "Fiyat: düşük → yüksek" },
  { value: "price-desc", label: "Fiyat: yüksek → düşük" },
  { value: "title-asc", label: "İsim: A → Z" },
] as const;

export function CollectionToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const sort = searchParams.get("sort") || "featured";
  const availability = searchParams.get("availability") || "";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border-subtle py-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm md:hidden"
          onClick={() => setOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtrele
        </button>

        <div className="hidden items-center gap-4 md:flex">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Stok</span>
            <select
              className="border border-border bg-transparent px-3 py-2 text-sm"
              value={availability}
              onChange={(e) =>
                updateParam("availability", e.target.value || null)
              }
            >
              <option value="">Tümü</option>
              <option value="in-stock">Stokta</option>
              <option value="out-of-stock">Tükendi</option>
            </select>
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted">Sırala</span>
          <select
            className="border border-border bg-transparent px-3 py-2 text-sm"
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-[var(--overlay)] transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
          aria-label="Filtreleri kapat"
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-surface p-5 transition-transform duration-300 ease-[var(--ease-out)]",
            open ? "translate-x-0" : "-translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Filtreler"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-xl">Filtreler</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Kapat"
              className="p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <label className="block text-sm">
            <span className="text-eyebrow">Stok durumu</span>
            <select
              className="mt-2 w-full border border-border bg-transparent px-3 py-3 text-sm"
              value={availability}
              onChange={(e) =>
                updateParam("availability", e.target.value || null)
              }
            >
              <option value="">Tümü</option>
              <option value="in-stock">Stokta</option>
              <option value="out-of-stock">Tükendi</option>
            </select>
          </label>
          <p className="mt-6 text-caption text-muted">
            Ölçü, dolgu ve ürün tipi filtreleri Shopify storefront filters
            bağlandığında genişletilecek.
          </p>
          <button
            type="button"
            className="mt-auto h-12 bg-foreground text-xs uppercase tracking-[0.1em] text-surface"
            onClick={() => setOpen(false)}
          >
            Uygula
          </button>
        </div>
      </div>
    </>
  );
}
