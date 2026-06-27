import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contato">
      <div>
        <p className="eyebrow">Próximo passo</p>
        <h2>Comece escolhendo liderar.</h2>
      </div>
      <Link className="button button-light" href="mailto:contato@myway.com.br">
        Falar com a MyWay
      </Link>
      <p className="footer-note">MyWay Treinamentos · Lidere suas escolhas</p>
    </footer>
  );
}
