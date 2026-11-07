"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ctaHref, hero } from "./content";
import s from "./performa-lp.module.css";

export function PerformaHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  // Respeita "reduzir movimento": o vídeo fica parado no poster.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const video = videoRef.current;
      if (video) {
        video.autoplay = false;
        video.pause();
      }
    }
  }, []);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  return (
    <section className={s.hero} id="top" aria-labelledby="performa-title">
      <div className={s.heroCopy}>
        <p className={s.kicker}>{hero.kicker}</p>
        <h1 id="performa-title" className={s.heroTitle}>
          {hero.titleLines.map((line, index) => (
            <span className={s.line} key={line}>
              <span style={{ "--line": index } as React.CSSProperties}>{line}</span>
            </span>
          ))}
        </h1>
        <p className={s.heroText}>{hero.text}</p>
        <div className={s.heroActions}>
          <Link className={s.ctaPrimary} href={ctaHref}>
            Quero participar
            <span aria-hidden="true">→</span>
          </Link>
          <a className={s.ctaGhost} href="#descobrir">
            Entender o caminho
          </a>
        </div>
        <ul className={s.heroFacts} aria-label="Sobre o Performa">
          {hero.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>

      <figure className={s.heroMedia}>
        <video
          ref={videoRef}
          className={s.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/performa/hero-poster.jpg"
          aria-label="Cenas de uma turma do Performa em sala"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source media="(max-width: 760px)" src="/media/performa/hero-mobile.mp4" type="video/mp4" />
          <source src="/media/performa/hero-desktop.mp4" type="video/mp4" />
        </video>
        <figcaption className={s.heroCaption}>Turma Performa · MyWay</figcaption>
        <button
          type="button"
          className={s.videoToggle}
          onClick={toggleVideo}
          aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" /></svg>
          )}
        </button>
      </figure>
    </section>
  );
}
