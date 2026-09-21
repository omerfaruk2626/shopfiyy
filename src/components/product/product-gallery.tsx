"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import type { ProductImage } from "@/types/shopify";
import { cn } from "@/lib/utils";

export function ProductGallery({
  images,
  title,
}: {
  images: ProductImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const list = images.length
    ? images
    : [
        {
          id: "placeholder",
          url: "",
          altText: title,
          width: 1200,
          height: 1500,
        },
      ];

  return (
    <>
      {/* Desktop: scroll gallery */}
      <div className="hidden gap-3 lg:grid">
        {list.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="relative aspect-[4/5] w-full overflow-hidden bg-surface-secondary text-left"
            onClick={() => {
              setActive(index);
              setFullscreen(true);
            }}
            aria-label={`${title} görseli ${index + 1} — büyüt`}
          >
            {image.url ? (
              <Image
                src={image.url}
                alt={image.altText || title}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              />
            ) : (
              <div className="texture-warm h-full w-full" />
            )}
          </button>
        ))}
      </div>

      {/* Mobile: swipe-like single + thumbs */}
      <div className="lg:hidden">
        <button
          type="button"
          className="relative aspect-[4/5] w-full overflow-hidden bg-surface-secondary"
          onClick={() => setFullscreen(true)}
          aria-label="Galeriyi büyüt"
        >
          {list[active]?.url ? (
            <Image
              src={list[active].url}
              alt={list[active].altText || title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="texture-warm h-full w-full" />
          )}
        </button>
        {list.length > 1 ? (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {list.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "relative h-16 w-14 shrink-0 overflow-hidden border",
                  active === index ? "border-foreground" : "border-transparent",
                )}
                aria-label={`Görsel ${index + 1}`}
              >
                {image.url ? (
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="texture-warm h-full w-full" />
                )}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {fullscreen ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-anthracite/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Tam ekran galeri"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-sm p-2 text-surface"
            onClick={() => setFullscreen(false)}
            aria-label="Galeriyi kapat"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-[min(85vh,900px)] w-full max-w-4xl">
            {list[active]?.url ? (
              <Image
                src={list[active].url}
                alt={list[active].altText || title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            ) : (
              <div className="texture-warm h-full w-full" />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
