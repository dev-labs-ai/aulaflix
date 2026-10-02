import Link from "next/link";
import { areaIcons, courseIcons, toneClasses } from "@/components/placeholders";
import { Board, ButtonLink, cn, container, focusRing, ringOffset } from "@/components/ui";
import { areaLabel, areas, waitlistCourses, type CourseTone } from "@/content/courses";
import { howItWorks } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ComingSoon />
    </>
  );
}

const sectionTitle = "font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[42px]";
const textLink = cn(
  "rounded-control text-[16px] font-bold text-ink-accent underline decoration-2 underline-offset-4 transition-colors hover:text-ink-accent-hover",
  focusRing,
);

/** A lousa do topo, com as áreas: cada botão abre o catálogo já filtrado. */
function Hero() {
  return (
    <section aria-labelledby="hero-title" className={cn(container, "pb-16 pt-6 sm:pb-20 sm:pt-10")}>
      <Board className="px-6 py-14 text-center sm:px-12 sm:py-20 lg:py-24">
        <h1
          id="hero-title"
          className="anim-giz mx-auto max-w-[900px] text-balance font-heading text-[38px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[56px] lg:text-[72px]"
        >
          Aprenda no seu ritmo, com cursos feitos para a prática.
        </h1>
        <p className="anim-surge mx-auto mt-7 max-w-[52ch] text-pretty text-[17px] leading-[1.6] text-giz-apagado sm:text-[20px]">
          Escolha o que quer aprender, assista quando quiser e volte às aulas sempre que precisar.
        </p>
        <nav aria-labelledby="areas-title" className="anim-surge anim-surge-tarde mt-10">
          <h2 id="areas-title" className="text-[15px] font-bold text-giz-apagado">
            Escolha uma área
          </h2>
          <ul className="mx-auto mt-4 flex max-w-[940px] flex-wrap justify-center gap-2.5 sm:gap-3">
            {areas.map((area) => {
              const Icon = areaIcons[area];
              return (
                <li key={area}>
                  <Link
                    href={`/cursos?area=${area}`}
                    className={cn(
                      "inline-flex h-12 items-center gap-2 rounded-full border-2 border-salvia-400 px-5 text-[16px] font-bold text-giz transition-colors hover:border-amarelo-300 hover:text-amarelo-300",
                      focusRing,
                      ringOffset.board,
                    )}
                  >
                    <Icon aria-hidden="true" className="size-[18px]" />
                    {areaLabel[area]}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href="/cursos" variant="chalk" offset="board" className="mt-8">
            Ver todos os cursos
          </ButtonLink>
        </nav>
      </Board>
    </section>
  );
}

const stepTones: CourseTone[] = ["coral", "amarelo", "salvia"];

/** "Como funciona" em três fichas pautadas: escolher, comprar uma vez e estudar no seu ritmo. */
function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="scroll-mt-20 border-y border-line bg-section">
      <div className={cn(container, "py-16 sm:py-24")}>
        <h2 id="como-funciona-title" className={sectionTitle}>
          Como funciona
        </h2>
        <ol className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3 lg:gap-7">
          {howItWorks.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col overflow-hidden rounded-card border border-line shadow-(--shadow-raised)"
            >
              <span aria-hidden="true" className={cn("h-3 shrink-0", toneClasses[stepTones[i]].stripe)} />
              {/* Texto em leading-7 e espaços múltiplos de 28px, para cair nas linhas da pauta. */}
              <div className="flex-1 pautado px-6 py-7">
                <p className="font-heading text-[40px] font-bold leading-[56px] text-lousa-400" aria-hidden="true">
                  {i + 1}
                </p>
                <h3 className="font-heading text-[22px] font-bold leading-7 tracking-[-0.015em] text-ink">
                  <span className="sr-only">{i + 1}. </span>
                  {step.title}
                </h3>
                <p className="mt-7 text-[16px] leading-7 text-ink-tertiary">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Faixa curta com os cursos que estão chegando, cada um levando à própria página (e à lista de espera). */
function ComingSoon() {
  return (
    <section aria-labelledby="em-breve-title" className={cn(container, "py-14 sm:py-20")}>
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="em-breve-title" className="font-heading text-[24px] font-bold tracking-[-0.02em] text-ink sm:text-[28px]">
          Chegando em breve
        </h2>
        <Link href="/cursos?situacao=em-breve" className={cn(textLink, ringOffset.canvas)}>
          Ver os cursos em breve
        </Link>
      </header>
      <ul className="mt-6 flex flex-wrap gap-3">
        {waitlistCourses.map((course) => {
          const Icon = courseIcons[course.icon];
          const tone = toneClasses[course.tone];
          return (
            <li key={course.slug}>
              <Link
                href={`/cursos/${course.slug}`}
                className={cn(
                  "inline-flex h-12 items-center gap-2.5 rounded-full border-2 border-dashed border-line-strong bg-surface pl-2 pr-5 text-[16px] font-bold text-ink transition-colors hover:border-lousa-300",
                  focusRing,
                  ringOffset.canvas,
                )}
              >
                <span aria-hidden="true" className={cn("flex size-8 items-center justify-center rounded-full", tone.soft, tone.ink)}>
                  <Icon className="size-4" />
                </span>
                {course.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
