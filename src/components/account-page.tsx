import type { ReactNode } from "react";
import { ButtonLink, cn, container } from "@/components/ui";

/** Moldura das páginas da conta (Meus cursos, Minhas compras): título e conteúdo. */
export function AccountPage({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={cn(container, "pb-24 pt-14 sm:pb-32")}>
      <h1 id={id} className="font-heading text-[32px] font-bold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[40px]">
        {title}
      </h1>
      {children}
    </section>
  );
}

export function AccountEmptyState({ title, body, cta }: { title: string; body: string; cta: string }) {
  return (
    <div className="mt-8 rounded-card border border-dashed border-line-strong bg-surface px-6 py-12 text-center sm:py-16">
      <p className="font-heading text-[22px] font-bold tracking-[-0.015em] text-ink">{title}</p>
      <p className="mt-2 text-[16px] text-ink-tertiary">{body}</p>
      <ButtonLink href="/cursos" className="mt-6">
        {cta}
      </ButtonLink>
    </div>
  );
}
