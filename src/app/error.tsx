"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <Container className="flex min-h-[50vh] flex-col items-start justify-center py-20">
      <p className="text-eyebrow">Hata</p>
      <h1 className="mt-3 text-h2">Bir sorun oluştu</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
      </p>
      <Button className="mt-8" onClick={reset}>
        Tekrar dene
      </Button>
    </Container>
  );
}
