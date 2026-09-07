import Link from "next/link";
import Image from "next/image";
import introStyles from "./performa-intro.module.css";
import transitionStyles from "./impact-transition.module.css";
import { PerformaJourney } from "@/components/performa-journey";
import impactStyles from "./impact-metrics.module.css";
import { CinematicTestimonials } from "@/components/cinematic-testimonials";
import { HeroIntro } from "@/components/hero-intro";
import { InstitutionalAboutExperience } from "@/components/institutional-about-experience";
import { HorizontalPhotoRail } from "@/components/horizontal-photo-rail";
import aulaAbertura from "../../marca/fotosaula/DSC08659.jpg";
import aulaEmCirculo from "../../marca/fotosaula/DSC08667.jpg";
import aulaParticipantes from "../../marca/fotosaula/DSC08677.jpg";
import aulaFacilitador from "../../marca/fotosaula/DSC08693.jpg";
import aulaTroca from "../../marca/fotosaula/DSC08722.jpg";

type Unit = { city: string; address: string; phone: string; phoneHref: string; mapUrl: string; routeUrl: string; embedUrl: string; reviewsUrl: string };

function SocialIcon({ name }: { name: "instagram" | "linkedin" | "whatsapp" | "youtube" | "phone" }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "instagram") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.8" r=".7" fill="currentColor" stroke="none" /></svg>;
  if (name === "linkedin") return <svg {...common}><path d="M6 9v9M6 6.2v.1M10 18v-5.2a3.2 3.2 0 0 1 6.4 0V18M10 12.5V9" /></svg>;
  if (name === "whatsapp") return <svg {...common}><path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.3c.2-.5.4-.5.7-.5h.5l.7 2-1 1c.6 1.3 1.4 2 2.7 2.6l1-.9 2 .7v.5c0 .4-.1.6-.5.8-.5.2-1 .4-1.6.2-2.2-.8-4-2.5-4.8-4.7-.2-.6 0-1.2.3-1.7Z" /></svg>;
  if (name === "youtube") return <svg {...common}><path d="M21 12c0 2.8-.3 4.5-.8 5.3-.5.8-1.1 1.1-2.1 1.2-1.3.2-3.8.2-6.1.2s-4.8 0-6.1-.2c-1-.1-1.7-.4-2.1-1.2C3.3 16.5 3 14.8 3 12s.3-4.5.8-5.3c.5-.8 1.1-1.1 2.1-1.2C7.2 5.3 9.7 5.3 12 5.3s4.8 0 6.1.2c1 .1 1.7.4 2.1 1.2.5.8.8 2.5.8 5.3Z" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" /></svg>;
  return <svg {...common}><path d="M7.5 3.7 10 6.2 8.3 8.4c1.1 2.2 2.9 4 5.1 5.1l2.2-1.7 2.5 2.5-1.5 3.1c-.4.8-1.2 1.2-2 .9-5.3-1.5-9.1-5.3-10.6-10.6-.2-.8.1-1.6.9-2l3.1-1.5Z" /></svg>;
}

const aboutBlocks = [
  { title: "Por que a MyWay existe?", text: "A MyWay nasceu da necessidade de criar um espaço onde empresários, líderes e profissionais pudessem evoluir além do conhecimento técnico. Percebemos que muitos dominam processos, estratégias e gestão, mas poucos encontram um ambiente capaz de desenvolver clareza, inteligência emocional, postura e capacidade de decisão." },
  { title: "Uma metodologia viva", text: "Cada treinamento é conduzido por meio da metodologia Experiential Learning, onde teoria e prática acontecem juntas. Conversas profundas, dinâmicas, exercícios, simulações e reflexão transformam conhecimento em comportamento." },
  { title: "Aplicação imediata", text: "Todo conhecimento precisa gerar transformação. Por isso, cada ferramenta apresentada durante os treinamentos pode ser aplicada imediatamente na rotina profissional e pessoal, nas decisões, nos relacionamentos e na forma de liderar." },
  { title: "Networking de alto nível", text: "Empresários, líderes e profissionais encontram aqui um espaço para trocar experiências, ampliar sua visão de negócio e construir conexões genuínas. Muitas relações se transformam em parcerias, oportunidades e amizades que seguem crescendo." },
  { title: "Desenvolvimento contínuo", text: "Na MyWay, o desenvolvimento não termina quando o treinamento acaba. Nossos alunos podem participar novamente da mesma formação, sem custo adicional, sempre que uma nova fase da empresa e da vida pedir novos aprendizados." },
];

