import type { Metadata } from "next";
import { CourseList } from "@/components/course-list";
import { Badge, ButtonLink, Eyebrow, Highlight, cn, container } from "@/components/ui";
import { trackCourses, waitlistCourses } from "@/content/courses";
import { site, trilhaBuyHref } from "@/content/site";

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

      <section aria-labelledby="group-trilha" className={cn(container, "pt-6")}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-11 lg:col-start-2">
            <header>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-strong pb-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h2
                    id="group-trilha"
                    className="font-heading text-[24px] font-semibold tracking-[-0.02em] text-ink sm:text-[28px]"
                  >
                    Trilha do <Highlight>Engenheiro de IA</Highlight>
                  </h2>
                  <Badge>À venda</Badge>
                </div>
                <ButtonLink href={trilhaBuyHref} className="shrink-0">
                  Comprar a Trilha
                </ButtonLink>
              </div>
              <p className="mt-4 max-w-[60ch] font-sans text-[16px] leading-[1.55] text-ink-tertiary sm:text-[17px]">
                Tudo que você precisa saber para utilizar agentes de IA em produção.
              </p>
            </header>
          </div>
          <div className="lg:col-span-11 lg:col-start-2">
            <CourseList courses={trackCourses} variant="card" label="Cursos da Trilha do Engenheiro de IA" className="mt-6" />
          </div>
        </div>
      </section>

      <section aria-labelledby="group-waitlist" className={cn(container, "pb-24 pt-16 sm:pb-32 sm:pt-20")}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-9 lg:col-start-2">
            <header>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line-strong pb-5">
                <div>
                  <Eyebrow>Inscreva-se na lista de espera.</Eyebrow>
                  <h2
                    id="group-waitlist"
                    className="mt-3 font-heading text-[24px] font-semibold tracking-[-0.015em] text-ink sm:text-[30px]"
                  >
                    Listas abertas
                  </h2>
                </div>
                <p className="font-mono text-[12px] tabular-nums text-ink-muted">
                  {waitlistCourses.length} {waitlistCourses.length === 1 ? "curso" : "cursos"}
                </p>
              </div>
            </header>
          </div>
          <CourseList
            courses={waitlistCourses}
            label="Listas abertas"
            className="mt-4 lg:col-span-11 lg:col-start-2 lg:mt-6"
          />
        </div>
      </section>
    </>
  );
}
