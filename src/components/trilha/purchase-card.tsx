"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CircleCheck } from "lucide-react";
import { cn } from "@/components/ui";
import { trilhaPricing } from "@/content/trilha";

type Step = { kind: "offer" } | { kind: "checkout" } | { kind: "done"; name: string; email: string; method: string };

const primaryButton =
  "inline-flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-surface-accent px-6 font-sans text-[16px] font-semibold text-ink-inverse transition-colors duration-150 hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-surface-raised";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-sm border border-line bg-canvas px-3.5 font-sans text-[15px] text-ink placeholder:text-ink-muted transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100";

const labelClass = "font-sans text-[12px] font-semibold uppercase leading-4 tracking-[0.08em] text-ink-muted";

/**
 * Cartão de compra da Trilha. Protótipo: o checkout só troca de estado no cliente,
 * nenhum dado é enviado e nenhum pagamento é processado.
 */
export function PurchaseCard({ className }: { className?: string }) {
  const [step, setStep] = useState<Step>({ kind: "offer" });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStep({
      kind: "done",
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      method: String(data.get("method") ?? "pix"),
    });
  };

  return (
    <div
      id="trilha-hero-form"
      className={cn(
        "flex scroll-mt-24 flex-col overflow-hidden rounded-md bg-surface-raised shadow-(--shadow-raised)",
        className,
      )}
    >
      <div className="flex flex-col p-6 sm:p-7" aria-live="polite">
        <p className={labelClass}>{trilhaPricing.label}</p>
        <p className="mt-2.5 font-mono text-[56px] font-semibold leading-[60px] tracking-[-0.02em] tabular-nums text-ink">
          {trilhaPricing.price}
        </p>
        <p className="mt-2 font-mono text-[16px] tabular-nums text-ink-tertiary">{trilhaPricing.installments}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[16px] font-semibold tabular-nums text-ink">{trilhaPricing.pix}</span>
          <span className="inline-flex items-center rounded-full bg-preview-bg px-2.5 py-1 font-sans text-[11px] font-semibold uppercase leading-[14px] tracking-[0.08em] text-preview-text">
            {trilhaPricing.pixBadge}
          </span>
        </div>

        {step.kind === "offer" && (
          <button type="button" className={cn(primaryButton, "mt-6")} onClick={() => setStep({ kind: "checkout" })}>
            Comprar a Trilha
            <ArrowRight aria-hidden="true" className="size-[18px]" />
          </button>
        )}

        {step.kind === "checkout" && (
          <form className="mt-6 flex flex-col gap-4" onSubmit={submit}>
            <label className="block">
              <span className={labelClass}>Nome</span>
              <input name="name" required autoComplete="name" placeholder="Seu nome" className={fieldClass} />
            </label>
            <label className="block">
              <span className={labelClass}>E-mail</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="voce@email.com"
                className={fieldClass}
              />
            </label>
            <fieldset>
              <legend className={labelClass}>Pagamento</legend>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {[
                  { value: "pix", label: "Pix" },
                  { value: "card", label: "Cartão em até 10x" },
                ].map((option, i) => (
                  <label
                    key={option.value}
                    className="flex h-11 cursor-pointer items-center gap-2 rounded-sm border border-line bg-canvas px-3 font-sans text-[14px] text-ink-secondary transition-colors has-checked:border-accent-500 has-checked:bg-accent-100/40 has-checked:text-ink"
                  >
                    <input
                      type="radio"
                      name="method"
                      value={option.value}
                      defaultChecked={i === 0}
                      className="accent-accent-500"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className={cn(primaryButton, "mt-2")}>
              Ir para o pagamento
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => setStep({ kind: "offer" })}
              className="inline-flex items-center justify-center gap-1.5 self-center rounded-sm font-sans text-[14px] text-ink-tertiary transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Voltar
            </button>
          </form>
        )}

        {step.kind === "done" && (
          <div className="mt-6 rounded-sm border border-line-subtle bg-section p-5">
            <div className="flex items-center gap-2.5">
              <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-preview-text" />
              <p className="font-heading text-[17px] font-semibold tracking-[-0.01em] text-ink">
                Tudo certo{step.name ? `, ${step.name.split(" ")[0]}` : ""}!
              </p>
            </div>
            <p className="mt-2.5 font-sans text-[14px] leading-[1.55] text-ink-tertiary">
              Enviaríamos o link de pagamento {step.method === "pix" ? "via Pix" : "com cartão"} para{" "}
              <strong className="font-semibold text-ink-secondary">{step.email}</strong>. Este é um protótipo: nenhum
              pagamento foi processado.
            </p>
            <button
              type="button"
              onClick={() => setStep({ kind: "offer" })}
              className="mt-4 font-sans text-[14px] font-medium text-ink underline decoration-line-strong decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
            >
              Recomeçar
            </button>
          </div>
        )}

        <ul className="mt-5 flex flex-col gap-2.5">
          {trilhaPricing.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 font-sans text-[14px] text-ink-tertiary">
              <Check aria-hidden="true" className="size-4 shrink-0 text-preview-text" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
