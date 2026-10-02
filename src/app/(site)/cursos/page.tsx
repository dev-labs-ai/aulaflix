import type { Metadata } from "next";
import Link from "next/link";
import { CourseCards } from "@/components/course-list";
import { cn, container, focusRing, ringOffset } from "@/components/ui";
import { areaLabel, areas, courses, type CourseArea, type CourseStatus } from "@/content/courses";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cursos",
};

/** Valor de `?situacao=` para cada status, o rótulo do filtro e como o status entra numa frase. */
const statusFilters: Record<CourseStatus, { slug: string; label: string; phrase: string }> = {
  "on-sale": { slug: "a-venda", label: "À venda", phrase: "à venda" },
  waitlist: { slug: "em-breve", label: "Em breve", phrase: "na lista de espera" },
};

const statuses = Object.keys(statusFilters) as CourseStatus[];

type Filters = { area: CourseArea | null; status: CourseStatus | null };

/** Lê os filtros da URL; valores desconhecidos (ou repetidos) contam como "Todas". */
function parseFilters(params: Record<string, string | string[] | undefined>): Filters {
  const area = areas.find((a) => a === params.area) ?? null;
  const status = statuses.find((s) => statusFilters[s].slug === params.situacao) ?? null;
  return { area, status };
}

function filtersHref({ area, status }: Filters) {
  const query = new URLSearchParams();
  if (area) query.set("area", area);
  if (status) query.set("situacao", statusFilters[status].slug);
  const search = query.toString();
  return search ? `/cursos?${search}` : "/cursos";
}

export default async function CursosPage(props: PageProps<"/cursos">) {
  const filters = parseFilters(await props.searchParams);
  const results = courses.filter(
    (course) => (!filters.area || course.area === filters.area) && (!filters.status || course.status === filters.status),
  );

  const areaOptions = [null, ...areas].map((area) => ({
    label: area ? areaLabel[area] : "Todas",
    href: filtersHref({ ...filters, area }),
    selected: filters.area === area,
  }));
  const statusOptions = [null, ...statuses].map((status) => ({
    label: status ? statusFilters[status].label : "Todas",
    href: filtersHref({ ...filters, status }),
    selected: filters.status === status,
  }));

  return (
    <div className={cn(container, "pb-24 pt-14 sm:pb-32 sm:pt-20 lg:pt-24")}>
      <h1 className="font-heading text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[56px] lg:text-[64px]">
        Todos os cursos
      </h1>
      <p className="mt-5 max-w-[70ch] text-pretty text-[17px] leading-[1.6] text-ink-tertiary sm:text-[18px]">
        Conheça os cursos do {site.name}: os que já estão à venda e os que estão chegando.
      </p>

      <nav aria-label="Filtrar cursos" className="mt-10 space-y-4 border-y border-line py-6 sm:mt-12">
        <FilterGroup id="filtro-area" label="Área" options={areaOptions} />
        <FilterGroup id="filtro-situacao" label="Situação" options={statusOptions} />
      </nav>

      {/* Fica sempre na página, para leitores de tela anunciarem a nova contagem ao trocar o filtro. */}
      <p role="status" className="mt-8 text-[15px] text-ink-muted">
        {results.length === 1 ? "1 curso" : `${results.length} cursos`}
      </p>

      {results.length > 0 ? (
        <CourseCards courses={results} label="Cursos" className="mt-5" />
      ) : (
        <EmptyResults filters={filters} />
      )}
    </div>
  );
}

type FilterOption = { label: string; href: string; selected: boolean };

/** Uma linha de filtros: o rótulo e um link por opção, com a escolhida preenchida. */
function FilterGroup({ id, label, options }: { id: string; label: string; options: FilterOption[] }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
      <p id={id} className="w-20 shrink-0 text-[14px] font-bold text-ink-muted">
        {label}
      </p>
      <ul aria-labelledby={id} className="flex flex-wrap gap-2">
        {options.map((option) => (
          <li key={option.label}>
            <Link
              href={option.href}
              // Trocar o filtro não deve levar a página de volta ao topo.
              scroll={false}
              aria-current={option.selected ? "true" : undefined}
              className={cn(
                "inline-flex h-11 items-center rounded-full border px-4 text-[15px] font-bold transition-colors",
                option.selected
                  ? "border-surface-accent bg-surface-accent text-ink-inverse"
                  : "border-line bg-surface text-ink-secondary hover:border-line-strong hover:text-ink",
                focusRing,
                ringOffset.canvas,
              )}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Nenhum curso com os dois filtros juntos: oferece ver todos os cursos da área escolhida. */
function EmptyResults({ filters }: { filters: Filters }) {
  const area = filters.area ? areaLabel[filters.area] : null;
  const status = filters.status ? statusFilters[filters.status].phrase : null;
  return (
    <div className="mt-5 rounded-card border border-dashed border-line-strong px-6 py-12 text-center">
      <p className="font-heading text-[22px] font-bold leading-[1.2] tracking-[-0.015em] text-ink">
        Nenhum curso por aqui ainda.
      </p>
      <p className="mx-auto mt-3 max-w-[52ch] text-[16px] leading-[1.6] text-ink-tertiary">
        {area && status ? `Ainda não há cursos de ${area} ${status}.` : "Nenhum curso corresponde a esses filtros."}
      </p>
      <Link
        href={filtersHref({ area: filters.area, status: null })}
        scroll={false}
        className={cn(
          "mt-6 inline-block rounded-control text-[16px] font-bold text-ink-accent underline decoration-2 underline-offset-4 transition-colors hover:text-ink-accent-hover",
          focusRing,
          ringOffset.canvas,
        )}
      >
        {area ? `Ver todos os cursos de ${area}` : "Ver todos os cursos"}
      </Link>
    </div>
  );
}
