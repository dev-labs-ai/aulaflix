"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  AuthAlert,
  AuthCard,
  AuthDivider,
  AuthHeading,
  AuthSwitch,
  BackLink,
  Emphasis,
  PrototypeNotice,
  fieldLabelClass,
  inlineLinkClass,
  submitButtonClass,
} from "@/components/auth/auth-ui";
import { CodeInput } from "@/components/auth/code-input";
import { simulateRequest, useFieldValidation, useResendCountdown } from "@/components/auth/hooks";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
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

// Protótipo: nada é enviado a um backend. O cadastro valida os campos, simula o envio
// do código e aceita qualquer código de 6 dígitos na confirmação.

type Values = { name: string; email: string; password: string; confirm: string };

/** Cadastro em duas etapas: dados da conta e confirmação do e-mail por código. */
export function SignUpFlow() {
  const [values, setValues] = useState<Values>({ name: "", email: "", password: "", confirm: "" });
  const [step, setStep] = useState<"form" | "code">("form");
  const [pending, setPending] = useState(false);
  const [oauthNotice, setOauthNotice] = useState(false);

  const errors: Partial<Record<keyof Values, string>> = {};
  if (!values.name.trim()) errors.name = authErrors.nameRequired;
  if (!values.email.trim()) errors.email = authErrors.emailRequired;
  else if (!isEmail(values.email)) errors.email = authErrors.emailInvalid;
  if (values.password.length < AUTH_PASSWORD_MIN_LENGTH) errors.password = authErrors.passwordTooShort;
  if (values.confirm !== values.password) errors.confirm = authErrors.passwordMismatch;

  const validation = useFieldValidation(values, errors);
  const field = (name: keyof Values) => ({
    value: values[name],
    onChange: (event: { target: { value: string } }) => setValues((v) => ({ ...v, [name]: event.target.value })),
    onBlur: validation.touch(name),
    error: validation.errorFor(name),
  });

  function goTo(next: "form" | "code") {
    setStep(next);
    window.scrollTo({ top: 0 });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !validation.submit()) return;
    setPending(true);
    await simulateRequest();
    setPending(false);
    goTo("code");
  }

  if (step === "code") {
    return <EmailCodeStep email={values.email.trim()} onChangeEmail={() => goTo("form")} />;
  }

  return (
    <>
      <AuthHeading title={authCopy.signUp.title} />
      <AuthCard label={authCopy.signUp.title}>
        <OAuthButtons onSelect={() => setOauthNotice(true)} />
        <AuthDivider />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {oauthNotice && <PrototypeNotice>{authCopy.prototype.unavailable}</PrototypeNotice>}
          <TextField
            label={authCopy.fields.name}
            name="name"
            autoComplete="name"
            placeholder={authCopy.fields.namePlaceholder}
            {...field("name")}
          />
          <TextField
            label={authCopy.fields.email}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={authCopy.fields.emailPlaceholder}
            {...field("email")}
          />
          <TextField
            label={authCopy.fields.password}
            name="new-password"
            autoComplete="new-password"
            password
            hint={authCopy.fields.passwordHint}
            {...field("password")}
          />
          <TextField
            label={authCopy.fields.confirmPassword}
            name="confirm-password"
            autoComplete="new-password"
            password
            {...field("confirm")}
          />
          <button type="submit" disabled={pending} className={cn(submitButtonClass, "mt-2")}>
            {authCopy.signUp.submit}
          </button>
          <p className="font-sans text-[13px] leading-5 text-ink-muted">{authCopy.signUp.codeNotice}</p>
        </form>
      </AuthCard>
      <AuthSwitch prompt={authCopy.signUp.switchPrompt}>
        <Link href="/entrar" className={inlineLinkClass}>
          {authCopy.signUp.switchLink}
        </Link>
      </AuthSwitch>
    </>
  );
}

function EmailCodeStep({ email, onChangeEmail }: { email: string; onChangeEmail: () => void }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "verified">("idle");
  const [resent, setResent] = useState(false);
  const countdown = useResendCountdown(AUTH_RESEND_SECONDS);

  async function verify(value: string) {
    if (status !== "idle" || value.length !== AUTH_CODE_LENGTH) return;
    setStatus("pending");
    await simulateRequest();
    setStatus("verified");
  }

  function resend() {
    setCode("");
    setResent(true);
    countdown.restart();
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <BackLink onClick={onChangeEmail} />
        <AuthHeading title={authCopy.verify.title} body={<Emphasis parts={authCopy.verify.body(email)} />} />
      </div>
      <AuthCard label={authCopy.verify.title}>
        {status === "verified" ? (
          <PrototypeNotice>
            {authCopy.prototype.verified}{" "}
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void verify(code);
          }}
          className="flex flex-col gap-5"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email-code" className={fieldLabelClass}>
              {authCopy.fields.code}
            </label>
            <CodeInput
              id="email-code"
              value={code}
              onChange={setCode}
              onComplete={(value) => void verify(value)}
              disabled={status !== "idle"}
              autoFocus
            />
          </div>
          <button type="submit" disabled={status !== "idle" || code.length !== AUTH_CODE_LENGTH} className={submitButtonClass}>
            {authCopy.verify.submit}
          </button>
        </form>
        {status !== "verified" && (
          <div className="flex flex-col gap-0.5">
            <p className="font-sans text-[14px] leading-[22px] text-ink-tertiary">{authCopy.resend.notReceived}</p>
            <button
              type="button"
              onClick={resend}
              disabled={countdown.remaining > 0}
              className="self-start rounded-sm font-sans text-[14px] font-semibold leading-[22px] text-ink-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-default disabled:text-ink-muted disabled:no-underline"
            >
              {countdown.remaining > 0 ? (
                <>
                  {authCopy.resend.countdown} <span className="font-mono text-[13px]">{countdown.label}</span>
                </>
              ) : (
                authCopy.resend.action
              )}
            </button>
          </div>
        )}
      </AuthCard>
      <AuthSwitch prompt={authCopy.verify.wrongEmail}>
        <button type="button" onClick={onChangeEmail} className={inlineLinkClass}>
          {authCopy.verify.changeEmail}
        </button>
      </AuthSwitch>
    </>
  );
}
