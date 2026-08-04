import Link from "next/link";
import { BenefitCounter } from "@/components/benefit-counter";
import { CinematicTestimonials } from "@/components/cinematic-testimonials";
import { HeroIntro } from "@/components/hero-intro";
import { InstitutionalAboutExperience } from "@/components/institutional-about-experience";
import { HorizontalPhotoRail } from "@/components/horizontal-photo-rail";

type Unit = { city: string; address: string; phone: string; phoneHref: string; mapUrl: string; routeUrl: string; embedUrl: string; reviewsUrl: string };

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
  { title: "Depoimento 01", context: "Aluno MyWay", story: "A virada começa quando a teoria encontra uma conversa honesta, presencial e impossível de ignorar.", src: "/media/depoimentos/depoimento-01.mp4" },
  { title: "Depoimento 02", context: "Aluno MyWay", story: "Clareza, decisão e mudança de postura quando liderança deixa de ser cargo e vira prática.", src: "/media/depoimentos/depoimento-02.mp4" },
  { title: "Depoimento 03", context: "Aluno MyWay", story: "Quando o desenvolvimento passa a aparecer na rotina, nas conversas e nas escolhas.", src: "/media/depoimentos/depoimento-03.mp4" },
  { title: "Depoimento 04", context: "Aluno MyWay", story: "Uma experiência presencial que atravessa liderança, vida, relações e a forma de construir o próprio caminho.", src: "/media/depoimentos/depoimento-04.mp4" },
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

      <InstitutionalAboutExperience blocks={aboutBlocks} />

      <section className="award-section award-benefits" id="beneficios">
        <div className="award-section-marker"><span className="numeric-text">02</span><p>Benefícios</p></div>
        <div className="award-heading"><p className="eyebrow">O que nos diferencia</p><h2>Desenvolvimento que continua depois do treinamento.</h2></div>
        <div className="myway-impact-line">{benefitStats.map((stat) => <article key={stat.label}><strong className={stat.animated ? "numeric-text" : "impact-word"}>{stat.animated ? <BenefitCounter value={stat.value} /> : stat.value}</strong><span>{stat.label}</span></article>)}</div>
      </section>

      <section className="award-section award-trainings training-experience" id="treinamentos">
        <div className="award-section-marker"><span className="numeric-text">03</span><p>Treinamento</p></div>
        <div className="training-experience-intro">
          <p className="eyebrow">Jornada Performa</p>
          <h2>Formacao para liderar pessoas e compreender comportamentos.</h2>
        </div>
        <p className="training-experience-statement">Grandes equipes nao surgem por acaso. Elas sao construidas por lideres que escolhem evoluir continuamente.</p>
        <div className="training-experience-copy">
          <div>
            <p className="training-label">PERFORMA / TREINAMENTO DE LIDERANCA</p>
            <h3>A lideranca nunca comeca pelos outros.</h3>
          </div>
          <div className="training-experience-body">
            <p>Ela comeca pelas escolhas que fazemos todos os dias. Antes de influenciar equipes, gerar resultados ou transformar organizacoes, e preciso desenvolver clareza, responsabilidade e a capacidade de liderar a si mesmo.</p>
            <p>O Performa foi criado para formar lideres capazes de inspirar pessoas, fortalecer relacionamentos e construir ambientes de alta performance. Mais do que ensinar tecnicas de gestao, o treinamento promove uma mudanca de postura e desperta competencias que geram resultados consistentes dentro e fora das empresas.</p>
            <p>Ao longo desta experiencia, voce sera desafiado a ampliar sua visao, desenvolver inteligencia emocional, aperfeicoar sua comunicacao e fortalecer habilidades essenciais para conduzir pessoas com confianca, proposito e equilibrio.</p>
            <div className="training-experience-meta"><strong>70 horas de imersao presencial</strong><span>1 encontro semanal / 14 sessoes / 3 meses</span></div>
          </div>
        </div>
        <HorizontalPhotoRail>
          <figure><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85" alt="Equipe reunida em uma conversa de trabalho" /><figcaption>Clareza para escolher</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85" alt="Pessoas colaborando em uma mesa" /><figcaption>Experiencia que aproxima</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85" alt="Grupo participando de uma atividade" /><figcaption>Lideranca que se pratica</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85" alt="Equipe em reuniao de planejamento" /><figcaption>Decisoes compartilhadas</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85" alt="Pessoas construindo uma ideia juntas" /><figcaption>Visao que se amplia</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85" alt="Grupo de pessoas reunido ao ar livre" /><figcaption>Conexoes que permanecem</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85" alt="Equipe em uma sessao de desenvolvimento" /><figcaption>O proximo passo</figcaption></figure>
        </HorizontalPhotoRail>
        <p className="training-photo-note">Imagens ilustrativas / substituiremos pelas fotos reais do Performa</p>
      </section>
      <section className="award-section award-partners" id="marcas-parceiras"><div className="award-section-marker"><span className="numeric-text">04</span><p>Parceiros MyWay</p></div><div className="award-partner-intro"><p className="eyebrow">Nossos parceiros</p><h2>Marcas que escolheram caminhar junto com a MyWay.</h2><p>Organizações e negócios que valorizam desenvolvimento humano, liderança prática e transformação presencial.</p></div><div className="award-partner-carousel" aria-label="Marcas parceiras"><div className="award-partner-strip">{[...partnerBrands, ...partnerBrands].map((brand, index) => <span key={`${brand}-${index}`} aria-hidden={index >= partnerBrands.length}><i className="partner-icon" aria-hidden="true">✦</i><strong>{brand}</strong></span>)}</div></div></section>

      <section className="award-section award-testimonials" id="resultados"><CinematicTestimonials testimonials={videoTestimonials} /></section>

      <section className="award-section award-units" id="unidades"><div className="award-section-marker"><span className="numeric-text">06</span><p>Unidades</p></div><div className="award-heading"><p className="eyebrow">Montenegro e Feliz · RS</p><h2>Encontre a unidade mais próxima.</h2></div><div className="award-unit-grid">{units.map((unit) => <article className="award-unit-feature" key={unit.city}><div className="award-map-frame"><iframe title={`Mapa da unidade MyWay ${unit.city}`} src={unit.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="award-unit-copy"><span className="unit-status">Unidade presencial</span><h3>{unit.city}</h3><p>{unit.address}</p><div><a href={unit.routeUrl} target="_blank" rel="noreferrer">Traçar rota</a><a href={unit.phoneHref}>Ligar: {unit.phone}</a><a href={unit.reviewsUrl} target="_blank" rel="noreferrer">Ver avaliações</a></div></div></article>)}</div></section>

      <section className="award-section award-social" id="redes"><div className="award-section-marker"><span className="numeric-text">07</span><p>Nos siga</p></div><div className="award-social-intro"><div><p className="eyebrow">MyWay nas redes</p><h2>Continue a conversa depois da experiência.</h2></div><p className="award-social-description">Acompanhe ideias, bastidores e novas experiências da MyWay. A transformação também continua quando o encontro termina.</p></div><div className="award-social-grid"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><span>Instagram</span><i aria-hidden="true">↗</i></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><span>LinkedIn</span><i aria-hidden="true">↗</i></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><span>WhatsApp</span><i aria-hidden="true">↗</i></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><span>YouTube</span><i aria-hidden="true">↗</i></a><a href="tel:+5551993490339"><span>Telefone</span><i aria-hidden="true">↗</i></a></div></section>

      <footer className="award-footer" id="contato"><div className="award-footer-cta"><p className="eyebrow">Contato</p><h2>Vamos conversar sobre a próxima transformação da sua equipe?</h2><Link className="button institutional-button" href={whatsappUrl} target="_blank">Falar com a MyWay</Link></div><div className="award-footer-grid"><div><strong>MyWay</strong><p>Lidere suas escolhas e sustente sua direção.</p><span>Treinamentos presenciais · RS</span></div><nav aria-label="Navegação do rodapé"><Link href="#inicio">Início</Link><Link href="#sobre">Sobre MyWay</Link><Link href="#treinamentos">Treinamento</Link><Link href="#resultados">Resultados</Link><Link href="#unidades">Unidades</Link><Link href="#redes">Nos siga</Link></nav><address><a href="tel:+5551993490339">(51) 99349-0339</a><a href="https://www.google.com/maps/search/?api=1&query=Rua%20Santos%20Dumont%201610%20Montenegro%20RS" target="_blank" rel="noreferrer">Rua Santos Dumont, 1610 · Montenegro</a><a href="https://www.google.com/search?q=MyWay+Treinamentos+Montenegro+avaliações" target="_blank" rel="noreferrer">Ver avaliações no Google</a></address></div><p className="award-footer-rights">2026 MyWay Treinamentos. Todos os direitos reservados.</p></footer>
    </main>
  );
}
