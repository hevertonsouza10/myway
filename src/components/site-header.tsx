"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const leadershipLinks = [
  { href: "#sobre", label: "Sobre", icon: "about" },
  { href: "#treinamentos", label: "Treinamentos", icon: "training" },
  { href: "#metodo", label: "Método", icon: "method" },
];

const institutionalLinks = [
  { href: "#inicio", label: "Início", icon: "about" },
  { href: "#treinamentos", label: "Treinamento", icon: "training" },
  { href: "#marcas-parceiras", label: "Parceiros", icon: "brands" },
  { href: "#resultados", label: "Resultados", icon: "testimonials" },
  { href: "#unidades", label: "Unidades", icon: "unit" },
];

const institutionalMobileLinks = [
  institutionalLinks[0],
  { href: "#sobre", label: "Sobre MyWay", icon: "about" },
  ...institutionalLinks.slice(1),
  { href: "#contato", label: "Contato", icon: "contact" },
];

const leadershipMobileLinks = [
  ...leadershipLinks,
  { href: "#contato", label: "Contato", icon: "contact" },
];

type SiteHeaderProps = {
  variant?: "leadership" | "institutional";
};

function getIdFromHref(href: string) {
  return href.startsWith("#") ? href.slice(1) : href;
}

export function SiteHeader({ variant = "leadership" }: SiteHeaderProps) {
  const links = variant === "institutional" ? institutionalLinks : leadershipLinks;
  const mobileLinks =
    variant === "institutional" ? institutionalMobileLinks : leadershipMobileLinks;
  const observedLinks =
    variant === "institutional" ? institutionalMobileLinks : leadershipMobileLinks;
  const menuRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 801px)");
    const closeOnDesktop = () => { if (media.matches) menuRef.current?.close(); };
    media.addEventListener("change", closeOnDesktop);
    return () => { document.body.style.overflow = previous; media.removeEventListener("change", closeOnDesktop); };
  }, [menuOpen]);

  const [activeId, setActiveId] = useState(getIdFromHref(links[0]?.href ?? ""));

  useEffect(() => {
    const ids = observedLinks.map((link) => getIdFromHref(link.href));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -52% 0px",
        threshold: [0.08, 0.18, 0.32, 0.48],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [observedLinks]);

  return (
    <header className="site-header">
      <Link className="brand-logo" href="/" aria-label="MyWay, página inicial">
        <Image
          src="/brand/myway-logo-white.png"
          alt=""
          fill
          priority
          sizes="176px"
        />
      </Link>

      <div className="glass-nav-shell">
        <nav aria-label="Navegação principal">
          {links.map((link) => {
            const id = getIdFromHref(link.href);
            const isActive = id === activeId;

            return (
              <Link
                href={link.href}
                key={link.href}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            className={`nav-contact ${activeId === "contato" ? "is-active" : ""}`}
            href="/candidatura"
            aria-current={activeId === "contato" ? "true" : undefined}
          >
            <span>Candidatar-se</span>
            <i aria-hidden="true">&#8594;</i>
          </Link>
        </nav>
      </div>

      <Link className="header-action" href="/area-do-aluno">
        <span>Área do aluno</span>
        <i aria-hidden="true">&#8594;</i>
      </Link>

      <div className="mobile-header-actions">
        <Link className="mobile-contact-button" href="/candidatura">Candidatar-se</Link>
        <button className="mobile-menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => { menuRef.current?.showModal(); setMenuOpen(true); }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      <dialog ref={menuRef} id="mobile-menu" className="mobile-menu-dialog" aria-label="Menu de navegação" onClose={() => setMenuOpen(false)}>
        <div className="mobile-menu-panel">
          <div className="mobile-menu-heading"><Image className="mobile-menu-logo" src="/brand/myway-logo-white.png" alt="MyWay - Lidere suas escolhas" width={176} height={64} /><button type="button" autoFocus aria-label="Fechar menu" onClick={() => menuRef.current?.close()}>×</button></div>
          <nav className="mobile-menu-links" aria-label="Seções do site">
            {mobileLinks.map((link, index) => <Link key={link.href} href={link.href} onClick={() => menuRef.current?.close()}><small>{String(index + 1).padStart(2, "0")}</small>{link.label}</Link>)}
            <Link href="/area-do-aluno" onClick={() => menuRef.current?.close()}>Área do aluno</Link>
          </nav>
          <div className="mobile-menu-footer">
            <Link className="mobile-menu-contact" href="/candidatura" onClick={() => menuRef.current?.close()}>Candidatar-se</Link>
            <div className="mobile-menu-socials"><a href="https://www.instagram.com/mywaytreinamentos/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.youtube.com/channel/UCDTPq1wg3nrgNN_DtXMAZWA/videos" target="_blank" rel="noreferrer">YouTube</a><a href="https://wa.me/5551993601857" target="_blank" rel="noreferrer">WhatsApp</a></div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
