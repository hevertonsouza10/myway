import Link from "next/link";
import { notFound } from "next/navigation";
import { trainings } from "@/content/trainings";

export function generateStaticParams() {
  return trainings.map(({ slug }) => ({ slug }));
}

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const training = trainings.find((item) => item.slug === slug);

  if (!training) {
    notFound();
  }

  return (
    <main className="future-page">
      <p className="eyebrow">{training.eyebrow}</p>
      <h1>{training.title}</h1>
      <p>{training.description}</p>
      <ul className="detail-list">
        {training.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <Link className="button button-light" href="/#contato">
        Falar sobre este treinamento
      </Link>
    </main>
  );
}
