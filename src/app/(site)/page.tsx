import Link from "next/link";
import { CourseCards, CourseRows } from "@/components/course-list";
import { Board, ButtonLink, cn, container, focusRing, ringOffset } from "@/components/ui";
import { onSaleCourses, waitlistCourses } from "@/content/courses";
import { about } from "@/content/home";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OnSaleSection />
      <WaitlistSection />
      <AboutSection />
    </>
  );
}

const sectionTitle = "font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[42px]";
const sectionLead = "mt-4 max-w-[60ch] text-[17px] leading-[1.6] text-ink-tertiary sm:text-[18px]";
const textLink = cn(
  "rounded-control text-[16px] font-bold text-ink-accent underline decoration-2 underline-offset-4 transition-colors hover:text-ink-accent-hover",
  focusRing,
);

function Hero() {
  return (
    <section aria-labelledby="hero-title" className={cn(container, "pb-16 pt-6 sm:pb-20 sm:pt-10")}>
      <Board className="px-6 py-16 text-center sm:px-12 sm:py-24 lg:py-28">
        <h1
          id="hero-title"
          className="anim-giz mx-auto max-w-[900px] text-balance font-heading text-[38px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[56px] lg:text-[72px]"
        >
          Aprenda no seu ritmo, com cursos feitos para a prática.
        </h1>
        <p className="anim-surge mx-auto mt-7 max-w-[52ch] text-pretty text-[17px] leading-[1.6] text-giz-apagado sm:text-[20px]">
          Cursos online de programação, design, dados, negócios e outros temas. Escolha o que quer aprender, assista
          quando quiser e volte às aulas sempre que precisar.
        </p>
        <div className="anim-surge anim-surge-tarde mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/#a-venda" variant="chalk" offset="board">
            Ver cursos à venda
          </ButtonLink>
          <ButtonLink href="/cursos" variant="chalk-outline" offset="board">
            Ver todos os cursos
          </ButtonLink>
        </div>
      </Board>
    </section>
  );
}

function OnSaleSection() {
  return (
    <section id="a-venda" aria-labelledby="a-venda-title" className="scroll-mt-20 border-y border-line bg-section">
      <div className={cn(container, "py-16 sm:py-24")}>
        <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <h2 id="a-venda-title" className={sectionTitle}>
              Cursos à venda
            </h2>
            <p className={sectionLead}>
              Pague uma vez e tenha acesso para sempre: assista às aulas no seu ritmo e volte a elas quando quiser.
            </p>
          </div>
          <Link href="/cursos" className={cn(textLink, ringOffset.section)}>
            Ver todos os cursos
          </Link>
        </header>
        <CourseCards courses={onSaleCourses} label="Cursos à venda" offset="section" className="mt-10 sm:mt-12" />
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section id="cursos" aria-labelledby="cursos-title" className={cn(container, "scroll-mt-20 py-16 sm:py-24")}>
      <header>
        <h2 id="cursos-title" className={sectionTitle}>
          Próximos cursos
        </h2>
        <p className={sectionLead}>
          Estes cursos ainda estão em produção. Entre na lista de espera para ser avisado do lançamento e ajudar a
          decidir quais chegam primeiro.
        </p>
      </header>
      <CourseRows courses={waitlistCourses} label="Próximos cursos" className="mt-10 sm:mt-12" />
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="scroll-mt-20 border-t border-line bg-section">
      <div className={cn(container, "py-20 sm:py-28")}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-14">
          <h2 id="sobre-title" className={cn(sectionTitle, "lg:col-span-4")}>
            Sobre o {site.name}
          </h2>
          <div className="mt-8 space-y-6 text-[17px] leading-[1.7] text-ink-secondary sm:text-[18px] lg:col-span-7 lg:col-start-6 lg:mt-0">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
