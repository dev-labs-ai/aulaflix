import Link from "next/link";
import type { ReactNode } from "react";
import { Check, ChevronLeft, Play } from "lucide-react";
import { courseIcons } from "@/components/placeholders";
import { Badge, Board, ButtonLink } from "@/components/ui";
import type { CoursePricing } from "@/content/course-details";
import { areaLabel, type Course } from "@/content/courses";
import { brl } from "@/lib/format";

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

/** Id dos botões de compra da lousa: a barra de compra do celular aparece quando eles saem da tela. */
export const boardBuyId = "comprar";

/** O que vem com a compra, na lousa e no resumo do pedido. */
export const perks = ["Acesso vitalício", "Materiais de apoio", "Garantia de 7 dias"];

/** Parcelado e Pix, como aparecem embaixo do preço. */
export function priceTerms(pricing: CoursePricing) {
  return {
    installments: `${pricing.installments}x de ${brl(pricing.price / pricing.installments)} sem juros`,
    pix: brl(pricing.price * (1 - pricing.pixDiscount)),
    pixDiscount: `${Math.round(pricing.pixDiscount * 100)}% de desconto`,
  };
}

/**
 * Topo da página de curso: área, título e resumo escritos na lousa e, logo abaixo, a ação principal
 * (`children`): preço e compra, a lista de espera, ou o atalho para quem já tem o curso.
 */
export function CourseBoard({ course, children }: { course: Course; children: ReactNode }) {
  const Icon = courseIcons[course.icon];

  return (
    <Board className="px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-8">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] font-bold text-giz-apagado">
            <span className="inline-flex items-center gap-2">
              <Icon aria-hidden="true" className="size-5" />
              {areaLabel[course.area]}
            </span>
            {course.status === "waitlist" && <Badge tone="amarelo">Em breve</Badge>}
          </p>
          <h1 className="anim-giz mt-5 text-balance font-heading text-[40px] font-bold leading-[1.04] tracking-[-0.03em] sm:text-[56px] lg:text-[64px]">
            {course.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-pretty text-[18px] leading-[1.6] text-giz-apagado sm:text-[20px]">
            {course.summary}
          </p>

          {/* Traço de giz separando o texto da ação. */}
          <div className="mt-10 border-t-2 border-dashed border-salvia-400 pt-8">{children}</div>
        </div>

        {/* O ícone do tema desenhado a giz, só no desktop, onde sobra lousa ao lado do texto. */}
        <div aria-hidden="true" className="hidden lg:col-span-4 lg:flex lg:items-center lg:justify-center">
          <Icon strokeWidth={1} className="size-56 text-amarelo-300" />
        </div>
      </div>
    </Board>
  );
}

/** Ação da lousa nos cursos à venda: preço, condições, compra e o atalho para a aula grátis. */
export function PriceAndBuy({
  pricing,
  buyHref,
  freeLessonHref,
}: {
  pricing: CoursePricing;
  buyHref: string;
  freeLessonHref?: string;
}) {
  const terms = priceTerms(pricing);
  return (
    <>
      <p className="text-[15px] font-bold text-giz-apagado">Valor do curso</p>
      <p className="mt-1 font-heading text-[48px] font-extrabold leading-[1.1] tracking-[-0.03em] tabular-nums text-giz sm:text-[56px]">
        {brl(pricing.price)}
      </p>
      <p className="mt-2 text-[16px] tabular-nums text-giz-apagado">{terms.installments}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2.5">
        <span className="text-[16px] font-bold tabular-nums text-giz">ou {terms.pix} no Pix</span>
        <Badge tone="amarelo">{terms.pixDiscount}</Badge>
      </div>

      <div id={boardBuyId} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
        <ButtonLink href={buyHref} variant="chalk" offset="board" className="sm:min-w-60">
          Comprar curso
        </ButtonLink>
        {freeLessonHref && (
          <ButtonLink href={freeLessonHref} variant="chalk-outline" offset="board">
            <Play aria-hidden="true" fill="currentColor" strokeWidth={0} className="size-4" />
            Assistir à aula grátis
          </ButtonLink>
        )}
      </div>

      <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
        {perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2 text-[15px] text-giz-apagado">
            <Check aria-hidden="true" strokeWidth={2.5} className="size-4 shrink-0 text-amarelo-300" />
            {perk}
          </li>
        ))}
      </ul>
    </>
  );
}

/** Ação da lousa para quem já comprou o curso: o atalho para continuar de onde parou. */
export function OwnedCourse({ courseSlug }: { courseSlug: string }) {
  return (
    <>
      <p className="flex items-center gap-2 text-[17px] font-bold text-giz">
        <Check aria-hidden="true" strokeWidth={3} className="size-5 text-amarelo-300" />
        Você já tem este curso.
      </p>
      <ButtonLink href={`/aprender/${courseSlug}`} variant="chalk" offset="board" className="mt-6 w-full sm:w-auto">
        <Play aria-hidden="true" fill="currentColor" strokeWidth={0} className="size-4" />
        Continuar curso
      </ButtonLink>
    </>
  );
}
