import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { ButtonLink, cn, container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

/**
 * 404 de endereços inexistentes e de `notFound()` (ex.: curso que não existe).
 * Fica na raiz, fora do grupo `(site)`, então monta header e rodapé por conta própria.
 */
export default function NotFound() {
  return (
    <SiteShell>
      <section aria-labelledby="not-found-title" className={cn(container, "pb-28 pt-16 sm:pb-36 sm:pt-24 lg:pb-40 lg:pt-32")}>
        <p className="font-heading text-[20px] font-bold text-ink-muted">Erro 404</p>
        <h1
          id="not-found-title"
          className="mt-3 font-heading text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[56px] lg:text-[64px]"
        >
          Página não encontrada
        </h1>
        <p className="mt-6 max-w-[56ch] text-pretty text-[17px] leading-[1.6] text-ink-tertiary sm:text-[18px]">
          O endereço pode ter mudado ou o conteúdo não existe mais. Confira o link ou siga por um dos caminhos abaixo.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href="/">Ir para a página inicial</ButtonLink>
          <ButtonLink href="/cursos" variant="secondary">
            Ver todos os cursos
          </ButtonLink>
        </div>
      </section>
    </SiteShell>
  );
}
