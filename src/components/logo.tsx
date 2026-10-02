import Link from "next/link";
import { site } from "@/content/site";
import { cn, focusRing, ringOffset } from "@/components/ui";

/** Marca: uma lousinha com duas linhas de giz e a régua de madeira (igual a src/app/icon.svg). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("block size-8", className)}>
      <rect width="32" height="32" rx="8" fill="#8a6a4a" />
      <path d="M8 0h16a8 8 0 0 1 8 8v16H0V8a8 8 0 0 1 8-8z" fill="#22392e" />
      <path d="M7.5 10.5h13" stroke="#f2d06b" strokeWidth="3" strokeLinecap="round" />
      <path d="M7.5 17h8.5" stroke="#f1f3ee" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  size = 22,
  offset = "canvas",
}: {
  size?: number;
  offset?: keyof typeof ringOffset;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, página inicial`}
      className={cn("inline-flex items-center gap-2.5 rounded-control", focusRing, ringOffset[offset])}
    >
      <LogoMark />
      <span className="font-heading font-extrabold tracking-[-0.03em] text-ink" style={{ fontSize: size }}>
        {site.wordmark}
      </span>
    </Link>
  );
}
