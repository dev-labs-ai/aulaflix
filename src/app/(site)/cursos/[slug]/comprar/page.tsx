import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Check, ChevronLeft, Play } from "lucide-react";
import { EntryFlow } from "@/components/auth/entry-flow";
import { PaymentForm } from "@/components/compra/payment-form";
import { perks, priceTerms } from "@/components/curso/course-hero";
import { courseIcons } from "@/components/placeholders";
import { Board, ButtonLink, cn, container, focusRing, ringOffset } from "@/components/ui";
import { purchasesCopy } from "@/content/account";
import { courseLessons, getCourseDetail, type CoursePricing } from "@/content/course-details";
import { areaLabel, getCourse, type Course } from "@/content/courses";
import { getSessionUser } from "@/lib/auth";
import { brl } from "@/lib/format";
import { getPurchases } from "@/lib/purchases";

export async function generateMetadata(props: PageProps<"/cursos/[slug]/comprar">): Promise<Metadata> {
  const { slug } = await props.params;
  const course = getCourse(slug);
  return course ? { title: `Comprar ${course.title}` } : {};
}

const steps = ["Identificação", "Pagamento", "Pronto"] as const;

/**
 * Compra de um curso: identificação (entrar ou criar a conta ali mesmo), pagamento (Pix ou cartão)
 * e confirmação, com acesso direto à primeira aula. `?pedido=` mostra a confirmação de um pedido.
 */
export default async function ComprarPage(props: PageProps<"/cursos/[slug]/comprar">) {
  const { slug } = await props.params;
  const { pedido } = await props.searchParams;
  const course = getCourse(slug);
  const detail = getCourseDetail(slug);
  if (!course || !detail) notFound();
  // Curso em lista de espera ainda não se compra.
  if (detail.kind !== "on-sale") redirect(`/cursos/${slug}`);

  const path = `/cursos/${slug}/comprar`;
  const user = await getSessionUser();
  const purchases = user ? await getPurchases(user) : [];
  const owned = purchases.some((p) => p.courses.some((c) => c.slug === slug));
  const order = purchases.find((p) => p.id === pedido && p.courses.some((c) => c.slug === slug));
  const firstLesson = courseLessons(detail).find((entry) => entry.lesson.duration);

  const step = !user ? 0 : order ? 2 : 1;

  let content;
  if (!user) {
    // Mesmo espaçamento entre título e formulário que a moldura de /entrar dá ao fluxo.
    content = (
      <div className="flex flex-col gap-6 sm:gap-7">
        <EntryFlow next={path} heading="h2" />
      </div>
    );
  } else if (order) {
    content = (
      <Board className="px-6 py-8 sm:px-10 sm:py-10">
        <h2 className="flex items-center gap-3 font-heading text-[28px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[34px]">
          <Check aria-hidden="true" strokeWidth={3} className="size-7 shrink-0 text-amarelo-300" />
          Pronto, o curso é seu
        </h2>
        <p className="mt-4 text-[17px] leading-[1.6] text-giz-apagado">
          {purchasesCopy.order(order.id)} · {purchasesCopy.paymentMethod[order.method]}
          {order.installments && order.installments > 1 ? ` em ${order.installments}x` : ""} · {brl(order.amount)}
        </p>
        <p className="mt-2 text-[17px] leading-[1.6] text-giz-apagado">
          O acesso é vitalício: as aulas ficam em Meus cursos, e o pedido, em Conta.
        </p>
        {firstLesson && (
          <ButtonLink
            href={`/aprender/${slug}/${firstLesson.slug}`}
            variant="chalk"
            offset="board"
            className="mt-8 h-14 w-full text-[17px] sm:w-auto"
          >
            <Play aria-hidden="true" fill="currentColor" strokeWidth={0} className="size-4" />
            Assistir à primeira aula
          </ButtonLink>
        )}
      </Board>
    );
  } else if (owned) {
    content = (
      <div className="rounded-card border border-line bg-surface p-6 shadow-(--shadow-raised) sm:p-8">
        <h2 className="font-heading text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
          Você já tem este curso
        </h2>
        <p className="mt-3 text-[16px] leading-[1.6] text-ink-tertiary">Não precisa comprar de novo: é só continuar.</p>
        <ButtonLink href={`/aprender/${slug}`} className="mt-6">
          Continuar curso
        </ButtonLink>
      </div>
    );
  } else {
    content = (
      <section aria-labelledby="pagamento-title" className="flex flex-col gap-6">
        <p className="flex flex-wrap items-center gap-x-2 rounded-card border border-line bg-surface px-4 py-3 text-[15px] text-ink-tertiary">
          <Check aria-hidden="true" strokeWidth={3} className="size-4 text-ink-accent" />
          Comprando como <strong className="text-ink">{user.name}</strong>
          <span className="text-ink-muted">({user.email})</span>
        </p>
        <h2 id="pagamento-title" className="font-heading text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[30px]">
          Pagamento
        </h2>
        <Payment slug={slug} pricing={detail.pricing} />
      </section>
    );
  }

  return (
    <div className={cn(container, "pb-24 pt-6 sm:pb-32 sm:pt-10")}>
      <Link
        href={`/cursos/${slug}`}
        className={cn(
          "-ml-2 inline-flex h-11 max-w-full items-center gap-1.5 rounded-control pl-2 pr-3.5 text-[15px] font-bold text-ink-secondary transition-colors hover:bg-surface-muted",
          focusRing,
          ringOffset.canvas,
        )}
      >
        <ChevronLeft aria-hidden="true" className="size-[18px] shrink-0" />
        <span className="truncate">{course.title}</span>
      </Link>
      <h1 className="mt-3 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[44px]">
        Comprar curso
      </h1>
      <Steps current={step} />

      <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">{content}</div>
        <div className="mt-12 lg:col-span-5 lg:mt-0">
          <OrderSummary course={course} pricing={detail.pricing} />
        </div>
      </div>
    </div>
  );
}

