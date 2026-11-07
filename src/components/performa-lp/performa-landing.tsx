import { DecisionClock } from "@/components/decision-clock";
import {
  BenefitsSection,
  InstitutionalFooter,
  PartnersSection,
  PerformaTrainingSection,
  TestimonialsSection,
} from "@/components/home-sections";
import { PerformaHeader } from "./performa-header";
import { PerformaHero } from "./performa-hero";
import { PainNarrative } from "./pain-narrative";
import { RouteChange } from "./route-change";
import { ctaHref } from "./content";
import s from "./performa-lp.module.css";

const footerLinks = [
  { href: "#descobrir", label: "O problema" },
  { href: "#treinamentos", label: "O método" },
  { href: "#resultados", label: "Resultados" },
  { href: "#marcas-parceiras", label: "Parceiros" },
  { href: "#redes", label: "Nos siga" },
];

// Ordem segue o wireframe em "estrutura site/".
export function PerformaLanding() {
  return (
    <div className={s.page}>
      <a className={s.skip} href="#conteudo">
        Pular para o conteúdo
      </a>
      <PerformaHeader />
      <main id="conteudo">
        <PerformaHero />
        {/* 2. Funil da dor — mesma seção da /lideranca */}
        <DecisionClock />
        {/* 3. Consciência da dor  ·  4. O que o treinamento resolve */}
        <PainNarrative />
        <RouteChange />
        {/* Seções da home, com o mesmo CSS (classes do <main> da home) */}
        <div className={`institutional-home award-home ${s.homeSections}`}>
          <PerformaTrainingSection />
          <TestimonialsSection />
          <BenefitsSection />
          <PartnersSection />
          <InstitutionalFooter ctaHref={ctaHref} links={footerLinks} />
        </div>
      </main>
    </div>
  );
}
