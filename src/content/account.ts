// Menu da conta (header, com o usuário logado).

/** Nome do ícone na biblioteca Lucide (https://lucide.dev/icons). */
export type AccountIcon = "book-open" | "receipt" | "settings";

export type AccountLink = { label: string; href: string; icon: AccountIcon };

export const accountMenu = {
  open: "Abrir menu da conta",
  label: "Menu da conta",
  /** Áreas da conta; no celular aparecem junto com os links do menu principal. */
  links: [
    { label: "Meus cursos", href: "/meus-cursos", icon: "book-open" },
    { label: "Minhas compras", href: "/compras", icon: "receipt" },
  ] satisfies AccountLink[],
  settings: { label: "Configurações", href: "/configuracoes", icon: "settings" } satisfies AccountLink,
  signOut: "Sair",
};

/** Iniciais para o avatar: primeira e última palavra do nome ("Aluno Aulaflix" → "AA"). */
export function initials(name: string | null, email: string) {
  const words = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  return (words[0]?.[0] ?? email[0] ?? "?").toUpperCase();
}

export const myCoursesCopy = {
  title: "Meus cursos",
  description: "Continue de onde parou nos cursos que você comprou.",
  start: "Começar",
  continue: "Continuar",
  openCourse: "Abrir curso",
  notStarted: (lessons: number) => `${lessons} ${lessons === 1 ? "aula" : "aulas"} · não iniciado`,
  progress: (done: number, total: number, percent: number, status?: string) =>
    [`${done} / ${total} aulas`, `${percent}%`, status].filter(Boolean).join(" · "),
  completed: "concluído",
  caughtUp: "em dia",
  progressLabel: (title: string) => `Progresso em ${title}`,
  onSale: (count: number) => `+ ${count} ${count === 1 ? "curso" : "cursos"} à venda.`,
  waitlist: (count: number) => `+ ${count} ${count === 1 ? "curso" : "cursos"} em lista de espera.`,
  catalog: "Ver catálogo",
  empty: {
    title: "Você ainda não tem nenhum curso",
    body: "Explore os cursos e escolha por onde começar.",
    cta: "Ver todos os cursos",
  },
};

export const purchasesCopy = {
  title: "Minhas compras",
  description: "Seus pedidos no Aulaflix: pagamentos, valores e cursos incluídos.",
  status: { paid: "Pago" },
  paymentMethod: { pix: "Pix", card: "Cartão" },
  order: (id: string) => `Pedido ${id}`,
  includes: "Inclui",
  empty: {
    title: "Você ainda não realizou nenhuma compra",
    body: "Explore os cursos e escolha por onde começar.",
    cta: "Ver todos os cursos",
  },
};
