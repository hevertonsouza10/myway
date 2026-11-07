// Seções institucionais reutilizáveis. A home (/) e a LP /performa montam a
// página com estas peças. Os estilos estão em globals.css e dependem de um
// ancestral com as classes "institutional-home award-home".
import Link from "next/link";
import Image from "next/image";
import introStyles from "./performa-intro.module.css";
import transitionStyles from "./impact-transition.module.css";
import impactStyles from "./impact-metrics.module.css";
import { PerformaJourney } from "@/components/performa-journey";
import { CinematicTestimonials } from "@/components/cinematic-testimonials";
import { InstitutionalAboutExperience } from "@/components/institutional-about-experience";
import { HorizontalPhotoRail } from "@/components/horizontal-photo-rail";
import {
  aboutBlocks,
  benefitStats,
  mentoringBlock,
  partnerBrands,
  performaModules,
  units,
  videoTestimonials,
  whatsappUrl,
} from "@/content/home";
import aulaAbertura from "../../public/media/aulas/dsc08659.webp";
import aulaEmCirculo from "../../public/media/aulas/dsc08667.webp";
import aulaParticipantes from "../../public/media/aulas/dsc08677.webp";
import aulaFacilitador from "../../public/media/aulas/dsc08693.webp";
import aulaTroca from "../../public/media/aulas/dsc08722.webp";
import aulaRodaNova from "../../public/media/aulas/aula-roda.webp";

function SocialIcon({ name }: { name: "instagram" | "whatsapp" | "youtube" | "phone" }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "instagram") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.8" r=".7" fill="currentColor" stroke="none" /></svg>;
  if (name === "whatsapp") return <svg {...common}><path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.3c.2-.5.4-.5.7-.5h.5l.7 2-1 1c.6 1.3 1.4 2 2.7 2.6l1-.9 2 .7v.5c0 .4-.1.6-.5.8-.5.2-1 .4-1.6.2-2.2-.8-4-2.5-4.8-4.7-.2-.6 0-1.2.3-1.7Z" /></svg>;
  if (name === "youtube") return <svg {...common}><path d="M21 12c0 2.8-.3 4.5-.8 5.3-.5.8-1.1 1.1-2.1 1.2-1.3.2-3.8.2-6.1.2s-4.8 0-6.1-.2c-1-.1-1.7-.4-2.1-1.2C3.3 16.5 3 14.8 3 12s.3-4.5.8-5.3c.5-.8 1.1-1.1 2.1-1.2C7.2 5.3 9.7 5.3 12 5.3s4.8 0 6.1.2c1 .1 1.7.4 2.1 1.2.5.8.8 2.5.8 5.3Z" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" /></svg>;
  return <svg {...common}><path d="M7.5 3.7 10 6.2 8.3 8.4c1.1 2.2 2.9 4 5.1 5.1l2.2-1.7 2.5 2.5-1.5 3.1c-.4.8-1.2 1.2-2 .9-5.3-1.5-9.1-5.3-10.6-10.6-.2-.8.1-1.6.9-2l3.1-1.5Z" /></svg>;
}

export function AboutSection() {
  return <InstitutionalAboutExperience blocks={[...aboutBlocks, mentoringBlock]} />;
}

