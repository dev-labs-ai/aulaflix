import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CourseCover } from "@/components/course-list";
import { cn } from "@/components/ui";
import { statusLabel, type Course } from "@/content/courses";

export function BackToCourses() {
  return (
    <Link
      href="/cursos"
      className="-ml-2 inline-flex h-11 min-w-0 max-w-full items-center gap-1.5 rounded-sm pl-2 pr-3.5 font-sans text-[14px] font-semibold text-ink-secondary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
    >
      <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-[18px] shrink-0" />
      <span className="truncate">Cursos</span>
    </Link>
  );
}

/** Selo, título, resumo e capa no topo da página de curso. */
export function CourseHero({ course }: { course: Course }) {
  const onSale = course.status === "on-sale";
  return (
    <>
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest",
          onSale ? "bg-surface-accent-soft text-ink-accent" : "bg-preview-bg text-preview-text",
        )}
      >
        {statusLabel[course.status]}
      </span>
      <h1 className="mt-5 font-heading text-[40px] leading-[1.02] font-semibold tracking-[-0.025em] text-ink sm:text-[56px] sm:leading-none lg:text-[64px]">
        {course.title}
      </h1>
      <p className="mt-7 font-sans text-[20px] leading-normal text-ink sm:text-[22px]">{course.summary}</p>
      <div className="relative mt-12">
        <CourseCover course={course} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col justify-end p-7 sm:p-9">
          <p className="font-heading text-[22px] font-semibold leading-[1.12] tracking-[-0.01em] text-[#fafafa] sm:text-[26px]">
            {course.title}
          </p>
        </div>
      </div>
    </>
  );
}
