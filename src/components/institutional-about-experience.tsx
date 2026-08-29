"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AUDIO_FOCUS_EVENT, requestAudioFocus } from "@/lib/audio-focus";

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
  const audioId = useId();

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

  useEffect(() => {
    const handleAudioFocus = (event: Event) => {
      const source = (event as CustomEvent<string>).detail;
      if (source === audioId || !videoRef.current) return;
      videoRef.current.muted = true;
      setIsMuted(true);
    };

    window.addEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);
    return () => window.removeEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);
  }, [audioId]);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      requestAudioFocus(audioId);
      await video.play();
    }
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
            className="institutional-sound"
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Ativar som do vídeo institucional" : "Desativar som do vídeo institucional"}
            aria-pressed={!isMuted}
          >
            <span className={`sound-bars ${isMuted ? "is-muted" : ""}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>{isMuted ? "Som off" : "Som on"}</span>
          </button>
          <div className="institutional-film-hint" aria-hidden="true">
            <span>Continue rolando</span>
            <i>+</i>
          </div>
        </div>
      </div>

      <div className="institutional-about-content">
        <div className="institutional-about-intro">
          <p className="eyebrow">Nosso prop&oacute;sito</p>
          <h2 className="institutional-about-title">Uma experi&ecirc;ncia de transforma&ccedil;&atilde;o real</h2>
          <div className="institutional-about-copy">
            <p>A MyWay &ndash; Lidere Suas Escolhas &eacute; uma escola de desenvolvimento de habilidades mentais para empres&aacute;rios, l&iacute;deres e profissionais que buscam evoluir com consci&ecirc;ncia, m&eacute;todo e prop&oacute;sito.</p>
            <p>Por meio de experi&ecirc;ncias presenciais, integramos lideran&ccedil;a, comportamento e desenvolvimento humano para ampliar a capacidade de pensar, decidir e agir com mais clareza e consist&ecirc;ncia.</p>
            <p>Desenvolvemos pessoas que est&atilde;o &agrave; frente de decis&otilde;es, equipes e neg&oacute;cios, fortalecendo compet&ecirc;ncias essenciais para liderar melhor, enfrentar desafios e construir resultados sustent&aacute;veis &mdash; na vida e no trabalho.</p>
            <p>Porque grandes resultados come&ccedil;am pela forma como voc&ecirc; pensa, escolhe e lidera.</p>
          </div>
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
            <p className="eyebrow">Uma experiência para evoluir</p>
            <h3>Por que escolher<br />a MyWay?</h3>
          </div>
          <p>Um ambiente onde empresários, líderes e profissionais evoluem juntos, compartilham experiências e constroem escolhas capazes de transformar negócios e vidas.</p>
        </div>
      </div>
    </section>
  );
}
