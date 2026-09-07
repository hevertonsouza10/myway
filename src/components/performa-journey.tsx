import styles from "./performa-journey.module.css";

type Module = { title: string; text: string };

export function PerformaJourney({ modules }: { modules: Module[] }) {
  return (
    <section className={styles.journey} aria-labelledby="performa-journey-title" id="jornada-performa">
      <div className={styles.layout}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>CONTEÚDO</p>
          <h3 className={styles.heading} id="performa-journey-title">MYWAY.<br />MEU JEITO.<br /><span>LIDERE SUAS ESCOLHAS.</span></h3>
        </header>
        <div className={styles.content}>
          <ol className={styles.modules} aria-label="Conteúdo das 14 aulas do Performa">
            {modules.map((module, index) => (
              <li className={styles.module} key={module.title}>
                <span className={styles.moduleNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h4 className={styles.moduleTitle}>{module.title}</h4>
              </li>
            ))}
          </ol>
          <dl className={styles.facts} aria-label="Informações do treinamento Performa">
            <div><dt>horas de<br />imersão</dt><dd>70</dd></div>
            <div><dt>sessões<br />presenciais</dt><dd>14</dd></div>
            <div><dt>meses com<br />encontros semanais</dt><dd>03</dd></div>
          </dl>
          <p className={styles.closing}>Não queremos ensinar você a seguir um caminho.<br /><strong>Queremos desenvolver você para construir o seu.</strong></p>
        </div>
      </div>
    </section>
  );
}
