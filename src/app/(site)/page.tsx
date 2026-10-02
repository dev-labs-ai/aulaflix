import Link from "next/link";
import { CourseList } from "@/components/course-list";
import { ButtonLink, Eyebrow, Highlight, cn, container, focusRing, ringOffset } from "@/components/ui";
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

function Hero() {
  return (
    <section aria-labelledby="hero-title" className={cn(container, "pt-20 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32")}>
      <div className="mx-auto max-w-[820px] text-center">
        <p className="anim-hero font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-accent sm:text-[12px] sm:tracking-[0.16em]">
          Cursos online
        </p>
        <h1
          id="hero-title"
          className="anim-hero anim-hero-delay-1 mx-auto mt-6 max-w-[760px] text-balance font-heading text-[30px] leading-[1.12] font-semibold tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.08] lg:text-[44px] lg:leading-[1.08] xl:text-[52px] xl:leading-[1.05]"
        >
          <Highlight>Aprenda</Highlight> no seu ritmo, com cursos feitos para <Highlight>a prática</Highlight>.
        </h1>
        <p className="anim-hero anim-hero-delay-2 mx-auto mt-8 max-w-[52ch] text-pretty font-sans text-[17px] leading-normal text-ink-tertiary sm:text-[19px]">
          Cursos online de programação, design, dados, negócios e outros temas. Escolha o que quer aprender, assista
          quando quiser e volte às aulas sempre que precisar.
        </p>
        <div className="anim-hero anim-hero-delay-3 mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/#a-venda">Ver cursos à venda</ButtonLink>
          <ButtonLink href="/cursos" variant="secondary">
            Ver todos os cursos
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function OnSaleSection() {
  return (
    <section id="a-venda" aria-labelledby="a-venda-title" className="scroll-mt-20 border-t border-line-accent bg-section">
      <div className={cn(container, "py-18 sm:py-24")}>
        <div className="reveal lg:grid lg:grid-cols-12 lg:gap-x-12">
          <header className="lg:col-span-9 lg:col-start-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-accent sm:text-[12px] sm:tracking-[0.16em]">
              Disponíveis agora
            </p>
            <h2
              id="a-venda-title"
              className="mt-5 font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.08] lg:text-[48px]"
            >
              Cursos <Highlight>à venda</Highlight>
            </h2>
            <p className="mt-5 max-w-[60ch] font-sans text-[16px] leading-[1.55] text-ink-tertiary sm:text-[17px]">
              Pague uma vez e tenha acesso para sempre: assista às aulas no seu ritmo e volte a elas quando quiser.
            </p>
          </header>
        </div>
        <CourseList courses={onSaleCourses} variant="card" label="Cursos à venda" className="mt-12" />
      </div>
    </section>
  );
}

function WaitlistSection() {
  return (
    <section id="cursos" aria-labelledby="cursos-title" className={cn(container, "scroll-mt-20 py-20 sm:py-28 lg:py-32")}>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="reveal lg:col-span-9 lg:col-start-2">
          <header>
            <Eyebrow>Lista de espera</Eyebrow>
            <h2
              id="cursos-title"
              className="mt-5 font-heading text-[30px] leading-[1.12] font-semibold tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.08]"
            >
              Próximos cursos.
            </h2>
            <p className="mt-5 max-w-[640px] font-sans text-[16px] leading-[1.55] text-ink-tertiary sm:text-[17px]">
              Estes cursos ainda estão em produção. Entre na lista de espera para ser avisado do lançamento e ajudar a
              decidir quais chegam primeiro.
            </p>
          </header>
        </div>
        <CourseList
          courses={waitlistCourses}
          label="Próximos cursos"
          className="mt-12 lg:col-span-11 lg:col-start-2 lg:mt-16"
        />
        <div className="reveal mt-12 lg:col-span-11 lg:col-start-2">
          <Link
            href="/cursos"
            className={cn(
              "inline-flex items-center gap-2 font-sans text-[14px] text-ink-tertiary transition-colors hover:text-ink",
              focusRing,
              ringOffset.canvas,
            )}
          >
            Ver todos os cursos
            <span aria-hidden="true" className="font-mono">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="scroll-mt-20 bg-section">
      <div className={cn(container, "py-24 sm:py-32 lg:py-36")}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-14">
          <header className="reveal lg:col-span-5 lg:col-start-1">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Sobre</p>
            <h2
              id="sobre-title"
              className="mt-6 font-heading text-[40px] leading-[1.04] font-semibold tracking-[-0.025em] text-ink sm:text-[56px] sm:leading-none lg:text-[64px]"
            >
              {site.name}
            </h2>
          </header>
          <div className="reveal mt-10 space-y-6 font-sans text-[17px] leading-[1.65] text-ink-secondary sm:text-[18px] lg:col-span-7 lg:col-start-6 lg:mt-0">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
