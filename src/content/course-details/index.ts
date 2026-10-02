// Conteúdo das páginas de curso (/cursos/[slug]), extraído da referência.
// Título, resumo e status ficam em src/content/courses.ts.
import { harnessEngineering } from "./harness-engineering";
import { programacaoAgentica } from "./programacao-agentica";
import { fundamentosDaEngenhariaDeIa } from "./fundamentos-da-engenharia-de-ia";
import { orquestracaoDeAgentes } from "./orquestracao-de-agentes";
import { assistentesPessoaisComIa } from "./assistentes-pessoais-com-ia";
import { segundoCerebroComObsidian } from "./segundo-cerebro-com-obsidian";
import { vibeCodingParaProfissionais } from "./vibe-coding-para-profissionais";
import { dominandoCodex } from "./dominando-codex";
import { dominandoClaudeCode } from "./dominando-claude-code";
import { dominandoAgentSkills } from "./dominando-agent-skills";
import { automacaoComIa } from "./automacao-com-ia";
import type { CourseDetail } from "./types";

export type * from "./types";

export const courseDetails: Record<string, CourseDetail> = {
  "harness-engineering": harnessEngineering,
  "programacao-agentica": programacaoAgentica,
  "fundamentos-da-engenharia-de-ia": fundamentosDaEngenhariaDeIa,
  "orquestracao-de-agentes": orquestracaoDeAgentes,
  "assistentes-pessoais-com-ia": assistentesPessoaisComIa,
  "segundo-cerebro-com-obsidian": segundoCerebroComObsidian,
  "vibe-coding-para-profissionais": vibeCodingParaProfissionais,
  "dominando-codex": dominandoCodex,
  "dominando-claude-code": dominandoClaudeCode,
  "dominando-agent-skills": dominandoAgentSkills,
  "automacao-com-ia": automacaoComIa,
};

export function getCourseDetail(slug: string): CourseDetail | undefined {
  return courseDetails[slug];
}

/** Preço do pacote da Trilha mostrado no card de compra dos cursos da Trilha. */
export const trackBundle = { courses: 3, price: 3497 };
