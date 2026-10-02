import Link from "next/link";
import { CourseCover } from "@/components/course-list";
import { cn } from "@/components/ui";
import { statusLabel, type Course } from "@/content/courses";

/** Miniatura creme (sem a sobreposição escura) usada no resumo do topo da página. */
function CreamThumb({ course }: { course: Course }) {
  const Icon = course.icon;
  return (
    <div className="relative flex aspect-video w-28 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-[radial-gradient(90%_90%_at_50%_45%,#fbf8f1_0%,#f1ebdf_60%,#e6dfd0_100%)] sm:w-40">
      <Icon aria-hidden="true" strokeWidth={1.1} className="size-[46%] text-[#3a3d44]" />
    </div>
  );
}

/** Lista compacta "Os três cursos da Trilha" ao lado do cartão de compra. */
export function TrackSummaryList({ courses }: { courses: Course[] }) {
  return (
    <ul className="mt-3.5">
      {courses.map((course) => (
        <li key={course.slug} className="flex items-center gap-4 border-t border-line-subtle py-4.5 sm:gap-5">
          <CreamThumb course={course} />
          <div className="flex min-w-0 flex-col gap-1.5">
            <h3 className="font-heading text-[17px] font-semibold leading-[24px] tracking-[-0.01em] text-ink sm:text-[18px] sm:leading-[26px]">
              {course.title}
            </h3>
            <p className="font-sans text-[14px] leading-[22px] text-ink-tertiary">{course.summary}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Lista "Os cursos da Trilha": mesmas linhas da home, com selo azul. */
export function TrackCourseList({ courses, className }: { courses: Course[]; className?: string }) {
  return (
    <ol aria-label="Os cursos da Trilha" className={cn("reveal-stagger border-t border-line-subtle", className)}>
      {courses.map((course) => (
        <li key={course.slug} className="border-b border-line-subtle last:border-b-0">
          <Link
            href={`/cursos/${course.slug}`}
            aria-label={course.title}
            className="group grid grid-cols-[minmax(0,1fr)] items-start gap-x-5 gap-y-4 py-7 transition-colors duration-200 hover:bg-section focus-visible:bg-section focus-visible:outline-none sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-x-8 sm:py-9 lg:grid-cols-[200px_minmax(0,1fr)_auto] lg:gap-x-12 lg:py-12"
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
              <span className="inline-flex items-center rounded-full bg-surface-accent-soft px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-accent sm:text-[11px]">
                {statusLabel[course.status]}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
