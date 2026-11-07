"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ctaHref } from "./content";
import s from "./performa-lp.module.css";

const links = [
  { href: "#descobrir", label: "O problema" },
  { href: "#treinamentos", label: "O método" },
  { href: "#resultados", label: "Resultados" },
  { href: "#marcas-parceiras", label: "Parceiros" },
];

export function PerformaHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      headerRef.current?.style.setProperty("--read", progress.toFixed(4));
      setScrolled(window.scrollY > 24);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <header ref={headerRef} className={s.header} data-scrolled={scrolled}>
      <Link className={s.logo} href="/" aria-label="MyWay, página inicial">
        <Image src="/brand/myway-logo-white-footer.png" alt="" width={1168} height={352} priority sizes="150px" />
      </Link>
      <nav className={s.nav} aria-label="Seções do Performa">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <Link className={s.headerCta} href={ctaHref}>
        Quero participar
      </Link>
      <span className={s.readProgress} aria-hidden="true" />
    </header>
  );
}