const benefitStats = [
  { value: "+1000", label: "EMPRESAS IMPACTADAS", animated: true },
  { value: "10+", label: "ANOS DE EXPERIÊNCIA", animated: true },
  { value: "∞", label: "REFAÇA O TREINAMENTO SEM CUSTO" },
  { value: "RS", label: "ATUAÇÃO REGIONAL" },
];

const partnerBrands = ["Mombach", "Quiero Café", "VSL", "Grupo Vértice", "Norte Hub", "Essenza", "Farol Negócios", "Premium RS"];
const videoTestimonials = [
  "wEAZmq7u4mw", "xKD_c4j0LX8", "bOSmBqY5DQM", "dRaJg9DUbgk",
  "eeuuFozaXWw", "KBBLmb8l-jE", "vMarGhKIotY", "TjFkXiOurDY",
  "XXuqdDKv7vc", "4x8mPYwvIaM", "DJHg90NOolI",
].map((youtubeId, index) => ({
  title: `Depoimento ${String(index + 1).padStart(2, "0")}`,
  context: "MyWay",
  youtubeId,
  src: `https://www.youtube.com/watch?v=${youtubeId}`,
}));

const mentoringBlock = {
  title: "Mentoria personalizada",
  text: "Na MyWay, o desenvolvimento tamb\u00e9m acontece de forma individual. Por meio de mentorias personalizadas fora de sala, cada participante pode aprofundar seus desafios, ampliar a clareza sobre suas decis\u00f5es e transformar planejamentos em a\u00e7\u00f5es alinhadas \u00e0 sua realidade profissional e pessoal.",
};

const performaModules = [
  { title: "Consci\u00eancia e Autoconhecimento", text: "Reconhecer padr\u00f5es, cren\u00e7as e comportamentos para compreender como o seu jeito de pensar influencia escolhas, rela\u00e7\u00f5es e resultados." },
  { title: "Mentalidade e Ambiente", text: "Expandir perspectivas, romper padr\u00f5es limitantes e compreender como pessoas, refer\u00eancias e ambientes influenciam quem voc\u00ea se torna e o que acredita ser poss\u00edvel." },
  { title: "Autolideran\u00e7a e Responsabilidade", text: "Assumir o protagonismo das pr\u00f3prias escolhas, fortalecer postura e desenvolver a capacidade de conduzir a si mesmo antes de conduzir outras pessoas." },
  { title: "Intelig\u00eancia Emocional", text: "Desenvolver equil\u00edbrio e maturidade emocional para lidar com press\u00e3o, conflitos, mudan\u00e7as e decis\u00f5es sem perder clareza e dire\u00e7\u00e3o." },
  { title: "Comunica\u00e7\u00e3o, Influ\u00eancia e Relacionamentos", text: "Aprimorar a forma de comunicar, ouvir, se posicionar e construir rela\u00e7\u00f5es capazes de gerar confian\u00e7a, conex\u00e3o e influ\u00eancia." },
  { title: "Lideran\u00e7a e Gest\u00e3o de Pessoas", text: "Desenvolver pessoas, construir equipes mais respons\u00e1veis e compreender que liderar n\u00e3o \u00e9 centralizar \u2014 \u00e9 criar condi\u00e7\u00f5es para que outros tamb\u00e9m performem." },
  { title: "Delega\u00e7\u00e3o e Forma\u00e7\u00e3o de Equipes", text: "Sair da centraliza\u00e7\u00e3o, delegar com clareza e desenvolver autonomia para construir uma equipe que n\u00e3o dependa do l\u00edder para tudo." },
  { title: "Planejamento e Dire\u00e7\u00e3o", text: "Transformar vis\u00e3o em prioridades, objetivos e planos de a\u00e7\u00e3o, criando clareza sobre onde chegar e quais escolhas sustentam esse caminho." },
  { title: "Produtividade e Gest\u00e3o do Tempo", text: "Aprender a direcionar tempo, energia e aten\u00e7\u00e3o para aquilo que realmente gera impacto, reduzindo dispers\u00e3o e aumentando capacidade de execu\u00e7\u00e3o." },
  { title: "Decis\u00e3o e Execu\u00e7\u00e3o", text: "Tomar decis\u00f5es com mais clareza e transformar inten\u00e7\u00e3o em movimento, desenvolvendo disciplina, consist\u00eancia e capacidade de fazer acontecer." },
  { title: "Networking e Capital Relacional", text: "Construir rela\u00e7\u00f5es de valor, ampliar repert\u00f3rio e compreender como conex\u00f5es, ambientes e pessoas podem acelerar desenvolvimento, neg\u00f3cios e oportunidades." },
  { title: "Vis\u00e3o de Neg\u00f3cio e Resultados", text: "Ampliar a vis\u00e3o empresarial, conectar pessoas, processos e estrat\u00e9gia e compreender como decis\u00f5es de lideran\u00e7a impactam performance e resultados." },
  { title: "Mentalidade de Performance", text: "Elevar padr\u00f5es pessoais e profissionais, desenvolver consist\u00eancia e construir uma mentalidade orientada \u00e0 evolu\u00e7\u00e3o e a resultados sustent\u00e1veis." },
  { title: "Identidade, Prop\u00f3sito e Pr\u00f3ximo N\u00edvel", text: "Integrar os aprendizados da jornada para definir com mais clareza quem voc\u00ea escolhe ser, o que deseja construir e qual ser\u00e1 o seu pr\u00f3ximo movimento." },
];

