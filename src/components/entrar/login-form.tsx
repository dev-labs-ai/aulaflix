"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/components/ui";
import { textLinkClass } from "@/components/entrar/styles";

// Protótipo visual: não há backend de autenticação. O envio só valida os campos
// e mostra um aviso.

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-canvas";

const baseButton =
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-sans transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

const oauthButton = cn(
  baseButton,
  focusRing,
  "h-11 w-full gap-2.5 border border-line bg-surface px-5 py-2 text-[15px] font-semibold text-ink hover:bg-surface-muted",
);

const inputClass =
  "block h-11 w-full rounded-sm border bg-surface px-3.5 font-sans text-[15px] text-ink placeholder:text-ink-muted focus:border-line-accent focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 focus:ring-offset-surface-raised disabled:opacity-60";

const labelClass = "block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted";

const prototypeNotice = "Protótipo: a autenticação ainda não está disponível.";

type Errors = { email?: string; password?: string };

function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GithubMarkIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="font-sans text-[13px] leading-[18px] text-danger-500">
      {message}
    </p>
  );
}

export function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    const next: Errors = {};
    if (!email) next.email = "Informe seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Informe um e-mail válido.";
    if (!password) next.password = "Informe sua senha.";

    setErrors(next);
    setNotice(Object.keys(next).length === 0 ? prototypeNotice : null);
  }

  return (
    <section
      aria-label="Entrar"
      className="flex flex-col gap-5 sm:rounded-lg sm:border sm:border-line-subtle sm:bg-surface-raised sm:p-8 sm:shadow-(--shadow-raised)"
    >
      <div className="grid gap-3">
        <button type="button" className={oauthButton} onClick={() => setNotice(prototypeNotice)}>
          <GoogleIcon />
          Continuar com Google
        </button>
        <button type="button" className={oauthButton} onClick={() => setNotice(prototypeNotice)}>
          <GithubMarkIcon />
          Continuar com GitHub
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px grow bg-line" />
        <span className="font-mono text-[11px] font-semibold uppercase leading-[14px] tracking-[0.12em] text-ink-muted">ou</span>
        <div className="h-px grow bg-line" />
      </div>

      <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={emailId} className={labelClass}>
              E-mail
            </label>
          </div>
          <div className="relative">
            <input
              id={emailId}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="seu@email.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
              className={cn(inputClass, errors.email ? "border-danger-500" : "border-line")}
            />
          </div>
          <FieldError id={`${emailId}-error`} message={errors.email} />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={passwordId} className={labelClass}>
              Senha
            </label>
            <Link href="/redefinir-senha" className={cn(textLinkClass, "text-[13px] leading-[18px]")}>
              Esqueci minha senha
            </Link>
          </div>
          <div className="relative">
            <input
              id={passwordId}
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? `${passwordId}-error` : undefined}
              className={cn(inputClass, "pr-12", errors.password ? "border-danger-500" : "border-line")}
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-0 top-0 flex size-11 items-center justify-center rounded-sm text-ink-tertiary hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              {showPassword ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
            </button>
          </div>
          <FieldError id={`${passwordId}-error`} message={errors.password} />
        </div>

        <button
          type="submit"
          className={cn(
            baseButton,
            focusRing,
            "mt-2 h-12 w-full gap-2 bg-surface-accent px-6 text-[15px] font-semibold text-ink-inverse hover:bg-accent-600",
          )}
        >
          Entrar
        </button>

        {notice && (
          <p role="status" className="rounded-sm bg-warning-100 px-3.5 py-2.5 font-sans text-[14px] leading-[20px] text-warning-500">
            {notice}
          </p>
        )}
      </form>
    </section>
  );
}
