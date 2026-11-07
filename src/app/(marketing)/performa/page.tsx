import type { Metadata } from "next";
import { PerformaLanding } from "@/components/performa-lp/performa-landing";

export const metadata: Metadata = {
  title: "Performa | MyWay — Lidere suas escolhas",
  description:
    "Performa: treinamento presencial da MyWay para empresários, líderes e profissionais que querem sair do piloto automático e voltar a liderar as próprias escolhas.",
  alternates: { canonical: "/performa" },
  // Em construção: liberar para o Google (e incluir no sitemap) quando a LP
  // estiver completa.
  robots: { index: false, follow: false },
};

export default function PerformaPage() {
  return <PerformaLanding />;
}
