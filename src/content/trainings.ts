export type Training = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
};

// Troque os textos aqui quando os nomes e detalhes oficiais forem definidos.
// A homepage e as futuras páginas de treinamento usam esta mesma fonte.
export const trainings: Training[] = [
  {
    slug: "lideranca-na-pratica",
    eyebrow: "Treinamento 01",
    title: "Liderança na prática",
    description:
      "Uma experiência para quem precisa liderar pessoas, decisões e mudanças com mais consciência.",
    highlights: ["Autoliderança", "Comunicação", "Decisão"],
  },
  {
    slug: "inteligencia-emocional",
    eyebrow: "Treinamento 02",
    title: "Inteligência emocional",
    description:
      "Ferramentas para reconhecer padrões, fortalecer relações e responder melhor aos desafios.",
    highlights: ["Consciência", "Relações", "Ação"],
  },
];
