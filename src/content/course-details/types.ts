export type Lesson = {
  title: string;
  /** Duração no formato "mm:ss". Sem duração, a aula aparece bloqueada como "Em breve". */
  duration?: string;
};

export type CourseModule = {
  title: string;
  lessons: Lesson[];
};

export type CoursePricing = {
  /** Preço cheio em reais. */
  price: number;
  /** Número de parcelas sem juros. */
  installments: number;
  /** Desconto extra no Pix (0.1 = 10%). */
  pixDiscount: number;
};

export type FaqEntry = { question: string; answer: string };

type CourseDetailBase = {
  /** Parágrafos de "Sobre o curso". */
  why: string[];
  /** Itens numerados de "O que você vai aprender". */
  learn: string[];
  /** Itens de "Para quem é". */
  audience: string[];
  faq: FaqEntry[];
};

/** Curso à venda: card de compra e conteúdo programático por módulos. */
export type OnSaleCourseDetail = CourseDetailBase & {
  kind: "on-sale";
  pricing: CoursePricing;
  modules: CourseModule[];
};

/** Curso em lista de espera: formulário de inscrição e tópicos previstos. */
export type WaitlistCourseDetail = CourseDetailBase & {
  kind: "waitlist";
  /** Itens de "O que o curso vai cobrir". */
  coverage: string[];
};

export type CourseDetail = OnSaleCourseDetail | WaitlistCourseDetail;
