import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Só rotas públicas com conteúdo definitivo. Adicione novas páginas aqui
// (treinamentos, sobre, contato, blog) quando forem publicadas.
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/candidatura", priority: 0.8 },
  { path: "/lideranca", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
