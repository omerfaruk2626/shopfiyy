import { ProductCard } from "./product-card";
import type { ProductCardData } from "@/types/shopify";

export function ProductGrid({ products }: { products: ProductCardData[] }) {
  if (!products.length) {
    return (
      <p className="py-16 text-center text-muted">
        Bu koleksiyonda henüz ürün bulunmuyor.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
