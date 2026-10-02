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
} as const;

type Offset = keyof typeof ringOffset;

/** Rótulo mono em caixa alta acima dos títulos. */
export function Eyebrow({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "accent";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[12px] font-semibold uppercase tracking-[0.16em]",
        tone === "accent" ? "text-ink-accent" : "text-ink-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Marca-texto azul atrás de palavras em destaque nos títulos. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <mark className="-mx-[0.06em] rounded-[3px] bg-transparent px-[0.06em] text-inherit [background-image:linear-gradient(transparent_58%,var(--color-accent-100)_58%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
      {children}
    </mark>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-preview-bg px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-preview-text sm:text-[11px]",
        className,
      )}
    >
      {children}
    </span>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
  offset?: Offset;
  arrow?: boolean;
};

export function ButtonLink({
  variant = "primary",
  offset = "canvas",
  arrow = true,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 font-sans text-[15px] transition-colors",
        variant === "primary"
          ? "bg-surface-accent font-semibold text-ink-inverse hover:bg-accent-600"
          : "border border-line bg-canvas font-medium text-ink hover:border-line-strong hover:bg-section",
        focusRing,
        ringOffset[offset],
        className,
      )}
      {...props}
    >
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </Link>
  );
}

export { focusRing };
