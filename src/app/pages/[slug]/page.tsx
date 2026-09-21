import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

/**
 * Destek / yasal sayfalar için yapısal placeholder.
 * Gerçek hukuki metinler uydurulmamıştır — CMS içeriği beklenir.
 */
const PAGE_TITLES: Record<string, string> = {
  kargo: "Kargo",
  iade: "İade",
  sss: "Sıkça Sorulan Sorular",
  kvkk: "KVKK",
  gizlilik: "Gizlilik",
  "mesafeli-satis": "Mesafeli Satış",
  "cerez-politikasi": "Çerez Politikası",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = PAGE_TITLES[slug];
  if (!title) {
    return createPageMetadata({ title: "Sayfa bulunamadı", path: `/pages/${slug}`, noIndex: true });
  }
  return createPageMetadata({ title, path: `/pages/${slug}` });
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const title = PAGE_TITLES[slug];
  if (!title) notFound();

  return (
    <Container className="py-14 md:py-20">
      <h1 className="text-h1">{title}</h1>
      <p className="mt-6 max-w-2xl text-body text-muted-foreground">
        Bu sayfa içerik placeholder&apos;ıdır. Gerçek politika metni marka /
        hukuk ekibi tarafından sağlanana kadar burada yayınlanmayacaktır.
      </p>
    </Container>
  );
}
