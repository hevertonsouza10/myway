// Conteúdo das seções institucionais. Usado pela home (/) e pela LP /performa.

export type Unit = {
  city: string;
  street: string;
  locality: string;
  cep: string;
  phone: string;
  phoneHref: string;
  mapUrl: string;
  routeUrl: string;
  embedUrl: string;
  reviewsUrl: string;
};

export const aboutBlocks = [
  { title: "Por que a MyWay existe?", text: "A MyWay nasceu da necessidade de criar um espaço onde empresários, líderes e profissionais pudessem evoluir além do conhecimento técnico. Percebemos que muitos dominam processos, estratégias e gestão, mas poucos encontram um ambiente capaz de desenvolver clareza, inteligência emocional, postura e capacidade de decisão." },
  { title: "Uma metodologia viva", text: "Cada treinamento é conduzido por meio da metodologia Experiential Learning, onde teoria e prática acontecem juntas. Conversas profundas, dinâmicas, exercícios, simulações e reflexão transformam conhecimento em comportamento." },
  { title: "Aplicação imediata", text: "Todo conhecimento precisa gerar transformação. Por isso, cada ferramenta apresentada durante os treinamentos pode ser aplicada imediatamente na rotina profissional e pessoal, nas decisões, nos relacionamentos e na forma de liderar." },
  { title: "Networking de alto nível", text: "Empresários, líderes e profissionais encontram aqui um espaço para trocar experiências, ampliar sua visão de negócio e construir conexões genuínas. Muitas relações se transformam em parcerias, oportunidades e amizades que seguem crescendo." },
  { title: "Desenvolvimento contínuo", text: "Na MyWay, o desenvolvimento não termina quando o treinamento acaba. Nossos alunos podem participar novamente da mesma formação, sem custo adicional, sempre que uma nova fase da empresa e da vida pedir novos aprendizados." },
];

export const mentoringBlock = {
  title: "Mentoria personalizada",
  text: "Na MyWay, o desenvolvimento também acontece de forma individual. Por meio de mentorias personalizadas fora de sala, cada participante pode aprofundar seus desafios, ampliar a clareza sobre suas decisões e transformar planejamentos em ações alinhadas à sua realidade profissional e pessoal.",
};

export const benefitStats = [
  { value: "1000+", label: "PESSOAS E EMPRESAS IMPACTADAS", animated: true },
  { value: "10+", label: "ANOS DE EXPERIÊNCIA", animated: true },
  { value: "∞", label: "PROCESSO CONTÍNUO SEM CUSTO" },
  { value: "MyWay", label: "NETWORK DE MENTALIDADE · COMUNIDADE MYWAY" },
];

export const partnerBrands = [
  { name: "Bergstell", logo: "bergstell" },
  { name: "HF Madeiras", logo: "hf-madeiras" },
  { name: "Madelprint", logo: "madelprint" },
  { name: "Carvão Ivoti", logo: "carvao-ivoti" },
  { name: "VLS Distribuidora", logo: "vls" },
  { name: "Quiero Café Montenegro", logo: "quero-cafe" },
  { name: "Kosmos", logo: "kosmos" },
  { name: "Grupo Vargas", logo: "grupo-vargas" },
  { name: "Grupo Limbermaq", logo: "limbermaq" },
  { name: "Ávila Supermercados", logo: "avila" },
];

export const videoTestimonials = [
  "wEAZmq7u4mw", "xKD_c4j0LX8", "bOSmBqY5DQM", "dRaJg9DUbgk",
  "eeuuFozaXWw", "KBBLmb8l-jE", "vMarGhKIotY", "TjFkXiOurDY",
  "XXuqdDKv7vc", "4x8mPYwvIaM", "DJHg90NOolI",
].map((youtubeId, index) => ({
  title: `Depoimento ${String(index + 1).padStart(2, "0")}`,
  context: "MyWay",
  youtubeId,
  src: `https://www.youtube.com/watch?v=${youtubeId}`,
}));

