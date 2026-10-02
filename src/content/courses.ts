import {
  BellRing,
  Boxes,
  Brain,
  Compass,
  Factory,
  Keyboard,
  Network,
  SquareTerminal,
  Terminal,
  WandSparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type CourseStatus = "on-sale" | "waitlist";

export type Course = {
  slug: string;
  title: string;
  summary: string;
  status: CourseStatus;
  /** Faz parte da Trilha do Engenheiro de IA. */
  inTrack: boolean;
  /** Ícone usado no placeholder da capa enquanto não há imagem própria. */
  icon: LucideIcon;
  /** Caminho em /public para a capa definitiva (opcional). */
  image?: string;
};

export const statusLabel: Record<CourseStatus, string> = {
  "on-sale": "À venda",
  waitlist: "Lista de espera",
};

export const courses: Course[] = [
  {
    slug: "harness-engineering",
    title: "Harness Engineering",
    summary:
      "Aprenda a construir o harness de um agente, ou seja, a infraestrutura que define quais dados ele enxerga, quais ferramentas pode usar, como mantém memória, como executa tarefas e por onde uma pessoa ou equipe interage com ele.",
    status: "on-sale",
    inTrack: true,
    icon: Workflow,
  },
  {
    slug: "programacao-agentica",
    title: "Programação Agêntica",
    summary:
      "Aprenda a usar agentes em um fluxo real de desenvolvimento de software: preparar o contexto, escrever specs, implementar, revisar, testar, trabalhar com git e avaliar a qualidade do código gerado por IA.",
    status: "on-sale",
    inTrack: true,
    icon: SquareTerminal,
  },
  {
    slug: "fundamentos-da-engenharia-de-ia",
    title: "Fundamentos da Engenharia de IA",
    summary:
      "Construa a base necessária para entender como sistemas com IA funcionam: modelos, tokens, prompts, tools, MCPs, skills, agentes, harness e segurança.",
    status: "on-sale",
    inTrack: true,
    icon: Compass,
  },
  {
    slug: "orquestracao-de-agentes",
    title: "Orquestração de Agentes",
    summary:
      "Aprenda quando é necessário dividir uma tarefa entre vários agentes, como desenhar o papel de cada um e como controlar custo, contexto, latência e qualidade sem criar complexidade desnecessária.",
    status: "waitlist",
    inTrack: false,
    icon: Network,
  },
  {
    slug: "assistentes-pessoais-com-ia",
    title: "Assistentes Pessoais com IA",
    summary:
      "Aprenda a construir um assistente com IA para uso pessoal ou compartilhado, disponível 24/7 no WhatsApp, Telegram, Slack, Teams ou em uma interface web, capaz de executar rotinas, usar ferramentas e respeitar limites de segurança, custo e privacidade.",
    status: "waitlist",
    inTrack: false,
    icon: BellRing,
  },
  {
    slug: "segundo-cerebro-com-obsidian",
    title: "Segundo Cérebro com Obsidian",
    summary:
      "Aprenda a escrever notas melhores com Obsidian: organizar fontes, conectar ideias, preservar o seu próprio raciocínio e preparar uma base de conhecimento que também possa ser usada com IA.",
    status: "waitlist",
    inTrack: false,
    icon: Brain,
  },
  {
    slug: "vibe-coding-para-profissionais",
    title: "Vibe Coding para Profissionais",
    summary:
      "Aprenda a criar sistemas úteis com IA mesmo sem programar profissionalmente, usando vibe coding para protótipos, ferramentas internas e scripts rápidos, e sabendo reconhecer limites de escala, segurança, manutenção e quando envolver um desenvolvedor.",
    status: "waitlist",
    inTrack: false,
    icon: WandSparkles,
  },
  {
    slug: "dominando-codex",
    title: "Dominando o Codex",
    summary:
      "Aprenda a usar Codex no fluxo de trabalho: CLI, app local e tarefas na nuvem, configurando contexto, skills, MCPs, permissões e metas para delegar trabalho sem perder controle.",
    status: "waitlist",
    inTrack: false,
    icon: Terminal,
  },
  {
    slug: "dominando-claude-code",
    title: "Dominando o Claude Code",
    summary:
      "Aprenda a usar Claude Code com mais controle: CLAUDE.md, slash commands, subagentes, skills, MCPs, permissões, modelos, paralelização e fluxos que viram prática diária.",
    status: "waitlist",
    inTrack: false,
    icon: Keyboard,
  },
  {
    slug: "dominando-agent-skills",
    title: "Dominando Agent Skills",
    summary:
      "Aprenda a criar Agent Skills para transformar seu conhecimento e seus processos de trabalho em habilidades reutilizáveis que assistentes de IA e agentes de programação conseguem usar.",
    status: "waitlist",
    inTrack: false,
    icon: Boxes,
  },
  {
    slug: "automacao-com-ia",
    title: "Automação com IA",
    summary:
      "Aprenda a automatizar tarefas recorrentes com IA, combinando scripts, cron jobs, webhooks, scraping, APIs e agentes sem perder controle sobre custo, falhas e supervisão.",
    status: "waitlist",
    inTrack: false,
    icon: Factory,
  },
];

export const trackCourses = courses.filter((c) => c.inTrack);
export const waitlistCourses = courses.filter((c) => !c.inTrack);

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}
