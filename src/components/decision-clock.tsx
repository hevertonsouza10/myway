"use client";

import { useEffect, useRef, useState } from "react";

const TICKS = 48;
const START_ANGLE = -135;
const SWEEP_ANGLE = 270;
const START_VALUE = 95;
const END_VALUE = 21;

export function DecisionClock() {
  const sectionRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState(START_VALUE);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let lastValue = START_VALUE;

    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / distance));
      const nextValue = Math.round(
        START_VALUE - (START_VALUE - END_VALUE) * progress,
      );

      section.style.setProperty("--clock-progress", progress.toString());
      if (nextValue !== lastValue) {
        lastValue = nextValue;
        setValue(nextValue);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="decision-clock" id="descobrir">
      <div className="decision-clock-sticky">
        <div className="clock-atmosphere" aria-hidden="true">
          <span className="clock-orbit clock-orbit-one" />
          <span className="clock-orbit clock-orbit-two" />
          <span className="clock-pulse clock-pulse-one" />
          <span className="clock-pulse clock-pulse-two" />
          <span className="clock-brand-echo">MYWAY</span>
        </div>

        <div className="decision-clock-copy">
          <p className="eyebrow">O tempo está passando</p>
          <h2>
            Até quando a sua <strong>qualidade de vida</strong> e os seus
            relacionamentos vão <strong>pagar a conta</strong> das suas decisões?
          </h2>
        </div>

        <div className="clock-stage">
          <span className="clock-long-hand" aria-hidden="true" />
          <svg className="clock-dial" viewBox="0 0 420 420" aria-hidden="true">
            <circle className="clock-track" cx="210" cy="210" r="164" />
            {Array.from({ length: TICKS }, (_, index) => {
              const angle = START_ANGLE + (index / (TICKS - 1)) * SWEEP_ANGLE;
              const radians = (angle * Math.PI) / 180;
              const x = 210 + Math.cos(radians) * 164;
              const y = 210 + Math.sin(radians) * 164;

              return (
                <circle
                  key={index}
                  className="clock-tick"
                  cx={x}
                  cy={y}
                  r={index % 4 === 0 ? 3.6 : 2.2}
                  style={{ "--tick-index": index } as React.CSSProperties}
                />
              );
            })}
            <g className="clock-hand">
              <line x1="210" y1="210" x2="310" y2="210" />
              <circle cx="210" cy="210" r="11" />
              <circle className="clock-hand-core" cx="210" cy="210" r="3" />
            </g>
          </svg>

          <div className="clock-value" aria-live="polite">
            <strong className="numeric-text">{value}</strong>
            <span>tempo restante</span>
          </div>
        </div>

        <p className="clock-footnote">
          O futuro não chega de uma vez. Ele é construído pelas escolhas que
          você repete todos os dias.
        </p>

        <div className="clock-scroll-cue" aria-hidden="true">
          <span />
          Continue
        </div>
      </div>
    </section>
  );
}
