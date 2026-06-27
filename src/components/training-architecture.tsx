const modules = [
  {
    code: "MW.01",
    phase: "Entrada",
    title: "Leitura de cenário",
    detail: "Contexto · padrões · ponto de partida",
  },
  {
    code: "MW.02",
    phase: "Consciência",
    title: "Mapa de escolhas",
    detail: "Percepção · impacto · responsabilidade",
  },
  {
    code: "MW.03",
    phase: "Direção",
    title: "Clareza de rota",
    detail: "Prioridades · intenção · foco",
  },
  {
    code: "MW.04",
    phase: "Prática",
    title: "Laboratório presencial",
    detail: "Experiência · troca · aplicação",
  },
  {
    code: "MW.05",
    phase: "Integração",
    title: "Plano de movimento",
    detail: "Decisão · compromisso · próximo passo",
  },
  {
    code: "MW.06",
    phase: "Aplicação",
    title: "Ação no cotidiano",
    detail: "Rotina · comportamento · consistência",
  },
  {
    code: "MW.07",
    phase: "Acompanhamento",
    title: "Pontos de evolução",
    detail: "Feedback · ajuste · continuidade",
  },
  {
    code: "MW.08",
    phase: "Comunidade",
    title: "Mesa de líderes",
    detail: "Escuta · repertório · conexão",
  },
  {
    code: "MW.09",
    phase: "Sustentação",
    title: "Ritual de progresso",
    detail: "Repetição · presença · maturidade",
  },
  {
    code: "MW.10",
    phase: "Evolução",
    title: "Nova direção",
    detail: "Autonomia · resultado · liberdade",
  },
] as const;

const firstLane = modules.slice(0, 5);
const secondLane = modules.slice(5);

export function TrainingArchitecture() {
  return (
    <section className="training-architecture" aria-labelledby="architecture-title">
      <div className="architecture-scan" aria-hidden="true" />

      <header className="architecture-heading">
        <div>
          <p className="eyebrow">Como funciona</p>
          <h2 id="architecture-title">
            Uma estrutura para a mudança <strong>continuar acontecendo.</strong>
          </h2>
        </div>
        <div className="architecture-spec">
          <span>Estrutura demonstrativa</span>
          <strong className="numeric-text">10</strong>
          <p>pontos de evolução conectados em uma única jornada.</p>
        </div>
      </header>

      <div className="architecture-map">
        <ol className="architecture-lane architecture-lane-left">
          {firstLane.map((module) => (
            <li key={module.code}>
              <span className="architecture-code numeric-text">{module.code}</span>
              <div>
                <p>{module.phase}</p>
                <h3>{module.title}</h3>
                <small>{module.detail}</small>
              </div>
              <i aria-hidden="true" />
            </li>
          ))}
        </ol>

        <div className="architecture-core" aria-hidden="true">
          <span>início</span>
          <div className="architecture-spine">
            {modules.map((module) => (
              <i key={module.code} />
            ))}
          </div>
          <span>movimento</span>
        </div>

        <ol className="architecture-lane architecture-lane-right" start={6}>
          {secondLane.map((module) => (
            <li key={module.code}>
              <i aria-hidden="true" />
              <span className="architecture-code numeric-text">{module.code}</span>
              <div>
                <p>{module.phase}</p>
                <h3>{module.title}</h3>
                <small>{module.detail}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <footer className="architecture-footer">
        <span>Presencial</span>
        <span>Experiencial</span>
        <span>Acompanhado</span>
        <span>Aplicável</span>
      </footer>
    </section>
  );
}
