"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthCard, AuthHeading, BackLink, Emphasis, submitButtonClass } from "@/components/auth/auth-ui";
import { simulateRequest, useFieldValidation } from "@/components/auth/hooks";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import { TextField } from "@/components/auth/text-field";
import { cn } from "@/components/ui";
import { authCopy, authErrors, isEmail } from "@/content/auth";

// Protótipo: nada é enviado a um backend. O pedido de código é simulado e qualquer
// código de 6 dígitos é aceito na troca de senha.

/** Redefinição de senha em duas etapas: pedir o código por e-mail e criar a nova senha. */
export function PasswordResetFlow() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "reset">("email");
  const [pending, setPending] = useState(false);

  const validation = useFieldValidation(
    { email },
    { email: !email.trim() ? authErrors.emailRequired : isEmail(email) ? undefined : authErrors.emailInvalid },
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !validation.submit()) return;
    setPending(true);
    await simulateRequest();
    setPending(false);
    setStep("reset");
  }

  if (step === "reset") {
    return (
      <>
        <div className="flex flex-col gap-6">
          <BackLink onClick={() => setStep("email")} />
          <AuthHeading title={authCopy.reset.title} body={<Emphasis parts={authCopy.reset.body(email.trim())} />} />
        </div>
        <AuthCard label={authCopy.reset.title}>
          <NewPasswordForm
            email={email.trim()}
            submitLabel={authCopy.reset.submit}
            savedNotice={
              <>
                {authCopy.prototype.passwordSaved}{" "}
                <Link href="/" className="font-semibold underline underline-offset-2">
                  {authCopy.prototype.goHome}
                </Link>
              </>
            }
          />
        </AuthCard>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <BackLink onClick={() => router.push("/entrar")} />
        <AuthHeading title={authCopy.forgot.title} />
      </div>
      <AuthCard label={authCopy.forgot.title}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <TextField
            label={authCopy.fields.email}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={authCopy.fields.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={validation.touch("email")}
            error={validation.errorFor("email")}
          />
          <button type="submit" disabled={pending} className={cn(submitButtonClass, "mt-2")}>
            {authCopy.forgot.submit}
          </button>
        </form>
      </AuthCard>
    </>
  );
}
