import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "İletişim",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-14 md:py-20">
      <p className="text-eyebrow">Destek</p>
      <h1 className="mt-3 text-h1">İletişim</h1>
      <p className="mt-6 max-w-xl text-body text-muted-foreground">
        Sorularınız için bize yazın. Gerçek iletişim kanalları marka bilgileri
        ile güncellenecektir.
      </p>
      <p className="mt-8 text-sm">
        E-posta:{" "}
        <a className="underline-offset-4 hover:underline" href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail}
        </a>
      </p>
    </Container>
  );
}
