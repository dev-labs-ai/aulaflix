import Link from "next/link";
import { CourseList } from "@/components/course-list";
import { FaqList } from "@/components/faq-list";
import { MediaFeed } from "@/components/media-feed";
import { PortraitPlaceholder } from "@/components/placeholders";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { ButtonLink, Eyebrow, Highlight, cn, container, focusRing, ringOffset } from "@/components/ui";
import { trackCourses, waitlistCourses } from "@/content/courses";
import { homeFaq, howItWorks, recentArticles, recentVideos, testimonials } from "@/content/home";
import { instructor, substack, trilhaBuyHref, trilhaHref, youtubeChannel } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrackSection />
      <TestimonialsSection />
      <WaitlistSection />
      <HowItWorksSection />
      <AboutSection />
      <PublicWorkSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className={cn(container, "pt-20 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32")}>
      <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12">
        <div className="lg:col-span-8 lg:col-start-1">
          <p className="anim-hero font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-accent sm:text-[12px] sm:tracking-[0.16em]">
            Trilha do Engenheiro de IA · Inscrições abertas
          </p>
          <h1
            id="hero-title"
            className="anim-hero anim-hero-delay-1 mt-6 max-w-[640px] font-heading text-[30px] leading-[1.12] font-semibold tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.08] lg:text-[44px] lg:leading-[1.08] xl:text-[52px] xl:leading-[1.05]"
          >
            <Highlight>Tudo</Highlight> que você precisa saber para utilizar agentes de IA <Highlight>em produção</Highlight>.
          </h1>
          <p className="anim-hero anim-hero-delay-2 mt-8 max-w-[48ch] font-sans text-[17px] leading-normal text-ink-tertiary sm:text-[19px]">
            A Trilha do Engenheiro de IA reúne três cursos, em ordem: entenda os fundamentos, aplique a programação
            agêntica na prática, construa e avalie sistemas de agentes de IA.
          </p>
          <div className="anim-hero anim-hero-delay-3 mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={trilhaHref}>Conhecer a Trilha</ButtonLink>
            <ButtonLink href="/cursos" variant="secondary">
              Ver todos os cursos
            </ButtonLink>
          </div>
        </div>

        <div className="anim-hero anim-hero-delay-4 mt-14 lg:col-span-4 lg:col-start-9 lg:mt-0">
          <figure className="relative">
            <div className="relative aspect-4/5 w-full max-w-[360px] overflow-hidden rounded-md border border-line">
              <PortraitPlaceholder label="Foto do instrutor" />
            </div>
            <figcaption className="mt-4 max-w-[320px] font-sans text-[14px] leading-[1.4] text-ink-secondary">
              {instructor.heroCaption}
            </figcaption>
            <a
              href={youtubeChannel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group mt-3 flex max-w-[320px] flex-col gap-1.5 border-t border-line-subtle pt-3 font-mono uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink",
                focusRing,
                ringOffset.canvas,
              )}
            >
              <span className="flex items-baseline gap-2 text-[11px]">
                <span className="font-heading text-[18px] font-semibold normal-case tracking-[-0.01em] tabular-nums text-ink group-hover:text-ink-accent sm:text-[20px]">
                  {youtubeChannel.subscribers}
                </span>
                <span>inscritos no YouTube</span>
                <span aria-hidden="true" className="ml-auto text-ink-muted transition-transform group-hover:translate-x-0.5">
                  ↗
                </span>
              </span>
              <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[10px] text-ink-muted">
                <Stat value={youtubeChannel.views} label="visualizações" />
                <span aria-hidden="true" className="text-ink-muted/60">
                  ·
                </span>
                <Stat value={youtubeChannel.videos} label="vídeos" />
              </span>
            </a>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-mono text-[13px] font-medium normal-case tracking-[-0.005em] tabular-nums text-ink-tertiary transition-colors group-hover:text-ink sm:text-[14px]">
        {value}
      </span>
      <span>{label}</span>
    </span>
  );
}

