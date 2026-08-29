"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { AUDIO_FOCUS_EVENT, requestAudioFocus } from "@/lib/audio-focus";

export type Testimonial = {
  title?: string;
  context?: string;
  story?: string;
  name?: string;
  company?: string;
  src: string;
};

type CinematicTestimonialsProps = {
  testimonials: readonly Testimonial[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function CinematicTestimonials({ testimonials }: CinematicTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mutedByIndex, setMutedByIndex] = useState(() => testimonials.map(() => true));
  const audioGroupId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const scrollFrame = useRef(0);
  const dragStartX = useRef<number | null>(null);
  const dragStartScroll = useRef(0);
  const lastIndex = Math.max(testimonials.length - 1, 0);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.muted = mutedByIndex[index];
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex, mutedByIndex]);

  useEffect(() => () => {
    if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current);
  }, []);

  useEffect(() => {
    const handleAudioFocus = (event: Event) => {
      const source = (event as CustomEvent<string>).detail;
      videoRefs.current.forEach((video, index) => {
        if (video) video.muted = source === `${audioGroupId}-${index}` ? false : true;
      });
      if (!source.startsWith(audioGroupId)) {
        setMutedByIndex((current) => current.map(() => true));
      } else {
        const sourceIndex = Number(source.slice(`${audioGroupId}-`.length));
        setMutedByIndex((current) => current.map((muted, index) => index === sourceIndex ? false : true));
      }
    };

    window.addEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);
    return () => window.removeEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);
  }, [audioGroupId]);

  function updateActiveIndex() {
    const track = trackRef.current;
    if (!track) return;

    if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = window.requestAnimationFrame(() => {
      const firstCard = track.querySelector<HTMLElement>("[data-testimonial-card]");
      if (!firstCard) return;
      setActiveIndex(clamp(Math.round(track.scrollLeft / Math.max(firstCard.offsetWidth, 1)), 0, lastIndex));
    });
  }

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const nextIndex = clamp(index, 0, lastIndex);
    const firstCard = track.querySelector<HTMLElement>("[data-testimonial-card]");
    const cardStep = firstCard
      ? firstCard.offsetWidth + Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0")
      : track.clientWidth;
    track.scrollTo({ left: nextIndex * cardStep, behavior: "smooth" });
    setActiveIndex(nextIndex);
  }

  function toggleMute(index: number) {
    const video = videoRefs.current[index];
    if (!video) return;
    const nextMuted = !mutedByIndex[index];
    video.muted = nextMuted;
    if (!nextMuted) video.volume = 1;
    setMutedByIndex((current) => current.map((muted, currentIndex) => currentIndex === index ? nextMuted : true));
    if (!nextMuted) requestAudioFocus(`${audioGroupId}-${index}`);
  }

  function openFullscreen(video: HTMLVideoElement) {
    if (video.requestFullscreen) {
      void video.requestFullscreen();
      return;
    }

    const mobileVideo = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    mobileVideo.webkitEnterFullscreen?.();
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    if ((event.target as HTMLElement).closest("video, button")) return;
    dragStartX.current = event.clientX;
    dragStartScroll.current = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || dragStartX.current === null) return;
    track.scrollLeft = dragStartScroll.current - (event.clientX - dragStartX.current);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || dragStartX.current === null) return;
    dragStartX.current = null;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    updateActiveIndex();
  }

  if (!testimonials.length) return null;

  return (
    <div className="cinema-testimonials" role="region" aria-label="Depoimentos de clientes MyWay" aria-roledescription="carrossel">
      <div className="cinema-testimonials-heading">
        <p className="eyebrow">Depoimentos</p>
        <h2>Experiências que continuam depois do encontro.</h2>
        <p>Quem participa da MyWay leva novas escolhas, conversas e formas de liderar para a vida real.</p>
      </div>
      <div
        ref={trackRef}
        className="cinema-horizontal-track"
        onScroll={updateActiveIndex}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goTo(activeIndex - 1);
          if (event.key === "ArrowRight") goTo(activeIndex + 1);
        }}
        tabIndex={0}
        aria-label="Depoimentos em video"
      >
        {testimonials.map((testimonial, index) => (
          <article
            data-testimonial-card
            key={testimonial.src}
            className={index === activeIndex ? "is-active" : undefined}
            aria-label={`${index + 1} de ${testimonials.length}: ${testimonial.name ?? testimonial.title ?? "Depoimento"}`}
          >
            <div className="cinema-video-shell">
              <video
                ref={(video) => { videoRefs.current[index] = video; }}
                controls
                autoPlay={index === activeIndex}
                muted={mutedByIndex[index]}
                loop
                playsInline
                preload={index === activeIndex ? "auto" : "metadata"}
                src={testimonial.src}
                onClick={(event) => {
                  if (event.currentTarget === event.target) openFullscreen(event.currentTarget);
                }}
                aria-label={`Reproduzir ${testimonial.title ?? "depoimento"}. Clique no vídeo para abrir em tela cheia.`}
              />
              <div className="cinema-testimonial-overlay" aria-hidden="true">
                <div>
                  <strong>{testimonial.name ?? testimonial.title ?? `Depoimento ${String(index + 1).padStart(2, "0")}`}</strong>
                  <span>{testimonial.company ?? testimonial.context ?? "Aluno MyWay"}</span>
                </div>
                <small>Clique para assistir</small>
              </div>
              <button className="cinema-volume-control" type="button" onClick={() => toggleMute(index)} aria-label={mutedByIndex[index] ? "Ativar som do depoimento" : "Silenciar depoimento"}>{mutedByIndex[index] ? "Ativar som" : "Silenciar"}</button>
            </div>
          </article>
        ))}
      </div>

      <div className="cinema-controls" aria-label="Controles dos depoimentos">
        <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Depoimento anterior"></button>
        <div>
          {testimonials.map((testimonial, index) => (
            <button key={testimonial.src} type="button" className={index === activeIndex ? "is-active" : undefined} onClick={() => goTo(index)} aria-label={`Ir para ${testimonial.name ?? testimonial.title ?? "depoimento"}`} aria-current={index === activeIndex ? "true" : undefined} />
          ))}
        </div>
        <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === lastIndex} aria-label="Proximo depoimento"></button>
      </div>
      <div className="cinema-testimonials-cta">
        <div>
          <p className="eyebrow">A sua próxima virada</p>
          <h3>Você também pode fazer parte dessa transformação.</h3>
        </div>
        <a href="https://wa.me/5551993490339" target="_blank" rel="noreferrer">Candidatar-se <span aria-hidden="true">✦</span></a>
      </div>
    </div>
  );
}
