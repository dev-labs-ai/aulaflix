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
