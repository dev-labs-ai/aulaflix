"use client";

import { createContext, useContext, useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/components/ui";
import styles from "./waitlist.module.css";

// Protótipo: nada é enviado a um backend. A inscrição fica só no estado do cliente
// e é compartilhada entre os cards da página (mobile e lateral).

type Submission = { name: string; email: string };

const WaitlistContext = createContext<{
  submission: Submission | null;
  setSubmission: (s: Submission) => void;
} | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [submission, setSubmission] = useState<Submission | null>(null);
  return <WaitlistContext.Provider value={{ submission, setSubmission }}>{children}</WaitlistContext.Provider>;
}

function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("WaitlistCard precisa estar dentro de <WaitlistProvider>.");
  return ctx;
}

export function WaitlistCard({ courseTitle }: { courseTitle: string }) {
  const { submission } = useWaitlist();
  return (
    <div className="rounded-md border border-line-subtle bg-surface-raised p-6 shadow-(--shadow-raised) sm:p-7">
      {submission ? (
        <WaitlistConfirmed courseTitle={courseTitle} {...submission} />
      ) : (
        <>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-accent">Lista de espera</p>
          <p className="mt-4 font-heading text-[20px] font-semibold leading-[1.2] tracking-[-0.012em] text-ink sm:text-[22px]">
            Entre na lista deste curso.
          </p>
          <p className="mt-3 font-sans text-[13px] leading-[1.55] text-ink-tertiary">
            Você recebe as próximas atualizações por e-mail e ajuda a mostrar quais temas devem entrar primeiro em
            produção.
          </p>
          <div className="mt-6">
            <WaitlistForm />
          </div>
        </>
      )}
    </div>
  );
}

const countries = [
  { code: "BR", label: "Brasil" },
  { code: "PT", label: "Portugal" },
  { code: "US", label: "Estados Unidos" },
  { code: "ZZ", label: "Internacional" },
] as const;

type CountryCode = (typeof countries)[number]["code"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: { name: string; email: string; phone: string }) {
  const digits = values.phone.replace(/\D/g, "");
  return {
    name: values.name.trim() ? null : "Informe seu nome.",
    email: emailPattern.test(values.email.trim()) ? null : "Informe um e-mail válido.",
    phone: !digits || (digits.length >= 8 && digits.length <= 15) ? null : "Informe um telefone válido.",
  };
}

const inputClass = (invalid: boolean) =>
  cn(
    "block w-full rounded-sm border bg-surface px-3.5 py-2.5 font-sans text-[15px] text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-raised disabled:opacity-60",
    invalid ? "border-danger-500 focus:ring-danger-100" : "border-line focus:border-line-accent focus:ring-focus",
  );

const labelClass = "block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted";

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="font-sans text-[12px] leading-[1.45] text-danger-500">
      {children}
    </p>
  );
}

