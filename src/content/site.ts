// Conteúdo global do site.

export const site = {
  name: "Aulaflix",
  /** Nome como aparece no logotipo, em minúsculas. */
  wordmark: "aulaflix",
  title: "Aulaflix — Cursos online para aprender no seu ritmo",
  description:
    "Cursos online de programação, design, dados, negócios e outros temas. Aprenda no seu ritmo, com acesso vitalício.",
  legalName: "AULAFLIX TECNOLOGIA LTDA",
};

type NavItem = { label: string; href: string; /** Selo ao lado do link, ex.: "Novo". */ badge?: string };

export const mainNav: NavItem[] = [
  { label: "Cursos", href: "/cursos" },
  { label: "Sobre", href: "/#sobre" },
];
