export type NavItem = {
  label: string;
  href: string;
};

/**
 * Kontrollü navigation.
 * href'lerdeki /collections/... handle'ları discovery sonrası
 * gerçek Shopify collection handle'larıyla güncellenecek.
 * Bilinmeyen handle uydurulmamalı — 404 kabul edilebilir.
 */
export const mainNavigation: NavItem[] = [
  { label: "Yorganlar", href: "/collections/yun-yorgan" },
  { label: "Yastıklar", href: "/collections/yun-yastik" },
  { label: "Çarşaflar", href: "/collections/carsaf-yatak-tekstili" },
  { label: "Yatak Örtüleri", href: "/collections/yatak-ortuleri" },
  { label: "Hikayemiz", href: "/about" },
];

export const footerNavigation = {
  categories: [
    { label: "Yorganlar", href: "/collections/yun-yorgan" },
    { label: "Yastıklar", href: "/collections/yun-yastik" },
    { label: "Çarşaf & Yatak Tekstili", href: "/collections/carsaf-yatak-tekstili" },
    { label: "Yatak Örtüleri", href: "/collections/yatak-ortuleri" },
    { label: "Tüm Ürünler", href: "/collections/all" },
  ],
  corporate: [
    { label: "Hakkımızda", href: "/about" },
    { label: "İletişim", href: "/contact" },
    { label: "Journal", href: "/journal" },
  ],
  support: [
    { label: "Kargo", href: "/pages/kargo" },
    { label: "İade", href: "/pages/iade" },
    { label: "SSS", href: "/pages/sss" },
  ],
  legal: [
    { label: "KVKK", href: "/pages/kvkk" },
    { label: "Gizlilik", href: "/pages/gizlilik" },
    { label: "Mesafeli Satış", href: "/pages/mesafeli-satis" },
    { label: "Çerez Politikası", href: "/pages/cerez-politikasi" },
  ],
} as const;
