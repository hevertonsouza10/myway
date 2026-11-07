import { HeroIntro } from "@/components/hero-intro";
import {
  AboutSection,
  BenefitsSection,
  InstitutionalFooter,
  PartnersSection,
  PerformaTrainingSection,
  TestimonialsSection,
  UnitsSection,
} from "@/components/home-sections";

export function MarketingHome() {
  return (
    <main className="institutional-home award-home">
      <HeroIntro variant="institutional" />
      <AboutSection />
      <PerformaTrainingSection />
      <TestimonialsSection />
      <BenefitsSection />
      <PartnersSection />
      <UnitsSection />
      <InstitutionalFooter />
    </main>
  );
}
