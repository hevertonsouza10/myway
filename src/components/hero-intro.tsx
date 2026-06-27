"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";

type HeroIntroProps = {
  variant?: "leadership" | "institutional";
};

export function HeroIntro({ variant = "leadership" }: HeroIntroProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isReady = isVideoReady && isIntroDone;
  const discoverHref = variant === "institutional" ? "#sobre" : "#descobrir";

  useEffect(() => {
    const intro = window.setTimeout(() => setIsIntroDone(true), 2200);
    const fallback = window.setTimeout(() => {
      setIsVideoReady(true);
      setIsIntroDone(true);
    }, 6500);

    return () => {
      window.clearTimeout(intro);
      window.clearTimeout(fallback);
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }

  async function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);

    if (!video.muted) {
      await video.play();
    }
  }

  return (
    <section
      className={`hero hero-cinema ${isReady ? "is-ready" : ""}`}
      onPointerMove={handlePointerMove}
    >
      <div className="preloader" aria-hidden={isReady}>
        <div className="preloader-logo">
          <Image
            src="/brand/myway-logo-white.png"
            alt=""
            fill
            priority
            sizes="240px"
          />
        </div>
      </div>

      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setIsVideoReady(true)}
      >
        <source src="/media/myway-motion.mp4" type="video/mp4" />
      </video>

      <div className="hero-shade" aria-hidden="true" />
      <div className="pointer-light" aria-hidden="true" />
      <div className="hero-film-grain" aria-hidden="true" />
      <div className="hero-orb hero-orb-left" aria-hidden="true" />
      <div className="hero-orb hero-orb-right" aria-hidden="true" />
      <SiteHeader variant={variant} />

      <aside className="hero-socials" aria-label="Redes sociais e contato">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="5" />
              <circle cx="12" cy="12" r="3.4" />
              <circle cx="17" cy="7" r="0.8" />
            </svg>
          </span>
          Instagram
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M6.2 9.4v9.4" />
              <path d="M6.2 6.1v.1" />
              <path d="M10.4 18.8V9.4" />
              <path d="M10.4 13.7c0-2.5 1.4-4.3 3.8-4.3 2.1 0 3.4 1.5 3.4 4v5.4" />
            </svg>
          </span>
          LinkedIn
        </a>
        <a href="#contato">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 7.5h16v11H4z" />
              <path d="m4.7 8.2 7.3 5.4 7.3-5.4" />
            </svg>
          </span>
          Contato
        </a>
      </aside>

      <Link className="discover-link" href={discoverHref}>
        <span className="discover-kicker">Iniciar</span>
        <span className="discover-label">Descobrir o caminho</span>
        <span className="discover-arrow" aria-hidden="true">
          <i>↓</i>
        </span>
      </Link>

      <button
        className="sound-control"
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
        aria-pressed={!isMuted}
      >
        <span className={`sound-bars ${isMuted ? "is-muted" : ""}`} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{isMuted ? "Som off" : "Som on"}</span>
      </button>

      <div className="hero-progress" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}




