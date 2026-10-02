"use client";

import Link from "next/link";
import { useActionState, useId, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { TriangleAlert } from "lucide-react";
import { buttonClass, cn, focusRing, ringOffset } from "@/components/ui";
import { joinWaitlist, joinWaitlistWithEmail, leaveWaitlist } from "@/lib/waitlist-actions";
import styles from "./waitlist.module.css";

// Lista de espera na lousa da página de curso. Com a conta, basta um clique em "Avise-me";
// sem a conta, só o e-mail. Protótipo: a inscrição fica num cookie e nenhum aviso é enviado.

const introClass = "max-w-[52ch] text-[17px] leading-[1.6] text-giz-apagado";

function ChalkSubmit({ children, pendingLabel }: { children: ReactNode; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={cn(buttonClass("chalk", "board"), "shrink-0 disabled:opacity-70")}>
      {pending ? pendingLabel : children}
    </button>
  );
}

/** Confirmação: o check é desenhado a giz e o e-mail ganha um traço amarelo. */
function Confirmed({ email, children }: { email: string; children?: ReactNode }) {
  return (
    <div className={styles.success}>
      <p className="flex items-start gap-3 text-[18px] leading-[1.55] text-giz">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("size-7 shrink-0 text-amarelo-300", styles.mark)}
        >
          <path d="M7 17 L 13 23 L 25 10" pathLength={100} />
        </svg>
        <span>
          Pronto! Vamos avisar em <span className={cn("font-bold", styles.email)}>{email}</span> quando as inscrições
          abrirem.
        </span>
      </p>
      {children}
    </div>
  );
}

/** Para quem entrou na conta: um clique, com o e-mail da conta. */
export function WaitlistOneClick({ courseSlug, email, joined }: { courseSlug: string; email: string; joined: boolean }) {
  if (joined) {
    return (
      <Confirmed email={email}>
        <form action={leaveWaitlist.bind(null, courseSlug)} className="mt-4">
          <button
            type="submit"
            className={cn(
              "rounded-control text-[15px] font-bold text-giz-apagado underline decoration-2 underline-offset-4 transition-colors hover:text-giz",
              focusRing,
              ringOffset.board,
            )}
          >
            Não quero mais ser avisado
          </button>
        </form>
      </Confirmed>
    );
  }
  return (
    <>
      <p className={introClass}>
        O curso ainda está em produção. Com um clique, avisamos em <strong className="text-giz">{email}</strong> quando
        as inscrições abrirem.
      </p>
      <form action={joinWaitlist.bind(null, courseSlug)} className="mt-6">
        <ChalkSubmit pendingLabel="Inscrevendo…">Avise-me</ChalkSubmit>
      </form>
    </>
  );
}

/** Para quem não entrou: só o e-mail, e o convite para entrar e se inscrever com um clique. */
export function WaitlistEmail({ courseSlug }: { courseSlug: string }) {
  const id = useId();
  const [state, action] = useActionState(joinWaitlistWithEmail.bind(null, courseSlug), { error: null, email: null });

  if (state.email) return <Confirmed email={state.email} />;

  return (
    <>
      <p className={introClass}>
        O curso ainda está em produção. Deixe seu e-mail e avisamos quando as inscrições abrirem.
      </p>
      <form action={action} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-2 sm:w-80">
          <label htmlFor={`${id}-email`} className="sr-only">
            E-mail
          </label>
          <input
            id={`${id}-email`}
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="seu@email.com"
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? `${id}-error` : undefined}
            className="h-12 w-full rounded-control border-2 border-salvia-400 bg-lousa-600 px-3.5 text-[16px] text-giz placeholder:text-giz-apagado focus:border-amarelo-300 focus:outline-none aria-[invalid=true]:border-amarelo-300"
          />
          {state.error && (
            <p id={`${id}-error`} className="flex items-start gap-1.5 text-[14px] leading-5 text-amarelo-300">
              <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {state.error}
            </p>
          )}
        </div>
        <ChalkSubmit pendingLabel="Enviando…">Avise-me</ChalkSubmit>
      </form>
      <p className="mt-5 text-[15px] leading-[1.6] text-giz-apagado">
        Já tem conta?{" "}
        <Link
          href={`/entrar?next=/cursos/${courseSlug}`}
          className={cn("rounded-control font-bold text-giz underline decoration-2 underline-offset-4", focusRing, ringOffset.board)}
        >
          Entre
        </Link>{" "}
        e seja avisado com um clique.
      </p>
    </>
  );
}
