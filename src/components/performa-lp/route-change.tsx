import Link from "next/link";
import { ctaHref, routeChange } from "./content";
import s from "./performa-lp.module.css";

export function RouteChange() {
  return (
    <section className={s.route} id="virada" aria-labelledby="performa-route">
      <div className={s.routeGrid}>
        <header className={s.routeHeader}>
          <p className={s.label}>{routeChange.label}</p>
          <h2 id="performa-route" className={s.sectionTitle}>
            {routeChange.titleLead} <strong>{routeChange.titleStrong}</strong>
          </h2>
          <p className={s.lead}>{routeChange.text}</p>
          <Link className={s.ctaPrimary} href={ctaHref}>
            Quero participar
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        <ul className={s.pillars}>
          {routeChange.pillars.map((pillar) => (
            <li key={pillar.title} className={s.reveal}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <dl className={s.shifts} aria-label="O que muda com o Performa">
        {routeChange.shifts.map(([from, to]) => (
          <div key={from} className={s.reveal}>
            <dt>{from}</dt>
            <span aria-hidden="true" className={s.shiftArrow}>→</span>
            <dd>{to}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
