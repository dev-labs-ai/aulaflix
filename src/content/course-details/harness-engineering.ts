import type { OnSaleCourseDetail } from "./types";

export const harnessEngineering: OnSaleCourseDetail = {
  kind: "on-sale",
  pricing: { price: 1797, installments: 10, pixDiscount: 0.1 },
  why: [
    "Um modelo sozinho recebe contexto e devolve uma resposta. Para que ele funcione como agente dentro de um projeto real, alguém precisa decidir o que ele pode ver, quais ferramentas pode chamar, onde pode escrever, como preserva memória, quais limites precisa respeitar e como o resultado será verificado.",
    "O harness é essa infraestrutura em volta do modelo. É ali que uma ideia abstrata de agente começa a virar um sistema capaz de trabalhar com dados, documentos, comandos, APIs e regras de um contexto específico, seja para uso pessoal, para um time ou para uma empresa.",
    "Harness Engineering existe para estudar essa camada como projeto de engenharia: quais peças entram no harness, como elas se conectam, que decisões mudam o comportamento do agente e como avaliar se a infraestrutura ao redor do modelo está ajudando ou atrapalhando.",
  ],
  learn: [
    "Entender a anatomia de um harness: instruções, contexto, ferramentas, MCPs, skills, memória, permissões, execução e verificação.",
    "Separar o que vem do modelo do que precisa ser construído ao redor dele para que um agente funcione dentro de um contexto real.",
    "Desenhar um harness a partir do trabalho que o agente precisa realizar: quais dados ele acessa, quais ferramentas chama, onde pode escrever, que limites respeita e como entrega resultado para quem usa.",
    "Construir, na prática, uma primeira versão do seu próprio harness, seja usando um SDK, adaptando uma infraestrutura existente ou partindo de uma implementação mais minimalista.",
    "Avaliar e melhorar o harness depois que o agente começa a rodar, ajustando ferramentas, contexto, memória, permissões e formas de verificação quando o comportamento não está bom.",
  ],
  audience: [
    "Para quem quer construir agentes dentro de contextos reais, com acesso a dados, documentos, ferramentas e permissões controladas.",
    "Para desenvolvedores que já usam Claude Code, Codex, Cursor, OpenCode ou outros agentes, mas querem entender melhor a infraestrutura que faz esse tipo de ferramenta funcionar.",
    "Para quem precisa criar agentes internos para um time, uma empresa ou um produto, conectando o modelo a APIs, arquivos, bancos de dados, documentação e regras próprias.",
    "Para quem quer adaptar um harness existente, usar SDKs ou construir uma versão mais minimalista para um caso de uso específico.",
    "Para quem já estudou os fundamentos da Engenharia de IA e quer avançar para a construção prática de agentes.",
  ],
  modules: [
    {
      title: "Entendendo o harness como sistema",
      lessons: [
        { title: "Por que um modelo não é um agente", duration: "33:35" },
        { title: "A anatomia de um harness", duration: "36:01" },
        { title: "Pi: um harness minimalista", duration: "40:30" },
      ],
    },
    {
      title: "Como um agente opera: modelo, ferramentas e loop",
      lessons: [
        { title: "Entendendo o agent loop", duration: "22:27" },
        { title: "Construindo um agent loop do zero", duration: "34:40" },
      ],
    },
    {
      title: "Ferramentas, capacidades e integrações",
      lessons: [
        { title: "File system e shell como base da operação" },
        { title: "Operando software com CLIs, APIs, navegadores e computer use" },
        { title: "MCP como camada de integração do agente" },
        { title: "Skills como manual de operação" },
        { title: "Equipando um harness para uma tarefa real" },
      ],
    },
    {
      title: "Context Engineering",
      lessons: [
        { title: "Montando o contexto ativo" },
        { title: "Buscando informação na fonte da verdade" },
        { title: "RAG, embeddings e busca semântica" },
        { title: "Memória e consolidação" },
        { title: "Gerenciando degradação, riscos e continuidade" },
        { title: "Workshop prático: engenharia de contexto para um harness" },
      ],
    },
    {
      title: "Segurança, permissões e limites de execução",
      lessons: [
        { title: "O harness como fronteira de segurança" },
        { title: "Permissões, credenciais e limites de execução" },
        { title: "Workshop prático: blindando o harness antes de dar autonomia" },
      ],
    },
    {
      title: "Loop Engineering e orquestração de agentes",
      lessons: [
        { title: "Projetando um loop de trabalho recorrente" },
        { title: "Orquestração de agentes e Graph Engineering" },
        { title: "Workshop prático: operando um harness em loop" },
      ],
    },
    {
      title: "Observabilidade, evals, benchmarks e seleção de modelos",
      lessons: [
        { title: "Observabilidade: inspecionando as execuções do harness" },
        { title: "Construindo evals para as tarefas do harness" },
        { title: "Seleção de modelos e otimização de custos" },
        { title: "Workshop prático: avaliando e melhorando um harness" },
      ],
    },
    {
      title: "Construindo um harness para uma organização",
      lessons: [
        { title: "Headless SaaS na prática" },
        { title: "Escolhendo o runtime e as interfaces" },
        { title: "Tour pela arquitetura: montando o harness completo" },
      ],
    },
  ],
  faq: [
    {
      question: "Preciso ter feito Fundamentos da Engenharia de IA antes?",
      answer: "É recomendado, mas não obrigatório. Se você já é familiar com os conceitos de modelo, contexto, prompt, tool, MCP, skill e agente, pode começar por Harness Engineering. Se esses termos ainda parecem meio misturados, Fundamentos da Engenharia de IA tende a ser uma base melhor antes deste curso.",
    },
    {
      question: "Este curso é para quem quer criar um agente do zero?",
      answer: "Sim, mas não apenas. O curso cobre a construção de um harness próprio, mas também ajuda a entender como adaptar infraestruturas existentes, usar SDKs e trabalhar em cima de ferramentas como OpenCode, Cursor, Claude Code ou Codex quando isso fizer mais sentido.",
    },
    {
      question: "Vou precisar programar?",
      answer: "Familiaridade com programação é desejada, já que este é um curso prático. A ideia é entender a arquitetura, mas também implementar um harness, lidar com ferramentas, arquivos, comandos, permissões, memória e formas de verificação. Os exemplos serão principalmente em TypeScript e Python.",
    },
    {
      question: "Qual é a diferença entre este curso e Programação Agêntica?",
      answer: "Programação Agêntica olha para o uso de agentes no trabalho de desenvolvimento: como escrever software com apoio de agentes, organizar specs, controlar qualidade e evitar vibe coding. Harness Engineering olha para a infraestrutura do próprio agente: como ele recebe contexto, chama ferramentas, acessa dados, mantém memória, executa tarefas e é verificado.",
    },
  ],
};
