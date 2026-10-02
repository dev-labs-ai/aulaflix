import Link from "next/link";
import { site } from "@/content/site";
import { cn, focusRing, ringOffset } from "@/components/ui";

/** Marca provisória: quadrado creme com um "play" estilizado. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("block size-8 rounded-sm", className)}>
      <rect width="32" height="32" rx="10" fill="#f3eee4" />
      <path d="M12 9.5v13l10.5-6.5z" fill="#111318" />
      <path d="M8.5 23.5h15" stroke="#2457ff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  size = 17,
  offset = "canvas",
}: {
  size?: number;
  offset?: keyof typeof ringOffset;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — página inicial`}
      className={cn("inline-flex items-center gap-2.5 rounded-sm", focusRing, ringOffset[offset])}
    >
      <LogoMark />
      <span className="font-heading font-semibold tracking-[-0.015em] text-ink" style={{ fontSize: size }}>
        {site.brand.base}
        <span className="text-ink-accent">{site.brand.accent}</span>
      </span>
    </Link>
  );
}
