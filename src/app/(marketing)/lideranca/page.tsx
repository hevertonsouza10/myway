import type { Metadata } from "next";
import { LeadershipLanding } from "@/components/leadership-landing";

export const metadata: Metadata = {
  title: "Treinamento Liderança | MyWay",
  description: "Landing page do treinamento de liderança da MyWay.",
};

export default function LiderancaPage() {
  return <LeadershipLanding />;
}
