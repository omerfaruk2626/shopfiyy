import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopifycdn.net",
      },
      {
        protocol: "https",
        hostname: "*.myshopify.com",
      },
      {
        // DEVELOPMENT/MOCK görseller — production'da Shopify CDN kullanılır
        protocol: "https",
        hostname: "www.zebracasa.com",
      },
    ],
  },
};

export default nextConfig;
