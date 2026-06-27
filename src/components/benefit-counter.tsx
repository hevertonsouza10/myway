"use client";

import { useEffect, useRef, useState } from "react";

type BenefitCounterProps = {
  value: string;
};

function parseValue(value: string) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value };

  return {
    prefix: match[1] ?? "",
    target: Number(match[2] ?? 0),
    suffix: match[3] ?? "",
  };
}

export function BenefitCounter({ value }: BenefitCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const { prefix, target, suffix } = parseValue(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const frame = window.requestAnimationFrame(() => setCount(target));
      return () => window.cancelAnimationFrame(frame);
    }

    let frame = 0;
    let start = 0;
    let hasPlayed = false;

    function animate(timestamp: number) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(target * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    }

    function play() {
      if (hasPlayed) return;
      hasPlayed = true;
      start = 0;
      setCount(0);
      frame = window.requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        play();
        observer.disconnect();
      },
      { threshold: 0.45, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);

    const rect = node.getBoundingClientRect();
    const startsVisible = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

    if (startsVisible) {
      play();
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <span ref={ref} className="numeric-text benefit-counter" aria-label={value}>
      {prefix ? <span className="benefit-counter__affix">{prefix}</span> : null}
      <span className="benefit-counter__value">{count}</span>
      {suffix ? <span className="benefit-counter__affix">{suffix}</span> : null}
    </span>
  );
}


