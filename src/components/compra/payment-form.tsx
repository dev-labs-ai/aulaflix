"use client";

import { startTransition, useActionState, useId, useState, type FormEvent } from "react";
import { CreditCard, QrCode } from "lucide-react";
import { AuthAlert, fieldLabelClass, submitButtonClass } from "@/components/auth/auth-ui";
import { useFieldValidation } from "@/components/auth/hooks";
import { TextField } from "@/components/auth/text-field";
import { cn } from "@/components/ui";
import { purchaseCourse } from "@/lib/checkout-actions";

// Protótipo: nenhum pagamento é cobrado. Os campos do cartão não têm `name`, então são validados
// aqui e não vão para o servidor; ele só recebe a forma de pagamento e as parcelas.

type Method = "pix" | "card";

const digits = (value: string) => value.replace(/\D/g, "");

/** "MM/AA" com mês válido e ainda não vencido. */
function validExpiry(value: string) {
  const match = /^(\d{2})\s*\/\s*(\d{2})$/.exec(value.trim());
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

export function PaymentForm({
  courseSlug,
  price,
  pixPrice,
  pixDiscount,
  installmentOptions,
}: {
  courseSlug: string;
  /** "R$ 497". */
  price: string;
  /** "R$ 447,30". */
  pixPrice: string;
  /** "10% de desconto". */
  pixDiscount: string;
  /** Rótulo de cada número de parcelas, a partir de 1x. */
  installmentOptions: string[];
}) {
  const id = useId();
  const [method, setMethod] = useState<Method>("pix");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [state, action, pending] = useActionState(purchaseCourse.bind(null, courseSlug), { error: null });

  const validation = useFieldValidation(card, {
    number: digits(card.number).length >= 13 && digits(card.number).length <= 19 ? undefined : "Confira o número do cartão.",
    name: card.name.trim() ? undefined : "Digite o nome como está no cartão.",
    expiry: validExpiry(card.expiry) ? undefined : "Use a validade no formato MM/AA.",
    cvc: /^\d{3,4}$/.test(card.cvc.trim()) ? undefined : "Confira o código de segurança.",
  });
  const field = (name: keyof typeof card) => ({
    value: card[name],
    onChange: (event: { target: { value: string } }) => setCard((c) => ({ ...c, [name]: event.target.value })),
    onBlur: validation.touch(name),
    error: validation.errorFor(name),
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || (method === "card" && !validation.submit())) return;
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  const options: { value: Method; title: string; detail: string; Icon: typeof QrCode }[] = [
    { value: "pix", title: "Pix", detail: `${pixPrice}, com ${pixDiscount}`, Icon: QrCode },
    { value: "card", title: "Cartão de crédito", detail: `${price} em até ${installmentOptions.length}x sem juros`, Icon: CreditCard },
  ];

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
      <fieldset>
        <legend className={fieldLabelClass}>Forma de pagamento</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {options.map(({ value, title, detail, Icon }) => (
            <label
              key={value}
              className="flex cursor-pointer items-start gap-3 rounded-card border-2 border-line bg-surface p-4 transition-colors hover:border-line-strong has-[input:checked]:border-lousa-400 has-[input:checked]:bg-lousa-100 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-focus has-[input:focus-visible]:ring-offset-2"
            >
              <input
                type="radio"
                name="method"
                value={value}
                checked={method === value}
                onChange={() => setMethod(value)}
                className="mt-1 size-4 accent-lousa-400"
              />
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-[16px] font-bold text-ink">
                  <Icon aria-hidden="true" className="size-[18px]" />
                  {title}
                </span>
                <span className="mt-0.5 block text-[14px] tabular-nums text-ink-tertiary">{detail}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {method === "card" ? (
        <div className="grid gap-4">
          <TextField label="Número do cartão" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" {...field("number")} />
          <TextField label="Nome impresso no cartão" autoComplete="cc-name" {...field("name")} />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Validade" autoComplete="cc-exp" placeholder="MM/AA" inputMode="numeric" {...field("expiry")} />
            <TextField label="CVV" autoComplete="cc-csc" inputMode="numeric" maxLength={4} {...field("cvc")} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-installments`} className={fieldLabelClass}>
              Parcelas
            </label>
            <select
              id={`${id}-installments`}
              name="installments"
              defaultValue={installmentOptions.length}
              className="block h-12 w-full rounded-control border border-line bg-surface px-3 text-[16px] tabular-nums text-ink focus:border-line-accent focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2"
            >
              {installmentOptions.map((label, i) => (
                <option key={label} value={i + 1}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <p className="rounded-card border border-line bg-surface px-4 py-3.5 text-[15px] leading-[1.6] text-ink-tertiary">
          No Pix, o pagamento é aprovado na hora e o acesso ao curso é liberado em seguida.
        </p>
      )}

      {state.error && <AuthAlert tone="error">{state.error}</AuthAlert>}

      <div className="flex flex-col gap-3">
        <button type="submit" disabled={pending} className={cn(submitButtonClass, "h-14 text-[17px]")}>
          {pending ? "Processando…" : method === "pix" ? `Pagar ${pixPrice} com Pix` : `Pagar ${price}`}
        </button>
        <p className="text-[13px] leading-5 text-ink-muted">
          Protótipo: nenhum pagamento é cobrado, o pedido é aprovado na hora e os dados do cartão não saem do navegador.
        </p>
      </div>
    </form>
  );
}
