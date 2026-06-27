import Link from "next/link";

const painSignals = [
  {
    number: "01",
    title: "Você vive reagindo",
    description:
      "O urgente decide sua agenda. Você apaga incêndios o dia inteiro e ainda termina com a sensação de que não fez o que realmente importava.",
  },
  {
    number: "02",
    title: "A vida corre sem você",
    description:
      "Os dias passam ocupados, mas sem direção. Enquanto você tenta dar conta de tudo, seus planos continuam esperando um tempo que nunca chega.",
  },
  {
    number: "03",
    title: "As relações pagam a conta",
    description:
      "A pressa vira ausência. O cansaço encurta conversas, afasta quem importa e transforma presença em mais uma tarefa da lista.",
  },
  {
    number: "04",
    title: "Seus sonhos ficam para depois",
    description:
      "Você sabe que quer mudar, mas repete os mesmos caminhos. Não por falta de capacidade — por ainda estar funcionando no piloto automático.",
  },
] as const;

const shifts = [
  ["Reagir", "Escolher"],
  ["Sobrecarga", "Prioridade"],
  ["Distância", "Presença"],
] as const;

export function PainAwareness() {
  return (
    <section className="pain-awareness" aria-labelledby="pain-awareness-title">
      <div className="pain-ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <header className="pain-intro">
        <p className="eyebrow">Consciência da dor</p>
        <h2 id="pain-awareness-title">
          O que você perde enquanto tenta <strong>dar conta de tudo?</strong>
        </h2>
        <p>
          Você pode até estar em movimento. Mas movimento sem consciência não é
          direção — é apenas o piloto automático escolhendo por você.
        </p>
      </header>

      <div className="pain-signals">
        {painSignals.map((signal) => (
          <article className="pain-signal" key={signal.number}>
            <span className="pain-number numeric-text">{signal.number}</span>
            <h3>{signal.title}</h3>
            <p>{signal.description}</p>
            <i aria-hidden="true">↘</i>
          </article>
        ))}
      </div>

      <div className="pain-turn">
        <div className="pain-turn-copy">
          <p className="eyebrow">A virada começa aqui</p>
          <h3>
            Piloto automático <strong>não é destino.</strong>
          </h3>
          <p>
            O que hoje parece um padrão definitivo pode ser percebido,
            questionado e transformado. Você não precisa esperar tudo
            desmoronar para mudar de direção.
          </p>
          <Link className="pain-link" href="#treinamentos">
            Existe outro caminho <span aria-hidden="true">↓</span>
          </Link>
        </div>

        <dl className="pain-shifts" aria-label="Mudanças possíveis">
          {shifts.map(([from, to]) => (
            <div key={from}>
              <dt>{from}</dt>
              <span aria-hidden="true">→</span>
              <dd>{to}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
