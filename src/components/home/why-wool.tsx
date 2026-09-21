import { Container } from "@/components/ui/container";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/reveal";
import { whyWool } from "@/config/content";

export function WhyWool() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <FadeIn className="max-w-2xl">
          <p className="text-eyebrow">Doğal Yün</p>
          <h2 className="mt-3 text-h2">Neden yün?</h2>
          <p className="mt-4 text-body text-muted-foreground">
            Aşağıdaki özellikler genel malzeme karakteristiğini anlatır; tıbbi
            sağlık iddiası değildir.
          </p>
        </FadeIn>

        <StaggerChildren className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {whyWool.map((item) => (
            <StaggerItem key={item.title}>
              <h3 className="text-h3">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
