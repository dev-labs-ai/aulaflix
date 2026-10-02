import type { WaitlistCourseDetail } from "./types";

export const dominandoCodex: WaitlistCourseDetail = {
  kind: "waitlist",
  why: [
    "No Codex, a interação pode sair da conversa e virar execução: CLI, app local, tarefas na nuvem, leitura de contexto, edição de arquivos, comandos, instruções do projeto e trabalho em várias etapas. Isso muda o tipo de tarefa que dá para delegar.",
    "A força do Codex está menos em pedir uma alteração isolada e mais em estruturar trabalho: definir objetivo, preparar contexto, limitar permissões, escolher o modo de execução, revisar diffs, rodar testes e decidir quando a entrega está boa o suficiente. Sem esse desenho, uma tarefa longa vira uma sequência de tentativas soltas.",
    "Dominando o Codex é um crash course para usar o agente da OpenAI com critério. O curso organiza setup, AGENTS.md, skills, MCPs, plugins, aprovações, tarefas longas, navegador, documentos, planilhas, geração de imagens e automações, sempre com a pergunta prática de quando Codex é a melhor ferramenta e quando outra opção faz mais sentido.",
  ],
  learn: [
    "Escolher entre Codex CLI, app local, tarefas na nuvem, ChatGPT Agent e outras superfícies de acordo com o trabalho.",
    "Configurar contexto de projeto, AGENTS.md, permissões, sandbox, aprovações e modelos para reduzir risco e retrabalho.",
    "Usar skills, MCPs, plugins e conectores para ampliar o alcance do Codex sem transformar o ambiente em uma caixa-preta.",
    "Delegar tarefas longas com objetivo, escopo, checkpoints, condição de parada e critérios claros de revisão.",
    "Usar Codex em código, documentos, planilhas, apresentações, navegação, geração de imagens e automações quando a superfície permitir.",
    "Comparar Codex com Claude Code, Cursor e outras ferramentas pelo tipo de tarefa, custo, autonomia e forma de controle.",
  ],
  audience: [
    "Para quem já usa ChatGPT ou Codex, mas ainda não transformou a ferramenta em um fluxo de trabalho consistente.",
    "Para desenvolvedores que usam Claude Code, Cursor ou OpenCode e querem entender onde Codex entra melhor.",
    "Para profissionais que precisam delegar tarefas longas, revisar entregas e trabalhar com arquivos, documentos, planilhas ou navegação.",
    "Para tech leads e times avaliando o ecossistema da OpenAI para tarefas de engenharia, documentação, automação e análise.",
    "Para quem quer aprender a usar Codex com mais autonomia sem abrir mão de permissões, revisão, testes e controle de custo.",
  ],
  coverage: [
    "Codex, ChatGPT e ChatGPT Agent: o que muda quando a ferramenta deixa de responder e passa a executar tarefas.",
    "Codex CLI, app local, IDE, tarefas na nuvem e outras superfícies de uso dentro do ecossistema da OpenAI.",
    "Setup, login, planos, API, modelos, limites, custos e escolhas práticas antes de começar.",
    "AGENTS.md, contexto do repositório, instruções persistentes, permissões, sandbox e modos de aprovação.",
    "Skills, MCPs, plugins, conectores e formas de expandir o que Codex consegue fazer.",
    "Tarefas longas: objetivos, specs, checkpoints, condição de parada, revisão e continuidade entre sessões.",
    "Uso profissional além do código: navegador, arquivos, documentos, planilhas, apresentações, geração de imagens e automações.",
    "Git, branches, worktrees, testes, diffs e critérios para aceitar ou rejeitar uma entrega do agente.",
    "Quando escolher Codex, Claude Code, Cursor, ChatGPT Agent ou outra ferramenta para o mesmo trabalho.",
  ],
  faq: [
    {
      question: "Codex é a mesma coisa que ChatGPT?",
      answer: "Não. ChatGPT é a interface geral de conversa e trabalho. Codex é voltado a tarefas em que o agente precisa ler contexto, modificar arquivos, executar comandos ou trabalhar de forma mais parecida com um operador. As fronteiras entre produtos podem mudar, mas o curso foca no uso prático dessas superfícies.",
    },
    {
      question: "Preciso saber programar?",
      answer: "Para o uso de Codex em repositórios e tarefas de engenharia, sim, alguma familiaridade com código ajuda bastante. O curso também mostra usos em documentos, planilhas, navegação, imagens e automações, mas o núcleo é aprender a delegar trabalho técnico com controle.",
    },
    {
      question: "Preciso ter assinatura do ChatGPT ou API?",
      answer: "O curso explica os caminhos de acesso disponíveis, planos, API, limites e custos. Como isso pode mudar, a parte importante é entender o que cada modo permite fazer e como escolher o caminho certo para o seu uso.",
    },
    {
      question: "Codex substitui Claude Code?",
      answer: "Não como substituição direta. Codex e Claude Code têm forças, superfícies e modelos de uso diferentes. O curso ajuda a comparar os dois pelo tipo de tarefa, pelo contexto disponível, pelo controle de permissões, pelo custo e pela forma como você prefere revisar o trabalho.",
    },
    {
      question: "O curso cobre tarefas longas?",
      answer: "Sim. Um dos focos é como delegar tarefas que não cabem em uma única resposta: definir objetivo, preparar contexto, quebrar etapas, estabelecer condição de parada, revisar entregas e retomar o trabalho sem perder direção.",
    },
    {
      question: "O que acontece quando eu entro na lista de espera?",
      answer: "Você registra seu interesse neste curso. Isso me ajuda a entender quais temas devem entrar primeiro em produção. Quando houver novidades sobre o curso, você ficará sabendo pelo e-mail informado.",
    },
  ],
};
