import type { Metadata } from "next";
import { CourseList } from "@/components/course-list";
import { Eyebrow, cn, container } from "@/components/ui";
import { onSaleCourses, waitlistCourses, type Course } from "@/content/courses";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cursos",
};

export default function CursosPage() {
  return (
    <>
      <section aria-labelledby="cursos-title" className={cn(container, "pb-10 pt-16 sm:pt-24 lg:pt-32")}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-9 lg:col-start-2">
            <header>
              <Eyebrow>Cursos</Eyebrow>
              <h1
                id="cursos-title"
                className="mt-5 font-heading text-[40px] font-semibold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[56px] sm:leading-[1.02] lg:text-[64px]"
              >
                A grade completa.
              </h1>
              <p className="mt-6 max-w-[60ch] font-sans text-[17px] leading-[1.6] text-ink-tertiary sm:text-[18px]">
                Todos os cursos que compõem a formação em Engenharia de IA do {site.name}.
              </p>
            </header>
          </div>
        </div>
      </section>

      <CourseGroup
        id="group-on-sale"
        eyebrow="Inscrições abertas."
        title="À venda"
        courses={onSaleCourses}
        variant="card"
        className="pt-6"
      />
      <CourseGroup
        id="group-waitlist"
        eyebrow="Inscreva-se na lista de espera."
        title="Listas abertas"
        courses={waitlistCourses}
        className="pb-24 pt-16 sm:pb-32 sm:pt-20"
      />
    </>
  );
}

function CourseGroup({
  id,
  eyebrow,
  title,
  courses,
  variant = "plain",
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  courses: Course[];
  variant?: "card" | "plain";
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn(container, className)}>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="reveal lg:col-span-11 lg:col-start-2">
          <header>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line-strong pb-5">
              <div>
                <Eyebrow>{eyebrow}</Eyebrow>
                <h2 id={id} className="mt-3 font-heading text-[24px] font-semibold tracking-[-0.015em] text-ink sm:text-[30px]">
                  {title}
                </h2>
              </div>
              <p className="font-mono text-[12px] tabular-nums text-ink-muted">
                {courses.length} {courses.length === 1 ? "curso" : "cursos"}
              </p>
            </div>
          </header>
        </div>
        <CourseList
          courses={courses}
          variant={variant}
          label={title}
          className={cn("lg:col-span-11 lg:col-start-2", variant === "card" ? "mt-6" : "mt-4 lg:mt-6")}
        />
      </div>
    </section>
  );
}
