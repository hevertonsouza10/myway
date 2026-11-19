import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CandidaturaForm } from "@/components/candidatura-form";
import styles from "@/components/candidatura-form.module.css";

export const metadata: Metadata = {
  title: "Candidatura | MyWay",
  description: "Candidate-se a uma vaga na próxima turma da MyWay Treinamentos.",
  alternates: { canonical: "/candidatura" },
};

export default function CandidaturaPage() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <Link href="/" aria-label="MyWay: voltar para o site">
          <Image className={styles.logo} src="/brand/myway-logo-white-footer.png" alt="MyWay" width={1168} height={352} priority />
        </Link>
        <p className={styles.eyebrow}>Candidatura</p>
        <h1>Faça parte da comunidade MyWay. Lidere suas escolhas.</h1>
        <p>
          Preencha seus dados e a nossa equipe entrará em contato para agendar
          uma reunião presencial ou online para tirar dúvidas e informar os
          próximos passos.
        </p>
      </section>
      <Suspense>
        <CandidaturaForm />
      </Suspense>
    </main>
  );
}
