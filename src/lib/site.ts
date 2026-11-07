// Dados institucionais usados em SEO, sitemap e dados estruturados.
export const site = {
  name: "MyWay Treinamentos",
  shortName: "MyWay",
  url: "https://www.mywaytreinamentos.com.br",
  title: "MyWay | Lidere suas escolhas",
  description:
    "Treinamento presencial para transformar escolhas, relações e resultados.",
  phone: "+55 51 99360-1857",
  instagram: "https://www.instagram.com/mywaytreinamentos/",
  youtube: "https://www.youtube.com/channel/UCDTPq1wg3nrgNN_DtXMAZWA/videos",
  locations: [
    {
      name: "MyWay Treinamentos · Montenegro (Matriz)",
      street: "Rua Santos Dumont, 1610",
      city: "Montenegro",
      postalCode: "92510-285",
      phone: "+55 51 99349-0339",
    },
    {
      name: "MyWay Treinamentos · Feliz",
      street: "Rua Pedro Noll, 789",
      city: "Feliz",
      postalCode: "95768-000",
      phone: "+55 51 99177-8866",
    },
  ],
} as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/myway-logo-blue.jpg`,
    description: site.description,
    telephone: site.phone,
    sameAs: [site.instagram, site.youtube],
    department: site.locations.map((location) => ({
      "@type": "LocalBusiness",
      name: location.name,
      telephone: location.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.street,
        addressLocality: location.city,
        addressRegion: "RS",
        postalCode: location.postalCode,
        addressCountry: "BR",
      },
    })),
  };
}
