import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryShowcase } from "@/config/content";
import { Container } from "@/components/ui/container";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/reveal";

export function CategoryShowcase() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <FadeIn>
          <p className="text-eyebrow">Koleksiyonlar</p>
          <h2 className="mt-3 text-h2">Uyku için seçilmiş</h2>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {categoryShowcase.map((item) => (
            <StaggerItem key={item.href}>
              <Link
                href={item.href}
                className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden md:min-h-[28rem]"
              >
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                  />
                ) : (
                  <div className="texture-warm absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/70 via-anthracite/25 to-transparent transition-opacity duration-500 group-hover:from-anthracite/80" />
                <div className="relative p-6 text-surface md:p-8">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl">{item.title}</h3>
                      <p className="mt-2 max-w-xs text-sm text-surface/80 transition-transform duration-500 group-hover:translate-x-1">
                        {item.description}
                      </p>
                    </div>
                    <ArrowUpRight className="mb-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
