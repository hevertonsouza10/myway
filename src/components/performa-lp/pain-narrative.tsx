import { pain } from "./content";
import s from "./performa-lp.module.css";

// Consciência da dor. A pergunta "Até quando..." fica no relógio (DecisionClock)
// logo acima, reaproveitado da /lideranca.
export function PainNarrative() {
  return (
    <section className={s.painBody} id="problema" aria-labelledby="performa-pain">
      <header className={s.painHeader}>
        <h2 id="performa-pain" className={s.sectionTitle}>
          {pain.title}
        </h2>
        <p className={s.lead}>{pain.intro}</p>
      </header>

      <ol className={s.losses}>
        {pain.losses.map((loss, index) => (
          <li key={loss.title} className={s.reveal}>
            <span className={s.lossIndex}>{String(index + 1).padStart(2, "0")}</span>
            <h3>{loss.title}</h3>
            <p>{loss.text}</p>
          </li>
        ))}
      </ol>

      <p className={s.verdict}>
        {pain.verdict.lead} <strong>{pain.verdict.strong}</strong>
      </p>
      <p className={s.turn}>
        {pain.turn} <span aria-hidden="true">↓</span>
      </p>
    </section>
  );
}
