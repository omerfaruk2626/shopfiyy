"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { Search } from "lucide-react";

export function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function navigate(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (timerRef.current) window.clearTimeout(timerRef.current);
    navigate(inputRef.current?.value ?? "");
  }

  return (
    <form onSubmit={onSubmit} role="search" className="relative">
      <label htmlFor="search-input" className="sr-only">
        Ürün ara
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
      <input
        ref={inputRef}
        id="search-input"
        type="search"
        name="q"
        defaultValue={initialQuery}
        onChange={(e) => {
          const value = e.target.value;
          if (timerRef.current) window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            if (value.trim() && value.trim() !== initialQuery) {
              navigate(value);
            }
          }, 350);
        }}
        placeholder="Yorgan, yastık, ölçü…"
        autoComplete="off"
        className="h-14 w-full border border-border bg-surface pl-12 pr-4 text-base outline-none transition-colors focus:border-foreground"
      />
    </form>
  );
}
