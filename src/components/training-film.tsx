export function TrainingFilm() {
  return (
    <section className="training-film" aria-labelledby="training-film-title">
      <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
        <source src="/media/myway-motion.mp4" type="video/mp4" />
      </video>

      <div className="training-film-shade" aria-hidden="true" />
      <div className="training-film-rings" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="training-film-copy">
        <p className="eyebrow">Por dentro da experiência</p>
        <h2 id="training-film-title">
          Um pouco de como as aulas <strong>acontecem.</strong>
        </h2>
      </div>

      <p className="training-film-note">Vídeo demonstrativo</p>
    </section>
  );
}
