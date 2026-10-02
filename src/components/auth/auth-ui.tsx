// Peças visuais das telas de autenticação. Sem hooks: podem ser usadas tanto por
// páginas (Server Components) quanto pelos formulários (Client Components).
import type { ReactNode } from "react";
import { ArrowLeft, CircleAlert, Mail, TriangleAlert } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/components/ui";
import { authCopy } from "@/content/auth";

export const fieldLabelClass = "block text-[15px] font-bold text-ink-secondary";

export const inlineLinkClass =
  "rounded-control font-bold text-ink-accent underline decoration-2 underline-offset-4 hover:text-ink-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";

export const submitButtonClass =
  "inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-control bg-surface-accent px-6 text-[16px] font-bold text-ink-inverse transition-colors duration-150 hover:bg-surface-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50";

/** Página isolada, sem header/rodapé do site: só o logo e o conteúdo centralizado. */
export function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <main className="flex justify-center px-4 pb-24 pt-6 sm:pt-16">
        <div className="flex w-full max-w-[440px] flex-col gap-6 sm:gap-7">
          {/* `flex` evita a linha de texto implícita em volta do link, que somaria altura. */}
          <div className="flex self-start pb-3">
            <Logo />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

export function AuthHeading({ title, body }: { title: string; body?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-heading text-[32px] font-bold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[38px]">
        {title}
      </h1>
      {body && <p className="text-[17px] leading-[1.6] text-ink-tertiary">{body}</p>}
    </div>
  );
}

/** Ficha branca com a faixa da lousa no topo (desktop); no mobile o conteúdo fica solto na página. */
export function AuthCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section
      aria-label={label}
      className="flex flex-col gap-5 sm:rounded-card sm:border sm:border-t-[6px] sm:border-line sm:border-t-lousa-500 sm:bg-surface-raised sm:p-8 sm:shadow-(--shadow-raised)"
    >
      {children}
    </section>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px grow bg-line" />
      <span className="text-[14px] text-ink-muted">
        {authCopy.divider}
      </span>
      <div className="h-px grow bg-line" />
    </div>
  );
}

export function AuthAlert({ tone, children }: { tone: "info" | "error"; children: ReactNode }) {
  const Icon = tone === "error" ? CircleAlert : Mail;
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-2 rounded-control px-3.5 py-3 text-[15px] leading-[22px]",
        tone === "error" ? "bg-error-bg text-error-text" : "bg-surface-accent-soft text-lousa-500",
      )}
    >
      <Icon aria-hidden="true" className="mt-[3px] size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/** Aviso de que a ação ainda não está conectada a um backend. */
export function PrototypeNotice({ children }: { children: ReactNode }) {
  return (
    <p
      role="status"
      className="flex items-start gap-2 rounded-control bg-warning-100 px-3.5 py-3 text-[15px] leading-[22px] text-warning-500"
    >
      <TriangleAlert aria-hidden="true" className="mt-[3px] size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-1.5 text-[14px] leading-5 text-error-text">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 self-start rounded-control text-[15px] font-bold leading-[22px] text-ink-tertiary transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      {authCopy.back}
    </button>
  );
}

/** Texto com o trecho do meio em negrito, ex.: "Mandamos um novo código para **email**." */
export function Emphasis({ parts, inherit = false }: { parts: readonly [string, string, string]; inherit?: boolean }) {
  return (
    <>
      {parts[0]}
      <strong className={cn("font-bold", !inherit && "text-ink")}>{parts[1]}</strong>
      {parts[2]}
    </>
  );
}

/** "Não recebeu?" + botão para pedir outro código, bloqueado enquanto a contagem não zera. */
export function ResendCode({
  countdown,
  onResend,
}: {
  countdown: { remaining: number; label: string };
  onResend: () => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[15px] leading-[22px] text-ink-tertiary">{authCopy.resend.notReceived}</p>
      <button
        type="button"
        onClick={onResend}
        disabled={countdown.remaining > 0}
        className="self-start rounded-control text-[15px] font-bold leading-[22px] text-ink-accent underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-default disabled:text-ink-muted disabled:no-underline"
      >
        {countdown.remaining > 0 ? (
          <>
            {authCopy.resend.countdown} <span className="tabular-nums">{countdown.label}</span>
          </>
        ) : (
          authCopy.resend.action
        )}
      </button>
    </div>
  );
}

export function AuthSwitch({ prompt, children }: { prompt: string; children: ReactNode }) {
  return (
    <p className="text-[15px] leading-[22px] text-ink-tertiary">
      {prompt} {children}
    </p>
  );
}
