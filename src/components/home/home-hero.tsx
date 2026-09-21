import { ButtonLink } from "@/components/ui/button-link";
import { TextReveal, FadeIn } from "@/components/motion/reveal";
import { heroContent } from "@/config/content";

/**
 * Hero arka planı motion'a bağımlı değil — animasyon bozulsa bile içerik görünür kalır.
 */
export function HomeHero() {
  return (
    <section className="relative min-h-[min(92vh,56rem)] overflow-hidden">
      <div className="texture-warm absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,38,34,0.22)_0%,rgba(42,38,34,0.55)_100%)]"
        aria-hidden
      />

      <div className="container-page relative flex min-h-[min(92vh,56rem)] flex-col justify-end pb-16 pt-32 md:pb-24 md:pt-40">
        <TextReveal
          lines={[...heroContent.titleLines]}
          className="max-w-4xl text-display text-surface"
        />
        <FadeIn delay={0.2} className="mt-6 max-w-xl">
          <p className="text-body-lg text-surface/90">{heroContent.subtitle}</p>
        </FadeIn>
        <FadeIn delay={0.35} className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={heroContent.primaryCta.href} variant="primary" size="lg">
            {heroContent.primaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={heroContent.secondaryCta.href}
            variant="outline"
            size="lg"
            className="border-surface/50 text-surface hover:border-surface hover:bg-surface/10"
          >
            {heroContent.secondaryCta.label}
          </ButtonLink>
        </FadeIn>
      </div>
    </section>
  );
}
