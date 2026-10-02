import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/components/ui";
import type { CourseModule, FaqEntry } from "@/content/course-details";

/** Seção do corpo da página de curso (título + conteúdo). */
function CourseSection({ title, eyebrow, children }: { title: ReactNode; eyebrow?: string; children: ReactNode }) {
  return (
    <section className="mt-20 sm:mt-24">
      <header>
        {eyebrow && (
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{eyebrow}</p>
        )}
        <h2
          className={cn(
            "font-heading text-[28px] font-semibold leading-[1.1] tracking-[-0.018em] text-ink sm:text-[34px]",
            eyebrow && "mt-4",
          )}
        >
          {title}
        </h2>
      </header>
      <div className="mt-8">{children}</div>
    </section>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

export function WhySection({ paragraphs }: { paragraphs: string[] }) {
  return (
    <CourseSection title="Sobre o curso">
      <div className="space-y-5 font-sans text-[17px] leading-[1.65] text-ink-secondary sm:text-[18px]">
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </CourseSection>
  );
}

export function LearnSection({ items }: { items: string[] }) {
  return (
    <CourseSection title="O que você vai aprender">
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li
            key={item}
            className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-line-subtle pb-4 last:border-b-0 last:pb-0"
          >
            <span className="font-mono text-[12px] font-semibold tabular-nums text-ink-accent">{pad(i + 1)}</span>
            <p className="font-sans text-[16px] leading-[1.55] text-ink-secondary sm:text-[17px]">{item}</p>
          </li>
        ))}
      </ul>
    </CourseSection>
  );
}

export function AudienceSection({ items }: { items: string[] }) {
  return (
    <CourseSection title="Para quem é">
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="grid grid-cols-[auto_1fr] gap-x-3 font-sans text-[16px] leading-[1.55] text-ink-secondary sm:text-[17px]"
          >
            <span aria-hidden="true" className="text-ink-accent">
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CourseSection>
  );
}

export function CoverageSection({ items }: { items: string[] }) {
  return (
    <CourseSection title="Conteúdo previsto">
      <ol className="border-y border-line-subtle">
        {items.map((item, i) => (
          <li key={item} className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line-subtle py-5 last:border-b-0">
            <span className="font-mono text-[12px] font-semibold tabular-nums text-ink-muted">{pad(i + 1)}</span>
            <p className="font-sans text-[16px] leading-[1.55] text-ink-secondary sm:text-[17px]">{item}</p>
          </li>
        ))}
      </ol>
    </CourseSection>
  );
}

/** Conteúdo programático: módulos com aulas numeradas em sequência contínua. */
export function SyllabusSection({ modules }: { modules: CourseModule[] }) {
  // Índice da primeira aula de cada módulo (a numeração continua entre módulos).
  const starts = modules.map((_, m) => modules.slice(0, m).reduce((n, mod) => n + mod.lessons.length, 0));
  const lessonCount = modules.reduce((n, mod) => n + mod.lessons.length, 0);

  return (
    <CourseSection eyebrow="Ementa" title={`${modules.length} módulos · ${lessonCount} aulas`}>
      <div className="space-y-10">
        {modules.map((mod, m) => (
          <div key={mod.title}>
            <h3 className="font-heading text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink sm:text-[19px]">
              <span className="text-ink-muted">Módulo {m + 1} · </span>
              {mod.title}
            </h3>
            <ol className="mt-3 border-y border-line-subtle">
              {mod.lessons.map((lesson, l) => {
                const number = starts[m] + l + 1;
                const available = Boolean(lesson.duration);
                return (
                  <li
                    key={lesson.title}
                    className="grid grid-cols-[auto_1fr] items-center gap-x-5 border-b border-line-subtle py-5 last:border-b-0"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex size-6 items-center justify-center font-mono text-[12px] text-ink-muted"
                    >
                      {available ? pad(number) : <Lock className="size-3.5" />}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "font-heading text-[16px] leading-[1.3] tracking-[-0.005em] sm:text-[17px]",
                          available ? "font-semibold text-ink" : "font-medium text-ink-muted",
                        )}
                      >
                        {lesson.title}
                      </p>
                      <p className="mt-1 font-mono text-[11px] tabular-nums text-ink-muted">
                        {lesson.duration ?? "Em breve"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </CourseSection>
  );
}

/** FAQ da página de curso (variante mais discreta que a da home). */
export function CourseFaqSection({ items }: { items: FaqEntry[] }) {
  return (
    <CourseSection title="Perguntas frequentes">
      <ul className="divide-y divide-line-subtle border-y border-line-subtle">
        {items.map((item) => (
          <li key={item.question}>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-heading text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink sm:text-[19px] [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-[14px] text-ink-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[60ch] font-sans text-[16px] leading-[1.6] text-ink-tertiary sm:text-[17px]">
                {item.answer}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </CourseSection>
  );
}
