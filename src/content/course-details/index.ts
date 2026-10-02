// Conteúdo das páginas de curso (/cursos/[slug]).
// Título, resumo e status ficam em src/content/courses.ts.
import { programacaoDoZero } from "./programacao-do-zero";
import { designDeInterfaces } from "./design-de-interfaces";
import { analiseDeDadosComPlanilhas } from "./analise-de-dados-com-planilhas";
import { desenvolvimentoWeb } from "./desenvolvimento-web";
import { marketingDigital } from "./marketing-digital";
import { fotografiaComCelular } from "./fotografia-com-celular";
import { financasPessoais } from "./financas-pessoais";
import type { CourseDetail, CourseModule, Lesson, OnSaleCourseDetail } from "./types";

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

/** Uma aula do curso, com o endereço dela, o número na ementa e o módulo (e o número dele) em que está. */
export type LessonEntry = { lesson: Lesson; slug: string; number: number; module: CourseModule; moduleNumber: number };

/** Endereço da aula em /aprender/[curso]/[aula], tirado do título ("Seu primeiro programa" → "seu-primeiro-programa"). */
export function lessonSlug(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Todas as aulas do curso em ordem, numeradas em sequência contínua entre os módulos. */
export function courseLessons(detail: OnSaleCourseDetail): LessonEntry[] {
  let number = 0;
  return detail.modules.flatMap((mod, m) =>
    mod.lessons.map((lesson) => ({
      lesson,
      slug: lessonSlug(lesson.title),
      number: ++number,
      module: mod,
      moduleNumber: m + 1,
    })),
  );
}

/** A aula aberta do curso (`free: true`). */
export function getFreeLesson(detail: OnSaleCourseDetail) {
  return courseLessons(detail).find((entry) => entry.lesson.free);
}

