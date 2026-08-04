import type { Metadata } from "next";
import { MarketingHome } from "@/components/marketing-home";

export const metadata: Metadata = {
  title: "MyWay | Lidere suas escolhas",
  description:
    "Treinamento presencial para transformar escolhas, relações e resultados.",
};

export default function HomePage() {
  return <MarketingHome />;
}
