import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/reveal";
import { craftsmanship } from "@/config/content";

export function Craftsmanship() {
  return (
    <section className="relative overflow-hidden">
      <div className="texture-warm min-h-[28rem] w-full md:min-h-[36rem]" />
      <div className="absolute inset-0 bg-anthracite/45" />
      <div className="absolute inset-0 flex items-end">
        <Container className="pb-14 md:pb-20">
          <FadeIn className="max-w-xl text-surface">
            <p className="text-eyebrow text-surface/70">Üretim</p>
            <h2 className="mt-3 text-h2 text-surface">{craftsmanship.title}</h2>
            <p className="mt-4 text-body-lg text-surface/85">{craftsmanship.body}</p>
          </FadeIn>
        </Container>
      </div>
    </section>
  );
}
