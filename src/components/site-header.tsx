"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const leadershipLinks = [
  { href: "#sobre", label: "Sobre", icon: "about" },
  { href: "#treinamentos", label: "Treinamentos", icon: "training" },
  { href: "#metodo", label: "Método", icon: "method" },
];

const institutionalLinks = [
  { href: "#sobre", label: "Sobre", icon: "about" },
  { href: "#treinamentos", label: "Treinamentos", icon: "training" },
  { href: "#marcas-parceiras", label: "Marcas", icon: "brands" },
  { href: "#depoimentos", label: "Depoimentos", icon: "testimonials" },
  { href: "#unidades", label: "Unidade", icon: "unit" },
];

const institutionalMobileLinks = [
  ...institutionalLinks,
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

function NavIcon({ name }: { name: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {name === "about" ? (
        <>
          <circle cx="12" cy="12" r="7.2" />
          <path d="M12 8.4v7.2" />
          <path d="M8.4 12h7.2" />
        </>
      ) : null}
      {name === "training" ? (
        <>
          <path d="M4.5 7.5h15" />
          <path d="M6.8 7.5v10.2h10.4V7.5" />
          <path d="M9 12h6" />
        </>
      ) : null}
      {name === "brands" ? (
        <>
          <path d="M6.4 6.4h4.6v4.6H6.4z" />
          <path d="M13 6.4h4.6v4.6H13z" />
          <path d="M6.4 13h4.6v4.6H6.4z" />
          <path d="M13 13h4.6v4.6H13z" />
        </>
      ) : null}
      {name === "testimonials" ? (
        <>
          <path d="M5.5 6.8h13v8.7h-5.4L9 18.3v-2.8H5.5z" />
          <path d="M9 10.2h6" />
          <path d="M9 12.7h3.8" />
        </>
      ) : null}
      {name === "unit" ? (
        <>
          <path d="M12 20s6-5 6-10a6 6 0 0 0-12 0c0 5 6 10 6 10z" />
          <circle cx="12" cy="10" r="2.1" />
        </>
      ) : null}
      {name === "contact" ? (
        <>
          <path d="M4.8 7.2h14.4v9.6H4.8z" />
          <path d="m5.5 8 6.5 5 6.5-5" />
        </>
      ) : null}
      {name === "method" ? (
        <>
          <path d="M7 5.8h10" />
          <path d="M7 12h10" />
          <path d="M7 18.2h10" />
          <path d="M5 5.8h.1" />
          <path d="M5 12h.1" />
          <path d="M5 18.2h.1" />
        </>
      ) : null}
    </svg>
  );
}

export function SiteHeader({ variant = "leadership" }: SiteHeaderProps) {
  const links = variant === "institutional" ? institutionalLinks : leadershipLinks;
  const mobileLinks =
    variant === "institutional" ? institutionalMobileLinks : leadershipMobileLinks;
  const observedLinks =
    variant === "institutional" ? institutionalMobileLinks : leadershipMobileLinks;
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
            href="#contato"
            aria-current={activeId === "contato" ? "true" : undefined}
          >
            <span>Contato</span>
            <i aria-hidden="true">↗</i>
          </Link>
        </nav>
      </div>

      <Link className="header-action" href="/area-do-aluno">
        <span>Área do aluno</span>
        <i aria-hidden="true">↗</i>
      </Link>

      <nav className="mobile-nav" aria-label="Navegação rápida">
        {mobileLinks.map((link) => {
          const id = getIdFromHref(link.href);
          const isActive = id === activeId;

          return (
            <Link
              href={link.href}
              key={link.href}
              className={isActive ? "is-active" : undefined}
              aria-current={isActive ? "true" : undefined}
              aria-label={link.label}
              title={link.label}
            >
              <NavIcon name={link.icon} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
