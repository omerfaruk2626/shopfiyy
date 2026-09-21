# Premium Headless Shopify Storefront

Doğal yün yorgan, yastık ve uyku ürünleri için Next.js App Router tabanlı
premium headless e-commerce storefront.

Shopify Admin commerce backend olarak kullanılır. Bu proje ayrı bir ürün
veritabanı, Express API veya custom admin panel içermez.

## Teknolojiler

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Shopify Storefront GraphQL API
- Motion (Framer Motion)
- Lucide React
- Zod (form validation ihtiyaçlarında)

## Kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışır.

## Environment Variables

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (Vercel / özel domain) |
| `NEXT_PUBLIC_SITE_NAME` | Marka adı (placeholder: `Yün`) |
| `SHOPIFY_STORE_DOMAIN` | örn. `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API public token (**server-only**) |
| `SHOPIFY_STOREFRONT_API_VERSION` | örn. `2025-01` |
| `USE_MOCK_DATA` | `true` iken DEMO mock ürünler kullanılır |
| `SHOPIFY_COLLECTION_FEATURED` | Ana sayfa featured collection handle |
| `SHOPIFY_COLLECTION_BEST_SELLERS` | Best sellers collection handle |

> Admin API token'ı bu projede kullanılmaz ve browser'a asla gönderilmemelidir.

## Shopify Bağlantısı

1. Shopify Admin → **Settings → Apps and sales channels → Develop apps**
2. App oluşturun → **Storefront API** scope'larını verin (products, collections, cart, …)
3. **API credentials** → Storefront API access token'ı kopyalayın
4. `.env.local` içine domain + token yazın, `USE_MOCK_DATA=false` yapın
5. Bağlantı testi: `npm run shopify:ping`
6. Katalog keşfi: `npm run shopify:discover`
7. Çıktıdaki collection handle'ları navigation + `SHOPIFY_COLLECTION_*` env'lerine yazın

> Admin API token'ı bu projede kullanılmaz.

## Data Flow

```
UI (Server Components)
  → lib/shopify/index.ts
    → mock layer  (USE_MOCK_DATA=true)
    → Storefront GraphQL (credentials)
  → mappers → domain types (Product, Cart, Collection)
  → components
```

Cart işlemleri Server Actions üzerinden yürür. Cart ID httpOnly cookie'de saklanır.
Checkout, Shopify'ın döndürdüğü `checkoutUrl` ile yapılır.

## Scripts

```bash
npm run dev      # geliştirme sunucusu
npm run build    # production build
npm run start    # production sunucu
npm run lint     # ESLint
```

## Caching

Detaylar: [`docs/caching.md`](docs/caching.md)

- Katalog: tag'li cache + 15 dk revalidate
- Cart / search: no-store
- İleride Shopify webhook ile on-demand revalidation eklenebilir

## Deployment (Vercel)

1. Repo'yu Vercel'e bağlayın
2. Environment variables'ı Production / Preview için girin
3. `NEXT_PUBLIC_SITE_URL` değerini gerçek domain yapın
4. Domain'i Vercel project settings'ten bağlayın

## Demo Modu

Shopify credentials yokken proje `USE_MOCK_DATA=true` ile ayağa kalkar.
Mock ürünler kodda açıkça **DEMO** olarak işaretlenmiştir.

## Proje Yapısı (özet)

```
src/
  app/                 # routes (App Router)
  components/          # ui, layout, home, product, cart, motion…
  config/              # site, navigation, content
  lib/shopify/         # client, queries, mutations, mock, mappers
  lib/seo/             # metadata + JSON-LD
  types/               # domain types
```

## Marka / İçerik Notu

Logo, gerçek ürün görselleri, metafield anahtarları, collection handle'ları ve
yasal metinler bilerek placeholder bırakılmıştır. Shopify Admin'deki mevcut
Product → Options → Variants → Collections → Metafields yapısına frontend
adapte edilecek şekilde tasarlanmıştır.
