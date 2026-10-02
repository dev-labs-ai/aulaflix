// Catálogo de exemplo: cursos genéricos para o protótipo.
// Sem dependência de framework: só dados e tipos, reaproveitáveis em outro front-end.

export type CourseStatus = "on-sale" | "waitlist";

/** Nome do ícone na biblioteca Lucide (https://lucide.dev/icons). */
export type CourseIcon = "code" | "pen-tool" | "chart-column" | "globe" | "megaphone" | "camera" | "piggy-bank";

export type Course = {
  slug: string;
  title: string;
  summary: string;
  status: CourseStatus;
  /** Ícone usado no placeholder da capa enquanto não há imagem própria. */
  icon: CourseIcon;
  /** Caminho em /public para a capa definitiva (opcional). */
  image?: string;
};

export const statusLabel: Record<CourseStatus, string> = {
  "on-sale": "À venda",
  waitlist: "Lista de espera",
};

export const courses: Course[] = [
  {
    slug: "programacao-do-zero",
    title: "Programação do Zero",
    summary:
      "Aprenda lógica de programação e escreva seus primeiros programas em Python, com exercícios curtos que levam do primeiro comando a pequenos projetos completos.",
    status: "on-sale",
    icon: "code",
  },
  {
    slug: "design-de-interfaces",
    title: "Design de Interfaces",
    summary:
      "Aprenda os fundamentos de layout, tipografia, cor e hierarquia visual para criar telas claras e agradáveis, do rascunho ao protótipo navegável.",
    status: "on-sale",
    icon: "pen-tool",
  },
  {
    slug: "analise-de-dados-com-planilhas",
    title: "Análise de Dados com Planilhas",
    summary:
      "Organize, limpe e analise dados em planilhas, use fórmulas e tabelas dinâmicas e transforme números em gráficos que ajudam a tomar decisões.",
    status: "on-sale",
    icon: "chart-column",
  },
  {
    slug: "desenvolvimento-web",
    title: "Desenvolvimento Web",
    summary:
      "Construa sites com HTML, CSS e JavaScript, entendendo como as páginas são estruturadas, estilizadas, deixadas interativas e publicadas na internet.",
    status: "waitlist",
    icon: "globe",
  },
  {
    slug: "marketing-digital",
    title: "Marketing Digital",
    summary:
      "Planeje sua presença online, produza conteúdo para redes sociais, crie campanhas simples e acompanhe os números que mostram o que está funcionando.",
    status: "waitlist",
    icon: "megaphone",
  },
  {
    slug: "fotografia-com-celular",
    title: "Fotografia com o Celular",
    summary:
      "Tire fotos melhores usando só o celular: composição, luz natural, recursos da câmera e edição rápida em aplicativos gratuitos.",
    status: "waitlist",
    icon: "camera",
  },
  {
    slug: "financas-pessoais",
    title: "Finanças Pessoais",
    summary:
      "Monte um orçamento que funcione, organize as dívidas, crie uma reserva de emergência e dê os primeiros passos para investir com segurança.",
    status: "waitlist",
    icon: "piggy-bank",
  },
];

export const onSaleCourses = courses.filter((c) => c.status === "on-sale");
export const waitlistCourses = courses.filter((c) => c.status === "waitlist");

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}
