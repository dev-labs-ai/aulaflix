import Link from "next/link";
import { Check, Lock, Play } from "lucide-react";
import { ScrollToCurrent } from "@/components/aula/scroll-to-current";
import { cn, ProgressBar } from "@/components/ui";
import type { CourseModule, LessonEntry } from "@/content/course-details";
import { myCoursesCopy as copy } from "@/content/account";
import type { Enrollment } from "@/lib/enrollments";

/** Ícone de cada aula na lista: concluída, a atual, por fazer ou ainda não publicada. */
function LessonMark({ state, number }: { state: "done" | "current" | "todo" | "locked"; number: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 font-heading text-[13px] font-bold tabular-nums",
        state === "done" && "border-lousa-400 bg-lousa-400 text-giz",
        state === "current" && "border-amarelo-300 bg-amarelo-300 text-ink",
        state === "todo" && "border-lousa-300 text-lousa-500",
        state === "locked" && "border-line text-ink-muted",
      )}
    >
      {state === "done" ? (
        <Check strokeWidth={3} className="size-3.5" />
      ) : state === "current" ? (
        <Play fill="currentColor" strokeWidth={0} className="ml-0.5 size-3" />
      ) : state === "locked" ? (
        <Lock className="size-3" />
      ) : (
        number
      )}
    </span>
  );
}

/** Lista de aulas da página de aula: o andamento do curso e as aulas por módulo, com a atual marcada. */
export function LessonList({ enrollment, current }: { enrollment: Enrollment; current: string }) {
  const { course, lessons, completedSlugs, completed, total } = enrollment;
  const percent = Math.round((completed / total) * 100);

  // Aulas agrupadas por módulo, na ordem do curso.
  const modules: { module: CourseModule; number: number; lessons: LessonEntry[] }[] = [];
  for (const entry of lessons) {
    const last = modules.at(-1);
    if (last?.module === entry.module) last.lessons.push(entry);
    else modules.push({ module: entry.module, number: entry.moduleNumber, lessons: [entry] });
  }

  return (
    <nav
      aria-label="Aulas do curso"
      className="overflow-hidden rounded-card border border-line bg-surface shadow-(--shadow-raised) lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-10rem)] lg:flex-col"
    >
      <div className="border-b border-line px-5 py-5">
        <p className="font-heading text-[19px] font-bold leading-[1.25] tracking-[-0.01em] text-ink">{course.title}</p>
        <p className="mt-1 text-[14px] tabular-nums text-ink-muted">
          {completed} de {total} aulas concluídas
        </p>
        <ProgressBar value={percent} label={copy.progressLabel(course.title)} className="mt-3" />
      </div>
      <ScrollToCurrent current={current} className="pb-3 lg:overflow-y-auto">
        {modules.map(({ module: mod, number, lessons: moduleLessons }) => (
          <section key={mod.title} aria-labelledby={`modulo-${number}`}>
            <h2 id={`modulo-${number}`} className="px-5 pb-1 pt-5 text-[14px] font-bold text-ink-muted">
              Módulo {number}: {mod.title}
            </h2>
            <ol>
              {moduleLessons.map((entry) => {
                const published = Boolean(entry.lesson.duration);
                const isCurrent = entry.slug === current;
                const done = completedSlugs.has(entry.slug);
                const state = !published ? "locked" : isCurrent ? "current" : done ? "done" : "todo";
                const content = (
                  <>
                    <LessonMark state={state} number={entry.number} />
                    <span className="min-w-0">
                      <span className={cn("block text-[15px] leading-[1.35]", isCurrent ? "font-bold text-ink" : published ? "text-ink-secondary" : "text-ink-muted")}>
                        {entry.lesson.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] tabular-nums text-ink-muted">
                        {entry.lesson.duration ?? "Em breve"}
                        {done && <span className="sr-only">, concluída</span>}
                      </span>
                    </span>
                  </>
                );
                const rowClass = "flex items-center gap-3 px-5 py-2.5";
                return (
                  <li key={entry.slug}>
                    {published ? (
                      <Link
                        href={`/aprender/${course.slug}/${entry.slug}`}
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          rowClass,
                          "transition-colors hover:bg-section focus-visible:bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus",
                          isCurrent && "bg-amarelo-100 hover:bg-amarelo-100",
                        )}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className={rowClass}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </ScrollToCurrent>
    </nav>
  );
}