const montenegroAddress = "Rua Santos Dumont, 1610 · CEP: 92510-285";
const units: Unit[] = [
  { city: "Montenegro · RS (Matriz)", address: montenegroAddress, phone: "Michael Lencina · (51) 99349-0339", phoneHref: "tel:+5551993490339", mapUrl: "https://www.google.com/maps/search/?api=1&query=Rua%20Santos%20Dumont%201610%20Montenegro%20RS", routeUrl: "https://www.google.com/maps/dir/?api=1&destination=Rua%20Santos%20Dumont%201610%20Montenegro%20RS", embedUrl: "https://www.google.com/maps?q=Rua%20Santos%20Dumont%201610%20Montenegro%20RS&output=embed", reviewsUrl: "https://www.google.com/search?q=MyWay+Treinamentos+Montenegro+avaliações" },
  { city: "Feliz · RS", address: "Feliz · Rio Grande do Sul", phone: "Cláudio Ritter · (51) 99177-8866", phoneHref: "tel:+5551991778866", mapUrl: "https://www.google.com/maps/search/?api=1&query=Feliz%20RS", routeUrl: "https://www.google.com/maps/dir/?api=1&destination=Feliz%20RS", embedUrl: "https://www.google.com/maps?q=Feliz%20RS&output=embed", reviewsUrl: "https://www.google.com/search?q=MyWay+Feliz+RS" },
];
const whatsappUrl = "https://wa.me/5551993490339";

