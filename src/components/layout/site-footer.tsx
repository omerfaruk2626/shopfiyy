import Link from "next/link";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { trustElements } from "@/config/content";
import { NewsletterForm } from "@/components/marketing/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border-subtle bg-surface">
      <div className="container-page border-b border-border-subtle py-10">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustElements.map((item) => (
            <li key={item.title}>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 text-caption text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="font-serif text-3xl tracking-[-0.03em]">
            {siteConfig.name}
          </Link>
          <p className="mt-4 max-w-sm text-body text-muted-foreground">
            {siteConfig.tagline}. {siteConfig.description}
          </p>
          <div className="mt-8">
            <p className="text-eyebrow mb-3">Bülten</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <FooterColumn title="Kategoriler" items={footerNavigation.categories} />
          <FooterColumn title="Kurumsal" items={footerNavigation.corporate} />
          <FooterColumn title="Destek" items={footerNavigation.support} />
          <FooterColumn title="Yasal" items={footerNavigation.legal} />
        </div>
      </div>

      <div className="container-page flex flex-col gap-3 border-t border-border-subtle py-6 text-caption text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
        </p>
        <p>Güvenli ödeme Shopify altyapısı ile sağlanır.</p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <p className="text-eyebrow mb-4">{title}</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-foreground/85 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
