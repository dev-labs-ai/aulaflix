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
  name: "Rafael Quintanilha",
  heroCaption: "Rafael Quintanilha. IA em produção, todo dia.",
  bio: [
    "Quem acompanha meus vídeos já conhece meu jeito de ensinar: eu parto de um problema concreto e vou construindo o raciocínio junto com a implementação, com tempo para mostrar os detalhes que normalmente são deixados de lado.",
    "O Aulaflix nasce para organizar esse trabalho em cursos, de modo que eu possa tratar cada tema desde a base, avançar em uma ordem que faça sentido e dedicar tempo à prática e aos detalhes que um vídeo isolado não consegue desenvolver.",
    "A formação também vem da prática. Sou formado em Engenharia de Software, escrevo código profissionalmente desde 2012, lidero a engenharia de uma empresa nos Estados Unidos e também atuo como consultor. Essa experiência aparece nos temas escolhidos, nos exemplos e no nível de detalhe dos cursos.",
  ],
};

export const youtubeChannel = {
  name: "QuantBrasil",
  href: "https://www.youtube.com/@quantbrasil",
  subscribers: "43,3 mil",
  views: "2,9 M",
  videos: "336",
};

export const substack = {
  name: "Code Capital",
  href: "https://codecapital.substack.com",
};

export const footerNav = [
  { label: "Cursos", href: "/cursos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Sobre o Rafael", href: "/#sobre" },
];

export const footerElsewhere = [
  { icon: "substack", label: "Substack", detail: substack.name, href: substack.href },
  { icon: "youtube", label: "YouTube", detail: youtubeChannel.name, href: youtubeChannel.href },
  { icon: "discord", label: "Discord", detail: "Rafael Quintanilha", href: "https://discord.gg/xCAYeh8mGf" },
] as const;

export const socialLinks = [
  { icon: "github", label: "GitHub", href: "https://github.com/robsonoliveiradacosta" },
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/quant_brasil/" },
  { icon: "telegram", label: "Telegram", href: "https://t.me/quantbrasil" },
] as const;
