import type { ProductCardData } from "@/types/shopify";

export type SortKey = "featured" | "price-asc" | "price-desc" | "title-asc";

export function sortProducts(products: ProductCardData[], sort: SortKey) {
  const next = [...products];
  switch (sort) {
    case "price-asc":
      return next.sort(
        (a, b) =>
          Number.parseFloat(a.priceRange.minVariantPrice.amount) -
          Number.parseFloat(b.priceRange.minVariantPrice.amount),
      );
    case "price-desc":
      return next.sort(
        (a, b) =>
          Number.parseFloat(b.priceRange.minVariantPrice.amount) -
          Number.parseFloat(a.priceRange.minVariantPrice.amount),
      );
    case "title-asc":
      return next.sort((a, b) => a.title.localeCompare(b.title, "tr"));
    default:
      return next;
  }
}

export function filterProducts(
  products: ProductCardData[],
  filters: {
    availability?: string;
    minPrice?: number;
    maxPrice?: number;
  },
) {
  return products.filter((product) => {
    if (filters.availability === "in-stock" && !product.availableForSale) {
      return false;
    }
    if (filters.availability === "out-of-stock" && product.availableForSale) {
      return false;
    }
    const price = Number.parseFloat(product.priceRange.minVariantPrice.amount);
    if (filters.minPrice != null && price < filters.minPrice) return false;
    if (filters.maxPrice != null && price > filters.maxPrice) return false;
    return true;
  });
}
