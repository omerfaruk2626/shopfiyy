import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCollectionByHandle } from "@/lib/shopify";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductGrid } from "@/components/product/product-grid";
import { CollectionToolbar } from "@/components/collection/collection-toolbar";
import { Container } from "@/components/ui/container";
import { sortProducts, filterProducts, type SortKey } from "@/lib/collection/sort-filter";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) {
    return createPageMetadata({
      title: "Koleksiyon bulunamadı",
      path: `/collections/${handle}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: collection.seo.title || collection.title,
    description: collection.seo.description || collection.description,
    path: `/collections/${collection.handle}`,
    image: collection.image?.url || null,
  });
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const sp = await searchParams;
  const collection = await getCollectionByHandle(handle);
  if (!collection) notFound();

  const sort = (typeof sp.sort === "string" ? sp.sort : "featured") as SortKey;
  const availability = typeof sp.availability === "string" ? sp.availability : undefined;
  const minPrice = typeof sp.min === "string" ? Number(sp.min) : undefined;
  const maxPrice = typeof sp.max === "string" ? Number(sp.max) : undefined;

  const filtered = filterProducts(collection.products, {
    availability,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
  });
  const products = sortProducts(filtered, sort);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: collection.title, path: `/collections/${collection.handle}` },
        ])}
      />
      <Container className="py-10 md:py-14">
        <header className="max-w-3xl">
          <p className="text-eyebrow">Koleksiyon</p>
          <h1 className="mt-3 text-h1">{collection.title}</h1>
          {collection.description ? (
            <p className="mt-4 text-body text-muted-foreground">
              {collection.description}
            </p>
          ) : null}
          <p className="mt-3 text-caption text-muted">{products.length} ürün</p>
        </header>

        <div className="mt-10">
          <Suspense fallback={<div className="h-14 border-y border-border-subtle" />}>
            <CollectionToolbar />
          </Suspense>
        </div>

        <div className="mt-8">
          <ProductGrid products={products} />
        </div>

        {collection.description ? (
          <section className="mt-20 max-w-3xl border-t border-border-subtle pt-12">
            <h2 className="text-h3">{collection.title} hakkında</h2>
            <p className="mt-4 text-body text-muted-foreground">
              {collection.description}
            </p>
          </section>
        ) : null}
      </Container>
    </>
  );
}
