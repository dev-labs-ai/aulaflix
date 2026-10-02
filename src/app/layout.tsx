import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import { RevealObserver } from "@/components/reveal-observer";
import { site } from "@/content/site";
import "./globals.css";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>
        <noscript>
          <style>{".reveal,.reveal-stagger>*{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
