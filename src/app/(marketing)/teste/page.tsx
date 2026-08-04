import type { Metadata } from "next";
import { MarketingHome } from "@/components/marketing-home";

export const metadata: Metadata = {
  title: "Teste | MyWay",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestePage() {
  return <MarketingHome />;
}