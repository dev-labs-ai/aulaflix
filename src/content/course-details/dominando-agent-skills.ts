import type { WaitlistCourseDetail } from "./types";

export const dominandoAgentSkills: WaitlistCourseDetail = {
  kind: "waitlist",
  why: [
    "Depois de um tempo usando assistentes de IA e agentes de programação, fica claro que a ferramenta só enxerga uma parte do seu trabalho. Critérios de revisão, comandos, exemplos, checklists, referências, scripts e pequenas decisões continuam espalhados entre notas, arquivos de projeto e memória pessoal.",
    "Agent Skills servem para transformar parte desse conhecimento em uma habilidade reutilizável. Uma skill pode reunir instruções, arquivos de apoio, exemplos e scripts; o agente carrega esse material quando a tarefa pede, em vez de depender de uma explicação nova toda vez.",
    "Dominando Agent Skills ensina a decidir quando criar uma skill, como escrever o SKILL.md, como organizar referências e ferramentas de apoio, como combinar skills com scripts, CLIs e MCPs e como avaliar skills prontas antes de adotá-las.",
  ],
  learn: [
    "Identificar quando uma parte do seu trabalho merece virar uma Agent Skill e quando uma instrução simples já resolve.",
    "Criar uma skill em Markdown com descrição, gatilhos, instruções e estrutura legível para o agente.",
    "Transformar referências, exemplos, comandos e checklists em material que o agente consegue carregar quando a tarefa pede.",
    "Combinar skills com bash, Python, pacotes, CLIs, MCPs e outras ferramentas quando a tarefa precisa executar comandos, consultar dados ou chamar APIs.",
    "Versionar, compartilhar e reutilizar skills entre projetos, máquinas, agentes ou times.",
    "Avaliar skills prontas antes de adotá-las, separando o que melhora o fluxo do que só adiciona mais uma camada de confusão.",
  ],
  audience: [
    "Para quem já usa Claude Code, Codex, ChatGPT ou outros agentes e quer transformar instruções recorrentes em um fluxo mais consistente.",
    "Para desenvolvedores que querem registrar padrões de trabalho, scripts, comandos e ferramentas internas como Agent Skills reutilizáveis.",
    "Para profissionais que têm processos recorrentes e querem ensinar assistentes de IA a seguir esse modo de trabalho com mais consistência.",
    "Para times que precisam compartilhar boas práticas, comandos, referências e workflows sem depender apenas de conhecimento informal.",
    "Para quem quer entender a diferença entre Agent Skills, MCPs, slash commands, prompts, CLAUDE.md e ferramentas executáveis.",
  ],
  coverage: [
    "O que são Agent Skills e por que elas resolvem um problema diferente de prompts, CLAUDE.md, slash commands e MCPs.",
    "Quando uma parte do seu trabalho merece virar skill: critérios, referências, comandos, checklists, exemplos e scripts recorrentes.",
    "Progressive disclosure: como o agente encontra a skill certa e carrega só o contexto necessário para a tarefa.",
    "A estrutura de uma skill: SKILL.md, frontmatter, descrição, instruções, referências, scripts, assets e exemplos.",
    "Como escrever descrições, gatilhos e instruções que ajudam o agente a decidir quando usar uma skill.",
    "Como criar skills simples em Markdown e quando usar helpers, skill-creator ou estruturas mais completas.",
    "Como combinar skills com bash, Python, pacotes, CLIs, MCPs e outras ferramentas executáveis.",
    "Como avaliar boas Agent Skills: utilidade, segurança, dependências, portabilidade e manutenção.",
    "Compartilhamento por Git, symlinks, plugins, repositórios internos e uso em equipes.",
  ],
  faq: [
    {
      question: "Agent Skills funcionam só no Claude?",
      answer: "Não. O Claude ajudou a popularizar o formato, mas a ideia é mais ampla: dar ao agente uma habilidade reutilizável que ele carrega quando a tarefa pede. Cada ferramenta implementa isso de um jeito, por isso o curso separa os princípios do que é específico de cada produto.",
    },
    {
      question: "Preciso saber programar para criar Agent Skills?",
      answer: "Para criar skills simples em Markdown, não. Programação começa a ajudar quando a skill chama scripts, CLIs, pacotes, MCPs ou outras ferramentas. O curso separa esses níveis para você saber quando uma skill pode ser só instrução e quando precisa executar código.",
    },
    {
      question: "O curso mostra exemplos de boas Agent Skills?",
      answer: "Sim. Os exemplos entram para mostrar o que torna uma skill útil: quando ela deve ser carregada, que contexto oferece, que ferramentas chama, quais dependências traz e como pode ser mantida. Isso ajuda você a adaptar skills prontas e criar as suas próprias sem montar uma coleção difícil de controlar.",
    },
    {
      question: "Qual é a diferença entre Agent Skill e MCP?",
      answer: "Uma Agent Skill orienta o agente a seguir um modo de trabalho ou usar um conjunto de conhecimento quando a tarefa pede. Um MCP normalmente expõe ferramentas, dados ou ações externas. Eles podem trabalhar juntos, mas resolvem problemas diferentes.",
    },
    {
      question: "Quando uma skill é melhor do que colocar tudo no CLAUDE.md?",
      answer: "Quando aquela instrução só importa em algumas tarefas. CLAUDE.md é útil para contexto permanente do projeto. Uma skill funciona melhor para habilidades específicas, porque o agente pode carregar a informação quando ela for relevante, sem poluir todo o contexto.",
    },
    {
      question: "Posso compartilhar minhas Agent Skills com outras pessoas?",
      answer: "Sim. O curso cobre formas de compartilhar por Git, symlinks, plugins ou repositórios internos, além de cuidados com versionamento, dependências, credenciais e licenciamento quando a skill sai do uso pessoal.",
    },
    {
      question: "O que acontece quando eu entro na lista de espera?",
      answer: "Você registra seu interesse neste curso. Isso me ajuda a entender quais temas devem entrar primeiro em produção. Quando houver novidades sobre o curso, você ficará sabendo pelo e-mail informado.",
    },
  ],
};
