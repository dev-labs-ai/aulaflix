import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Faixa de container usada por todas as seções. */
export const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10";

/** Classes de foco; `offset` deve casar com o fundo da seção. */
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4";

export const ringOffset = {
  canvas: "focus-visible:ring-offset-canvas",
  section: "focus-visible:ring-offset-section",
  muted: "focus-visible:ring-offset-surface-muted",
  /** Na lousa o anel fica amarelo, para aparecer sobre o verde. */
  board: "focus-visible:ring-amarelo-300 focus-visible:ring-offset-lousa-500",
} as const;

type Offset = keyof typeof ringOffset;

/**
 * Painel de quadro-negro com a régua de madeira embaixo: o elemento-assinatura
 * do Aulaflix (hero da home e capa da página de curso).
 */
export function Board({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div>
      <div className={cn("rounded-t-board rounded-b-card bg-lousa-500 text-giz", className)}>{children}</div>
      <div aria-hidden="true" className="-mx-1.5 h-3 rounded-b-[10px] bg-madeira sm:-mx-2 sm:h-4" />
    </div>
  );
}

const badgeTones = {
  /** Destaque em giz amarelo, ex.: "À venda". */
  amarelo: "bg-amarelo-100 text-amarelo-700",
  /** Confirmação, ex.: "Pago". */
  lousa: "bg-lousa-100 text-lousa-500",
  /** Neutro, ex.: "Lista de espera". */
  neutro: "bg-surface-muted text-ink-tertiary",
} as const;

export type BadgeTone = keyof typeof badgeTones;

export function Badge({
  children,
  tone = "neutro",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[13px] font-bold leading-5",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const buttonVariants = {
  primary: "bg-surface-accent font-bold text-ink-inverse hover:bg-surface-accent-hover",
  secondary: "border border-line bg-surface font-bold text-ink hover:border-line-strong hover:bg-section",
  /** Botão principal sobre a lousa: giz amarelo. */
  chalk: "bg-amarelo-300 font-bold text-ink hover:bg-amarelo-400",
  /** Botão secundário sobre a lousa: só o contorno. */
  "chalk-outline": "border-2 border-salvia-400 font-bold text-giz hover:border-giz-apagado",
} as const;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof buttonVariants;
  offset?: Offset;
};

export function ButtonLink({ variant = "primary", offset = "canvas", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-control px-6 font-sans text-[16px] transition-colors",
        buttonVariants[variant],
        focusRing,
        ringOffset[offset],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export { focusRing };
