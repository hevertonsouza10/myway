import { HeroIntro } from "@/components/hero-intro";
import { DecisionClock } from "@/components/decision-clock";
import { PainAwareness } from "@/components/pain-awareness";
import { GuidedChange } from "@/components/guided-change";
import { TrainingArchitecture } from "@/components/training-architecture";
import { TrainingFilm } from "@/components/training-film";
import { SiteFooter } from "@/components/site-footer";
import { TrainingGrid } from "@/components/training-grid";

const methodSteps = [
  ["01", "Perceber", "Reconhecer padrões e enxergar as escolhas atuais."],
  ["02", "Escolher", "Definir uma direção consciente e possível."],
  ["03", "Agir", "Transformar intenção em comportamento consistente."],
];

export function LeadershipLanding() {
  return (
    <>
      <main>
        <HeroIntro />

        <DecisionClock />
        <PainAwareness />
        <GuidedChange />
        <TrainingArchitecture />
        <TrainingFilm />

        <section className="trainings section-pad" id="treinamentos">
          <div className="section-heading">
            <p className="eyebrow">Experiências MyWay</p>
            <h2>Treinamentos que atravessam a teoria.</h2>
            <p>
              Dois caminhos de desenvolvimento, construídos para gerar mudança
              real no cotidiano.
            </p>
          </div>
          <TrainingGrid />
        </section>

        <section className="method section-pad" id="metodo">
          <div className="section-heading">
            <p className="eyebrow">O método por dentro</p>
            <h2>Uma mudança que continua depois do encontro.</h2>
          </div>
          <div className="method-list">
            {methodSteps.map(([number, title, description]) => (
              <article key={number}>
                <span className="numeric-text">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="impact section-pad">
          <p className="eyebrow">Transformação</p>
          <blockquote>
            “Não entregamos respostas prontas. Criamos espaço para escolhas
            mais conscientes.”
          </blockquote>
          <div className="impact-metrics">
            <p>
              <strong>Presença</strong>
              Para enxergar o que antes passava despercebido.
            </p>
            <p>
              <strong>Coragem</strong>
              Para fazer escolhas difíceis com intenção.
            </p>
            <p>
              <strong>Movimento</strong>
              Para transformar consciência em prática.
            </p>
          </div>
        </section>

        <section className="about section-pad" id="sobre">
          <div className="about-mark" aria-hidden="true">
            mw
          </div>
          <div>
            <p className="eyebrow">Sobre a MyWay</p>
            <h2>Todo caminho começa com uma escolha.</h2>
            <p>
              A MyWay nasceu para criar experiências de desenvolvimento humano
              que ajudam pessoas a assumir a direção de suas decisões, relações
              e resultados.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
