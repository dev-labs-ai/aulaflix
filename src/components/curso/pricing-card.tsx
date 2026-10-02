import { Check } from "lucide-react";
import { BuyButton } from "@/components/curso/buy-button";
import { Badge } from "@/components/ui";
import type { CoursePricing } from "@/content/course-details";
import { brl } from "@/lib/format";

const perks = ["Curso completo, com materiais de apoio", "Acesso vitalício", "Garantia de 7 dias"];

/** Card de compra (coluna lateral no desktop, bloco no meio da página no mobile). */
export function PricingCard({ pricing }: { pricing: CoursePricing }) {
  const installment = pricing.price / pricing.installments;
  const pix = pricing.price * (1 - pricing.pixDiscount);

  return (
    <div className="flex scroll-mt-24 flex-col overflow-hidden rounded-card border border-line bg-surface-raised shadow-(--shadow-raised)">
      <span aria-hidden="true" className="h-3 bg-amarelo-300" />
      <div className="flex flex-col p-6 sm:p-7">
        <p className="text-[15px] font-bold text-ink-tertiary">Valor do curso</p>
        <p className="mt-1 font-heading text-[52px] font-extrabold leading-[1.1] tracking-[-0.03em] tabular-nums text-ink">
          {brl(pricing.price)}
        </p>
        <p className="mt-2 text-[16px] tabular-nums text-ink-tertiary">
          {pricing.installments}x de {brl(installment)} sem juros
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2.5">
          <span className="text-[16px] font-bold tabular-nums text-ink">ou {brl(pix)} no Pix</span>
          <Badge tone="amarelo">{Math.round(pricing.pixDiscount * 100)}% de desconto</Badge>
        </div>

        <BuyButton />

        <ul className="mt-5 flex flex-col gap-2.5">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-[15px] text-ink-tertiary">
              <Check aria-hidden="true" strokeWidth={2.5} className="size-4 shrink-0 text-ink-accent" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
