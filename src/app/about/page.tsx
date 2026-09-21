import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";
import { brandStory } from "@/config/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createPageMetadata({
  title: "Hikayemiz",
  description: brandStory.body,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-14 md:py-20">
      <p className="text-eyebrow">Kurumsal</p>
      <h1 className="mt-3 text-h1">Hikayemiz</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="texture-warm aspect-[4/5]" />
        <div className="max-w-xl">
          <h2 className="text-h2">{brandStory.title}</h2>
          <p className="mt-6 text-body-lg text-muted-foreground">{brandStory.body}</p>
          <p className="mt-6 text-body text-muted-foreground">
            {siteConfig.name} — doğal yün ve uyku ürünlerine odaklanan premium bir
            e-ticaret deneyimi sunmak üzere geliştirilmektedir. Marka metinleri
            gerçek içerikle güncellenecektir.
          </p>
        </div>
      </div>
    </Container>
  );
}
