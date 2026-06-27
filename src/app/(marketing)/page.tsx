import Link from "next/link";
import { BenefitCounter } from "@/components/benefit-counter";
import { CinematicTestimonials } from "@/components/cinematic-testimonials";
import { HeroIntro } from "@/components/hero-intro";

const aboutBlocks = [
  {
    title: "Por que a MyWay nasceu?",
    text: "A MyWay nasceu ao enxergar uma dor silenciosa no mercado: profissionais excelentes, mas sobrecarregados, apagando incendios e com pouco espaco para liderar pessoas com presenca. Criamos uma escola para devolver clareza, direcao e tempo a quem precisa crescer sem perder o humano no caminho.",
  },
  {
    title: "Uma metodologia viva",
    text: "A experiencia e pratica, presencial e imersiva. Cada encontro combina conversas profundas, exercicios de comunicacao, accountability, historias de vida e dinamicas que criam repertorio real para decisoes, relacoes e lideranca.",
  },
  {
    title: "Aplicacao imediata",
    text: "Cada tecnica nasce para sair da sala e entrar na rotina. O aluno testa, ajusta e aplica no mundo real ainda na mesma semana, transformando aprendizado em postura, conversa e execucao.",
  },
  {
    title: "Networking de alto nivel",
    text: "O ambiente da MyWay foi pensado para criar olho no olho, confianca e troca entre pessoas que vivem desafios parecidos. As conexoes continuam depois do encontro e ampliam o valor da jornada.",
  },
];

const benefitStats = [
  ["+100", "ALUNOS FORMADOS"],
  ["+50", "EMPRESAS PARCEIRAS"],
  ["8", "PROGRAMAS PRESENCIAIS"],
  ["+10", "ANOS DE EXPERIENCIA"],
];

const trainings = [
  {
    code: "PERFORMA",
    title: "Treinamento de lideranca",
    description:
      "Formacao presencial para empresarios, lideres e profissionais que precisam decidir com clareza, comunicar com firmeza e liderar pessoas com mais consciencia.",
    href: "/lideranca",
    meta: "Lideranca - Gestao de pessoas - Execucao",
  },
  {
    code: "ESSENCE",
    title: "Imersao Eneagrama",
    description:
      "Uma imersao em desenvolvimento humano para ampliar autoconhecimento, leitura de comportamento e qualidade das relacoes pessoais e profissionais.",
    href: "/treinamentos/inteligencia-emocional",
    meta: "Eneagrama - Autoconhecimento - Relacoes",
  },
];

const partnerBrands = [
  "Mombach",
  "Quiero Cafe",
  "VSL",
  "Grupo Vertice",
  "Norte Hub",
  "Essenza",
  "Farol Negocios",
  "Premium RS",
];

const videoTestimonials = [
  {
    title: "Depoimento 01",
    context: "Aluno MyWay",
    story: "A virada comeca quando a teoria encontra uma conversa honesta, presencial e impossivel de ignorar.",
    src: "/media/depoimentos/depoimento-01.mp4",
  },
  {
    title: "Depoimento 02",
    context: "Aluno MyWay",
    story: "Um relato sobre clareza, decisao e mudanca de postura quando lideranca deixa de ser cargo e vira pratica.",
    src: "/media/depoimentos/depoimento-02.mp4",
  },
  {
    title: "Depoimento 03",
    context: "Aluno MyWay",
    story: "Quando o desenvolvimento deixa de ser conteudo e passa a aparecer na rotina, nas conversas e nas escolhas.",
    src: "/media/depoimentos/depoimento-03.mp4",
  },
  {
    title: "Depoimento 04",
    context: "Aluno MyWay",
    story: "Uma experiencia presencial que atravessa lideranca, vida, relacoes e a forma de construir o proprio caminho.",
    src: "/media/depoimentos/depoimento-04.mp4",
  },
];

const montenegroAddress =
  "R. Santos Dumont, 1610 - 04 - Centro, Montenegro - RS, 95780-000";
const montenegroQuery = encodeURIComponent(montenegroAddress);
const montenegroMapUrl = `https://www.google.com/maps/search/?api=1&query=${montenegroQuery}`;
const montenegroRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${montenegroQuery}`;
const montenegroEmbedUrl = `https://www.google.com/maps?q=${montenegroQuery}&output=embed`;
const montenegroReviewsUrl =
  "https://www.google.com/search?q=myway+treinamentos+montenegro+avalia%C3%A7%C3%B5es";
const whatsappUrl = "https://wa.me/5551993490339";

