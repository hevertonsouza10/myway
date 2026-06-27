"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    let frame = 0;

    const render = () => {
      ring.current.x += (pointer.current.x - ring.current.x) * 0.16;
      ring.current.y += (pointer.current.y - ring.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.current.x}px, ${pointer.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      frame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      setIsVisible(true);

      const target = event.target as HTMLElement | null;
      setIsInteractive(
        Boolean(
          target?.closest(
            "a, button, [role='button'], input, textarea, select, summary",
          ),
        ),
      );
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isVisible ? "is-visible" : ""} ${
        isInteractive ? "is-interactive" : ""
      }`}
      aria-hidden="true"
    >
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
    </div>
  );
}
