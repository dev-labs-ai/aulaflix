import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// `opsz` deixa os títulos grandes com o desenho de display da fonte.
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz"] });
// O Next não tem as métricas desta fonte para gerar o fallback ajustado; sem isso ele avisa a cada build.
const atkinson = Atkinson_Hyperlegible_Next({ variable: "--font-atkinson", subsets: ["latin"], adjustFontFallback: false });

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${atkinson.variable}`}>
      <body>{children}</body>
    </html>
  );
}
