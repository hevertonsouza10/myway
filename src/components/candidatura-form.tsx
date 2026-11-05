"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { candidaturaPrograms, candidaturaUnits } from "@/content/candidatura";
import styles from "./candidatura-form.module.css";

const whatsappUrl = "https://wa.me/5551993601857";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

// "51999991234" -> "(51) 99999-1234"
function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length > 6) return `(${digits.slice(0, 2)}) ${digits.slice(2, -4)}-${digits.slice(-4)}`;
  if (digits.length > 2) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return digits;
}

export function CandidaturaForm() {
  const params = useSearchParams();
  // Momento em que o formulário apareceu; a API recusa envios rápidos demais (robôs).
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // ?turma=Performa já deixa a turma escolhida (útil em links de campanha).
  const presetProgram = params.get("turma");
  const defaultProgram = candidaturaPrograms.includes(presetProgram ?? "") ? presetProgram! : candidaturaPrograms[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const utm = ["utm_source", "utm_medium", "utm_campaign"].map((key) => params.get(key)).filter(Boolean).join(" / ");

    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/candidatura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consentimento: data.consentimento === "on",
          origem: `Site MyWay - Candidatura${utm ? ` | ${utm}` : ""}`,
          startedAt: startedAt.current,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; erro?: string };
      if (!response.ok || !result.ok) throw new Error(result.erro);
      form.reset();
      setPhone("");
      setStatus({ kind: "ok" });
    } catch (error) {
      setStatus({
        kind: "error",
        message: (error as Error).message || "Não conseguimos enviar agora. Tente de novo em instantes.",
      });
    }
  }

  if (status.kind === "ok") {
    return (
      <div className={styles.card} role="status">
        <p className={styles.eyebrow}>Recebemos sua candidatura</p>
        <h2 className={styles.successTitle}>Obrigado! Em breve falamos com você pelo WhatsApp.</h2>
        <Link className={styles.secondary} href="/">Voltar para o site</Link>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <label className={styles.full}>
          <span>Nome completo</span>
          <input name="nome" required minLength={3} maxLength={120} autoComplete="name" />
        </label>
        <label>
          <span>WhatsApp</span>
          <input
            name="whatsapp"
            required
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(51) 99999-9999"
            pattern="\(\d{2}\) \d{4,5}-\d{4}"
            title="DDD + número, ex.: (51) 99999-9999"
            value={phone}
            onChange={(event) => setPhone(maskPhone(event.target.value))}
          />
        </label>
        <label>
          <span>E-mail</span>
          <input name="email" type="email" required maxLength={160} autoComplete="email" />
        </label>
        <label>
          <span>Turma de interesse</span>
          <select name="programa" required defaultValue={defaultProgram}>
            {candidaturaPrograms.map((program) => <option key={program}>{program}</option>)}
          </select>
        </label>
        <label>
          <span>Unidade</span>
          <select name="unidade" required defaultValue="">
            <option value="" disabled>Selecione</option>
            {candidaturaUnits.map((unit) => <option key={unit}>{unit}</option>)}
          </select>
        </label>
        <label className={styles.full}>
          <span>Cidade onde mora</span>
          <input name="cidade" required maxLength={120} autoComplete="address-level2" />
        </label>
        <label>
          <span>Empresa <small>(opcional)</small></span>
          <input name="empresa" maxLength={120} autoComplete="organization" />
        </label>
        <label>
          <span>Cargo <small>(opcional)</small></span>
          <input name="cargo" maxLength={120} autoComplete="organization-title" />
        </label>
        <label className={styles.full}>
          <span>Por que quer participar? <small>(opcional)</small></span>
          <textarea name="motivacao" maxLength={1500} rows={4} />
        </label>
      </div>

      {/* Anti-spam: invisível para pessoas, robôs costumam preencher. */}
      <input className={styles.honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <label className={styles.consent}>
        <input type="checkbox" name="consentimento" required />
        <span>
          Autorizo a MyWay Treinamentos a usar meus dados para esta candidatura
          e a entrar em contato comigo pelo WhatsApp.
        </span>
      </label>

      <button className={styles.submit} type="submit" disabled={sending}>
        {sending ? "Enviando…" : "Enviar candidatura"}
      </button>

      {status.kind === "error" && (
        <p className={styles.error} role="alert">
          {status.message}{" "}
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Falar pelo WhatsApp</a>
        </p>
      )}
    </form>
  );
}