export default function HomePage() {
  return (
    <main className="institutional-home award-home">
      <HeroIntro variant="institutional" />

      <div className="award-scroll-rail" aria-hidden="true">
        <span>MyWay</span>
        <i />
        <span>Institucional</span>
      </div>

      <section className="award-section award-about" id="sobre">
        <div className="award-section-marker">
          <span className="numeric-text">01</span>
          <p>Sobre MyWay</p>
        </div>

        <div className="award-about-media">
          <div className="institutional-video-placeholder has-video">
            <video
              className="institutional-about-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              src="/media/institucional/sobre-myway.mp4"
            />
            <span>Video institucional</span>
          </div>
          <p>A transformacao da sua empresa e da sua vida comeca por voce.</p>
        </div>

        <div className="award-about-copy">
          <p className="eyebrow">Muito mais do que treinamentos</p>
          <h2>Uma escola de transformacao real.</h2>
          <p>
            A MyWay e uma escola de treinamentos presenciais para empresarios,
            lideres e profissionais que querem evoluir com profundidade, metodo
            e presenca. Hoje, nossas formacoes unem lideranca, comportamento e
            desenvolvimento humano em experiencias que movimentam decisoes.
          </p>
          <p>
            O objetivo e simples e exigente: ajudar voce a recuperar clareza,
            fortalecer relacoes e usar melhor o seu ativo mais valioso, o tempo.
          </p>
        </div>

        <div className="award-about-details">
          {aboutBlocks.map((block) => (
            <article key={block.title}>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </article>
          ))}
          <article className="about-choice">
            <h3>Por que escolher a nossa escola?</h3>
            <p>
              Escolher a MyWay e escolher uma mudanca continua de mentalidade e
              atitude. Para quem quer liderar melhor, inspirar pessoas e viver
              com mais proposito, a nossa escola e o lugar da proxima virada.
            </p>
          </article>
        </div>
      </section>

      <section className="award-section award-benefits" id="beneficios">
        <div className="award-section-marker">
          <span className="numeric-text">02</span>
          <p>Beneficios</p>
        </div>
        <div className="award-heading">
          <p className="eyebrow">Numeros que apontam movimento</p>
          <h2>Resultados que comecam na sala e continuam na vida.</h2>
        </div>
        <div className="myway-impact-line">
          {benefitStats.map(([value, label]) => (
            <article key={label}>
              <strong className="numeric-text"><BenefitCounter value={value} /></strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="award-section award-trainings" id="treinamentos">
        <div className="award-section-marker">
          <span className="numeric-text">03</span>
          <p>Treinamentos</p>
        </div>
        <div className="award-heading">
          <p className="eyebrow">Jornadas MyWay</p>
          <h2>Formacoes para liderar pessoas e compreender comportamentos.</h2>
        </div>
        <div className="award-training-stage">
          {trainings.map((training) => (
            <article key={training.href}>
              <span>{training.code}</span>
              <h3>{training.title}</h3>
              <p>{training.description}</p>
              <div>
                <small>{training.meta}</small>
                <Link href={training.href}>Conhecer</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="award-section award-partners" id="marcas-parceiras">
        <div className="award-section-marker">
          <span className="numeric-text">04</span>
          <p>Marcas parceiras</p>
        </div>
        <div className="award-partner-intro">
          <p className="eyebrow">Nossos parceiros</p>
          <h2>Conheca algumas marcas que caminham com a MyWay.</h2>
          <p>
            Organizacoes e negocios que valorizam desenvolvimento humano,
            lideranca pratica e transformacao presencial.
          </p>
        </div>
        <div className="award-partner-carousel" aria-label="Marcas parceiras">
          <div className="award-partner-strip">
            {[...partnerBrands, ...partnerBrands].map((brand, index) => (
              <span key={`${brand}-${index}`} aria-hidden={index >= partnerBrands.length}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="award-section award-testimonials" id="depoimentos">
        <div className="award-section-marker">
          <span className="numeric-text">05</span>
          <p>Depoimentos</p>
        </div>
        <div className="award-heading">
          <p className="eyebrow">Alunos em video</p>
          <h2>Vozes que carregam a transformacao.</h2>
          <p>
            Uma galeria de relatos com presenca, ritmo e movimento para mostrar
            o que muda quando a experiencia atravessa a rotina.
          </p>
        </div>
        <CinematicTestimonials testimonials={videoTestimonials} />
      </section>

      <section className="award-section award-units" id="unidades">
        <div className="award-section-marker">
          <span className="numeric-text">06</span>
          <p>Unidade</p>
        </div>
        <div className="award-heading">
          <p className="eyebrow">Montenegro</p>
          <h2>Nossa unidade presencial em Montenegro.</h2>
        </div>
        <div className="award-unit-feature">
          <article>
            <div className="award-map-frame">
              <iframe
                title="Mapa da unidade MyWay Montenegro"
                src={montenegroEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="award-unit-copy">
              <span className="unit-status">Unidade presencial</span>
              <h3>Montenegro</h3>
              <p>{montenegroAddress}</p>
              <div>
                <a href={montenegroRouteUrl} target="_blank" rel="noreferrer">
                  Tracar rota
                </a>
                <a href="tel:+5551993490339">Ligar agora</a>
                <a href={montenegroReviewsUrl} target="_blank" rel="noreferrer">
                  Ver avaliacoes
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer className="award-footer" id="contato">
        <div className="award-footer-cta">
          <p className="eyebrow">Contato</p>
          <h2>Vamos conversar sobre a proxima transformacao da sua equipe?</h2>
          <Link className="button institutional-button" href={whatsappUrl} target="_blank">
            Falar com a MyWay
          </Link>
        </div>
        <div className="award-footer-grid">
          <div>
            <strong>MyWay</strong>
            <p>Lidere suas escolhas e sustente sua direcao.</p>
            <span>CNPJ a inserir</span>
          </div>
          <nav aria-label="Navegacao do rodape">
            <Link href="#sobre">Sobre MyWay</Link>
            <Link href="#beneficios">Beneficios</Link>
            <Link href="#treinamentos">Treinamentos</Link>
            <Link href="#depoimentos">Depoimentos</Link>
            <Link href="#unidades">Unidade</Link>
          </nav>
          <address>
            <a href="tel:+5551993490339">(51) 99349-0339</a>
            <a href={montenegroMapUrl} target="_blank" rel="noreferrer">
              R. Santos Dumont, 1610 - Montenegro
            </a>
            <a href={montenegroReviewsUrl} target="_blank" rel="noreferrer">
              Ver avaliacoes no Google
            </a>
          </address>
        </div>
        <p className="award-footer-rights">
          2026 MyWay Treinamentos. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
