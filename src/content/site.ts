// Conteúdo global do site. Os textos ainda são placeholders copiados da referência
// (programe.ai) e devem ser trocados pelo conteúdo do Aulaflix.

export const site = {
  name: "Aulaflix",
  // O logotipo renderiza `brand.base` + `brand.accent` (este último na cor de destaque).
  brand: { base: "Aula", accent: "flix" },
  title: "Aulaflix — Formação em Engenharia de IA",
  description:
    "Formação em Engenharia de IA. Aprenda como sistemas com IA são projetados, construídos e avaliados.",
  legalName: "AULAFLIX TECNOLOGIA LTDA",
};

type NavItem = { label: string; href: string; /** Selo ao lado do link, ex.: "Novo". */ badge?: string };

export const mainNav: NavItem[] = [
  { label: "Cursos", href: "/cursos" },
  { label: "Sobre", href: "/#sobre" },
];

export const instructor = {
  name: "Instrutor",
};

export const youtubeChannel = {
  name: "QuantBrasil",
  href: "https://www.youtube.com/@quantbrasil",
};

export const substack = {
  name: "Code Capital",
  href: "https://codecapital.substack.com",
};

export const footerNav = [
  { label: "Cursos", href: "/cursos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Sobre", href: "/#sobre" },
];

export const socialLinks = [
  { icon: "github", label: "GitHub", href: "https://github.com/robsonoliveiradacosta" },
] as const;
