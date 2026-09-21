import type {
  Cart,
  Collection,
  Money,
  Product,
  ProductCardData,
  ProductImage,
  ProductVariant,
} from "@/types/shopify";

type ShopifyMoney = { amount: string; currencyCode: string } | null | undefined;

type ShopifyImage = {
  id?: string;
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
} | null;

type ShopifySelectedOption = { name: string; value: string };

type ShopifyVariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  sku?: string | null;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney;
  selectedOptions: ShopifySelectedOption[];
  image?: ShopifyImage;
};

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  vendor?: string | null;
  productType?: string | null;
  tags?: string[];
  featuredImage?: ShopifyImage;
  images?: { nodes?: ShopifyImage[] };
  options?: Array<{ id: string; name: string; values: string[] }>;
  variants?: { nodes?: ShopifyVariantNode[] };
  priceRange?: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    minVariantPrice?: ShopifyMoney;
    maxVariantPrice?: ShopifyMoney;
  };
  metafields?: Array<{
    namespace: string;
    key: string;
    value: string;
    type: string;
  } | null> | null;
  seo?: { title?: string | null; description?: string | null };
};

function money(value: ShopifyMoney, fallbackCurrency = "TRY"): Money {
  return {
    amount: value?.amount ?? "0",
    currencyCode: value?.currencyCode ?? fallbackCurrency,
  };
}

function image(
  value: ShopifyImage | undefined,
  fallbackAlt = "",
): ProductImage | null {
  if (!value?.url) return null;
  return {
    id: value.id ?? value.url,
    url: value.url,
    altText: value.altText ?? (fallbackAlt || null),
    width: value.width ?? 1200,
    height: value.height ?? 1500,
  };
}

function variant(node: ShopifyVariantNode): ProductVariant {
  return {
    id: node.id,
    title: node.title,
    availableForSale: node.availableForSale,
    sku: node.sku ?? null,
    price: money(node.price),
    compareAtPrice: node.compareAtPrice ? money(node.compareAtPrice) : null,
    selectedOptions: node.selectedOptions ?? [],
    image: image(node.image),
  };
}

export function normalizeProduct(node: ShopifyProductNode): Product {
  const images =
    node.images?.nodes
      ?.map((img) => image(img, node.title))
      .filter((img): img is ProductImage => Boolean(img)) ?? [];

  const featuredImage = image(node.featuredImage, node.title) ?? images[0] ?? null;

  return {
    id: node.id,
    handle: node.handle,
    url: `/products/${node.handle}`,
    title: node.title,
    description: node.description ?? "",
    descriptionHtml: node.descriptionHtml ?? "",
    availableForSale: node.availableForSale,
    vendor: node.vendor ?? null,
    productType: node.productType ?? null,
    tags: node.tags ?? [],
    featuredImage,
    images: images.length > 0 ? images : featuredImage ? [featuredImage] : [],
    options: (node.options ?? []).map((option) => ({
      id: option.id,
      name: option.name,
      values: option.values,
    })),
    variants: (node.variants?.nodes ?? []).map(variant),
    priceRange: {
      minVariantPrice: money(node.priceRange?.minVariantPrice),
      maxVariantPrice: money(node.priceRange?.maxVariantPrice),
    },
    compareAtPriceRange: {
      minVariantPrice: node.compareAtPriceRange?.minVariantPrice
        ? money(node.compareAtPriceRange.minVariantPrice)
        : null,
      maxVariantPrice: node.compareAtPriceRange?.maxVariantPrice
        ? money(node.compareAtPriceRange.maxVariantPrice)
        : null,
    },
    metafields: (node.metafields ?? []).filter(
      (field): field is NonNullable<typeof field> => Boolean(field),
    ),
    seo: {
      title: node.seo?.title ?? null,
      description: node.seo?.description ?? null,
    },
  };
}

export function normalizeProductCard(node: ShopifyProductNode): ProductCardData {
  const product = normalizeProduct(node);
  const badge = product.tags.find((tag) =>
    ["yeni", "new", "bestseller", "çok satan"].includes(tag.toLowerCase()),
  );

  return {
    id: product.id,
    handle: product.handle,
    url: product.url,
    title: product.title,
    featuredImage: product.featuredImage,
    images: product.images,
    priceRange: product.priceRange,
    compareAtPriceRange: product.compareAtPriceRange,
    availableForSale: product.availableForSale,
    options: product.options,
    variants: product.variants,
    badge: badge ?? null,
  };
}

export function normalizeCollection(node: {
  id: string;
  handle: string;
  title: string;
  description?: string;
  descriptionHtml?: string;
  image?: ShopifyImage;
  products?: { nodes?: ShopifyProductNode[] };
  seo?: { title?: string | null; description?: string | null };
}): Collection {
  const products = (node.products?.nodes ?? []).map(normalizeProductCard);

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description ?? "",
    descriptionHtml: node.descriptionHtml ?? "",
    image: image(node.image, node.title),
    products,
    productsCount: products.length,
    seo: {
      title: node.seo?.title ?? null,
      description: node.seo?.description ?? null,
    },
  };
}

export function normalizeCart(node: {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines?: {
    nodes?: Array<{
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        selectedOptions: ShopifySelectedOption[];
        product: {
          handle: string;
          title: string;
          featuredImage?: ShopifyImage;
        };
        price: ShopifyMoney;
      };
      cost: { totalAmount: ShopifyMoney };
    }>;
  };
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
}): Cart {
  return {
    id: node.id,
    checkoutUrl: node.checkoutUrl,
    totalQuantity: node.totalQuantity,
    lines: (node.lines?.nodes ?? []).map((line) => ({
      id: line.id,
      quantity: line.quantity,
      merchandise: {
        id: line.merchandise.id,
        title: line.merchandise.title,
        selectedOptions: line.merchandise.selectedOptions,
        product: {
          handle: line.merchandise.product.handle,
          title: line.merchandise.product.title,
          featuredImage: image(
            line.merchandise.product.featuredImage,
            line.merchandise.product.title,
          ),
        },
        price: money(line.merchandise.price),
      },
      cost: {
        totalAmount: money(line.cost.totalAmount),
      },
    })),
    cost: {
      subtotalAmount: money(node.cost.subtotalAmount),
      totalAmount: money(node.cost.totalAmount),
    },
  };
}
