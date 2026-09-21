import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/reveal";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { journalPlaceholders, testimonialsPlaceholder } from "@/config/content";

export function Testimonials() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <FadeIn>
          <p className="text-eyebrow">Yorumlar</p>
          <h2 className="mt-3 text-h2">Müşteri deneyimleri</h2>
          {testimonialsPlaceholder.isPlaceholder ? (
            <p className="mt-3 max-w-xl text-sm text-muted">
              PLACEHOLDER — Gerçek müşteri yorumları bağlanana kadar örnek metin
              gösterilmez; review kaynağı entegrasyonu bekleniyor.
            </p>
          ) : null}
        </FadeIn>
      </Container>
    </section>
  );
}

export function JournalTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <FadeIn className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow">Journal</p>
            <h2 className="mt-3 text-h2">Okumaya değer</h2>
          </div>
          <Link
            href="/journal"
            className="hidden text-sm text-muted underline-offset-4 hover:text-foreground hover:underline md:inline"
          >
            Tüm yazılar
          </Link>
        </FadeIn>

        <StaggerChildren className="grid gap-8 md:grid-cols-3">
          {journalPlaceholders.map((post) => (
            <StaggerItem key={post.slug}>
              <article>
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="texture-warm aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.02]" />
                  <h3 className="mt-5 font-serif text-2xl leading-snug group-hover:text-brown">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  {post.isPlaceholder ? (
                    <p className="mt-2 text-caption text-stone">İçerik yakında</p>
                  ) : null}
                </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="border-y border-border-subtle bg-surface-secondary/40 py-16 md:py-20">
      <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-md">
          <h2 className="text-h3">Yeniliklerden haberdar olun</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Koleksiyon güncellemeleri ve bakım önerileri için bültenimize katılın.
          </p>
        </div>
        <div className="w-full max-w-md">
          <NewsletterForm />
        </div>
      </Container>
    </section>
  );
}
