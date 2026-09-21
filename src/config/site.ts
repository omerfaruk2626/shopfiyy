/**
 * Merkezi site yapılandırması.
 * Marka adı ve Shopify handle'lar gerçek değerlerle güncellenmelidir.
 * Hiçbir Shopify credential burada hard-code edilmez.
 */

function readOptional(name: string): string {
  const value = process.env[name];
  return value?.trim() ?? "";
}

export const siteConfig = {
  /** NEXT_PUBLIC_SITE_NAME ile override — varsayılan marka */
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Reinwool",
  tagline: "Doğal uykunun en saf hali",
  description:
    "Özenle seçilmiş doğal yün, kaliteli kumaşlar ve yıllarca süren konfor.",
  locale: "tr_TR",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: "info@example.com",
  social: {
    instagram: "",
    facebook: "",
    pinterest: "",
  },
  shopify: {
    /**
     * Boş bırakılırsa homepage ilgili section gizlenir.
     * Discovery sonrası gerçek handle ile doldurun (.env veya burada).
     */
    collectionFeatured: readOptional("SHOPIFY_COLLECTION_FEATURED"),
    collectionBestSellers: readOptional("SHOPIFY_COLLECTION_BEST_SELLERS"),
    /**
     * Metafield eşlemeleri — discovery sonrası doldurulacak.
     * Boş dizi = metafield sorgulanmaz / gösterilmez.
     * Tahmini key'ler gerçek veri gibi kullanılmaz.
     */
    metafieldIdentifiers: [] as Array<{
      namespace: string;
      key: string;
      label: string;
    }>,
  },
} as const;

export type SiteConfig = typeof siteConfig;
