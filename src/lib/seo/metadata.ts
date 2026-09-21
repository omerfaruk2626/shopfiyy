import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl, truncate } from "@/lib/utils";

export function createPageMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  noIndex?: boolean;
}): Metadata {
  const desc = truncate(description || siteConfig.description);
  const url = absoluteUrl(path);

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: image ? [image] : undefined,
    },
  };
}
