"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";
import { Emphasis } from "@/components/auth/auth-ui";
import { simulateRequest } from "@/components/auth/hooks";
import { cn, container, focusRing } from "@/components/ui";
import { authCopy } from "@/content/auth";
import { confirmEmail } from "@/lib/auth-actions";

const actionClass = cn(
  "rounded-control font-bold underline decoration-2 underline-offset-4 transition-colors hover:text-ink disabled:no-underline disabled:opacity-70",
  focusRing,
  "focus-visible:ring-offset-amarelo-100",
);

/**
 * Faixa abaixo do header para quem criou a conta e ainda não confirmou o e-mail.
 * Não bloqueia nada: a conta funciona normalmente enquanto isso.
 */
export function EmailConfirmationNotice({ email }: { email: string }) {
  const [resend, setResend] = useState<"idle" | "pending" | "sent">("idle");

  async function handleResend() {
    setResend("pending");
    // Protótipo: nenhum e-mail é enviado de verdade.
    await simulateRequest();
    setResend("sent");
  }

  return (
    <div className="border-b border-amarelo-300 bg-amarelo-100 text-amarelo-700">
      <div className={cn(container, "flex flex-wrap items-center gap-x-5 gap-y-2 py-3 text-[15px] leading-[22px]")}>
        <p className="flex items-start gap-2">
          <MailCheck aria-hidden="true" className="mt-[3px] size-4 shrink-0" />
          <span>
            <Emphasis parts={authCopy.confirmEmail.body(email)} inherit />
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {/* A região fica sempre no DOM, para "Link reenviado" ser anunciado. */}
          <span role="status">
            {resend === "sent" ? (
              authCopy.confirmEmail.resent
            ) : (
              <button type="button" onClick={handleResend} disabled={resend === "pending"} className={actionClass}>
                {authCopy.confirmEmail.resend}
              </button>
            )}
          </span>
          <form action={confirmEmail}>
            <button type="submit" className={actionClass}>
              {authCopy.confirmEmail.simulate}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