export function PerformaTrainingSection() {
  return (
    <section className="award-section award-trainings training-experience" id="treinamentos">
      <div className={introStyles.intro}>
        <header className={introStyles.header}>
          <p className={introStyles.label}>TREINAMENTO</p>
          <h2 className={introStyles.title}>PERFORMA</h2>
        </header>
        <div className={introStyles.body}>
          <div className={introStyles.copy}>
            <p>Antes de liderar pessoas, neg&oacute;cios ou resultados, existe uma <strong>lideran&ccedil;a ainda mais importante: a de si mesmo.</strong> A forma como voc&ecirc; pensa influencia suas escolhas, suas escolhas moldam seus comportamentos e seus comportamentos constroem os <strong>resultados que voc&ecirc; alcan&ccedil;a.</strong> &Eacute; por isso que toda transforma&ccedil;&atilde;o consistente come&ccedil;a de dentro para fora.</p>
            <p>O PERFORMA &eacute; uma jornada de desenvolvimento de habilidades mentais e comportamentais para empres&aacute;rios, l&iacute;deres e profissionais que desejam ampliar sua forma de pensar, decidir, se relacionar e liderar. Mais do que ensinar t&eacute;cnicas ou f&oacute;rmulas prontas, desenvolvemos <strong>consci&ecirc;ncia, mentalidade e recursos</strong> para fazer melhores escolhas, conduzir pessoas, potencializar resultados e construir o pr&oacute;prio caminho.</p>
            <p>Acreditamos que cada pessoa possui uma hist&oacute;ria, uma identidade e um jeito &uacute;nico de enxergar o mundo. <strong>Evoluir n&atilde;o significa deixar de ser quem voc&ecirc; &eacute;, mas expandir quem voc&ecirc; pode se tornar.</strong> &Eacute; reconhecer seus padr&otilde;es, elevar sua mentalidade e assumir o protagonismo das suas escolhas para desenvolver, cada vez mais, <strong>o melhor do seu jeito.</strong></p>
          </div>
        </div>
      </div>
      <PerformaJourney modules={performaModules} />
      <HorizontalPhotoRail>
        <figure><Image src={aulaRodaNova} alt="Turma reunida em uma grande roda com o facilitador durante o treinamento" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Um encontro para ouvir e compartilhar</figcaption></figure>
        <figure><Image src={aulaParticipantes} alt="Participantes do Performa atentos durante uma conversa coletiva em sala" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Escuta ativa para ampliar perspectivas</figcaption></figure>
        <figure><Image src={aulaEmCirculo} alt="Facilitador conversa com a turma do Performa organizada em círculo" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Liderança construída em conjunto</figcaption></figure>
        <figure><Image src={aulaAbertura} alt="Facilitador apresenta o conteúdo do Performa para uma turma reunida em sala" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Uma experiência presencial, prática e humana</figcaption></figure>
        <figure><Image src={aulaTroca} alt="Participantes compartilham ideias durante uma atividade do Performa" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Conexões que fortalecem a jornada</figcaption></figure>
        <figure><Image src={aulaFacilitador} alt="Facilitador do Performa conduz uma reflexão diante dos participantes" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Conhecimento que provoca movimento</figcaption></figure>
      </HorizontalPhotoRail>
    </section>
  );
}

export function TestimonialsSection() {
  return <section className="award-section award-testimonials" id="resultados"><CinematicTestimonials testimonials={videoTestimonials} /></section>;
}

