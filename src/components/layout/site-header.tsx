"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { announcementMessages } from "@/config/content";
import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion/tokens";

export function SiteHeader({ transparentOnHero = false }: { transparentOnHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const { cart, openCart } = useCart();
  const reduced = useReducedMotion();
  const count = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (announcementMessages.length < 2) return;
    const id = window.setInterval(() => {
      setAnnouncementIndex((i) => (i + 1) % announcementMessages.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen || !transparentOnHero;

  return (
    <>
      <div className="relative z-[60] bg-anthracite text-surface">
        <div className="container-page flex h-[var(--announcement-height)] items-center justify-center">
          <p className="text-caption tracking-[0.04em] text-surface/90">
            {announcementMessages[announcementIndex]}
          </p>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-[var(--ease-out)]",
          solid
            ? "border-b border-border-subtle/80 bg-background/85 shadow-[0_8px_30px_rgba(42,38,34,0.06)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page grid h-[var(--header-height)] grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              className="rounded-sm p-2"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Ana menü">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm text-foreground/90 transition-colors hover:text-foreground"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="justify-self-center font-serif text-2xl tracking-[-0.03em] md:text-[1.75rem]"
          >
            {siteConfig.name}
          </Link>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <Link
              href="/search"
              className="rounded-sm p-2"
              aria-label="Ara"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/account"
              className="hidden rounded-sm px-2 py-2 text-sm md:inline"
            >
              Hesabım
            </Link>
            <button
              type="button"
              className="relative rounded-sm p-2"
              aria-label={`Sepet${count ? `, ${count} ürün` : ""}`}
              onClick={openCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 ? (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-40 bg-background pt-[calc(var(--announcement-height)+var(--header-height))] md:hidden"
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{
              duration: motionTokens.duration.base,
              ease: motionTokens.ease.out,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
          >
            <nav className="container-page flex flex-col gap-2 py-10">
              {mainNavigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + index * 0.06,
                    duration: motionTokens.duration.base,
                    ease: motionTokens.ease.out,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border-subtle py-4 font-serif text-3xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/search"
                onClick={() => setMobileOpen(false)}
                className="mt-8 text-sm text-muted"
              >
                Ara
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
