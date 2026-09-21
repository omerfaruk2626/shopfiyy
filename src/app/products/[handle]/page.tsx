import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductByHandle } from "@/lib/shopify";
import { createPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductPageSkeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) {
    return createPageMetadata({
      title: "Ürün bulunamadı",
      path: `/products/${handle}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    path: `/products/${product.handle}`,
    image: product.featuredImage?.url || null,
  });
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Ürünler", path: "/collections/all" },
            { name: product.title, path: `/products/${product.handle}` },
          ]),
        ]}
      />
      <Container className="pb-28 pt-8 md:pb-16 md:pt-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} title={product.title} />
          <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <Suspense fallback={<ProductPageSkeleton />}>
              <ProductPurchase product={product} />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}
