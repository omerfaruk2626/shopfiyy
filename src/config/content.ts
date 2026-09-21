/**
 * Pazarlama / editorial içerik — ileride CMS veya Shopify metaobjects'e taşınabilir.
 * Hukuki metinler uydurulmamıştır; yalnızca yapısal placeholder'lardır.
 */

export const announcementMessages = [
  "Belirli tutar üzeri ücretsiz kargo",
  "Doğal malzemeler • Güvenli ödeme • Türkiye'de üretim",
] as const;

export const heroContent = {
  titleLines: ["Doğal Uykunun", "En Saf Hali"],
  subtitle:
    "Özenle seçilmiş doğal yün, kaliteli kumaşlar ve yıllarca süren konfor.",
  primaryCta: { label: "Koleksiyonu Keşfet", href: "/collections/all" },
  secondaryCta: { label: "Hikayemiz", href: "/about" },
  /**
   * Gerçek hero görseli eklendiğinde bu path güncellenir.
   * Şimdilik CSS/atmosphere fallback kullanılır.
   */
  imageSrc: null as string | null,
  imageAlt: "Doğal yün yatak ürünleri",
};

export const categoryShowcase = [
  {
    title: "Yorganlar",
    description: "Doğal yün dolgulu, nefes alabilen yorganlar",
    href: "/collections/yun-yorgan",
    imageSrc: null as string | null,
  },
  {
    title: "Çarşaf & Tekstil",
    description: "Lastikli çarşaf ve yastık kılıfı setleri",
    href: "/collections/carsaf-yatak-tekstili",
    imageSrc:
      "https://www.zebracasa.com/lidya-cift-kisilik-lastikli-carsafantrasit-carsaf-yastik-kilifi-zebra-casa-7318-17-B.webp" as string | null,
  },
  {
    title: "Yatak Örtüleri",
    description: "Premium yatak örtüsü setleri",
    href: "/collections/yatak-ortuleri",
    imageSrc:
      "https://www.zebracasa.com/elisa-cift-kisilik-yatak-ortusu-setigri-cift-kisilik-comforter-setler-zebra-casa-3554-12-B.jpg" as string | null,
  },
] as const;

export const brandStory = {
  eyebrow: "Hikayemiz",
  title: "Doğadan Gelen Konfor",
  body: "Doğal yünü yalnızca bir dolgu malzemesi olarak değil; gece boyunca bedeninize eşlik eden bir konfor katmanı olarak görüyoruz. Özenli seçim, sade tasarım ve uzun ömürlü işçiliği bir araya getiriyoruz.",
  cta: { label: "Daha Fazlası", href: "/about" },
  imageSrc: null as string | null,
};

export const whyWool = [
  {
    title: "Nefes Alabilir",
    description:
      "Yün lifleri doğal hava sirkülasyonuna yardımcı olur ve uyku ortamının daha dengeli hissettirmesini destekler.",
  },
  {
    title: "Isı Dengesine Yardımcı",
    description:
      "Mevsimlere uyum sağlayan yapısıyla hem serin hem sıcak havalarda konforlu bir uyku deneyimi sunar.",
  },
  {
    title: "Doğal Malzeme",
    description:
      "Sentetik dolgular yerine dikkatle seçilmiş doğal yün kullanıyoruz.",
  },
  {
    title: "Uzun Ömürlü",
    description:
      "Doğru bakımla yıllarca formunu koruyabilen, dayanıklı bir yapıya sahiptir.",
  },
] as const;

export const craftsmanship = {
  title: "İşçilik & Özen",
  body: "Her ürün, malzemeden dikişe kadar dikkatli bir süreçten geçer. Amacımız gösteriş değil; yıllarca süren sade ve güvenilir konfor.",
  imageSrc: null as string | null,
};

export const trustElements = [
  { title: "Güvenli Ödeme", description: "Shopify güvenli ödeme altyapısı" },
  { title: "Kolay İade", description: "İade koşulları mağaza politikasına göre" },
  { title: "Doğal Malzeme", description: "Seçilmiş doğal yün dolgular" },
  { title: "Özenli Kargo", description: "Ürünler özenle paketlenir" },
] as const;

export const journalPlaceholders = [
  {
    slug: "yun-yorgan-nasil-secilir",
    title: "Yün Yorgan Nasıl Seçilir?",
    excerpt: "Ölçü, dolgu ağırlığı ve kumaş seçiminde dikkat edilmesi gerekenler.",
    isPlaceholder: true,
  },
  {
    slug: "yun-yorgan-nasil-temizlenir",
    title: "Yün Yorgan Nasıl Temizlenir?",
    excerpt: "Doğal yün ürünlerin bakımında uygulanan temel prensipler.",
    isPlaceholder: true,
  },
  {
    slug: "dogal-yun-neden-tercih-edilir",
    title: "Doğal Yün Neden Tercih Edilir?",
    excerpt: "Doğal yünün uyku deneyimine kattığı temel özellikler.",
    isPlaceholder: true,
  },
] as const;

/** PLACEHOLDER — gerçek müşteri yorumları gelene kadar UI'da belirtilir */
export const testimonialsPlaceholder = {
  isPlaceholder: true as const,
  items: [
    {
      quote: "Gerçek müşteri yorumları Shopify veya üçüncü parti review kaynağından bağlanacaktır.",
      author: "Placeholder",
    },
  ],
};
