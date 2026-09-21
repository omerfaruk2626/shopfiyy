import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="text-eyebrow">404</p>
      <h1 className="mt-3 text-h1">Sayfa bulunamadı</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center bg-foreground px-6 text-xs uppercase tracking-[0.1em] text-surface"
      >
        Ana sayfaya dön
      </Link>
    </Container>
  );
}
