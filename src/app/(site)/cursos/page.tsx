import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CourseCards, CourseRows } from "@/components/course-list";
import { cn, container } from "@/components/ui";
import { onSaleCourses, waitlistCourses, type Course } from "@/content/courses";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cursos",
};

export default function CursosPage() {
  return (
    <>
      <section aria-labelledby="cursos-title" className={cn(container, "pb-12 pt-14 sm:pt-20 lg:pt-24")}>
        <h1
          id="cursos-title"
          className="font-heading text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[56px] lg:text-[64px]"
        >
          Todos os cursos
        </h1>
        <p className="mt-5 max-w-[70ch] text-pretty text-[17px] leading-[1.6] text-ink-tertiary sm:text-[18px]">
          Conheça os cursos do {site.name}: os que já estão à venda e os que estão chegando.
        </p>
      </section>

      <CourseGroup id="group-on-sale" title="À venda" note="Disponíveis agora." courses={onSaleCourses}>
        <CourseCards courses={onSaleCourses} label="À venda" className="mt-8" />
      </CourseGroup>
      <CourseGroup
        id="group-waitlist"
        title="Em breve"
        note="Avisamos quando lançar."
        courses={waitlistCourses}
        className="pb-24 pt-16 sm:pb-32 sm:pt-20"
      >
        <CourseRows courses={waitlistCourses} label="Em breve" className="mt-6" />
      </CourseGroup>
    </>
  );
}

function CourseGroup({
  id,
  title,
  note,
  courses,
  className,
  children,
}: {
  id: string;
  title: string;
  note: string;
  courses: Course[];
  className?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={cn(container, className)}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id={id} className="font-heading text-[26px] font-bold tracking-[-0.02em] text-ink sm:text-[32px]">
          {title}
        </h2>
        <p className="text-[15px] text-ink-muted">
          {note} {courses.length} {courses.length === 1 ? "curso" : "cursos"}.
        </p>
      </header>
      {children}
    </section>
  );
}
