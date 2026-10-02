"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  AuthAlert,
  AuthCard,
  AuthHeading,
  BackLink,
  Emphasis,
  PrototypeNotice,
  ResendCode,
  fieldLabelClass,
  submitButtonClass,
} from "@/components/auth/auth-ui";
import { CodeInput } from "@/components/auth/code-input";
import { simulateRequest, useFieldValidation, useResendCountdown } from "@/components/auth/hooks";
import { TextField } from "@/components/auth/text-field";
import { cn } from "@/components/ui";
import {
  AUTH_CODE_LENGTH,
  AUTH_PASSWORD_MIN_LENGTH,
  AUTH_RESEND_SECONDS,
  authCopy,
  authErrors,
  isEmail,
} from "@/content/auth";

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
          <NewPasswordForm email={email.trim()} />
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

function NewPasswordForm({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const [values, setValues] = useState({ password: "", confirm: "" });
  const [status, setStatus] = useState<"idle" | "pending" | "saved">("idle");
  const [resent, setResent] = useState(false);
  const countdown = useResendCountdown(AUTH_RESEND_SECONDS);

  const validation = useFieldValidation(values, {
    password: values.password.length < AUTH_PASSWORD_MIN_LENGTH ? authErrors.passwordTooShort : undefined,
    confirm: values.confirm !== values.password ? authErrors.passwordMismatch : undefined,
  });
  const field = (name: keyof typeof values) => ({
    value: values[name],
    onChange: (event: { target: { value: string } }) => setValues((v) => ({ ...v, [name]: event.target.value })),
    onBlur: validation.touch(name),
    error: validation.errorFor(name),
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle" || !validation.submit() || code.length !== AUTH_CODE_LENGTH) return;
    setStatus("pending");
    await simulateRequest();
    setStatus("saved");
  }

  function resend() {
    setCode("");
    setResent(true);
    countdown.restart();
  }

  return (
    <>
      {status === "saved" ? (
        <PrototypeNotice>
          {authCopy.prototype.passwordSaved}{" "}
          <Link href="/" className="font-semibold underline underline-offset-2">
            {authCopy.prototype.goHome}
          </Link>
        </PrototypeNotice>
      ) : (
        resent && (
          <AuthAlert tone="info">
            <Emphasis parts={authCopy.resend.sent(email)} inherit />
          </AuthAlert>
        )
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-2">
          <label htmlFor="password-code" className={fieldLabelClass}>
            {authCopy.fields.code}
          </label>
          <CodeInput id="password-code" value={code} onChange={setCode} disabled={status !== "idle"} autoFocus />
        </div>
        <TextField
          label={authCopy.fields.newPassword}
          name="new-password"
          autoComplete="new-password"
          password
          hint={authCopy.fields.passwordHint}
          disabled={status === "saved"}
          {...field("password")}
        />
        <TextField
          label={authCopy.fields.confirmNewPassword}
          name="confirm-password"
          autoComplete="new-password"
          password
          disabled={status === "saved"}
          {...field("confirm")}
        />
        <button
          type="submit"
          disabled={status !== "idle" || code.length !== AUTH_CODE_LENGTH}
          className={cn(submitButtonClass, "mt-1")}
        >
          {authCopy.reset.submit}
        </button>
      </form>
      {status !== "saved" && <ResendCode countdown={countdown} onResend={resend} />}
    </>
  );
}
