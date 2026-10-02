import Image from "next/image";
import Link from "next/link";
import { CourseCoverPlaceholder } from "@/components/placeholders";
import { Badge, cn } from "@/components/ui";
import { statusLabel, type Course } from "@/content/courses";

export function CourseCover({ course }: { course: Course }) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-video w-full overflow-hidden rounded-md border border-line-subtle transition-[filter,transform] duration-300 group-hover:brightness-[1.04] group-focus-visible:brightness-[1.04]"
    >
      {course.image ? (
        <Image src={course.image} alt="" fill sizes="200px" className="object-cover" />
      ) : (
        <CourseCoverPlaceholder icon={course.icon} />
      )}
      <div className="absolute inset-0 bg-linear-to-tr from-[#0c0e14]/80 via-[#1a1e26]/50 to-[#262b35]/25" />
    </div>
  );
}

/**
 * Lista de cursos com capa, título, resumo e status.
 * - `card`: dentro de um cartão branco elevado (Trilha).
 * - `plain`: linhas soltas separadas por divisórias (lista de espera).
 */
export function CourseList({
  courses,
  variant = "plain",
  label,
  className,
}: {
  courses: Course[];
  variant?: "card" | "plain";
  label: string;
  className?: string;
}) {
  const card = variant === "card";
  return (
    <ol
      aria-label={label}
      className={cn(
        "reveal-stagger",
        card && "overflow-hidden rounded-lg border border-line-subtle bg-surface-raised shadow-(--shadow-raised)",
        className,
      )}
    >
      {courses.map((course) => (
        <li key={course.slug} className="border-b border-line-subtle last:border-b-0">
          <Link
            href={`/cursos/${course.slug}`}
            aria-label={course.title}
            className={cn(
              "group grid gap-x-5 py-7 transition-colors duration-200 hover:bg-section focus-visible:bg-section focus-visible:outline-none sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-x-8 sm:py-9 lg:grid-cols-[200px_minmax(0,1fr)_auto] lg:gap-x-12 lg:py-12",
              card ? "grid-cols-[minmax(0,1fr)] items-start gap-y-4 px-4 sm:px-8" : "grid-cols-[100px_1fr] items-center gap-y-3",
            )}
          >
            <CourseCover course={course} />
            <div className="min-w-0">
              <h3 className="font-heading text-[20px] font-semibold tracking-[-0.012em] text-ink transition-colors duration-200 group-hover:text-ink-accent group-focus-visible:text-ink-accent sm:text-[24px]">
                {course.title}
              </h3>
              <p className="mt-1.5 max-w-[60ch] font-sans text-[14px] leading-[1.55] text-ink-tertiary sm:mt-2 sm:text-[15px]">
                {course.summary}
              </p>
            </div>
            <div className="col-span-full flex items-center gap-4 sm:col-span-1 sm:justify-end sm:self-center">
              <Badge>{statusLabel[course.status]}</Badge>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
