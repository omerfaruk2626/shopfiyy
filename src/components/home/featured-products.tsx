import Link from "next/link";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/reveal";
import type { ProductCardData } from "@/types/shopify";

export function FeaturedProducts({
  products,
  title = "Öne Çıkanlar",
  href = "/collections/featured",
}: {
  products: ProductCardData[];
  title?: string;
  href?: string;
}) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <FadeIn className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow">Seçkiler</p>
            <h2 className="mt-3 text-h2">{title}</h2>
          </div>
          <Link
            href={href}
            className="hidden text-sm text-muted underline-offset-4 hover:text-foreground hover:underline md:inline"
          >
            Tümünü gör
          </Link>
        </FadeIn>
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
