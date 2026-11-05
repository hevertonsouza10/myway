import Link from "next/link";

export default function StudentAreaPage() {
  return (
    <main className="future-page">
      <p className="eyebrow">Área do aluno</p>
      <h1>Seu próximo encontro com a MyWay começa aqui.</h1>
      <p>
        A plataforma do aluno está planejada para uma próxima fase. Quando
        lançada, ela reunirá agenda, informações das aulas e materiais.
      </p>
      <div className="future-actions">
        <Link className="button button-light" href="/">
          Voltar para o site
        </Link>
        <a className="button button-outline-light" href="https://wa.me/5551993601857" target="_blank" rel="noreferrer">
          Contato · (51) 99360-1857
        </a>
      </div>
    </main>
  );
}
