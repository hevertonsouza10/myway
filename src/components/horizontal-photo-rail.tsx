"use client";

import { useEffect, useRef } from "react";

type HorizontalPhotoRailProps = { children: React.ReactNode };

export function HorizontalPhotoRail({ children }: HorizontalPhotoRailProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    let frame = 0;
    let animationFrame = 0;
    let targetOffset = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const horizontalRoom = Math.max(0, rail.scrollWidth - section.clientWidth);
      section.style.height = `${window.innerHeight + horizontalRoom}px`;
      targetOffset = Math.min(targetOffset, horizontalRoom);
    };

    const getTarget = () => {
      const horizontalRoom = Math.max(0, rail.scrollWidth - section.clientWidth);
      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
      return horizontalRoom * progress;
    };

    const getCurrentOffset = () => {
      const transform = window.getComputedStyle(rail).transform;
      if (transform === "none") return 0;
      return Math.abs(new DOMMatrix(transform).m41);
    };

    const setOffset = (offset: number) => {
      rail.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };
    const animate = () => {
      const distance = targetOffset - getCurrentOffset();
      if (reduceMotion.matches || Math.abs(distance) < 0.5) {
        setOffset(targetOffset);
        animationFrame = 0;
        return;
      }

      setOffset(getCurrentOffset() + distance * 0.16);
      animationFrame = requestAnimationFrame(animate);
    };

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        targetOffset = getTarget();
        if (!animationFrame) animationFrame = requestAnimationFrame(animate);
      });
    };

    const handleResize = () => {
      measure();
      update();
    };

    const observer = new ResizeObserver(() => { measure(); update(); });

    observer.observe(rail);
    rail.querySelectorAll("img").forEach((image) => {
      if (!image.complete) image.addEventListener("load", handleResize, { once: true });
    });
    measure();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={sectionRef} className="training-photo-scroll">
      <div ref={railRef} className="training-photo-carousel" aria-label="Galeria de fotos do treinamento Performa">
        {children}
      </div>
    </div>
  );
}