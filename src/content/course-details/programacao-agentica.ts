import type { OnSaleCourseDetail } from "./types";

export const programacaoAgentica: OnSaleCourseDetail = {
  kind: "on-sale",
  pricing: { price: 1497, installments: 10, pixDiscount: 0.1 },
  why: [
    "Agentes como Claude Code, Codex, Cursor e OpenCode mudaram a forma como muita gente escreve software. Hoje é possível sair de uma ideia para uma implementação funcional muito mais rápido do que antes, inclusive em projetos que exigem leitura de código, edição de arquivos, execução de comandos, testes e ajustes em várias etapas.",
    "Essa velocidade, porém, muda o problema. Quando a IA passa a escrever partes relevantes do código, o trabalho do desenvolvedor não desaparece; ele se desloca para outras decisões, como preparar o contexto, definir a tarefa, escolher o agente certo, limitar o escopo, revisar a arquitetura, rodar testes, controlar o git e decidir o que deve ser aceito, corrigido ou descartado.",
    "Programação Agêntica existe para organizar esse fluxo de ponta a ponta. O curso trata o agente como parte do desenvolvimento de software: uma ferramenta que precisa de contexto, limites, verificação e responsabilidade técnica para produzir código que você consiga entender, manter e entregar.",
  ],
  learn: [
    "Preparar o contexto de um projeto para que agentes entendam a arquitetura, os comandos, as convenções e os limites da codebase.",
    "Escrever specs e planos de implementação que ajudem o agente a trabalhar em tarefas maiores sem perder direção entre uma etapa e outra.",
    "Usar agentes para implementar features, corrigir bugs, refatorar código e explorar alternativas sem transformar o repositório em um experimento sem controle.",
    "Revisar código gerado por IA com critérios de arquitetura, legibilidade, contratos, segurança, testes e manutenção.",
    "Trabalhar com git, branches, commits, pull requests e worktrees dentro de um fluxo em que humanos e agentes colaboram no mesmo código.",
    "Escolher ferramentas, modelos e níveis de autonomia de acordo com o tipo de tarefa, o custo, o risco e a qualidade esperada.",
  ],
  audience: [
    "Para quem já programa e quer incorporar agentes ao trabalho diário sem perder controle sobre arquitetura, qualidade e entrega.",
    "Para quem está aprendendo a programar e quer entender desde cedo como usar IA sem depender apenas de tentativa e erro.",
    "Para desenvolvedores que já usam Claude Code, Codex, Cursor, OpenCode ou ferramentas parecidas, mas ainda sentem falta de um fluxo mais consistente.",
    "Para tech leads e engenheiros experientes que precisam orientar times, revisar código gerado por IA e decidir onde agentes fazem sentido no processo de desenvolvimento.",
    "Para quem quer sair de testes soltos com agentes e construir um processo mais completo: contexto, specs, implementação, revisão, testes, git e entrega.",
  ],
  modules: [
    {
      title: "Fundamentos da programação agêntica",
      lessons: [
        { title: "Da geração de código à programação agêntica", duration: "37:39" },
        { title: "Delegação proporcional ao entendimento", duration: "32:23" },
      ],
    },
    {
      title: "Preparando o projeto e o contexto",
      lessons: [
        { title: "Onde os agentes de programação trabalham", duration: "35:45" },
        { title: "Git como uma rede de segurança", duration: "25:33" },
        { title: "Preparando o repositório para um agente de programação", duration: "29:18" },
      ],
    },
    {
      title: "Spec-Driven Development",
      lessons: [
        { title: "Por que prompts vagos falham", duration: "35:18" },
        { title: "Da ideia ao PRD", duration: "31:22" },
        { title: "Spec-Driven Development como método", duration: "46:07" },
        { title: "Workshop prático: da ideia à especificação pronta para o agente" },
      ],
    },
    {
      title: "Executando com agentes de programação",
      lessons: [
        { title: "Executando uma tarefa guiada por feedback" },
        { title: "Escolhendo o modelo e o nível de reasoning" },
        { title: "Buscando o contexto que falta durante a implementação" },
        { title: "Usando Skills em tarefas recorrentes de desenvolvimento" },
        { title: "Criando uma Skill para o seu projeto" },
      ],
    },
    {
      title: "Desenvolvendo em toda a stack",
      lessons: [
        { title: "Backend e dados com IA" },
        { title: "Frontend com IA" },
        { title: "Infraestrutura e deploy com IA" },
        { title: "Workshop prático: uma mudança vertical em toda a stack" },
      ],
    },
    {
      title: "Git, colaboração e trabalho paralelo",
      lessons: [
        { title: "Preparando o trabalho para continuidade e execução em paralelo" },
        { title: "Trabalho em paralelo local com worktrees do Git" },
        { title: "Trabalho em paralelo com agentes na nuvem" },
      ],
    },
    {
      title: "Verificação, code review e segurança",
      lessons: [
        { title: "Autoverificação com análise estática e testes automatizados" },
        { title: "Validando de ponta a ponta o produto em execução" },
        { title: "Code review automático como linha de defesa independente" },
        { title: "Revisão de segurança e ferramentas especializadas" },
      ],
    },
    {
      title: "Loop Engineering",
      lessons: [
        { title: "Projetando loops recorrentes de agentes no desenvolvimento de software" },
        { title: "Construindo o seu próprio loop de engenharia de software" },
      ],
    },
  ],
  faq: [
    {
      question: "Preciso saber programar para fazer este curso?",
      answer: "Familiaridade com programação é importante. O curso foi pensado para quem já programa ou está aprendendo a programar e quer usar agentes dentro de um fluxo real de desenvolvimento de software. Quando conceitos de IA aparecerem, eles entram a serviço do código, da arquitetura e do processo de entrega.",
    },
    {
      question: "Preciso ter feito Fundamentos da Engenharia de IA antes?",
      answer: "Não é obrigatório. Fundamentos da Engenharia de IA ajuda se você ainda não está familiarizado com modelo, contexto, prompt, tool, agente e avaliação, mas Programação Agêntica parte do ponto de vista de quem quer aplicar esses conceitos no desenvolvimento de software.",
    },
    {
      question: "O curso é sobre Claude Code, Codex ou Cursor?",
      answer: "O curso usa essas ferramentas como exemplos importantes, mas não é um treinamento preso a uma delas. A ideia é aprender o fluxo: como preparar contexto, especificar tarefas, escolher a ferramenta certa, revisar diffs, rodar testes e decidir quando o código gerado por IA pode ser aceito.",
    },
    {
      question: "Qual é a diferença entre este curso e Harness Engineering?",
      answer: "Harness Engineering olha para a infraestrutura do agente: tools, MCPs, skills, memória, permissões, execução e interface de uso. Programação Agêntica olha para o uso desses agentes no desenvolvimento de software: como transformar uma tarefa em implementação, revisar o código, usar git, testar, corrigir e entregar.",
    },
    {
      question: "Esse curso é só sobre evitar vibe coding?",
      answer: "Não. Vibe coding entra como uma distinção importante, porque nem todo uso de IA para programar tem o mesmo nível de rigor. Mas o curso é mais amplo: ele trata do fluxo completo de desenvolvimento com agentes, incluindo contexto, specs, implementação, revisão, testes, git, custo, escolha de modelo e qualidade do código.",
    },
  ],
};
