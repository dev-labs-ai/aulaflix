import { cn, focusRing } from "@/components/ui";

export type FaqItem = { question: string; answer: string };

/** Acordeão nativo (details/summary) usado nas seções de dúvidas. */
export function FaqList({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <li key={item.question}>
          <details className="group py-5">
            <summary
              className={cn(
                "flex cursor-pointer list-none items-baseline justify-between gap-4 rounded-sm font-heading text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink transition-colors hover:text-ink-accent sm:text-[19px] [&::-webkit-details-marker]:hidden",
                focusRing,
                "focus-visible:ring-offset-section",
              )}
            >
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-[15px] text-ink-muted transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-[62ch] font-sans text-[16px] leading-[1.6] text-ink-tertiary sm:text-[17px]">
              {item.answer}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}
