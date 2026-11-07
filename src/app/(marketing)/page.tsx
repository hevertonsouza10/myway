import type { Metadata } from "next";
import { MarketingHome } from "@/components/marketing-home";
import { organizationJsonLd, site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <MarketingHome />
    </>
  );
}
