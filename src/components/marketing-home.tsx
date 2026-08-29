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
  { title: "Depoimento 05", context: "Aluno MyWay", story: "Novas perspectivas para escolher com mais clareza e conduzir com mais presença.", src: "/media/depoimentos/depoimento-01.mp4#5" },
  { title: "Depoimento 06", context: "Aluno MyWay", story: "O aprendizado que continua nas conversas, nas decisões e no jeito de trabalhar.", src: "/media/depoimentos/depoimento-02.mp4#6" },
  { title: "Depoimento 07", context: "Aluno MyWay", story: "Uma jornada de desenvolvimento feita de prática, troca e transformação real.", src: "/media/depoimentos/depoimento-03.mp4#7" },
];

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

      <section className="award-section award-benefits" id="beneficios">
        <div className="award-section-marker"><span className="numeric-text">02</span><p>Benefícios</p></div>
        <div className="award-heading"><p className="eyebrow">O que nos diferencia</p><h2>Desenvolvimento que continua depois do treinamento.</h2><p className="benefits-lede">Uma experiência que não termina na sala. O aprendizado ganha corpo nas escolhas, nas conversas e na forma de liderar todos os dias.</p></div>
        <div className="myway-impact-line">{benefitStats.map((stat) => <article key={stat.label}><strong className={stat.animated ? "numeric-text" : "impact-word"}>{stat.animated ? <BenefitCounter value={stat.value} /> : stat.value}</strong><span>{stat.label}</span></article>)}</div>
      </section>

      <section className="award-section award-trainings training-experience" id="treinamentos">
        <div className="award-section-marker"><span className="numeric-text">03</span><p>Treinamento</p></div>
        <div className="training-experience-intro">
          <p className="eyebrow">Mentalidade</p>
          <h2>TREINAMENTO PERFORMA</h2>
          <div className="training-experience-description training-experience-long-description">
            <p>O seu <strong>jeito de pensar</strong> define o seu jeito de liderar. Antes de liderar pessoas, neg&oacute;cios ou resultados, existe uma <strong>lideran&ccedil;a ainda mais importante: a de si mesmo.</strong> A forma como voc&ecirc; pensa influencia suas escolhas, suas escolhas moldam seus comportamentos e seus comportamentos constroem os <strong>resultados que voc&ecirc; alcan&ccedil;a.</strong> &Eacute; por isso que toda transforma&ccedil;&atilde;o consistente come&ccedil;a de dentro para fora.</p>
            <p>O PERFORMA &eacute; uma jornada de desenvolvimento de habilidades mentais e comportamentais para empres&aacute;rios, l&iacute;deres e profissionais que desejam ampliar sua forma de pensar, decidir, se relacionar e liderar. Mais do que ensinar t&eacute;cnicas ou f&oacute;rmulas prontas, desenvolvemos <strong>consci&ecirc;ncia, mentalidade e recursos</strong> para fazer melhores escolhas, conduzir pessoas, potencializar resultados e construir o pr&oacute;prio caminho.</p>
            <p>Acreditamos que cada pessoa possui uma hist&oacute;ria, uma identidade e um jeito &uacute;nico de enxergar o mundo. <strong>Evoluir n&atilde;o significa deixar de ser quem voc&ecirc; &eacute;, mas expandir quem voc&ecirc; pode se tornar.</strong> &Eacute; reconhecer seus padr&otilde;es, elevar sua mentalidade e assumir o protagonismo das suas escolhas para desenvolver, cada vez mais, <strong>o melhor do seu jeito.</strong></p>
          </div>
        </div>
        <div className="training-experience-copy">
          <div>
            <p className="training-label">PERFORMA / TREINAMENTO DE LIDERAN&Ccedil;A</p>
            <h3>MyWay.<br />meu jeito.<br />lidere suas escolhas.</h3>
          </div>
          <div className="training-experience-body">
            <p className="training-modules-intro">Uma imers&atilde;o em desenvolvimento humano, lideran&ccedil;a e comportamento, organizada em 14 encontros para transformar conhecimento em pr&aacute;tica.</p>
            <div className="training-modules" aria-label="M&oacute;dulos do treinamento Performa">
              {performaModules.map((module, index) => (
                <article key={module.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{module.title}</strong></article>
              ))}
            </div>
            <div className="training-experience-meta" aria-label="Informações do treinamento Performa">
              <div><strong>70</strong><span>horas de imersão</span></div>
              <div><strong>14</strong><span>sessões presenciais</span></div>
              <div><strong>03</strong><span>meses de jornada</span></div>
            </div>
          </div>
        </div>
        <p className="training-experience-closing">N&atilde;o queremos ensinar voc&ecirc; a seguir um caminho.<br /><strong>Queremos desenvolver voc&ecirc; para construir o seu.</strong></p>
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
      <section className="award-section award-partners" id="marcas-parceiras"><div className="award-section-marker"><span className="numeric-text">04</span><p>Parceiros MyWay</p></div><div className="award-partner-intro"><h2>Marcas que escolheram caminhar junto com a MyWay.</h2><p>Organizações e negócios que valorizam desenvolvimento humano, liderança prática e transformação presencial.</p></div><div className="award-partner-carousel" aria-label="Marcas parceiras"><div className="award-partner-strip">{[...partnerBrands, ...partnerBrands].map((brand, index) => <span key={`${brand}-${index}`} aria-hidden={index >= partnerBrands.length}><i className="partner-icon" aria-hidden="true">✦</i><strong>{brand}</strong></span>)}</div></div></section>

      <section className="award-section award-testimonials" id="resultados"><CinematicTestimonials testimonials={videoTestimonials} /></section>

      <section className="award-section award-units" id="unidades"><div className="award-section-marker"><span className="numeric-text">06</span><p>Unidades</p></div><div className="award-heading"><p className="eyebrow">Montenegro e Feliz · RS</p><h2>Encontre a unidade mais próxima.</h2></div><div className="award-unit-grid">{units.map((unit) => <article className="award-unit-feature" key={unit.city}><div className="award-map-frame"><iframe title={`Mapa da unidade MyWay ${unit.city}`} src={unit.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="award-unit-copy"><span className="unit-status">Unidade presencial</span><h3>{unit.city}</h3><p>{unit.address}</p><div><a href={unit.routeUrl} target="_blank" rel="noreferrer">Traçar rota</a><a href={unit.phoneHref}>Ligar: {unit.phone}</a><a href={unit.reviewsUrl} target="_blank" rel="noreferrer">Ver avaliações</a></div></div></article>)}</div></section>

      <section className="award-section award-social" id="redes"><div className="award-section-marker"><span className="numeric-text">07</span><p>Nos siga</p></div><div className="award-social-intro"><div><p className="eyebrow">MyWay nas redes</p><h2>Continue a conversa depois da experiência.</h2></div><p className="award-social-description">Acompanhe ideias, bastidores e novas experiências da MyWay. A transformação também continua quando o encontro termina.</p></div><div className="award-social-grid"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><span>Instagram</span><i aria-hidden="true">+</i></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><span>LinkedIn</span><i aria-hidden="true">+</i></a><a href={whatsappUrl} target="_blank" rel="noreferrer"><span>WhatsApp</span><i aria-hidden="true">+</i></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><span>YouTube</span><i aria-hidden="true">+</i></a><a href="tel:+5551993490339"><span>Telefone</span><i aria-hidden="true">+</i></a></div></section>

      <footer className="award-footer" id="contato"><div className="award-footer-cta"><p className="eyebrow">Seu próximo passo</p><h2>Gostaria de conhecer uma nova forma de liderar e evoluir?</h2><Link className="button institutional-button" href={whatsappUrl} target="_blank">Candidatar-se</Link></div><div className="award-footer-grid"><div><strong>MyWay</strong><p>Lidere suas escolhas e sustente sua direção.</p><span>Treinamentos presenciais · RS</span></div><nav aria-label="Navegação do rodapé"><Link href="#inicio">Início</Link><Link href="#sobre">Sobre MyWay</Link><Link href="#treinamentos">Treinamento</Link><Link href="#resultados">Resultados</Link><Link href="#unidades">Unidades</Link><Link href="#redes">Nos siga</Link></nav><address><a href="tel:+5551993490339">(51) 99349-0339</a><a href="https://www.google.com/maps/search/?api=1&query=Rua%20Santos%20Dumont%201610%20Montenegro%20RS" target="_blank" rel="noreferrer">Rua Santos Dumont, 1610 · Montenegro</a><a href="https://www.google.com/search?q=MyWay+Treinamentos+Montenegro+avaliações" target="_blank" rel="noreferrer">Ver avaliações no Google</a></address></div><p className="award-footer-rights">2026 MyWay Treinamentos. Todos os direitos reservados.</p></footer>
    </main>
  );
}
