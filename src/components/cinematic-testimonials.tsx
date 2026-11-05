"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AUDIO_FOCUS_EVENT, requestAudioFocus } from "@/lib/audio-focus";
import { useDragScroll } from "@/lib/use-drag-scroll";
import styles from "./cinematic-testimonials.module.css";

export type Testimonial = {
  title?: string;
  context?: string;
  story?: string;
  name?: string;
  company?: string;
  src: string;
  youtubeId?: string;
};

type CinematicTestimonialsProps = {
  testimonials: readonly Testimonial[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function CinematicTestimonials({ testimonials }: CinematicTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingYoutubeIndex, setPlayingYoutubeIndex] = useState<number | null>(null);
  const [mutedByIndex, setMutedByIndex] = useState(() => testimonials.map(() => true));
  const audioGroupId = useId();
  const [youtubePaused, setYoutubePaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const youtubeFrameRef = useRef<HTMLIFrameElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const scrollFrame = useRef(0);
  const lastIndex = Math.max(testimonials.length - 1, 0);
  useDragScroll(trackRef);

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
    setYoutubePaused(false);
    const handlePlayerMessage = (event: MessageEvent) => {
      if (!event.origin.includes("youtube") || event.source !== youtubeFrameRef.current?.contentWindow) return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const state = data?.info?.playerState;
        if (state === 1) setYoutubePaused(false);
        if (state === 2 || state === 0) setYoutubePaused(true);
      } catch {
        // Ignore messages that are not player events.
      }
    };
    window.addEventListener("message", handlePlayerMessage);
    return () => window.removeEventListener("message", handlePlayerMessage);
  }, [playingYoutubeIndex]);

  function sendYoutubeCommand(command: "playVideo" | "pauseVideo") {
    youtubeFrameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: command, args: [] }), "*");
  }

  function toggleYoutube() {
    sendYoutubeCommand(youtubePaused ? "playVideo" : "pauseVideo");
    setYoutubePaused((paused) => !paused);
  }

  useEffect(() => {
    const handleAudioFocus = (event: Event) => {
      const source = (event as CustomEvent<string>).detail;
      videoRefs.current.forEach((video, index) => {
        if (video) video.muted = source === `${audioGroupId}-${index}` ? false : true;
      });
      if (!source.startsWith(audioGroupId)) {
        setPlayingYoutubeIndex(null);
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
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      setActiveIndex(atEnd ? lastIndex : clamp(Math.round(track.scrollLeft / Math.max(firstCard.offsetWidth + gap, 1)), 0, lastIndex));
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
    const nextLeft = Math.min(nextIndex * cardStep, track.scrollWidth - track.clientWidth);
    track.scrollTo({ left: nextLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
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

  if (!testimonials.length) return null;

  return (
    <div className={styles.results} role="region" aria-label="Depoimentos de clientes MyWay" aria-roledescription="carrossel">
      <div className={styles.sticky}>
      <div className={styles.heading}>
        <h2>Resultados</h2>
        <p>Histórias de quem viveu a experiência.</p>
      </div>
      <div
        ref={trackRef}
        className={styles.track}
        data-youtube={testimonials.every((testimonial) => Boolean(testimonial.youtubeId))}
        onScroll={updateActiveIndex}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") event.preventDefault();
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
            className={styles.card}
            data-active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            onFocusCapture={() => setActiveIndex(index)}
            aria-label={`${index + 1} de ${testimonials.length}: ${testimonial.name ?? testimonial.title ?? "Depoimento"}`}
          >
            <div className={styles.videoShell} data-youtube={Boolean(testimonial.youtubeId)} data-playing={testimonial.youtubeId && playingYoutubeIndex === index && activeIndex === index ? "true" : undefined}>
              {testimonial.youtubeId ? (
                playingYoutubeIndex === index && activeIndex === index ? (
                  <>
                    <iframe
                      ref={youtubeFrameRef}
                      className={styles.youtubePlayer}
                      src={`https://www.youtube-nocookie.com/embed/${testimonial.youtubeId}?autoplay=1&playsinline=1&rel=0&enablejsapi=1`}
                      title={testimonial.name ?? testimonial.title ?? `Depoimento ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      onLoad={(event) => event.currentTarget.contentWindow?.postMessage(JSON.stringify({ event: "listening" }), "*")}
                    />
                    {/* Keeps the playing video draggable; the YouTube control bar below stays clickable. */}
                    <button
                      className={styles.dragShield}
                      type="button"
                      onClick={toggleYoutube}
                      aria-label={youtubePaused ? "Continuar vídeo" : "Pausar vídeo"}
                    />
                  </>
                ) : (
                  <button
                    className={styles.youtubePreview}
                    type="button"
                    aria-label={`Assistir ${testimonial.name ?? testimonial.title ?? `depoimento ${index + 1}`}`}
                    onClick={() => {
                      setActiveIndex(index);
                      setPlayingYoutubeIndex(index);
                      requestAudioFocus(`${audioGroupId}-${index}`);
                    }}
                  >
                    <Image src={`https://i.ytimg.com/vi/${testimonial.youtubeId}/hqdefault.jpg`} alt="" fill sizes="(max-width: 600px) 88vw, 44vw" unoptimized />
                    <span className={styles.playIcon} aria-hidden="true">▶</span>
                  </button>
                )
              ) : <video
                ref={(video) => { videoRefs.current[index] = video; }}
                controls
                autoPlay={index === activeIndex}
                muted={mutedByIndex[index]}
                loop
                playsInline
                preload={index === activeIndex ? "auto" : "metadata"}
                src={testimonial.src}
                onPlay={() => setActiveIndex(index)}
                onClick={(event) => {
                  if (event.currentTarget === event.target) openFullscreen(event.currentTarget);
                }}
                aria-label={`Reproduzir ${testimonial.title ?? "depoimento"}. Clique no vídeo para abrir em tela cheia.`}
              />}
              {(!testimonial.youtubeId || testimonial.name) && <div className={styles.caption}>
                <div>
                  <strong>{testimonial.name ?? testimonial.title ?? `Depoimento ${String(index + 1).padStart(2, "0")}`}</strong>
                  <span>{testimonial.company ?? testimonial.context ?? "Aluno MyWay"}</span>
                </div>
              </div>}
              {!testimonial.youtubeId && <button className={styles.volume} type="button" onClick={() => toggleMute(index)} aria-label={mutedByIndex[index] ? "Ativar som do depoimento" : "Silenciar depoimento"}>{mutedByIndex[index] ? "Ativar som" : "Silenciar"}</button>}
            </div>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
      <p className={styles.statement}>Quando as escolhas mudam,<br />novos caminhos começam.</p>
      <div className={styles.controls} aria-label="Controles dos depoimentos">
        <span className={styles.counter} aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
        <div className={styles.arrows}>
          <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Depoimento anterior">←</button>
          <button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === lastIndex} aria-label="Próximo depoimento">→</button>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
