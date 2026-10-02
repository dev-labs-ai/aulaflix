// Conteúdo das páginas de curso (/cursos/[slug]).
// Título, resumo e status ficam em src/content/courses.ts.
import { programacaoDoZero } from "./programacao-do-zero";
import { designDeInterfaces } from "./design-de-interfaces";
import { analiseDeDadosComPlanilhas } from "./analise-de-dados-com-planilhas";
import { desenvolvimentoWeb } from "./desenvolvimento-web";
import { marketingDigital } from "./marketing-digital";
import { fotografiaComCelular } from "./fotografia-com-celular";
import { financasPessoais } from "./financas-pessoais";
import type { CourseDetail } from "./types";

export type * from "./types";

export const courseDetails: Record<string, CourseDetail> = {
  "programacao-do-zero": programacaoDoZero,
  "design-de-interfaces": designDeInterfaces,
  "analise-de-dados-com-planilhas": analiseDeDadosComPlanilhas,
  "desenvolvimento-web": desenvolvimentoWeb,
  "marketing-digital": marketingDigital,
  "fotografia-com-celular": fotografiaComCelular,
  "financas-pessoais": financasPessoais,
};

export function getCourseDetail(slug: string): CourseDetail | undefined {
  return courseDetails[slug];
}