export const performaModules = [
  { title: "Consciência e Autoconhecimento", text: "Reconhecer padrões, crenças e comportamentos para compreender como o seu jeito de pensar influencia escolhas, relações e resultados." },
  { title: "Mentalidade e Ambiente", text: "Expandir perspectivas, romper padrões limitantes e compreender como pessoas, referências e ambientes influenciam quem você se torna e o que acredita ser possível." },
  { title: "Autoliderança e Responsabilidade", text: "Assumir o protagonismo das próprias escolhas, fortalecer postura e desenvolver a capacidade de conduzir a si mesmo antes de conduzir outras pessoas." },
  { title: "Inteligência Emocional", text: "Desenvolver equilíbrio e maturidade emocional para lidar com pressão, conflitos, mudanças e decisões sem perder clareza e direção." },
  { title: "Comunicação, Influência e Relacionamentos", text: "Aprimorar a forma de comunicar, ouvir, se posicionar e construir relações capazes de gerar confiança, conexão e influência." },
  { title: "Liderança e Gestão de Pessoas", text: "Desenvolver pessoas, construir equipes mais responsáveis e compreender que liderar não é centralizar — é criar condições para que outros também performem." },
  { title: "Delegação e Formação de Equipes", text: "Sair da centralização, delegar com clareza e desenvolver autonomia para construir uma equipe que não dependa do líder para tudo." },
  { title: "Planejamento e Direção", text: "Transformar visão em prioridades, objetivos e planos de ação, criando clareza sobre onde chegar e quais escolhas sustentam esse caminho." },
  { title: "Produtividade e Gestão do Tempo", text: "Aprender a direcionar tempo, energia e atenção para aquilo que realmente gera impacto, reduzindo dispersão e aumentando capacidade de execução." },
  { title: "Decisão e Execução", text: "Tomar decisões com mais clareza e transformar intenção em movimento, desenvolvendo disciplina, consistência e capacidade de fazer acontecer." },
  { title: "Networking e Capital Relacional", text: "Construir relações de valor, ampliar repertório e compreender como conexões, ambientes e pessoas podem acelerar desenvolvimento, negócios e oportunidades." },
  { title: "Visão de Negócio e Resultados", text: "Ampliar a visão empresarial, conectar pessoas, processos e estratégia e compreender como decisões de liderança impactam performance e resultados." },
  { title: "Mentalidade de Performance", text: "Elevar padrões pessoais e profissionais, desenvolver consistência e construir uma mentalidade orientada à evolução e a resultados sustentáveis." },
  { title: "Identidade, Propósito e Próximo Nível", text: "Integrar os aprendizados da jornada para definir com mais clareza quem você escolhe ser, o que deseja construir e qual será o seu próximo movimento." },
];

export const units: Unit[] = [
  { city: "Montenegro · RS (Matriz)", street: "Rua Santos Dumont, 1610", locality: "Montenegro - RS", cep: "92510-285", phone: "Michael Lencina · (51) 99349-0339", phoneHref: "tel:+5551993490339", mapUrl: "https://www.google.com/maps/search/?api=1&query=Rua%20Santos%20Dumont%201610%20Montenegro%20RS", routeUrl: "https://www.google.com/maps/dir/?api=1&destination=Rua%20Santos%20Dumont%201610%20Montenegro%20RS", embedUrl: "https://www.google.com/maps?q=Rua%20Santos%20Dumont%201610%20Montenegro%20RS&output=embed", reviewsUrl: "https://www.google.com/search?q=MyWay+Treinamentos+Montenegro+avalia%C3%A7%C3%B5es#lrd=0x951bfb14ac721f11:0xcc6a3b860eb71c24,1" },
  { city: "Feliz · RS", street: "Rua Pedro Noll, 789", locality: "Feliz - RS", cep: "95768-000", phone: "Cláudio Ritter · (51) 99177-8866", phoneHref: "tel:+5551991778866", mapUrl: "https://www.google.com/maps/search/?api=1&query=R.%20Pedro%20Noll%2C%20789%2C%20Feliz%20-%20RS%2C%2095768-000", routeUrl: "https://www.google.com/maps/dir/?api=1&destination=R.%20Pedro%20Noll%2C%20789%2C%20Feliz%20-%20RS%2C%2095768-000", embedUrl: "https://www.google.com/maps?q=R.%20Pedro%20Noll%2C%20789%2C%20Feliz%20-%20RS%2C%2095768-000&output=embed", reviewsUrl: "https://www.google.com/search?q=MyWay+Feliz+RS" },
];

export const whatsappUrl = "https://wa.me/5551993601857";