export function MarketingHome() {
  return (
    <main className="institutional-home award-home">
      <HeroIntro variant="institutional" />

      <InstitutionalAboutExperience blocks={[...aboutBlocks, mentoringBlock]} />


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
          <figure><Image src={aulaParticipantes} alt="Participantes do Performa atentos durante uma conversa coletiva em sala" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Escuta ativa para ampliar perspectivas</figcaption></figure>
          <figure><Image src={aulaEmCirculo} alt="Facilitador conversa com a turma do Performa organizada em círculo" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Liderança construída em conjunto</figcaption></figure>
          <figure><Image src={aulaAbertura} alt="Facilitador apresenta o conteúdo do Performa para uma turma reunida em sala" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Uma experiência presencial, prática e humana</figcaption></figure>
          <figure><Image src={aulaTroca} alt="Participantes compartilham ideias durante uma atividade do Performa" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Conexões que fortalecem a jornada</figcaption></figure>
          <figure><Image src={aulaFacilitador} alt="Facilitador do Performa conduz uma reflexão diante dos participantes" placeholder="blur" sizes="(max-width: 620px) 78vw, 36vw" /><figcaption>Conhecimento que provoca movimento</figcaption></figure>
        </HorizontalPhotoRail>
      </section>
      <section className="award-section award-testimonials" id="resultados"><CinematicTestimonials testimonials={videoTestimonials} /></section>

      <section className="award-section award-benefits" id="beneficios">
        <h2 className="benefits-title">Uma trajetória de transformação.</h2>
        <div className={impactStyles.grid}>{benefitStats.map((stat) => <article className={impactStyles.card} key={stat.label}><strong className={impactStyles.value}>{stat.value}</strong><span className={impactStyles.label}>{stat.label}</span></article>)}</div>
        <div className={transitionStyles.bridge}>
          <p className={transitionStyles.copy}>O impacto cresce quando caminhamos juntos.</p>
        </div>
      </section>

      <section className="award-section award-partners" id="marcas-parceiras"><div className="award-section-marker"><span className="numeric-text">04</span><p>Parceiros MyWay</p></div><div className="award-partner-intro"><h2>Marcas que escolheram caminhar junto com a MyWay.</h2><p>Organizações e negócios que valorizam desenvolvimento humano, liderança prática e transformação presencial.</p></div><div className="award-partner-carousel" aria-label="Marcas parceiras"><div className="award-partner-strip">{[...partnerBrands, ...partnerBrands].map((brand, index) => <span key={`${brand}-${index}`} aria-hidden={index >= partnerBrands.length}><i className="partner-icon" aria-hidden="true">✦</i><strong>{brand}</strong></span>)}</div></div></section>

      <section className="award-section award-units" id="unidades"><div className="award-section-marker"><span className="numeric-text">06</span><p>Unidades</p></div><div className="award-heading"><p className="eyebrow">Montenegro e Feliz · RS</p><h2>Encontre a unidade mais próxima.</h2></div><div className="award-unit-grid">{units.map((unit) => <article className="award-unit-feature" key={unit.city}><div className="award-map-frame"><iframe title={`Mapa da unidade MyWay ${unit.city}`} src={unit.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="award-unit-copy"><span className="unit-status">Unidade presencial</span><h3>{unit.city}</h3><p>{unit.address}</p><div><a href={unit.routeUrl} target="_blank" rel="noreferrer">Traçar rota</a><a href={unit.phoneHref}>Ligar: {unit.phone}</a><a href={unit.reviewsUrl} target="_blank" rel="noreferrer">Ver avaliações</a></div></div></article>)}</div></section>


      <footer className="award-footer" id="contato"><div className="award-footer-cta"><p className="eyebrow">Seu próximo passo</p><h2>Gostaria de conhecer uma nova forma de liderar e evoluir?</h2><Link className="button institutional-button" href={whatsappUrl} target="_blank">Candidatar-se</Link></div><div className="award-footer-grid"><div><Image className="award-footer-logo" src="/brand/myway-logo-white.png" alt="MyWay" width={220} height={78} /><p>Lidere suas escolhas e sustente sua direção.</p><span>Treinamentos presenciais · RS</span></div><nav aria-label="Navegação do rodapé"><Link href="#inicio">Início</Link><Link href="#sobre">Sobre MyWay</Link><Link href="#treinamentos">Treinamento</Link><Link href="#resultados">Resultados</Link><Link href="#unidades">Unidades</Link><Link href="#redes">Nos siga</Link></nav><address><a href="tel:+5551993490339">(51) 99349-0339</a><a href="https://www.google.com/maps/search/?api=1&query=Rua%20Santos%20Dumont%201610%20Montenegro%20RS" target="_blank" rel="noreferrer">Rua Santos Dumont, 1610 · Montenegro</a><a href="https://www.google.com/search?q=MyWay+Treinamentos+Montenegro+avaliações" target="_blank" rel="noreferrer">Ver avaliações no Google</a></address></div><nav className="footer-social-links" id="redes" aria-label="Redes sociais e contato"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><SocialIcon name="instagram" /><span>Instagram</span></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><SocialIcon name="linkedin" /><span>LinkedIn</span></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><SocialIcon name="whatsapp" /><span>WhatsApp</span></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><SocialIcon name="youtube" /><span>YouTube</span></a><a href="tel:+5551993490339"><SocialIcon name="phone" /><span>Telefone</span></a></nav><p className="award-footer-rights">2026 MyWay Treinamentos. Todos os direitos reservados.</p></footer>
    </main>
  );
}

