"use client";

import { useEffect, useRef, useState } from "react";

const journeySteps = [
  {
    number: "01",
    eyebrow: "Imersão presencial",
    title: "Presença que gera conexão.",
    description:
      "Você não recebe um manual para enfrentar tudo sozinho. Cada encontro é vivo, humano e construído para transformar consciência em movimento real.",
  },
  {
    number: "02",
    eyebrow: "Acompanhamento",
    title: "Ninguém solta a sua mão no caminho.",
    description:
      "A MyWay acompanha cada passo da sua evolução. A mudança ganha estrutura, direção e continuidade para existir muito depois do encontro.",
  },
  {
    number: "03",
    eyebrow: "Comunidade",
    title: "Uma mesa para quem carrega o mesmo peso.",
    description:
      "Você se senta ao lado de empresários e líderes que enfrentam batalhas parecidas, compartilham aprendizados e buscam a mesma liberdade.",
  },
  {
    number: "04",
    eyebrow: "O verdadeiro destino",
    title: "Devolver tempo para o que realmente importa.",
    description:
      "O propósito é simples e profundo: devolver a você o tempo para realizar seus sonhos e viver com presença ao lado de quem realmente importa.",
  },
] as const;

const seats = ["a", "b", "c", "d", "e", "f"] as const;

export function GuidedChange() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let previousStep = 0;

    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / distance));
      const nextStep = Math.min(
        journeySteps.length - 1,
        Math.floor(progress * journeySteps.length),
      );

      section.style.setProperty("--journey-progress", progress.toString());
      if (nextStep !== previousStep) {
        previousStep = nextStep;
        setActiveStep(nextStep);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`guided-change guided-step-${activeStep + 1}`}
      aria-labelledby="guided-change-title"
    >
      <div className="guided-change-sticky">
        <div className="guided-ambient" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <header className="guided-heading">
          <p className="eyebrow">Mais que um treinamento</p>
          <h2 id="guided-change-title">
            Uma mudança de rota. <strong>Guiada.</strong>
          </h2>
          <p>
            Humana o suficiente para gerar conexão. Estruturada o suficiente
            para sustentar a sua mudança.
          </p>
        </header>

        <div className="guided-story" aria-live="polite">
          {journeySteps.map((step, index) => (
            <article
              className={index === activeStep ? "is-active" : ""}
              aria-hidden={index !== activeStep}
              key={step.number}
            >
              <span className="guided-number numeric-text">{step.number}</span>
              <p>{step.eyebrow}</p>
              <h3>{step.title}</h3>
              <div className="guided-story-rule" aria-hidden="true" />
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="guided-mobile-journey">
          {journeySteps.map((step) => (
            <article key={step.number}>
              <header>
                <span className="numeric-text">{step.number}</span>
                <p>{step.eyebrow}</p>
              </header>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="guided-mobile-symbol" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </article>
          ))}
        </div>

        <div className="guided-visual" aria-hidden="true">
          <div className="guided-orbit">
            <i />
          </div>
          <div className="guided-table">
            <div className="guided-mark" />
          </div>
          <div className="guided-seats">
            {seats.map((seat) => (
              <span key={seat} />
            ))}
          </div>
          <div className="guided-outcome">
            <strong>tempo</strong>
            <span>para o que importa</span>
          </div>
        </div>

        <nav className="guided-progress" aria-label="Etapas da mudança guiada">
          {journeySteps.map((step, index) => (
            <span className={index <= activeStep ? "is-past" : ""} key={step.number}>
              <i />
              {step.number}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