function TrackSection() {
  return (
    <section id="trilha" aria-labelledby="trilha-launch-title" className="scroll-mt-20 border-t border-line-accent bg-section">
      <div className={cn(container, "py-18 sm:py-24")}>
        <div className="reveal lg:grid lg:grid-cols-12 lg:gap-x-12">
          <header className="lg:col-span-9 lg:col-start-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-accent sm:text-[12px] sm:tracking-[0.16em]">
              Inscrições abertas
            </p>
            <h2
              id="trilha-launch-title"
              className="mt-5 font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.08] lg:text-[48px]"
            >
              Trilha do <Highlight>Engenheiro de IA</Highlight>
            </h2>
            <p className="mt-5 max-w-[60ch] font-sans text-[16px] leading-[1.55] text-ink-tertiary sm:text-[17px]">
              Entenda os fundamentos. Aplique a programação agêntica na prática. Construa e avalie sistemas de agentes de
              IA.
            </p>
            <div className="mt-8 flex flex-col flex-wrap items-stretch gap-6 sm:flex-row sm:items-center">
              <ButtonLink href={trilhaBuyHref} offset="section">
                Comprar a Trilha
              </ButtonLink>
            </div>
          </header>
        </div>
        <CourseList courses={trackCourses} variant="card" label="Cursos da Trilha do Engenheiro de IA" className="mt-12" />
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="bg-canvas">
      <div className={cn(container, "py-24 sm:py-28")}>
        <div className="reveal">
          <header className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-9 lg:col-start-1">
              <Eyebrow>Comentários públicos no YouTube</Eyebrow>
              <h2
                id="testimonials-title"
                className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink sm:text-[44px] sm:leading-[1.06]"
              >
                O que dizem sobre o que eu venho ensinando.
              </h2>
            </div>
          </header>
        </div>
        <div className="reveal">
          <TestimonialsCarousel items={testimonials} />
        </div>
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
            <Eyebrow>Cursos em lista de espera</Eyebrow>
            <h2
              id="cursos-title"
              className="mt-5 font-heading text-[30px] leading-[1.12] font-semibold tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.08]"
            >
              Escolha os cursos que fazem sentido para o que você quer construir.
            </h2>
            <p className="mt-5 max-w-[640px] font-sans text-[16px] leading-[1.55] text-ink-tertiary sm:text-[17px]">
              Entre na lista de espera dos temas que mais importam para você. As listas ajudam a decidir quais cursos
              entram primeiro em produção; novos cursos serão adicionados ao currículo com o tempo.
            </p>
          </header>
        </div>
        <CourseList
          courses={waitlistCourses}
          label="Cursos do currículo"
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
            Ver o currículo completo
            <span aria-hidden="true" className="font-mono">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="scroll-mt-20">
      <div className={cn(container, "py-20 sm:py-28 lg:py-32")}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-9 lg:col-start-2">
            <header>
              <Eyebrow>Por dentro</Eyebrow>
              <h2
                id="como-funciona-title"
                className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink sm:text-[42px] sm:leading-[1.08]"
              >
                Como a formação funciona
              </h2>
            </header>
          </div>
          <div className="reveal mt-12 border-y border-line lg:col-span-10 lg:col-start-2 lg:mt-16">
            <dl className="grid grid-cols-1 lg:grid-cols-2">
              {howItWorks.map((item, i) => (
                <div
                  key={item.term}
                  className={cn(
                    "py-8 sm:py-9 lg:py-11",
                    i % 2 === 0 ? "lg:pr-10" : "lg:border-l lg:border-line lg:pl-10",
                    i > 0 && "border-t border-line",
                    i === 1 && "lg:border-t-0",
                  )}
                >
                  <dt className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-accent">{item.term}</dt>
                  <dd className="mt-3 max-w-[46ch] font-sans text-[16px] leading-[1.6] text-ink-secondary sm:mt-4 sm:text-[17px]">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
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
          <div className="reveal lg:col-span-5 lg:col-start-1">
            <div className="relative aspect-4/5 w-full max-w-[440px] overflow-hidden rounded-md border border-line-subtle">
              <PortraitPlaceholder label={`Retrato de ${instructor.name}`} />
            </div>
          </div>
          <div className="reveal mt-12 lg:col-span-7 lg:col-start-7 lg:mt-0">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Sobre</p>
            <h2
              id="sobre-title"
              className="mt-6 font-heading text-[40px] leading-[1.04] font-semibold tracking-[-0.025em] text-ink sm:text-[56px] sm:leading-none lg:text-[64px]"
            >
              {instructor.name}
            </h2>
            <div className="mt-10 space-y-6 font-sans text-[17px] leading-[1.65] text-ink-secondary sm:text-[18px]">
              {instructor.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PublicWorkSection() {
  return (
    <section aria-labelledby="trabalho-title" className="scroll-mt-20">
      <div className={cn(container, "py-24 sm:py-32 lg:py-36")}>
        <div className="reveal lg:grid lg:grid-cols-12 lg:gap-x-12">
          <header className="lg:col-span-9 lg:col-start-1">
            <Eyebrow>Trabalho público</Eyebrow>
            <h2
              id="trabalho-title"
              className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink sm:text-[44px] sm:leading-[1.06]"
            >
              Vídeos e artigos recentes.
            </h2>
          </header>
        </div>
        <MediaFeed
          className="mt-14 sm:mt-16"
          source="YouTube"
          name={youtubeChannel.name}
          linkLabel="Ver o canal"
          href={youtubeChannel.href}
          items={recentVideos}
          kind="video"
        />
        <MediaFeed
          className="mt-20 sm:mt-24"
          source="Substack"
          name={substack.name}
          linkLabel="Ver o Substack"
          href={substack.href}
          items={recentArticles}
          kind="article"
        />
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-section">
      <div className={cn(container, "py-24 sm:py-32")}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-4 lg:col-start-1">
            <header className="lg:sticky lg:top-24">
              <Eyebrow>FAQ</Eyebrow>
              <h2
                id="faq-title"
                className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.06]"
              >
                Dúvidas frequentes.
              </h2>
            </header>
          </div>
          <div className="reveal mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <FaqList items={homeFaq} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="border-t border-line-accent bg-surface-muted">
      <div className={cn(container, "py-24 sm:py-32 lg:py-36")}>
        <div className="reveal lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-9 lg:col-start-1">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-accent">
              Trilha do Engenheiro de IA
            </p>
            <h2
              id="final-cta-title"
              className="mt-5 font-heading text-[36px] leading-[1.04] font-semibold tracking-[-0.02em] text-ink sm:text-[48px] sm:leading-[1.04] lg:text-[56px]"
            >
              Três cursos, uma formação completa.
            </h2>
            <div className="mt-10">
              <ButtonLink href={trilhaBuyHref} offset="muted">
                Comprar a Trilha
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
