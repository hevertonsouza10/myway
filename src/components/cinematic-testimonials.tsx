"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Testimonial = {
  title: string;
  context: string;
  story: string;
  src: string;
};

type CinematicTestimonialsProps = {
  testimonials: Testimonial[];
};

type TestimonialStyle = React.CSSProperties & {
  "--testimonial-height"?: string;
  "--cinema-track-x"?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function CinematicTestimonials({ testimonials }: CinematicTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [trackX, setTrackX] = useState("0%");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const active = testimonials[activeIndex] ?? testimonials[0];
  const lastIndex = Math.max(testimonials.length - 1, 0);
  const scrollHeight = `${Math.max(testimonials.length, 1) * 100 + 100}svh`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !lastIndex) return;

    let frame = 0;

    function updateProgress() {
      frame = 0;
      const current = containerRef.current;
      if (!current) return;

      const rect = current.getBoundingClientRect();
      const scrollable = Math.max(current.scrollHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollable, 0, 1);
      const nextIndex = clamp(Math.round(progress * lastIndex), 0, lastIndex);

      setActiveIndex(nextIndex);
      setTrackX(`${progress * lastIndex * -100}%`);
    }

    function requestUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [lastIndex]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video || index === playingIndex) return;
      video.pause();
    });
  }, [playingIndex]);

  function goTo(index: number) {
    const container = containerRef.current;
    if (!container || !lastIndex) return;

    const next = clamp(index, 0, lastIndex);
    const targetProgress = next / lastIndex;
    const top = window.scrollY + container.getBoundingClientRect().top;
    const scrollable = Math.max(container.scrollHeight - window.innerHeight, 1);

    window.scrollTo({
      top: top + scrollable * targetProgress,
      behavior: "smooth",
    });
  }

  async function playVideo(index: number) {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index && !video.paused) {
      video.pause();
      setPlayingIndex(null);
      return;
    }

    video.muted = false;
    video.controls = true;
    setPlayingIndex(index);
    await video.play();
  }

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="cinema-testimonials"
      style={
        {
          "--testimonial-height": scrollHeight,
          "--cinema-track-x": trackX,
        } as TestimonialStyle
      }
    >
      <div className="cinema-panel" aria-live="polite">
        <div className="cinema-backdrop" aria-hidden="true">
          {testimonials.map((testimonial, index) => (
            <video
              key={testimonial.src}
              className={index === activeIndex ? "is-active" : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              src={testimonial.src}
            />
          ))}
        </div>

        <div className="cinema-copy">
          <p className="eyebrow">Depoimentos MyWay</p>
          <h3>Relatos em movimento</h3>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")} · {active.context}
          </span>
          <p>{active.story}</p>
          {activeIndex === lastIndex ? (
            <Link className="cinema-final-link" href="#contato">
              Falar com a MyWay
            </Link>
          ) : null}
        </div>

        <div className="cinema-stage">
          <div className="cinema-horizontal-track">
            {testimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.src}-card`}
                className={index === activeIndex ? "is-active" : undefined}
                aria-hidden={index !== activeIndex}
              >
                <button
                  className="cinema-video-shell"
                  type="button"
                  onClick={() => playVideo(index)}
                  aria-label={`Reproduzir ${testimonial.title}`}
                >
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    playsInline
                    preload="metadata"
                    src={testimonial.src}
                    onPlay={() => setPlayingIndex(index)}
                    onPause={() => {
                      if (playingIndex === index) setPlayingIndex(null);
                    }}
                  />
                  <span className={playingIndex === index ? "is-playing" : undefined}>
                    {playingIndex === index ? "Assistindo" : "Play"}
                  </span>
                </button>
                <div>
                  <strong>{testimonial.title}</strong>
                  <p>{testimonial.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="cinema-controls" aria-label="Controles dos depoimentos">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Depoimento anterior"
          >
            ‹
          </button>
          <div>
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.title}
                type="button"
                className={index === activeIndex ? "is-active" : undefined}
                onClick={() => goTo(index)}
                aria-label={`Ir para ${testimonial.title}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === lastIndex}
            aria-label="Próximo depoimento"
          >
            ›
          </button>
        </div>
      </div>

      <div className="cinema-mobile-feed">
        {testimonials.map((testimonial, index) => (
          <article key={`${testimonial.title}-mobile`}>
            <video controls playsInline preload="metadata" src={testimonial.src} />
            <div>
              <span>Depoimento {String(index + 1).padStart(2, "0")}</span>
              <h3>{testimonial.title}</h3>
              <p>{testimonial.story}</p>
              {index === lastIndex ? <Link href="#contato">Falar com a MyWay</Link> : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}


