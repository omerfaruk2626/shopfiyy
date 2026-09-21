import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Hesabım",
  path: "/account",
  noIndex: true,
});

export default function AccountPage() {
  return (
    <Container className="py-14 md:py-20">
      <h1 className="text-h1">Hesabım</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Müşteri hesabı Shopify Customer Account / Customer Account API
        bağlandığında burada yer alacaktır.
      </p>
    </Container>
  );
}
