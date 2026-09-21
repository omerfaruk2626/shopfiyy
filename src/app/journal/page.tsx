import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";
import { journalPlaceholders } from "@/config/content";

export const metadata: Metadata = createPageMetadata({
  title: "Journal",
  description: "Doğal uyku, yün bakım ve seçim rehberleri.",
  path: "/journal",
});

export default function JournalIndexPage() {
  return (
    <Container className="py-14 md:py-20">
      <p className="text-eyebrow">Editorial</p>
      <h1 className="mt-3 text-h1">Journal</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        İçerik mimarisi hazır. Yazılar CMS veya Shopify blog kaynağına
        bağlandığında burada listelenecek.
      </p>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {journalPlaceholders.map((post) => (
          <article key={post.slug}>
            <Link href={`/journal/${post.slug}`} className="group block">
              <div className="texture-warm aspect-[16/10]" />
              <h2 className="mt-5 font-serif text-2xl group-hover:text-brown">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </Container>
  );
}
