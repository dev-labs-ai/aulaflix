import type { OnSaleCourseDetail } from "./types";

export const fundamentosDaEngenhariaDeIa: OnSaleCourseDetail = {
  kind: "on-sale",
  pricing: { price: 797, installments: 10, pixDiscount: 0.1 },
  why: [
    "Muita gente entra em IA pelo uso direto de ChatGPT, Claude, Cursor, Codex, automações e agentes. Esse caminho é natural, porque as ferramentas dão resultado rápido. O problema aparece quando tudo começa a parecer uma coleção de nomes: modelo, token, prompt, contexto, tool, MCP, skill, agente, memória, harness, segurança.",
    "Fundamentos da Engenharia de IA existe para organizar essa base. O curso mostra o papel de cada uma dessas peças dentro de um sistema com IA, como elas se conectam e quais decisões mudam o comportamento do que você está construindo ou avaliando.",
    "Com essa base, você vai estar mais preparado para escolher ferramentas, acompanhar cursos mais avançados, participar de conversas técnicas e fazer perguntas melhores. A ideia não é decorar termos, nem transformar tudo em programação, mas entender a estrutura por trás das decisões.",
  ],
  learn: [
    "Enxergar a arquitetura por trás de uma aplicação com IA, em vez de pensar apenas na interface da ferramenta.",
    "Entender onde uma solução precisa de prompt, contexto, ferramenta, memória, automação ou agente.",
    "Escolher o formato certo para cada tipo de trabalho: assistente, workflow, agente, IDE, CLI, super app ou modelo local.",
    "Avaliar uma solução com IA olhando para comportamento, segurança, acesso a dados, uso de ferramentas e falhas possíveis.",
    "Avançar para outros cursos da formação com uma base comum de vocabulário, arquitetura e avaliação.",
  ],
  audience: [
    "Para quem já usa ChatGPT, Claude, Cursor, Codex ou automações, mas quer entender melhor como essas peças se encaixam.",
    "Para desenvolvedores que querem entrar em Engenharia de IA sem começar direto por frameworks, agentes ou ferramentas da moda.",
    "Para quem acompanha discussões sobre agentes, MCPs, skills, modelos locais e automação, mas ainda sente falta de um mapa claro do assunto.",
    "Para empreendedores, líderes, consultores e profissionais de outras áreas que querem avaliar projetos com IA e conversar melhor com times técnicos.",
    "Para quem quer seguir outros cursos da formação com uma base comum antes de se aprofundar em Claude Code, Codex, harness, agentes ou automações.",
  ],
  modules: [
    {
      title: "Modelos, tokens e inferência",
      lessons: [
        { title: "Modelos, treinamento e inferência", duration: "41:02" },
        { title: "Modalidades, tokens e preços", duration: "27:57" },
        { title: "Contexto e reasoning", duration: "37:23" },
        { title: "Desempenho, latência e como ler a ficha técnica de um modelo", duration: "25:41" },
      ],
    },
    {
      title: "Prompts, instruções e contexto",
      lessons: [
        { title: "O prompt como organização da informação", duration: "28:09" },
        { title: "O contexto como matéria-prima do modelo", duration: "23:02" },
        { title: "Degradação e gestão do contexto", duration: "21:33" },
      ],
    },
    {
      title: "Ferramentas e capacidades",
      lessons: [
        { title: "Ferramentas e tool calling" },
        { title: "Recuperação de informação, RAG, bancos vetoriais e memória" },
        { title: "CLIs e ferramentas que executam ações" },
        { title: "Model Context Protocol" },
      ],
    },
    {
      title: "Assistentes, workflows, agentes e harnesses",
      lessons: [
        { title: "Do uso de ferramentas ao loop do agente" },
        { title: "Agentes versus workflows" },
        { title: "Agent Skills" },
        { title: "O harness como ambiente do agente" },
      ],
    },
    {
      title: "Interfaces e ambientes de execução",
      lessons: [
        { title: "Interfaces de chat e IA integrada a aplicações" },
        { title: "IDEs, CLIs e harnesses voltados à execução" },
        { title: "Workspaces de uso geral e assistentes pessoais" },
      ],
    },
    {
      title: "Confiabilidade, avaliação e segurança",
      lessons: [
        { title: "Prompt injection e os riscos do uso de IA" },
        { title: "Benchmarks, leaderboards e seus limites" },
        { title: "Evals e observabilidade em sistemas de IA reais" },
      ],
    },
    {
      title: "Como ler e avaliar sistemas de IA",
      lessons: [
        { title: "Como ler o sistema por trás de um produto de IA" },
        { title: "Avaliação prática: escolher a IA para um caso de uso real" },
      ],
    },
  ],
  faq: [
    {
      question: "Preciso saber programar para fazer este curso?",
      answer: "Não é um curso de programação, mas ele não foge de conceitos técnicos. Quando código ou arquitetura aparecerem, a função é explicar como sistemas com IA são desenhados e avaliados. Quem programa vai reconhecer melhor as decisões; quem não programa vai ganhar base para conversar melhor com quem constrói.",
    },
    {
      question: "Isso é só uma introdução ao ChatGPT?",
      answer: "Não. ChatGPT pode aparecer como uma das interfaces, mas o curso não gira em torno de uma ferramenta específica. A ideia é entender a estrutura por trás dos sistemas com IA: modelos, contexto, prompts, ferramentas, agentes, automações, segurança e avaliação.",
    },
    {
      question: "Esse curso é básico demais para quem já programa?",
      answer: "Depende do seu contato com IA. Se você já construiu aplicações com modelos, tools, agentes, permissões e avaliação, talvez algumas partes sejam familiares. Mas, se o seu conhecimento veio de vídeos, testes com ferramentas ou uso pontual no trabalho, este curso organiza a base antes dos cursos mais avançados.",
    },
    {
      question: "Qual é a relação deste curso com os outros cursos da formação?",
      answer: "Este é o curso de fundamentos. Ele ajuda a construir a linguagem comum para avançar depois em temas mais específicos, como Claude Code, Codex, harness engineering, agentes, automações e workflows. Não precisa ser o primeiro curso de todo mundo, mas é a melhor base para quem quer entender o conjunto.",
    },
  ],
};
