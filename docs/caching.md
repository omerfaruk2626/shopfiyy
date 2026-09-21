# Shopify Caching & Revalidation

## Strateji

| Veri | Cache | Revalidate | Not |
|------|-------|------------|-----|
| Product detail | `force-cache` + tags | 15 dakika | PDP |
| Collection / product lists | `force-cache` + tags | 15 dakika | Grid hafif query |
| Search | `no-store` | — | Anlık |
| Cart (tüm mutations + getCart) | `no-store` | — | Asla static cache yok |

## Cache tags

- `shopify-products`
- `shopify-collections`
- `shopify-product-{handle}`
- `shopify-collection-{handle}`

## Query maliyeti

- **ProductCard** (grid): featuredImage + 2 image + price — variants/options/metafield YOK
- **Product (PDP)**: full options + variants (max 100) + seo + images

## On-demand revalidation (ileride)

```ts
import { revalidateTag } from "next/cache";
revalidateTag("shopify-products");
revalidateTag(`shopify-product-${handle}`);
```

Webhook secret ile korunmuş `/api/revalidate` eklenebilir.

## Stale data

Fiyat/stok 15 dk gecikebilir. Cart API gerçek stok doğrular.
`USE_MOCK_DATA=false` iken API hatası demo ürüne düşmez.
