"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  AuthAlert,
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
import { AUTH_CODE_LENGTH, AUTH_PASSWORD_MIN_LENGTH, AUTH_RESEND_SECONDS, authCopy, authErrors } from "@/content/auth";

/**
 * Código recebido por e-mail + nova senha. Usado na redefinição de senha e em
 * Configurações. Protótipo: qualquer código de 6 dígitos é aceito.
 */
export function NewPasswordForm({
  email,
  submitLabel,
  savedNotice,
}: {
  email: string;
  submitLabel: string;
  /** Mensagem mostrada depois de salvar. */
  savedNotice: ReactNode;
}) {
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
        <PrototypeNotice>{savedNotice}</PrototypeNotice>
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
          {submitLabel}
        </button>
      </form>
      {status !== "saved" && <ResendCode countdown={countdown} onResend={resend} />}
    </>
  );
}
