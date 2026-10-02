import type { ReactNode } from "react";
import { ButtonLink, cn, container } from "@/components/ui";

/** Moldura das páginas da conta (Meus cursos, Minhas compras): título e conteúdo. */
export function AccountPage({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={cn(container, "pb-24 pt-14 sm:pb-32")}>
      <h1 id={id} className="font-heading text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink sm:text-[32px]">
        {title}
      </h1>
      {children}
    </section>
  );
}

export function AccountEmptyState({ title, body, cta }: { title: string; body: string; cta: string }) {
  return (
    <div className="mt-8 rounded-md border border-line bg-surface px-6 py-12 text-center sm:py-16">
      <p className="font-heading text-[20px] font-semibold tracking-[-0.012em] text-ink">{title}</p>
      <p className="mt-2 font-sans text-[15px] text-ink-tertiary">{body}</p>
      <ButtonLink href="/cursos" className="mt-6">
        {cta}
      </ButtonLink>
    </div>
  );
}