/** As três etapas, com as já feitas marcadas e a atual em destaque. */
function Steps({ current }: { current: number }) {
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] font-bold sm:gap-x-3">
      {steps.map((label, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        return (
          <li key={label} aria-current={state === "current" ? "step" : undefined} className="flex items-center gap-3">
            <span className={cn("flex items-center gap-2", state === "todo" ? "text-ink-muted" : "text-ink")}>
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-full border-2 font-heading text-[13px] tabular-nums",
                  state === "done" && "border-lousa-400 bg-lousa-400 text-giz",
                  state === "current" && "border-amarelo-300 bg-amarelo-300 text-ink",
                  state === "todo" && "border-line text-ink-muted",
                )}
              >
                {state === "done" ? <Check strokeWidth={3} className="size-3.5" /> : i + 1}
              </span>
              {label}
              {state === "done" && <span className="sr-only">(concluída)</span>}
            </span>
            {/* No celular as etapas podem quebrar de linha, e o traço ficaria solto no fim dela. */}
            {i < steps.length - 1 && <span aria-hidden="true" className="hidden h-0.5 w-10 rounded-full bg-line sm:block" />}
          </li>
        );
      })}
    </ol>
  );
}

function Payment({ slug, pricing }: { slug: string; pricing: CoursePricing }) {
  const terms = priceTerms(pricing);
  const installmentOptions = Array.from({ length: pricing.installments }, (_, i) =>
    i === 0 ? `1x de ${brl(pricing.price)} (à vista)` : `${i + 1}x de ${brl(pricing.price / (i + 1))} sem juros`,
  );
  return (
    <PaymentForm
      courseSlug={slug}
      price={brl(pricing.price)}
      pixPrice={terms.pix}
      pixDiscount={terms.pixDiscount}
      installmentOptions={installmentOptions}
    />
  );
}

/** Resumo do pedido: o curso, o preço e o que vem junto. */
function OrderSummary({ course, pricing }: { course: Course; pricing: CoursePricing }) {
  const Icon = courseIcons[course.icon];
  const terms = priceTerms(pricing);
  return (
    <aside
      aria-label="Resumo do pedido"
      className="overflow-hidden rounded-card border border-line bg-surface shadow-(--shadow-raised) lg:sticky lg:top-24"
    >
      <span aria-hidden="true" className="block h-3 bg-amarelo-300" />
      <div className="p-6">
        <p className="flex items-center gap-2 text-[14px] font-bold text-ink-tertiary">
          <Icon aria-hidden="true" className="size-4" />
          {areaLabel[course.area]}
        </p>
        <p className="mt-2 font-heading text-[22px] font-bold leading-[1.2] tracking-[-0.015em] text-ink">{course.title}</p>
        <dl className="mt-5 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-t border-line pt-5 text-[15px] tabular-nums">
          <dt className="text-ink-tertiary">No cartão</dt>
          <dd className="text-right font-bold text-ink">{brl(pricing.price)}</dd>
          <dt className="text-ink-tertiary">Parcelado</dt>
          <dd className="text-right text-ink-secondary">{terms.installments.replace(" sem juros", "")}</dd>
          <dt className="text-ink-tertiary">No Pix ({terms.pixDiscount})</dt>
          <dd className="text-right font-bold text-ink">{terms.pix}</dd>
        </dl>
        <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-[15px] text-ink-tertiary">
              <Check aria-hidden="true" strokeWidth={2.5} className="size-4 shrink-0 text-ink-accent" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
