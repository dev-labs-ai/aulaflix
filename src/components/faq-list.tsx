import type { FaqEntry } from "@/content/course-details";

/** Perguntas que abrem a resposta ao clicar, para reaproveitar o FAQ da página de curso. */
export function FaqList({ items }: { items: FaqEntry[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item.question}>
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-heading text-[18px] font-bold leading-[1.3] tracking-[-0.01em] text-ink sm:text-[19px] [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="shrink-0 text-[22px] leading-none text-ink-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-[60ch] text-[16px] leading-[1.65] text-ink-tertiary sm:text-[17px]">{item.answer}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