function WaitlistForm() {
  const { setSubmission } = useWaitlist();
  const id = useId();
  const [values, setValues] = useState({ name: "", email: "", phone: "" });
  const [country, setCountry] = useState<CountryCode>("BR");
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });
  const [pending, setPending] = useState(false);

  const errors = validate(values);
  const canSubmit = !errors.name && !errors.email && !errors.phone && !pending;
  const show = (field: keyof typeof touched) => (touched[field] ? errors[field] : null);

  const update = (field: keyof typeof values) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));
  const blur = (field: keyof typeof touched) => () => setTouched((t) => ({ ...t, [field]: true }));

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    if (!canSubmit) return;
    setPending(true);
    // Simula a latência de uma requisição.
    setTimeout(() => setSubmission({ name: values.name.trim(), email: values.email.trim() }), 600);
  }

  return (
    <form className="space-y-3.5" noValidate onSubmit={onSubmit}>
      <div className="space-y-1.5">
        <label htmlFor={`${id}-name`} className={labelClass}>
          Nome
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Seu nome"
          value={values.name}
          onChange={update("name")}
          onBlur={blur("name")}
          disabled={pending}
          aria-invalid={Boolean(show("name"))}
          aria-describedby={show("name") ? `${id}-name-error` : undefined}
          className={inputClass(Boolean(show("name")))}
        />
        {show("name") && <FieldError id={`${id}-name-error`}>{show("name")}</FieldError>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor={`${id}-email`} className={labelClass}>
          E-mail
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="seu@email.com"
          value={values.email}
          onChange={update("email")}
          onBlur={blur("email")}
          disabled={pending}
          aria-invalid={Boolean(show("email"))}
          aria-describedby={show("email") ? `${id}-email-error` : undefined}
          className={inputClass(Boolean(show("email")))}
        />
        {show("email") && <FieldError id={`${id}-email-error`}>{show("email")}</FieldError>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor={`${id}-phone`} className={cn(labelClass, "flex items-baseline justify-between")}>
          <span>Telefone</span>
          <span className="font-mono text-[10px] normal-case tracking-[0.08em] text-ink-muted">opcional</span>
        </label>
        <div
          className={cn(
            "flex w-full items-center border bg-surface px-3.5 py-2.5 font-sans focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-surface-raised",
            "rounded-sm",
            show("phone")
              ? "border-danger-500 focus-within:ring-danger-100"
              : "border-line focus-within:border-line-accent focus-within:ring-focus",
            pending && "opacity-60",
          )}
        >
          <div className="relative mr-3 flex items-center self-stretch">
            <select
              aria-label="País"
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryCode)}
              disabled={pending}
              className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <Flag code={country} />
            <ChevronDown aria-hidden="true" className="ml-1 size-3 text-ink-muted" />
          </div>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            value={values.phone}
            onChange={update("phone")}
            onBlur={blur("phone")}
            disabled={pending}
            aria-invalid={Boolean(show("phone"))}
            aria-describedby={show("phone") ? `${id}-phone-error` : undefined}
            className="min-w-0 flex-1 border-0 bg-transparent p-0 font-sans text-[15px] text-ink outline-none placeholder:text-ink-muted disabled:cursor-not-allowed"
          />
        </div>
        {show("phone") && <FieldError id={`${id}-phone-error`}>{show("phone")}</FieldError>}
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-surface-accent px-5 py-3 font-sans text-[15px] font-semibold text-ink-inverse transition-colors enabled:hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-surface-raised disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-muted"
      >
        {pending ? "Entrando…" : "Entrar na lista"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

function WaitlistConfirmed({ name, email, courseTitle }: Submission & { courseTitle: string }) {
  const firstName = name.split(/\s+/)[0] ?? "";
  return (
    <output aria-live="polite" className={cn("block", styles.success)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("block size-9 text-ink-accent", styles.mark)}
      >
        <path d="M7 17 L 13 23 L 25 10" pathLength={100} />
      </svg>
      <h3
        className={cn(
          "mt-5 font-heading text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[28px]",
          styles.fadeUp,
          styles.delayTitle,
        )}
      >
        {firstName ? `Obrigado, ${firstName}! Você está na lista.` : "Obrigado! Você está na lista."}
      </h3>
      <p
        className={cn(
          "mt-3 max-w-[44ch] font-sans text-[15px] leading-[1.6] text-ink-secondary",
          styles.fadeUp,
          styles.delayBody,
        )}
      >
        Registrei seu interesse em <span className="text-ink">{courseTitle}</span>. Vou enviar as próximas atualizações
        para <span className={cn("font-mono text-[13.5px] text-ink", styles.email)}>{email}</span>.
      </p>
    </output>
  );
}

/** Bandeiras simplificadas (emoji de bandeira não renderiza em todos os sistemas). */
function Flag({ code }: { code: CountryCode }) {
  const box = "block h-4 w-6 overflow-hidden rounded-[2px]";
  switch (code) {
    case "BR":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={box}>
          <rect width="24" height="16" fill="#009b3a" />
          <path d="M12 2 22 8 12 14 2 8z" fill="#fedf00" />
          <circle cx="12" cy="8" r="3.4" fill="#002776" />
        </svg>
      );
    case "PT":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={box}>
          <rect width="24" height="16" fill="#da291c" />
          <rect width="9.6" height="16" fill="#046a38" />
          <circle cx="9.6" cy="8" r="3" fill="#ffe900" />
        </svg>
      );
    case "US":
      return (
        <svg viewBox="0 0 24 16" aria-hidden="true" className={box}>
          <rect width="24" height="16" fill="#fff" />
          {[0, 2, 4, 6, 8, 10, 12].map((i) => (
            <rect key={i} y={(i * 16) / 13} width="24" height={16 / 13} fill="#b22234" />
          ))}
          <rect width="10.4" height="8.6" fill="#3c3b6e" />
        </svg>
      );
    default:
      return <Globe aria-hidden="true" className="size-4 text-ink-muted" />;
  }
}
