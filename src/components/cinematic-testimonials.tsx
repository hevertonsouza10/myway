"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

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
  const [isMuted, setIsMuted] = useState(true);
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
        video.muted = true;
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted]);

  useEffect(() => () => {
    if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current);
  }, []);

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
    track.scrollTo({ left: nextIndex * track.clientWidth, behavior: "smooth" });
    setActiveIndex(nextIndex);
  }

  function toggleMute(index: number) {
    const video = videoRefs.current[index];
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) video.volume = 1;
    setIsMuted(nextMuted);
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
              <video ref={(video) => { videoRefs.current[index] = video; }} controls autoPlay={index === activeIndex} muted loop playsInline preload={index === activeIndex ? "auto" : "metadata"} src={testimonial.src} />
              <button className="cinema-volume-control" type="button" onClick={() => toggleMute(index)} aria-label={isMuted ? "Ativar som do depoimento" : "Silenciar depoimento"}>{isMuted ? "Ativar som" : "Silenciar"}</button>
              <button className="cinema-fullscreen-control" type="button" onClick={() => { const video = videoRefs.current[index]; if (video) openFullscreen(video); }} aria-label="Abrir depoimento em tela cheia">Tela cheia</button>
            </div>
            <div className="cinema-card-copy">
              <strong>{testimonial.name ?? testimonial.title ?? "Depoimento"}</strong>
              <span>{testimonial.company ?? testimonial.context ?? "Cliente MyWay"}</span>
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
    </div>
  );
}