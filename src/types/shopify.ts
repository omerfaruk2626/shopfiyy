export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductImage = {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  sku: string | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
  image: ProductImage | null;
};

export type ProductMetafield = {
  namespace: string;
  key: string;
  value: string;
  type: string;
};

export type Product = {
  id: string;
  handle: string;
  url: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  vendor: string | null;
  productType: string | null;
  tags: string[];
  featuredImage: ProductImage | null;
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange: {
    minVariantPrice: Money | null;
    maxVariantPrice: Money | null;
  };
  metafields: ProductMetafield[];
  seo: {
    title: string | null;
    description: string | null;
  };
};

export type ProductCardData = Pick<
  Product,
  | "id"
  | "handle"
  | "url"
  | "title"
  | "featuredImage"
  | "images"
  | "priceRange"
  | "compareAtPriceRange"
  | "availableForSale"
  | "options"
  | "variants"
> & {
  badge?: string | null;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: ProductImage | null;
  products: ProductCardData[];
  productsCount: number;
  seo: {
    title: string | null;
    description: string | null;
  };
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: {
      handle: string;
      title: string;
      featuredImage: ProductImage | null;
    };
    price: Money;
  };
  cost: {
    totalAmount: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
};
