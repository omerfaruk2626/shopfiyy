/**
 * DEMO / MOCK DATA LAYER
 * ---------------------
 * Bu dosyadaki tüm ürünler DEMO amaçlıdır.
 * Gerçek Shopify credentials bağlandığında ve USE_MOCK_DATA=false
 * olduğunda bu katman kullanılmaz.
 *
 * Ürün handle'ları, fiyatlar ve görseller gerçeği temsil etmez.
 */

import type { Cart, Collection, Product, ProductCardData } from "@/types/shopify";

const DEMO_TAG = "DEMO";

function money(amount: string) {
  return { amount, currencyCode: "TRY" };
}

/**
 * DEVELOPMENT/MOCK görseller.
 * Production'da Shopify CDN görselleri bunların yerini alır.
 * url boşsa UI texture fallback kullanır.
 */
function demoImage(seed: string, alt: string, url = "", width = 1200, height = 1500) {
  return {
    id: `demo-img-${seed}`,
    url,
    altText: `[DEMO] ${alt}`,
    width,
    height,
  };
}

/** MOCK ONLY — harici demo görseller; gerçek mağaza görselleri değildir */
const MOCK_SHEET_IMAGES = [
  "https://www.zebracasa.com/lidya-cift-kisilik-lastikli-carsafantrasit-carsaf-yastik-kilifi-zebra-casa-7318-17-B.webp",
  "https://www.zebracasa.com/lidya-cift-kisilik-lastikli-carsafantrasit-carsaf-yastik-kilifi-zebra-casa-7314-17-B.webp",
  "https://www.zebracasa.com/lidya-cift-kisilik-lastikli-carsafantrasit-carsaf-yastik-kilifi-zebra-casa-7317-17-B.webp",
] as const;

const MOCK_COMFORTER_IMAGES = [
  "https://www.zebracasa.com/elisa-cift-kisilik-yatak-ortusu-setigri-cift-kisilik-comforter-setler-zebra-casa-3554-12-B.jpg",
  "https://www.zebracasa.com/elisa-cift-kisilik-yatak-ortusu-setigri-cift-kisilik-comforter-setler-zebra-casa-5336-12-B.webp",
] as const;