export function BenefitsSection() {
  return (
    <section className="award-section award-benefits" id="beneficios">
      <h2 className="benefits-title">Uma trajetória de transformação.</h2>
      <div className={impactStyles.grid}>{benefitStats.map((stat) => <article className={impactStyles.card} key={stat.label}><strong className={impactStyles.value}>{stat.value === "MyWay" ? <span className={impactStyles.logo} role="img" aria-label="MyWay" /> : stat.value === "∞" ? <span className={impactStyles.infinity}>∞</span> : stat.value}</strong><span className={impactStyles.label}>{stat.label}</span></article>)}</div>
      <div className={transitionStyles.bridge}>
        <p className={transitionStyles.copy}>O impacto cresce quando caminhamos juntos.</p>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return <section className="award-section award-partners" id="marcas-parceiras"><div className="award-section-marker"><span className="numeric-text">04</span><p>Parceiros MyWay</p></div><div className="award-partner-intro"><h2>Marcas que escolheram caminhar junto com a MyWay.</h2><p>Organizações e negócios que valorizam desenvolvimento humano, liderança prática e transformação presencial.</p></div><div className="award-partner-carousel" aria-label="Marcas parceiras"><div className="award-partner-strip">{[...partnerBrands, ...partnerBrands].map((brand, index) => <span key={`${brand.logo}-${index}`} aria-hidden={index >= partnerBrands.length}><Image className="partner-logo" src={`/partners/${brand.logo}-blue.png`} alt={index >= partnerBrands.length ? "" : brand.name} width={320} height={220} unoptimized /></span>)}</div></div></section>;
}

export function UnitsSection() {
  return <section className="award-section award-units" id="unidades"><div className="award-section-marker"><span className="numeric-text">06</span><p>Unidades</p></div><div className="award-heading"><p className="eyebrow">Montenegro e Feliz · RS</p><h2>Encontre a unidade mais próxima.</h2></div><div className="award-unit-grid">{units.map((unit) => <article className="award-unit-feature" key={unit.city}><div className="award-map-frame"><iframe title={`Mapa da unidade MyWay ${unit.city}`} src={unit.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="award-unit-copy"><span className="unit-status">Unidade presencial</span><h3>{unit.city}</h3><address className="unit-address"><span>{unit.street}</span><span>{unit.locality} <span aria-hidden="true">·</span> <span className="unit-cep">CEP {unit.cep}</span></span></address><div><a href={unit.routeUrl} target="_blank" rel="noreferrer">Traçar rota</a><a href={unit.phoneHref}>Ligar: {unit.phone}</a><a href={unit.reviewsUrl} target="_blank" rel="noreferrer">Ver avaliações</a></div></div></article>)}</div></section>;
}

type FooterLink = { href: string; label: string };

const defaultFooterLinks: FooterLink[] = [
  { href: "#sobre", label: "Sobre MyWay" },
  { href: "#treinamentos", label: "Treinamento" },
  { href: "#resultados", label: "Resultados" },
  { href: "#unidades", label: "Unidades" },
  { href: "#redes", label: "Nos siga" },
];

type FooterProps = { ctaHref?: string; links?: FooterLink[] };

export function InstitutionalFooter({ ctaHref = "/candidatura", links = defaultFooterLinks }: FooterProps) {
  return <footer className="award-footer" id="contato"><div className="award-footer-cta"><p className="eyebrow">Seu próximo passo</p><h2>Lidere suas escolhas. Faça parte da comunidade MyWay.</h2><Link className="button institutional-button" href={ctaHref}>Candidatar-se</Link></div><div className="award-footer-grid"><div><a className="award-footer-logo-link" href="#top" aria-label="MyWay — voltar ao início"><Image className="award-footer-logo" src="/brand/myway-logo-white-footer.png" alt="MyWay" width={1168} height={352} /></a><p>Lidere suas escolhas e sustente sua direção.</p><span>Treinamentos presenciais · RS</span></div><nav aria-label="Navegação do rodapé"><a href="#top">Início</a>{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav><address><a href="tel:+5551993601857">(51) 99360-1857</a><a href="https://www.google.com/maps/search/?api=1&query=Rua%20Santos%20Dumont%201610%20Montenegro%20RS" target="_blank" rel="noreferrer">Rua Santos Dumont, 1610 · Montenegro</a><a href="https://www.google.com/search?q=MyWay+Treinamentos+Montenegro+avalia%C3%A7%C3%B5es#lrd=0x951bfb14ac721f11:0xcc6a3b860eb71c24,1" target="_blank" rel="noreferrer">Ver avaliações no Google</a></address></div><nav className="footer-social-links" id="redes" aria-label="Redes sociais e contato"><a href="https://www.instagram.com/mywaytreinamentos/" target="_blank" rel="noreferrer"><SocialIcon name="instagram" /><span>Instagram</span></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><SocialIcon name="whatsapp" /><span>WhatsApp</span></a><a href="https://www.youtube.com/channel/UCDTPq1wg3nrgNN_DtXMAZWA/videos" target="_blank" rel="noreferrer"><SocialIcon name="youtube" /><span>YouTube</span></a><a href="tel:+5551993601857"><SocialIcon name="phone" /><span>Telefone</span></a></nav><p className="award-footer-rights">2026 MyWay Treinamentos. Todos os direitos reservados.</p></footer>;
}
