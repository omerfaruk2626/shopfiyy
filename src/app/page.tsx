import { getBestSellers, getFeaturedProducts } from "@/lib/shopify";
import { HomeHero } from "@/components/home/home-hero";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BrandStory } from "@/components/home/brand-story";
import { WhyWool } from "@/components/home/why-wool";
import { Craftsmanship } from "@/components/home/craftsmanship";
import {
  JournalTeaser,
  NewsletterSection,
  Testimonials,
} from "@/components/home/editorial-sections";
import { getShopifyConfig } from "@/lib/shopify/config";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";

export default async function HomePage() {
  const { useMockData } = getShopifyConfig();

  let featured: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  let bestSellers: Awaited<ReturnType<typeof getBestSellers>> = [];
  let catalogError = false;

  try {
    [featured, bestSellers] = await Promise.all([
      getFeaturedProducts(),
      getBestSellers(),
    ]);
  } catch {
    catalogError = true;
    // Gerçek mağazada API hatası → demo ürün YOK
  }

  const featuredHandle = siteConfig.shopify.collectionFeatured;
  const bestSellerHandle = siteConfig.shopify.collectionBestSellers;

  return (
    <>
      {useMockData ? (
        <div className="bg-brown px-4 py-2 text-center text-caption text-surface">
          DEMO MODU — USE_MOCK_DATA=true. Gerçek mağaza için false yapın ve
          credentials girin.
        </div>
      ) : null}

      {catalogError && !useMockData ? (
        <div className="border-b border-border-subtle bg-surface px-4 py-3 text-center text-sm text-muted-foreground">
          Ürün kataloğu şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
        </div>
      ) : null}

      <HomeHero />
      <CategoryShowcase />

      {featured.length > 0 ? (
        <FeaturedProducts
          products={featured}
          title="Öne Çıkanlar"
          href={`/collections/${featuredHandle}`}
        />
      ) : null}

      <BrandStory />
      <WhyWool />
      <Craftsmanship />

      {bestSellers.length > 0 ? (
        <FeaturedProducts
          products={bestSellers}
          title="Çok Satanlar"
          href={`/collections/${bestSellerHandle}`}
        />
      ) : null}

      {!featuredHandle && !bestSellerHandle && !useMockData && !catalogError ? (
        <Container className="py-8">
          <p className="text-center text-caption text-muted">
            Ürün vitrinleri, SHOPIFY_COLLECTION_FEATURED / BEST_SELLERS handle
            değerleri tanımlandığında görünecek.
          </p>
        </Container>
      ) : null}

      <Testimonials />
      <JournalTeaser />
      <NewsletterSection />
    </>
  );
}
