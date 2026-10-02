import { Check } from "lucide-react";
import { BuyButton } from "@/components/curso/buy-button";
import type { CoursePricing } from "@/content/course-details";

const perks = ["Curso completo, com materiais de apoio", "Acesso vitalício", "Garantia de 7 dias"];

/** "R$ 1.797" para valores inteiros, "R$ 179,70" para valores com centavos. */
function brl(value: number) {
  const cents = Math.round(value * 100);
  const fraction = cents % 100 === 0 ? 0 : 2;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(cents / 100);
}

/** Card de compra (coluna lateral no desktop, bloco no meio da página no mobile). */
export function PricingCard({ pricing }: { pricing: CoursePricing }) {
  const installment = pricing.price / pricing.installments;
  const pix = pricing.price * (1 - pricing.pixDiscount);

  return (
    <div className="flex scroll-mt-24 flex-col overflow-hidden rounded-md bg-surface-raised shadow-(--shadow-raised)">
      <div className="flex flex-col p-6 sm:p-7">
        <p className="font-sans text-[12px] font-semibold uppercase leading-4 tracking-[0.08em] text-ink-muted">
          Valor do curso
        </p>
        <p className="mt-2.5 font-mono text-[56px] font-semibold leading-[60px] tracking-[-0.02em] tabular-nums text-ink">
          {brl(pricing.price)}
        </p>
        <p className="mt-2 font-mono text-[16px] tabular-nums text-ink-tertiary">
          {pricing.installments}x de {brl(installment)} sem juros
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[16px] font-semibold tabular-nums text-ink">ou {brl(pix)} no Pix</span>
          <span className="inline-flex items-center rounded-full bg-preview-bg px-2.5 py-1 font-sans text-[11px] font-semibold uppercase leading-[14px] tracking-[0.08em] text-preview-text">
            {Math.round(pricing.pixDiscount * 100)}% de desconto
          </span>
        </div>

        <BuyButton />

        <ul className="mt-5 flex flex-col gap-2.5">
          {perks.map((perk) => (
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
