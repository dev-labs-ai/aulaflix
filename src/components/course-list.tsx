import Image from "next/image";
import Link from "next/link";
import { CourseCoverPlaceholder, courseIcons, toneClasses } from "@/components/placeholders";
import { Badge, cn, focusRing, ringOffset } from "@/components/ui";
import { getCourseDetail } from "@/content/course-details";
import { areaLabel, statusLabel, type Course } from "@/content/courses";
import { brl } from "@/lib/format";

/** Capa do curso: a imagem própria, quando houver, ou o placeholder na cor do curso. */
export function CourseCover({ course, className }: { course: Course; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative aspect-video w-full overflow-hidden", className)}>
      {course.image ? (
        <Image src={course.image} alt="" fill sizes="240px" className="object-cover" />
      ) : (
        <CourseCoverPlaceholder course={course} />
      )}
    </div>
  );
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** Rodapé da ficha: número de aulas e preço à venda; tópicos previstos e "Em breve" na lista de espera. */
function cardFacts(course: Course) {
  const detail = getCourseDetail(course.slug);
  if (!detail) return null;
  if (detail.kind === "waitlist") {
    return { size: plural(detail.coverage.length, "tópico previsto", "tópicos previstos"), status: "Em breve" };
  }
  const lessons = detail.modules.reduce((n, mod) => n + mod.lessons.length, 0);
  return { size: plural(lessons, "aula", "aulas"), status: brl(detail.pricing.price) };
}

/**
 * Cursos como fichas pautadas, com a faixa do topo na cor do curso: cheia nos cursos à venda
 * e tracejada nos que estão em lista de espera.
 * Todo o texto da ficha usa leading-7 e espaços múltiplos de 28px, para cair nas linhas da pauta.
 */
export function CourseCards({
  courses,
  label,
  offset = "canvas",
  className,
}: {
  courses: Course[];
  label: string;
  offset?: keyof typeof ringOffset;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7", className)}>
      {courses.map((course) => {
        const Icon = courseIcons[course.icon];
        const tone = toneClasses[course.tone];
        const facts = cardFacts(course);
        const waitlist = course.status === "waitlist";
        return (
          <li key={course.slug}>
            <Link
              href={`/cursos/${course.slug}`}
              className={cn(
                "group flex h-full flex-col overflow-hidden rounded-card border border-line shadow-(--shadow-raised) transition-colors hover:border-line-strong",
                focusRing,
                ringOffset[offset],
              )}
            >
              <span aria-hidden="true" className={cn("h-3 shrink-0", waitlist ? cn("tracejado", tone.dash) : tone.stripe)} />
              <div className="flex flex-1 flex-col pautado px-6 py-7">
                <p className="flex items-center gap-2.5 text-[15px] font-bold leading-7 text-ink-tertiary">
                  <Icon aria-hidden="true" className="size-5" />
                  {areaLabel[course.area]}
                </p>
                <h3 className="mt-7 font-heading text-[26px] font-bold leading-7 tracking-[-0.02em] text-ink transition-colors group-hover:text-ink-accent">
                  {course.title}
                </h3>
                <p className="mt-7 flex-1 text-[16px] leading-7 text-ink-tertiary">{course.summary}</p>
                {facts && (
                  <p className="mt-7 flex justify-between gap-4 text-[16px] font-bold leading-7 tabular-nums text-ink">
                    <span>{facts.size}</span>
                    <span className={cn(waitlist && "text-ink-muted")}>{facts.status}</span>
                  </p>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Cursos em lista de espera: linhas com o ícone na cor do curso e o selo de status. */
export function CourseRows({ courses, label, className }: { courses: Course[]; label: string; className?: string }) {
  return (
    <ul aria-label={label} className={cn("border-y border-line", className)}>
      {courses.map((course) => {
        const Icon = courseIcons[course.icon];
        const tone = toneClasses[course.tone];
        return (
          <li key={course.slug} className="border-b border-line last:border-b-0">
            <Link
              href={`/cursos/${course.slug}`}
              className={cn(
                "group grid grid-cols-[48px_minmax(0,1fr)] items-start gap-x-5 gap-y-3 py-6 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:items-center sm:gap-x-8 sm:py-8",
                focusRing,
                ringOffset.canvas,
              )}
            >
              <span
                aria-hidden="true"
                className={cn("flex size-12 items-center justify-center rounded-card sm:size-14", tone.soft, tone.ink)}
              >
                <Icon className="size-6" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3 className="font-heading text-[20px] font-bold leading-[1.2] tracking-[-0.015em] text-ink transition-colors group-hover:text-ink-accent sm:text-[24px]">
                  {course.title}
                </h3>
                <p className="mt-1.5 max-w-[62ch] text-[15px] leading-[1.6] text-ink-tertiary sm:text-[16px]">
                  {course.summary}
                </p>
              </div>
              <Badge className="col-start-2 justify-self-start sm:col-start-3 sm:justify-self-end">
                {statusLabel[course.status]}
              </Badge>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
