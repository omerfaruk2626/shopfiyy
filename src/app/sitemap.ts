import type { MetadataRoute } from "next";
import { getAllCollectionHandles, getAllProductHandles } from "@/lib/shopify";
import { siteConfig } from "@/config/site";
import { journalPlaceholders } from "@/config/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/journal",
    "/search",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.6,
  }));

  let products: MetadataRoute.Sitemap = [];
  let collections: MetadataRoute.Sitemap = [];

  try {
    const [productHandles, collectionHandles] = await Promise.all([
      getAllProductHandles(),
      getAllCollectionHandles(),
    ]);

    products = productHandles.map((item) => ({
      url: `${base}/products/${item.handle}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    collections = collectionHandles.map((item) => ({
      url: `${base}/collections/${item.handle}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Shopify yoksa static + journal ile devam
  }

  const journal: MetadataRoute.Sitemap = journalPlaceholders.map((post) => ({
    url: `${base}/journal/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...collections, ...products, ...journal];
}
