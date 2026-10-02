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

export const footerElsewhere = [
  { icon: "substack", label: "Substack", detail: substack.name, href: substack.href },
  { icon: "youtube", label: "YouTube", detail: youtubeChannel.name, href: youtubeChannel.href },
  { icon: "discord", label: "Discord", detail: instructor.name, href: "https://discord.gg/xCAYeh8mGf" },
] as const;

export const socialLinks = [
  { icon: "github", label: "GitHub", href: "https://github.com/robsonoliveiradacosta" },
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/quant_brasil/" },
  { icon: "telegram", label: "Telegram", href: "https://t.me/quantbrasil" },
] as const;
