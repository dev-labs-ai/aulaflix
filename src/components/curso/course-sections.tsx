import type { ReactNode } from "react";
import { Check, Lock } from "lucide-react";
import { cn } from "@/components/ui";
import type { CourseModule, FaqEntry } from "@/content/course-details";

/** Seção do corpo da página de curso (título, linha de apoio opcional e conteúdo). */
function CourseSection({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="mt-20 sm:mt-24">
      <header>
        <h2 className="font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[34px]">
          {title}
        </h2>
        {note && <p className="mt-2 text-[16px] text-ink-muted">{note}</p>}
      </header>
      <div className="mt-8">{children}</div>
    </section>
  );
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function WhySection({ paragraphs }: { paragraphs: string[] }) {
  return (
    <CourseSection title="Sobre o curso">
      <div className="space-y-5 text-[17px] leading-[1.7] text-ink-secondary sm:text-[18px]">
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
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[auto_1fr] gap-x-4">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-amarelo-300 text-ink"
            >
              <Check strokeWidth={3} className="size-3.5" />
            </span>
            <p className="text-[16px] leading-[1.6] text-ink-secondary sm:text-[17px]">{item}</p>
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
          <li key={item} className="grid grid-cols-[auto_1fr] gap-x-3 text-[16px] leading-[1.6] text-ink-secondary sm:text-[17px]">
            <span aria-hidden="true" className="mt-[0.6em] size-2 rounded-full bg-coral-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </CourseSection>
  );
}

/** Número da aula ou do tópico, num círculo como nas listas escritas no quadro. */
function Step({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full border-2 font-heading text-[14px] font-bold tabular-nums",
        muted ? "border-line text-ink-muted" : "border-lousa-300 text-lousa-500",
      )}
    >
      {children}
    </span>
  );
}

export function CoverageSection({ items }: { items: string[] }) {
  return (
    <CourseSection title="Conteúdo previsto">
      <ol className="border-y border-line">
        {items.map((item, i) => (
          <li key={item} className="grid grid-cols-[auto_1fr] items-center gap-x-5 border-b border-line py-5 last:border-b-0">
            <Step>{i + 1}</Step>
            <p className="text-[16px] leading-[1.6] text-ink-secondary sm:text-[17px]">{item}</p>
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
    <CourseSection
      title="Ementa"
      note={`${plural(modules.length, "módulo", "módulos")} e ${plural(lessonCount, "aula", "aulas")}.`}
    >
      <div className="space-y-10">
        {modules.map((mod, m) => (
          <div key={mod.title}>
            <h3 className="font-heading text-[19px] font-bold leading-[1.3] tracking-[-0.01em] text-ink sm:text-[20px]">
              <span className="text-ink-muted">Módulo {m + 1}:</span> {mod.title}
            </h3>
            <ol className="mt-3 border-y border-line">
              {mod.lessons.map((lesson, l) => {
                const available = Boolean(lesson.duration);
                return (
                  <li
                    key={lesson.title}
                    className="grid grid-cols-[auto_1fr] items-center gap-x-5 border-b border-line py-4 last:border-b-0"
                  >
                    <Step muted={!available}>{available ? starts[m] + l + 1 : <Lock className="size-3.5" />}</Step>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-[16px] leading-[1.35] sm:text-[17px]",
                          available ? "font-bold text-ink" : "text-ink-muted",
                        )}
                      >
                        {lesson.title}
                      </p>
                      <p className="mt-0.5 text-[14px] tabular-nums text-ink-muted">{lesson.duration ?? "Em breve"}</p>
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

/** FAQ da página de curso. */
export function CourseFaqSection({ items }: { items: FaqEntry[] }) {
  return (
    <CourseSection title="Perguntas frequentes">
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
              <p className="mt-3 max-w-[60ch] text-[16px] leading-[1.65] text-ink-tertiary sm:text-[17px]">
                {item.answer}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </CourseSection>
  );
}
