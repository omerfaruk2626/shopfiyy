import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { searchProducts } from "@/lib/shopify";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SearchForm } from "@/components/search/search-form";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return createPageMetadata({
    title: q ? `Arama: ${q}` : "Arama",
    path: q ? `/search?q=${encodeURIComponent(q)}` : "/search",
    noIndex: true,
  });
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const products = q ? await searchProducts(q, 24) : [];

  return (
    <Container className="py-12 md:py-16">
      <h1 className="text-h1">Arama</h1>
      <div className="mt-8 max-w-2xl">
        <Suspense>
          <SearchForm initialQuery={q} />
        </Suspense>
      </div>

      <div className="mt-12">
        {!q ? (
          <p className="text-muted">Aramak istediğiniz ürünü yazın.</p>
        ) : products.length === 0 ? (
          <div>
            <p className="text-muted-foreground">
              “{q}” için sonuç bulunamadı.
            </p>
            <Link
              href="/collections/all"
              className="mt-4 inline-block text-sm underline-offset-4 hover:underline"
            >
              Tüm ürünlere göz atın
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-8 text-caption text-muted">
              {products.length} sonuç
            </p>
            <ProductGrid products={products} />
          </>
        )}
      </div>
    </Container>
  );
}
