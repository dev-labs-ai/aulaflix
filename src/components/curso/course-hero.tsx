import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { courseIcons } from "@/components/placeholders";
import { Badge, Board } from "@/components/ui";
import { statusLabel, type Course } from "@/content/courses";

export function BackToCourses() {
  return (
    <Link
      href="/cursos"
      className="-ml-2 inline-flex h-11 min-w-0 max-w-full items-center gap-1.5 rounded-control pl-2 pr-3.5 text-[15px] font-bold text-ink-secondary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
    >
      <ChevronLeft aria-hidden="true" strokeWidth={2} className="size-[18px] shrink-0" />
      <span className="truncate">Cursos</span>
    </Link>
  );
}

/** Selo, título, resumo e a lousa com o ícone do tema no topo da página de curso. */
export function CourseHero({ course }: { course: Course }) {
  const Icon = courseIcons[course.icon];
  return (
    <>
      <Badge tone={course.status === "on-sale" ? "amarelo" : "neutro"}>{statusLabel[course.status]}</Badge>
      <h1 className="mt-5 font-heading text-[40px] font-bold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[56px] lg:text-[64px]">
        {course.title}
      </h1>
      <p className="mt-6 text-[20px] leading-normal text-ink-secondary sm:text-[22px]">{course.summary}</p>
      <div aria-hidden="true" className="mt-12">
        <Board className="flex aspect-video items-center justify-center">
          <Icon strokeWidth={1} className="size-[34%] text-amarelo-300" />
        </Board>
      </div>
    </>
  );
}
