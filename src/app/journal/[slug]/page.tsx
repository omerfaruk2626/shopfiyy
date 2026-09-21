import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";
import { journalPlaceholders } from "@/config/content";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return journalPlaceholders.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPlaceholders.find((p) => p.slug === slug);
  if (!post) return createPageMetadata({ title: "Yazı bulunamadı", path: `/journal/${slug}`, noIndex: true });
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/journal/${post.slug}`,
  });
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = journalPlaceholders.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          path: `/journal/${post.slug}`,
        })}
      />
      <Container className="py-14 md:py-20">
        <article className="mx-auto max-w-3xl">
          <p className="text-eyebrow">Journal</p>
          <h1 className="mt-3 text-h1">{post.title}</h1>
          <p className="mt-6 text-body-lg text-muted-foreground">{post.excerpt}</p>
          <div className="texture-warm mt-10 aspect-[16/9]" />
          <div className="mt-10 space-y-4 text-body text-muted-foreground">
            <p>
              Bu sayfa mimari placeholder&apos;dır. Gerçek makale içeriği CMS
              veya Shopify üzerinden bağlandığında burada render edilecektir.
            </p>
            <p>
              SEO için Article structured data ve dynamic metadata altyapısı
              hazırdır.
            </p>
          </div>
        </article>
      </Container>
    </>
  );
}
