import type { Metadata } from "next";
import localFont from "next/font/local";
import { CustomCursor } from "@/components/custom-cursor";
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
  title: "MyWay | Lidere suas escolhas",
  description:
    "Treinamentos para transformar escolhas, relações e resultados.",
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
        <CustomCursor />
      </body>
    </html>
  );
}
