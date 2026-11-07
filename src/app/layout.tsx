import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

const aktiv = localFont({
  src: [
    {
      path: "../../marca/2. SITE MW/Tipografias/Aktiv/AktivGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../marca/2. SITE MW/Tipografias/Aktiv/AktivGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../marca/2. SITE MW/Tipografias/Aktiv/AktivGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../marca/2. SITE MW/Tipografias/Aktiv/AktivGrotesk-XBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-aktiv",
});

const binoma = localFont({
  src: [
    {
      path: "../../marca/2. SITE MW/Tipografias/Binoma/BinomaTrialRegular-R9Kvv.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../marca/2. SITE MW/Tipografias/Binoma/BinomaTrialBold-1jPDj.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-binoma",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.shortName,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  other: {
    "facebook-domain-verification": "qlmkgdbdtmx0ewmlcmcooq1kvj1dsj",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${aktiv.variable} ${binoma.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
