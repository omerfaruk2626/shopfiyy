"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Newsletter UI iskeleti.
 * Gerçek provider (Klaviyo / Shopify / vs.) bağlanana kadar
 * yalnızca client-side validation gösterir; veri gönderilmez.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("ok");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-2 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">
        E-posta
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="E-posta adresiniz"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus("idle");
        }}
        className="h-12 flex-1 border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-foreground"
      />
      <Button type="submit" variant="secondary" size="md">
        Kaydol
      </Button>
      {status === "ok" ? (
        <p className="basis-full text-caption text-success" role="status">
          Teşekkürler — bülten altyapısı bağlandığında kayıt tamamlanacak.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="basis-full text-caption text-danger" role="alert">
          Geçerli bir e-posta girin.
        </p>
      ) : null}
    </form>
  );
}
