import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Moldura das páginas públicas: header, conteúdo e rodapé. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <SiteHeader />
      {/* flex-1 empurra o rodapé para o fim da tela em páginas curtas, como a 404. */}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
