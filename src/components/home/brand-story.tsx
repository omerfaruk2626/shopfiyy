import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/reveal";
import { brandStory } from "@/config/content";

export function BrandStory() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <div className="texture-warm aspect-[4/5] w-full" role="img" aria-label="Marka hikayesi görseli" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-eyebrow">{brandStory.eyebrow}</p>
          <h2 className="mt-3 text-h2">{brandStory.title}</h2>
          <p className="mt-6 max-w-lg text-body-lg text-muted-foreground">
            {brandStory.body}
          </p>
          <div className="mt-8">
            <ButtonLink href={brandStory.cta.href} variant="outline">
              {brandStory.cta.label}
            </ButtonLink>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
