import type { Metadata } from "next";
import { ArrowRight, Check, X } from "lucide-react";
import { FaqList } from "@/components/faq-list";
import { PortraitPlaceholder } from "@/components/placeholders";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { PurchaseCard } from "@/components/trilha/purchase-card";
import { TrackCourseList, TrackSummaryList } from "@/components/trilha/track-courses";
import { Eyebrow, Highlight, cn, container } from "@/components/ui";
import { trackCourses } from "@/content/courses";
import { testimonials } from "@/content/home";
import { instructor, youtubeChannel } from "@/content/site";
import { trilhaFaq, trilhaFit, trilhaInstructor, trilhaSteps, trilhaWall } from "@/content/trilha";

export const metadata: Metadata = {
  title: "Trilha do Engenheiro de IA",
  description:
    "Três cursos, em ordem: entenda os fundamentos, aplique a programação agêntica na prática, construa e avalie sistemas de agentes de IA.",
};

const sectionTitle =
  "mt-5 font-heading text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.08]";

export default function TrilhaPage() {
  return (
    <>
      <PurchaseSection />
      <WallSection />
      <EpiphanySection />
      <CoursesSection />
      <InstructorSection />
      <TestimonialsSection />
      <FitSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}

function PurchaseSection() {
  return (
    <section
      id="trilha-comprar"
      aria-labelledby="trilha-purchase-title"
      className={cn(container, "pb-16 pt-12 sm:pb-24 sm:pt-18")}
    >
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start lg:gap-x-18 lg:gap-y-11">
        <header className="lg:col-start-1 lg:row-start-1">
          <p className="font-sans text-[12px] font-semibold uppercase leading-4 tracking-[0.08em] text-ink-accent">
            Trilha do Engenheiro de IA
          </p>
          <h1
            id="trilha-purchase-title"
            className="mt-4 max-w-[640px] font-heading text-[32px] font-semibold leading-[40px] tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[48px]"
          >
            Tudo que você precisa saber para utilizar agentes de IA em produção.
          </h1>
          <p className="mt-5 max-w-[600px] font-sans text-[16px] leading-[26px] text-ink-tertiary">
            Entenda os fundamentos. Aplique a programação agêntica na prática. Construa e avalie sistemas de agentes de
            IA.
          </p>
        </header>

        <PurchaseCard className="lg:col-start-2 lg:row-span-2 lg:row-start-1" />

        <div className="lg:col-start-1 lg:row-start-2">
          <h2 className="font-sans text-[12px] font-semibold uppercase leading-4 tracking-[0.08em] text-ink-muted">
            Os três cursos da Trilha
          </h2>
          <TrackSummaryList courses={trackCourses} />
        </div>
      </div>
    </section>
  );
}

function WallSection() {
  return (
    <section aria-labelledby="trilha-wall-title" className="bg-section">
      <div className={cn(container, "py-18 sm:py-24")}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-4 lg:col-start-1">
            <Eyebrow>Sua situação</Eyebrow>
            <h2 id="trilha-wall-title" className={sectionTitle}>
              Você sabe que a IA é útil, mas ainda <Highlight>não está satisfeito</Highlight> com os resultados
            </h2>
          </div>
          <div className="reveal mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <div className="flex max-w-[60ch] flex-col gap-5 font-sans text-[17px] leading-[1.65] text-ink-secondary sm:text-[18px]">
              {trilhaWall.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EpiphanySection() {
  return (
    <section aria-labelledby="trilha-epiphany-title" className={cn(container, "py-18 sm:py-24")}>
      <div className="reveal lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-9 lg:col-start-1">
          <Eyebrow>O que você percebeu</Eyebrow>
          <h2 id="trilha-epiphany-title" className={sectionTitle}>
            O problema <Highlight>nunca</Highlight> foi o modelo.
          </h2>
          <p className="mt-5 max-w-[640px] font-sans text-[16px] leading-[1.55] text-ink-tertiary sm:text-[17px]">
            O mesmo modelo, com o mesmo prompt, mas sem um plano, contexto e validações adequadas, produz resultados
            diferentes. Uma vez que você entende todos esses elementos, os resultados se tornam previsíveis.
          </p>
        </div>
      </div>
      <div className="reveal mt-12 grid gap-8 sm:mt-14 sm:grid-cols-3">
        {trilhaSteps.map((step) => (
          <div key={step.label} className="flex flex-col gap-3 border-t-2 border-surface-accent pt-5">
            <span className="font-mono text-[12px] font-semibold text-ink-accent">{step.label}</span>
            <h3 className="font-heading text-[20px] font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
            <p className="font-sans text-[15px] leading-[1.55] text-ink-tertiary">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section id="trilha-cursos" aria-labelledby="trilha-cursos-title" className="scroll-mt-20 border-t border-line-subtle">
      <div className={cn(container, "py-18 sm:py-24")}>
        <div className="reveal lg:grid lg:grid-cols-12 lg:gap-x-12">
          <header className="lg:col-span-9 lg:col-start-1">
            <Eyebrow>Os cursos da Trilha</Eyebrow>
            <h2 id="trilha-cursos-title" className={sectionTitle}>
              Cursos independentes, mas que juntos proporcionam uma formação <Highlight>completa</Highlight>.
            </h2>
          </header>
        </div>
        <TrackCourseList courses={trackCourses} className="mt-10 sm:mt-12" />
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section aria-labelledby="trilha-proof-title" className="bg-section">
      <div className={cn(container, "py-18 sm:py-24")}>
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
          <div className="reveal lg:col-span-4 lg:col-start-1">
            <figure className="m-0">
              <div className="relative aspect-4/5 w-full max-w-[360px] overflow-hidden rounded-md border border-line">
                <PortraitPlaceholder label="Foto do instrutor" />
              </div>
              <figcaption className="mt-4 max-w-[320px] font-sans text-[14px] leading-[1.4] text-ink-secondary">
                {instructor.heroCaption}
              </figcaption>
            </figure>
            <a
              href={youtubeChannel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-3 flex max-w-[320px] items-baseline gap-2 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-section"
            >
              <span className="font-heading text-[18px] font-semibold normal-case tracking-[-0.01em] tabular-nums text-ink group-hover:text-ink-accent sm:text-[20px]">
                {youtubeChannel.subscribers}
              </span>
              <span>inscritos no YouTube</span>
              <span aria-hidden="true" className="ml-auto text-ink-muted transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>

          <div className="reveal mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <Eyebrow>Seu instrutor</Eyebrow>
            <h2 id="trilha-proof-title" className={sectionTitle}>
              Conhecimento que vem da <Highlight>prática</Highlight>
            </h2>
            <div className="mt-6 flex max-w-[56ch] flex-col gap-4.5 font-sans text-[17px] leading-[1.65] text-ink-secondary sm:text-[18px]">
              {trilhaInstructor.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-9 grid gap-6 sm:grid-cols-3">
              {trilhaInstructor.facts.map((fact) => (
                <div key={fact.value} className="flex flex-col gap-1.5 border-t border-line pt-4">
                  <dt className="font-heading text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] tabular-nums text-ink sm:text-[32px]">
                    {fact.value}
                  </dt>
                  <dd className="font-sans text-[14px] leading-[1.45] text-ink-tertiary">{fact.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="bg-section">
      <div className={cn(container, "py-24 sm:py-28")}>
        <div className="reveal">
          <header className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-9 lg:col-start-1">
              <Eyebrow>Comentários públicos no YouTube</Eyebrow>
              <h2
                id="testimonials-title"
                className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink sm:text-[44px] sm:leading-[1.06]"
              >
                O que dizem sobre meu <Highlight>conteúdo</Highlight>
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

function FitSection() {
  const columns = [
    { title: "Essa trilha é para você se", items: trilhaFit.for, Icon: Check, iconClass: "text-ink-accent" },
    { title: "Essa trilha não é para você se", items: trilhaFit.notFor, Icon: X, iconClass: "text-ink-muted" },
  ];
  return (
    <section aria-label="Essa trilha é para você se" className={cn(container, "py-18 sm:py-24")}>
      <div className="reveal grid gap-10 sm:grid-cols-2 sm:gap-12">
        {columns.map(({ title, items, Icon, iconClass }) => (
          <div key={title}>
            <Eyebrow>{title}</Eyebrow>
            <ul className="mt-6 flex flex-col gap-4">
              {items.map((item) => (
                <li key={item} className="flex gap-3 font-sans text-[16px] leading-[1.5] text-ink-secondary sm:text-[17px]">
                  <Icon aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", iconClass)} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section aria-labelledby="trilha-cta-title" className="border-t border-line-accent bg-surface-muted">
      <div className={cn(container, "py-18 sm:py-28")}>
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12">
          <div className="reveal lg:col-span-6 lg:col-start-1">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-accent">
              Trilha do Engenheiro de IA
            </p>
            <h2
              id="trilha-cta-title"
              className="mt-5 font-heading text-[34px] font-semibold leading-[1.04] tracking-[-0.02em] text-ink sm:text-[48px]"
            >
              Três cursos, uma formação <Highlight>completa</Highlight>
            </h2>
            <p className="mt-5 max-w-[46ch] font-sans text-[16px] leading-[1.55] text-ink-tertiary sm:text-[17px]">
              Três cursos completos, com skills e materiais, acesso vitalício e garantia de 7 dias.
            </p>
          </div>
          <div className="reveal mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <a
              href="#trilha-hero-form"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-sm bg-surface-accent px-7 font-sans text-[16px] font-semibold text-ink-inverse transition-colors hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-surface-muted sm:w-auto"
            >
              Comprar a Trilha
              <ArrowRight aria-hidden="true" className="size-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="trilha-faq" aria-labelledby="trilha-faq-title" className="scroll-mt-20 bg-section">
      <div className={cn(container, "py-24 sm:py-32")}>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="reveal lg:col-span-4 lg:col-start-1">
            <header className="lg:sticky lg:top-24">
              <Eyebrow>FAQ</Eyebrow>
              <h2
                id="trilha-faq-title"
                className="mt-5 font-heading text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink sm:text-[40px] sm:leading-[1.06]"
              >
                Dúvidas frequentes
              </h2>
            </header>
          </div>
          <div className="reveal mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <FaqList items={trilhaFaq} />
          </div>
        </div>
      </div>
    </section>
  );
}
