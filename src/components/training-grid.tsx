import Link from "next/link";
import { trainings } from "@/content/trainings";

export function TrainingGrid() {
  return (
    <div className="training-grid">
      {trainings.map((training, index) => (
        <article className="training-card" key={training.slug}>
          <div className="training-number numeric-text">0{index + 1}</div>
          <p className="eyebrow">{training.eyebrow}</p>
          <h3>{training.title}</h3>
          <p className="training-description">{training.description}</p>
          <ul aria-label={`Pilares de ${training.title}`}>
            {training.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <Link href={`/treinamentos/${training.slug}`}>
            Conhecer treinamento <span aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