const rawDemoProducts: Product[] = [
  {
    id: "gid://shopify/Product/demo-1",
    handle: "dogal-yun-yorgan-standart",
    url: "/products/dogal-yun-yorgan-standart",
    title: "Doğal Yün Yorgan — Standart",
    description: "DEMO ÜRÜN. %100 doğal yün dolgulu, pamuk kumaşlı standart boy yorgan.",
    descriptionHtml:
      "<p><strong>DEMO ÜRÜN</strong> — %100 doğal yün dolgulu, pamuk kumaşlı standart boy yorgan.</p>",
    availableForSale: true,
    vendor: "DEMO",
    productType: "Yorgan",
    tags: [DEMO_TAG, "yeni"],
    featuredImage: demoImage("1", "Doğal yün yorgan"),
    images: [
      demoImage("1", "Doğal yün yorgan"),
      demoImage("1b", "Doğal yün yorgan detay"),
    ],
    options: [
      {
        id: "opt-size-1",
        name: "Ölçü",
        values: ["155 × 215", "195 × 215", "220 × 240"],
      },
      {
        id: "opt-fill-1",
        name: "Dolgu",
        values: ["2 kg", "2.5 kg", "3 kg"],
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/demo-1-a",
        title: "155 × 215 / 2 kg",
        availableForSale: true,
        sku: "DEMO-YORG-155-2",
        price: money("4490"),
        compareAtPrice: money("4990"),
        selectedOptions: [
          { name: "Ölçü", value: "155 × 215" },
          { name: "Dolgu", value: "2 kg" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-1-b",
        title: "195 × 215 / 2.5 kg",
        availableForSale: true,
        sku: "DEMO-YORG-195-25",
        price: money("5290"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Ölçü", value: "195 × 215" },
          { name: "Dolgu", value: "2.5 kg" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-1-c",
        title: "220 × 240 / 3 kg",
        availableForSale: false,
        sku: "DEMO-YORG-220-3",
        price: money("6190"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Ölçü", value: "220 × 240" },
          { name: "Dolgu", value: "3 kg" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-1-d",
        title: "155 × 215 / 2.5 kg",
        availableForSale: true,
        sku: "DEMO-YORG-155-25",
        price: money("4790"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Ölçü", value: "155 × 215" },
          { name: "Dolgu", value: "2.5 kg" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-1-e",
        title: "195 × 215 / 2 kg",
        availableForSale: true,
        sku: "DEMO-YORG-195-2",
        price: money("4990"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Ölçü", value: "195 × 215" },
          { name: "Dolgu", value: "2 kg" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-1-f",
        title: "195 × 215 / 3 kg",
        availableForSale: true,
        sku: "DEMO-YORG-195-3",
        price: money("5590"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Ölçü", value: "195 × 215" },
          { name: "Dolgu", value: "3 kg" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-1-g",
        title: "220 × 240 / 2.5 kg",
        availableForSale: true,
        sku: "DEMO-YORG-220-25",
        price: money("5890"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Ölçü", value: "220 × 240" },
          { name: "Dolgu", value: "2.5 kg" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-1-h",
        title: "155 × 215 / 3 kg",
        availableForSale: true,
        sku: "DEMO-YORG-155-3",
        price: money("5090"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Ölçü", value: "155 × 215" },
          { name: "Dolgu", value: "3 kg" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-1-i",
        title: "220 × 240 / 2 kg",
        availableForSale: true,
        sku: "DEMO-YORG-220-2",
        price: money("5690"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Ölçü", value: "220 × 240" },
          { name: "Dolgu", value: "2 kg" },
        ],
        image: null,
      },
    ],
    priceRange: {
      minVariantPrice: money("4490"),
      maxVariantPrice: money("6190"),
    },
    compareAtPriceRange: {
      minVariantPrice: money("4990"),
      maxVariantPrice: money("4990"),
    },
    metafields: [
      {
        namespace: "custom",
        key: "dolgu",
        value: "%100 doğal yün",
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "kumas",
        value: "%100 pamuk",
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "dolgu_agirligi",
        value: "2–3 kg",
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "olcu",
        value: "155×215 / 195×215 / 220×240 cm",
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "uretim",
        value: "Türkiye",
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "bakim",
        value: "Kuru temizleme önerilir. Direkt güneşten koruyun.",
        type: "multi_line_text_field",
      },
    ],
    seo: {
      title: "Doğal Yün Yorgan — Standart | DEMO",
      description: "DEMO ürün açıklaması",
    },
  },
  {
    id: "gid://shopify/Product/demo-2",
    handle: "dogal-yun-yastik",
    url: "/products/dogal-yun-yastik",
    title: "Doğal Yün Yastık",
    description: "DEMO ÜRÜN. Destekleyici doğal yün dolgulu yastık.",
    descriptionHtml:
      "<p><strong>DEMO ÜRÜN</strong> — Destekleyici doğal yün dolgulu yastık.</p>",
    availableForSale: true,
    vendor: "DEMO",
    productType: "Yastık",
    tags: [DEMO_TAG, "bestseller"],
    featuredImage: demoImage("2", "Doğal yün yastık"),
    images: [demoImage("2", "Doğal yün yastık")],
    options: [
      {
        id: "opt-size-2",
        name: "Ölçü",
        values: ["50 × 70", "60 × 80"],
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/demo-2-a",
        title: "50 × 70",
        availableForSale: true,
        sku: "DEMO-YAS-50",
        price: money("1890"),
        compareAtPrice: null,
        selectedOptions: [{ name: "Ölçü", value: "50 × 70" }],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-2-b",
        title: "60 × 80",
        availableForSale: true,
        sku: "DEMO-YAS-60",
        price: money("2190"),
        compareAtPrice: null,
        selectedOptions: [{ name: "Ölçü", value: "60 × 80" }],
        image: null,
      },
    ],
    priceRange: {
      minVariantPrice: money("1890"),
      maxVariantPrice: money("2190"),
    },
    compareAtPriceRange: {
      minVariantPrice: null,
      maxVariantPrice: null,
    },
    metafields: [
      {
        namespace: "custom",
        key: "dolgu",
        value: "%100 doğal yün",
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "kumas",
        value: "%100 pamuk",
        type: "single_line_text_field",
      },
      {
        namespace: "custom",
        key: "uretim",
        value: "Türkiye",
        type: "single_line_text_field",
      },
    ],
    seo: {
      title: "Doğal Yün Yastık | DEMO",
      description: "DEMO ürün açıklaması",
    },
  },
  {
    id: "gid://shopify/Product/demo-3",
    handle: "yun-yatak-ortusu",
    url: "/products/yun-yatak-ortusu",
    title: "Yün Yatak Örtüsü",
    description: "DEMO ÜRÜN. Doğal dokulu yatak örtüsü.",
    descriptionHtml: "<p><strong>DEMO ÜRÜN</strong> — Doğal dokulu yatak örtüsü.</p>",
    availableForSale: true,
    vendor: "DEMO",
    productType: "Ev Tekstili",
    tags: [DEMO_TAG],
    featuredImage: demoImage("3", "Yün yatak örtüsü"),
    images: [demoImage("3", "Yün yatak örtüsü")],
    options: [
      {
        id: "opt-color-3",
        name: "Renk",
        values: ["Kırık Beyaz", "Taş", "Adaçayı"],
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/demo-3-a",
        title: "Kırık Beyaz",
        availableForSale: true,
        sku: "DEMO-ORT-KB",
        price: money("3290"),
        compareAtPrice: money("3690"),
        selectedOptions: [{ name: "Renk", value: "Kırık Beyaz" }],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-3-b",
        title: "Taş",
        availableForSale: true,
        sku: "DEMO-ORT-TAS",
        price: money("3290"),
        compareAtPrice: null,
        selectedOptions: [{ name: "Renk", value: "Taş" }],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-3-c",
        title: "Adaçayı",
        availableForSale: false,
        sku: "DEMO-ORT-AD",
        price: money("3290"),
        compareAtPrice: null,
        selectedOptions: [{ name: "Renk", value: "Adaçayı" }],
        image: null,
      },
    ],
    priceRange: {
      minVariantPrice: money("3290"),
      maxVariantPrice: money("3290"),
    },
    compareAtPriceRange: {
      minVariantPrice: money("3690"),
      maxVariantPrice: money("3690"),
    },
    metafields: [],
    seo: {
      title: "Yün Yatak Örtüsü | DEMO",
      description: "DEMO ürün açıklaması",
    },
  },
  {
    id: "gid://shopify/Product/demo-4",
    handle: "cocuk-yun-yorgan",
    url: "/products/cocuk-yun-yorgan",
    title: "Çocuk Yün Yorganı",
    description: "DEMO ÜRÜN. Daha hafif dolgulu çocuk boy yorgan.",
    descriptionHtml:
      "<p><strong>DEMO ÜRÜN</strong> — Daha hafif dolgulu çocuk boy yorgan.</p>",
    availableForSale: true,
    vendor: "DEMO",
    productType: "Yorgan",
    tags: [DEMO_TAG],
    featuredImage: demoImage("4", "Çocuk yün yorganı"),
    images: [demoImage("4", "Çocuk yün yorganı")],
    options: [
      {
        id: "opt-size-4",
        name: "Ölçü",
        values: ["120 × 160"],
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/demo-4-a",
        title: "120 × 160",
        availableForSale: true,
        sku: "DEMO-COC-120",
        price: money("2890"),
        compareAtPrice: null,
        selectedOptions: [{ name: "Ölçü", value: "120 × 160" }],
        image: null,
      },
    ],
    priceRange: {
      minVariantPrice: money("2890"),
      maxVariantPrice: money("2890"),
    },
    compareAtPriceRange: {
      minVariantPrice: null,
      maxVariantPrice: null,
    },
    metafields: [
      {
        namespace: "custom",
        key: "dolgu",
        value: "%100 doğal yün",
        type: "single_line_text_field",
      },
    ],
    seo: {
      title: "Çocuk Yün Yorganı | DEMO",
      description: "DEMO ürün açıklaması",
    },
  },
  {
    id: "gid://shopify/Product/demo-5",
    handle: "premium-lastikli-carsaf-seti",
    url: "/products/premium-lastikli-carsaf-seti",
    title: "Premium Lastikli Çarşaf Seti",
    description:
      "DEMO ÜRÜN. Lastikli çarşaf ve yastık kılıfı seti. Antrasit renk. Geliştirme ortamı mock görselleri.",
    descriptionHtml:
      "<p><strong>DEMO ÜRÜN</strong> — Lastikli çarşaf ve yastık kılıfı seti. Antrasit. Mock görseller development içindir.</p>",
    availableForSale: true,
    vendor: "DEMO",
    productType: "Çarşaf & Yatak Tekstili",
    tags: [DEMO_TAG, "yeni", "carsaf"],
    featuredImage: demoImage(
      "sheet-1",
      "Premium lastikli çarşaf seti — antrasit",
      MOCK_SHEET_IMAGES[0],
    ),
    images: [
      demoImage(
        "sheet-1",
        "Premium lastikli çarşaf seti — antrasit",
        MOCK_SHEET_IMAGES[0],
      ),
      demoImage("sheet-2", "Premium lastikli çarşaf seti — detay", MOCK_SHEET_IMAGES[1]),
      demoImage(
        "sheet-3",
        "Premium lastikli çarşaf seti — yaşam alanı",
        MOCK_SHEET_IMAGES[2],
      ),
    ],
    options: [
      {
        id: "opt-color-5",
        name: "Renk",
        values: ["Antrasit"],
      },
      {
        id: "opt-size-5",
        name: "Ölçü",
        values: ["Tek Kişilik", "Çift Kişilik", "King"],
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/demo-5-a",
        title: "Antrasit / Tek Kişilik",
        availableForSale: true,
        sku: "DEMO-CAR-ANT-TK",
        price: money("2490"),
        compareAtPrice: money("2890"),
        selectedOptions: [
          { name: "Renk", value: "Antrasit" },
          { name: "Ölçü", value: "Tek Kişilik" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-5-b",
        title: "Antrasit / Çift Kişilik",
        availableForSale: true,
        sku: "DEMO-CAR-ANT-CK",
        price: money("2990"),
        compareAtPrice: money("3490"),
        selectedOptions: [
          { name: "Renk", value: "Antrasit" },
          { name: "Ölçü", value: "Çift Kişilik" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-5-c",
        title: "Antrasit / King",
        availableForSale: true,
        sku: "DEMO-CAR-ANT-KG",
        price: money("3290"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Renk", value: "Antrasit" },
          { name: "Ölçü", value: "King" },
        ],
        image: null,
      },
    ],
    priceRange: {
      minVariantPrice: money("2490"),
      maxVariantPrice: money("3290"),
    },
    compareAtPriceRange: {
      minVariantPrice: money("2890"),
      maxVariantPrice: money("3490"),
    },
    metafields: [],
    seo: {
      title: "Premium Lastikli Çarşaf Seti | DEMO",
      description: "DEMO — Antrasit lastikli çarşaf ve yastık kılıfı seti",
    },
  },
  {
    id: "gid://shopify/Product/demo-6",
    handle: "premium-yatak-ortusu-seti",
    url: "/products/premium-yatak-ortusu-seti",
    title: "Premium Yatak Örtüsü Seti",
    description:
      "DEMO ÜRÜN. Çift kişilik yatak örtüsü seti. Gri. Geliştirme ortamı mock görselleri.",
    descriptionHtml:
      "<p><strong>DEMO ÜRÜN</strong> — Yatak örtüsü seti. Gri. Mock görseller development içindir.</p>",
    availableForSale: true,
    vendor: "DEMO",
    productType: "Yatak Örtüsü",
    tags: [DEMO_TAG, "bestseller", "yatak-ortusu"],
    featuredImage: demoImage(
      "comforter-1",
      "Premium yatak örtüsü seti — gri",
      MOCK_COMFORTER_IMAGES[0],
    ),
    images: [
      demoImage(
        "comforter-1",
        "Premium yatak örtüsü seti — gri",
        MOCK_COMFORTER_IMAGES[0],
      ),
      demoImage(
        "comforter-2",
        "Premium yatak örtüsü seti — detay",
        MOCK_COMFORTER_IMAGES[1],
      ),
    ],
    options: [
      {
        id: "opt-color-6",
        name: "Renk",
        values: ["Gri"],
      },
      {
        id: "opt-size-6",
        name: "Ölçü",
        values: ["Çift Kişilik", "King"],
      },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/demo-6-a",
        title: "Gri / Çift Kişilik",
        availableForSale: true,
        sku: "DEMO-YAT-GRI-CK",
        price: money("4590"),
        compareAtPrice: money("5190"),
        selectedOptions: [
          { name: "Renk", value: "Gri" },
          { name: "Ölçü", value: "Çift Kişilik" },
        ],
        image: null,
      },
      {
        id: "gid://shopify/ProductVariant/demo-6-b",
        title: "Gri / King",
        availableForSale: true,
        sku: "DEMO-YAT-GRI-KG",
        price: money("4990"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Renk", value: "Gri" },
          { name: "Ölçü", value: "King" },
        ],
        image: null,
      },
    ],
    priceRange: {
      minVariantPrice: money("4590"),
      maxVariantPrice: money("4990"),
    },
    compareAtPriceRange: {
      minVariantPrice: money("5190"),
      maxVariantPrice: money("5190"),
    },
    metafields: [],
    seo: {
      title: "Premium Yatak Örtüsü Seti | DEMO",
      description: "DEMO — Gri yatak örtüsü seti",
    },
  },
];

const MOCK_IMAGE_POOL = [...MOCK_SHEET_IMAGES, ...MOCK_COMFORTER_IMAGES] as const;

function fallbackImageUrl(productIndex: number, imageIndex = 0) {
  const poolIndex = (productIndex + imageIndex) % MOCK_IMAGE_POOL.length;
  return MOCK_IMAGE_POOL[poolIndex];
}

function withGuaranteedMedia(products: Product[]): Product[] {
  return products.map((product, productIndex) => {
    const sourceImages =
      product.images.length > 0
        ? product.images
        : [
            demoImage(
              `${product.handle}-fallback`,
              `${product.title} görseli`,
              fallbackImageUrl(productIndex),
            ),
          ];

    const images = sourceImages.map((img, imageIndex) => ({
      ...img,
      altText: img.altText ?? product.title,
      url: img.url || fallbackImageUrl(productIndex, imageIndex),
    }));

    const featuredImage = product.featuredImage
      ? {
          ...product.featuredImage,
          altText: product.featuredImage.altText ?? product.title,
          url:
            product.featuredImage.url || images[0]?.url || fallbackImageUrl(productIndex),
        }
      : (images[0] ?? null);

    const variantImagePool = images.length
      ? images
      : featuredImage
        ? [featuredImage]
        : [];
    const variants = product.variants.map((variant, variantIndex) => ({
      ...variant,
      image:
        variant.image ??
        (variantImagePool.length
          ? variantImagePool[variantIndex % variantImagePool.length]
          : null),
    }));

    return {
      ...product,
      featuredImage,
      images,
      variants,
    };
  });
}

const demoProducts: Product[] = withGuaranteedMedia(rawDemoProducts);

function toCard(product: Product): ProductCardData {
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
    badge: product.tags.includes("yeni")
      ? "Yeni"
      : product.tags.includes("bestseller")
        ? "Çok Satan"
        : "DEMO",
  };
}

const collections: Record<string, Collection> = {
  all: {
    id: "gid://shopify/Collection/demo-all",
    handle: "all",
    title: "Tüm Ürünler",
    description: "DEMO koleksiyon — tüm örnek ürünler.",
    descriptionHtml: "<p>DEMO koleksiyon — tüm örnek ürünler.</p>",
    image: null,
    products: demoProducts.map(toCard),
    productsCount: demoProducts.length,
    seo: { title: "Tüm Ürünler | DEMO", description: "DEMO koleksiyon" },
  },
  "yun-yorgan": {
    id: "gid://shopify/Collection/demo-yorgan",
    handle: "yun-yorgan",
    title: "Yün Yorganlar",
    description: "DEMO — Doğal yün dolgulu yorgan koleksiyonu.",
    descriptionHtml: "<p>DEMO — Doğal yün dolgulu yorgan koleksiyonu.</p>",
    image: null,
    products: demoProducts.filter((p) => p.productType === "Yorgan").map(toCard),
    productsCount: demoProducts.filter((p) => p.productType === "Yorgan").length,
    seo: { title: "Yün Yorganlar | DEMO", description: "DEMO koleksiyon" },
  },
  "yun-yastik": {
    id: "gid://shopify/Collection/demo-yastik",
    handle: "yun-yastik",
    title: "Yün Yastıklar",
    description: "DEMO — Doğal yün yastık koleksiyonu.",
    descriptionHtml: "<p>DEMO — Doğal yün yastık koleksiyonu.</p>",
    image: null,
    products: demoProducts.filter((p) => p.productType === "Yastık").map(toCard),
    productsCount: demoProducts.filter((p) => p.productType === "Yastık").length,
    seo: { title: "Yün Yastıklar | DEMO", description: "DEMO koleksiyon" },
  },
  "dogal-uyku": {
    id: "gid://shopify/Collection/demo-uyku",
    handle: "dogal-uyku",
    title: "Doğal Uyku",
    description: "DEMO — Doğal uyku ürünleri.",
    descriptionHtml: "<p>DEMO — Doğal uyku ürünleri.</p>",
    image: null,
    products: demoProducts.map(toCard),
    productsCount: demoProducts.length,
    seo: { title: "Doğal Uyku | DEMO", description: "DEMO koleksiyon" },
  },
  "carsaf-yatak-tekstili": {
    id: "gid://shopify/Collection/demo-carsaf",
    handle: "carsaf-yatak-tekstili",
    title: "Çarşaf & Yatak Tekstili",
    description: "DEMO — Lastikli çarşaf ve yastık kılıfı setleri.",
    descriptionHtml: "<p>DEMO — Lastikli çarşaf ve yastık kılıfı setleri.</p>",
    image: null,
    products: demoProducts
      .filter((p) => p.productType === "Çarşaf & Yatak Tekstili")
      .map(toCard),
    productsCount: demoProducts.filter((p) => p.productType === "Çarşaf & Yatak Tekstili")
      .length,
    seo: {
      title: "Çarşaf & Yatak Tekstili | DEMO",
      description: "DEMO koleksiyon",
    },
  },
  "yatak-ortuleri": {
    id: "gid://shopify/Collection/demo-yatak-ortusu",
    handle: "yatak-ortuleri",
    title: "Yatak Örtüleri",
    description: "DEMO — Yatak örtüsü setleri.",
    descriptionHtml: "<p>DEMO — Yatak örtüsü setleri.</p>",
    image: null,
    products: demoProducts.filter((p) => p.productType === "Yatak Örtüsü").map(toCard),
    productsCount: demoProducts.filter((p) => p.productType === "Yatak Örtüsü").length,
    seo: { title: "Yatak Örtüleri | DEMO", description: "DEMO koleksiyon" },
  },
  featured: {
    id: "gid://shopify/Collection/demo-featured",
    handle: "featured",
    title: "Öne Çıkanlar",
    description: "DEMO featured koleksiyon.",
    descriptionHtml: "<p>DEMO featured koleksiyon.</p>",
    image: null,
    products: [
      demoProducts[4], // Premium Lastikli Çarşaf Seti
      demoProducts[5], // Premium Yatak Örtüsü Seti
      demoProducts[0],
      demoProducts[1],
    ].map(toCard),
    productsCount: 4,
    seo: { title: "Öne Çıkanlar | DEMO", description: "DEMO" },
  },
  "best-sellers": {
    id: "gid://shopify/Collection/demo-bestsellers",
    handle: "best-sellers",
    title: "Çok Satanlar",
    description: "DEMO best sellers koleksiyon.",
    descriptionHtml: "<p>DEMO best sellers koleksiyon.</p>",
    image: null,
    products: [demoProducts[5], demoProducts[4], demoProducts[1], demoProducts[0]].map(
      toCard,
    ),
    productsCount: 4,
    seo: { title: "Çok Satanlar | DEMO", description: "DEMO" },
  },
};

/** In-memory mock cart store (process lifetime) */
const mockCarts = new Map<string, Cart>();

function emptyCart(id: string): Cart {
  return {
    id,
    checkoutUrl: "https://checkout.shopify.com/demo-checkout-placeholder",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: money("0"),
      totalAmount: money("0"),
    },
  };
}

function recalcCart(cart: Cart): Cart {
  const totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.lines.reduce(
    (sum, line) => sum + Number.parseFloat(line.cost.totalAmount.amount),
    0,
  );
  return {
    ...cart,
    totalQuantity,
    cost: {
      subtotalAmount: money(subtotal.toFixed(2)),
      totalAmount: money(subtotal.toFixed(2)),
    },
  };
}

export const mockShopify = {
  getProductByHandle(handle: string): Product | null {
    return demoProducts.find((p) => p.handle === handle) ?? null;
  },

  getProducts(limit = 24): ProductCardData[] {
    return demoProducts.slice(0, limit).map(toCard);
  },

  searchProducts(query: string, limit = 12): ProductCardData[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return demoProducts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.productType?.toLowerCase().includes(q) ?? false) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.options.some(
            (opt) =>
              opt.name.toLowerCase().includes(q) ||
              opt.values.some((v) => v.toLowerCase().includes(q)),
          ),
      )
      .slice(0, limit)
      .map(toCard);
  },

  getCollectionByHandle(handle: string): Collection | null {
    return collections[handle] ?? null;
  },

  getCollections() {
    return Object.values(collections).map((c) => ({
      handle: c.handle,
      title: c.title,
      updatedAt: new Date().toISOString(),
    }));
  },

  getProductHandles() {
    return demoProducts.map((p) => ({
      handle: p.handle,
      updatedAt: new Date().toISOString(),
    }));
  },

  createCart(lines: Array<{ merchandiseId: string; quantity: number }> = []): Cart {
    const id = `gid://shopify/Cart/demo-${Date.now()}`;
    let cart = emptyCart(id);
    if (lines.length) {
      cart = this.addLines(id, lines) ?? cart;
    } else {
      mockCarts.set(id, cart);
    }
    return mockCarts.get(id) ?? cart;
  },

  getCart(cartId: string): Cart | null {
    return mockCarts.get(cartId) ?? null;
  },

  addLines(
    cartId: string,
    lines: Array<{ merchandiseId: string; quantity: number }>,
  ): Cart | null {
    const cart = mockCarts.get(cartId) ?? emptyCart(cartId);
    const next = { ...cart, lines: [...cart.lines] };

    for (const line of lines) {
      const variant = demoProducts
        .flatMap((p) => p.variants.map((v) => ({ product: p, variant: v })))
        .find(({ variant }) => variant.id === line.merchandiseId);

      if (!variant) continue;

      const existing = next.lines.find((l) => l.merchandise.id === line.merchandiseId);

      if (existing) {
        existing.quantity += line.quantity;
        existing.cost.totalAmount = money(
          (
            Number.parseFloat(existing.merchandise.price.amount) * existing.quantity
          ).toFixed(2),
        );
      } else {
        next.lines.push({
          id: `gid://shopify/CartLine/demo-${Date.now()}-${Math.random()}`,
          quantity: line.quantity,
          merchandise: {
            id: variant.variant.id,
            title: variant.variant.title,
            selectedOptions: variant.variant.selectedOptions,
            product: {
              handle: variant.product.handle,
              title: variant.product.title,
              featuredImage: variant.product.featuredImage,
            },
            price: variant.variant.price,
          },
          cost: {
            totalAmount: money(
              (Number.parseFloat(variant.variant.price.amount) * line.quantity).toFixed(
                2,
              ),
            ),
          },
        });
      }
    }

    const updated = recalcCart(next);
    mockCarts.set(cartId, updated);
    return updated;
  },

  updateLines(
    cartId: string,
    lines: Array<{ id: string; quantity: number }>,
  ): Cart | null {
    const cart = mockCarts.get(cartId);
    if (!cart) return null;

    const next = {
      ...cart,
      lines: cart.lines
        .map((line) => {
          const update = lines.find((l) => l.id === line.id);
          if (!update) return line;
          if (update.quantity <= 0) return null;
          return {
            ...line,
            quantity: update.quantity,
            cost: {
              totalAmount: money(
                (
                  Number.parseFloat(line.merchandise.price.amount) * update.quantity
                ).toFixed(2),
              ),
            },
          };
        })
        .filter((line): line is NonNullable<typeof line> => Boolean(line)),
    };

    const updated = recalcCart(next);
    mockCarts.set(cartId, updated);
    return updated;
  },

  removeLines(cartId: string, lineIds: string[]): Cart | null {
    const cart = mockCarts.get(cartId);
    if (!cart) return null;
    const next = {
      ...cart,
      lines: cart.lines.filter((line) => !lineIds.includes(line.id)),
    };
    const updated = recalcCart(next);
    mockCarts.set(cartId, updated);
    return updated;
  },
};
