import type { WaitlistCourseDetail } from "./types";

export const segundoCerebroComObsidian: WaitlistCourseDetail = {
  kind: "waitlist",
  why: [
    "Antes de pensar em IA, um segundo cérebro precisa ajudar você a estudar, escrever, lembrar decisões e voltar ao próprio raciocínio. O problema é que muita gente acumula textos, links e resumos, mas não constrói notas que continuem úteis depois.",
    "O curso usa Obsidian como ferramenta principal porque ele trabalha com arquivos Markdown locais, permite criar links entre ideias e não prende o seu conhecimento em uma estrutura opaca. A ideia é dominar o suficiente da ferramenta para escrever, organizar, buscar e revisar notas sem transformar o sistema em um fim em si mesmo.",
    "A IA entra depois dessa base. Você aprende a usar o vault como contexto para agentes e assistentes, mantendo claro o que veio de uma fonte, o que foi escrito por você, o que foi gerado com IA e o que já foi revisado o suficiente para virar conhecimento confiável.",
  ],
  learn: [
    "Organizar um vault no Obsidian com uma estrutura que continue legível conforme o volume de notas aumenta.",
    "Escrever notas que preservam raciocínio, fonte, contexto e conexões com outros temas.",
    "Escolher uma estratégia de sincronização e backup de acordo com privacidade, custo, praticidade e uso com agentes.",
    "Preparar notas em Markdown para que Claude Code, Codex, assistentes pessoais ou outros agentes consigam usar esse conhecimento como contexto.",
    "Criar convenções para distinguir fonte, autoria, geração por IA e revisão dentro do seu vault.",
    "Avaliar quando o sistema de notas está ajudando a pensar e quando virou só mais uma coleção de arquivos.",
  ],
  audience: [
    "Para quem quer usar Obsidian para estudar, escrever e organizar conhecimento sem transformar a ferramenta no centro do processo.",
    "Para quem já usa Notion, Apple Notes, Google Docs ou arquivos soltos e quer migrar para uma base mais portátil em Markdown.",
    "Para pesquisadores, criadores, consultores, estudantes e profissionais que lidam com muito conhecimento e querem reaproveitar melhor o que estudam.",
    "Para desenvolvedores e usuários de agentes que querem oferecer contexto próprio para Claude Code, Codex ou assistentes pessoais.",
    "Para quem já tentou organizar notas antes, mas sente falta de um método que funcione tanto para estudo humano quanto para uso com IA.",
  ],
  coverage: [
    "Obsidian como base de conhecimento: vaults, Markdown, links internos, backlinks, tags, busca, plugins e grafos.",
    "Como escrever notas que continuam úteis depois: notas de leitura, notas permanentes, referências, ideias próprias e conexões entre temas.",
    "Zettelkasten, A Vida Intelectual e outras referências de estudo sem transformar o sistema em ritual vazio.",
    "Estrutura de pastas, nomes de arquivos, metadados, templates e convenções para manter o vault legível para você e para agentes.",
    "Captura e organização de conhecimento: Web Clipper, notas rápidas, inbox, fontes externas e revisão periódica.",
    "Sincronização e backup: Obsidian Sync, Git, iCloud, Syncthing e os trade-offs de cada caminho.",
    "Obsidian CLI, Headless Sync e formas de expor um vault para agentes sem depender da interface gráfica.",
    "Como usar o segundo cérebro como contexto para Claude Code, Codex, assistentes pessoais e outros agentes.",
    "Convenções para autoria, fonte, revisão, confiança, privacidade e rastreabilidade ao usar IA dentro do vault.",
  ],
  faq: [
    {
      question: "Preciso usar Obsidian?",
      answer: "A implementação do curso usa Obsidian porque ele trabalha com arquivos Markdown locais, tem boa experiência de escrita, funciona em várias plataformas e conversa bem com agentes. Os princípios de organização, autoria, contexto e revisão podem ser levados para outras ferramentas, mas os exemplos práticos partem do Obsidian.",
    },
    {
      question: "Preciso pagar Obsidian Sync?",
      answer: "Não é obrigatório. O curso compara Obsidian Sync, Git, iCloud, Syncthing e outras formas de sincronizar ou fazer backup. A melhor escolha depende de quantos dispositivos você usa, do seu nível técnico, do custo aceitável e de como seus agentes vão acessar o vault.",
    },
    {
      question: "Este curso é sobre produtividade?",
      answer: "O curso pode melhorar sua organização, mas não gira em torno de rituais, dashboards ou sistemas bonitos. O foco é escrever notas melhores e construir uma base de conhecimento durável, legível e útil para estudo, trabalho, escrita e uso com IA.",
    },
    {
      question: "Vou precisar programar?",
      answer: "Para acompanhar a maior parte do curso, não. Algumas aulas vão mostrar Git, CLI, sincronização e uso com agentes, mas a função disso é explicar possibilidades de integração, não transformar o curso em programação.",
    },
    {
      question: "Como este curso se conecta aos outros da formação?",
      answer: "Este curso cria a base de conhecimento pessoal que outros cursos podem aproveitar. Assistentes, automações, Claude Code, Codex e outros agentes ficam melhores quando podem consultar notas, referências e decisões anteriores bem organizadas.",
    },
    {
      question: "O que acontece quando eu entro na lista de espera?",
      answer: "Você registra seu interesse neste curso. Isso me ajuda a entender quais temas devem entrar primeiro em produção. Quando houver novidades sobre o curso, você ficará sabendo pelo e-mail informado.",
    },
  ],
};
