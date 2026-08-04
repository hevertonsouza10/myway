"use client";

import { useEffect, useRef, useState } from "react";

type AboutBlock = { title: string; text: string };

type InstitutionalAboutExperienceProps = {
  blocks: AboutBlock[];
};

const statements = [
  "A transformação começa por você.",
  "Conhecimento só importa quando muda a forma de agir.",
];

export function InstitutionalAboutExperience({ blocks }: InstitutionalAboutExperienceProps) {
  const filmRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [statement, setStatement] = useState(-1);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const updateProgress = () => {
      const film = filmRef.current;
      if (!film) return;

      const rect = film.getBoundingClientRect();
      const scrollRange = Math.max(film.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
      const nextStatement = progress < 0.28 ? -1 : progress < 0.58 ? 0 : progress < 0.82 ? 1 : 2;
      setStatement(nextStatement);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) await video.play();
  };

  return (
    <section className="institutional-about-experience" id="sobre">
      <div className="institutional-film" ref={filmRef}>
        <div className="institutional-film-stage">
          <video
            ref={videoRef}
            className="institutional-film-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src="/media/institucional/sobre-myway.mp4"
            aria-label="Vídeo institucional da MyWay"
          />
          <div className="institutional-film-shade" aria-hidden="true" />
          <div className="institutional-film-meta">
            <span>01 / Sobre a MyWay</span>
            <span>Experiência institucional</span>
          </div>
          <div className="institutional-statements" aria-live="polite">
            {statements.map((copy, index) => (
              <p className={statement === index ? "is-visible" : ""} key={copy}>
                {copy}
              </p>
            ))}
          </div>
          <button
            className={`institutional-sound ${isMuted ? "is-muted" : ""}`}
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Ativar som do vídeo institucional" : "Desativar som do vídeo institucional"}
            aria-pressed={!isMuted}
          >
            <span className="institutional-sound-icon" aria-hidden="true">{isMuted ? "×" : "•••"}</span>
            <span>{isMuted ? "Ativar som" : "Som ativado"}</span>
          </button>
          <div className="institutional-film-hint" aria-hidden="true">
            <span>Continue rolando</span>
            <i>↓</i>
          </div>
        </div>
      </div>

      <div className="institutional-about-content">
        <div className="institutional-about-intro">
          <p className="eyebrow">Muito mais do que um treinamento</p>
          <h2>Uma escola de transformação real.</h2>
          <div>
            <p>A MyWay é uma escola de desenvolvimento para empresários, líderes e profissionais que desejam evoluir com profundidade, método e propósito.</p>
            <p>Nossas experiências presenciais unem liderança, comportamento e desenvolvimento humano para fortalecer quem toma decisões, conduz equipes e constrói resultados consistentes.</p>
          </div>
        </div>
        <div className="institutional-about-details">
          {blocks.map((block, index) => (
            <article key={block.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
        <div className="institutional-about-blue-card">
          <div>
            <p className="eyebrow">Uma escola para evoluir</p>
            <h3>Por que escolher<br />a nossa escola?</h3>
          </div>
          <p>Um ambiente onde empresários, líderes e profissionais evoluem juntos, compartilham experiências e constroem escolhas capazes de transformar negócios e vidas.</p>
        </div>
      </div>
    </section>
  );
}
