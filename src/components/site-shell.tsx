import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSessionUser } from "@/lib/auth";

/** Moldura das páginas públicas: header, conteúdo e rodapé. */
export async function SiteShell({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <SiteHeader user={user} />
      {/* flex-1 empurra o rodapé para o fim da tela em páginas curtas, como a 404. */}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
