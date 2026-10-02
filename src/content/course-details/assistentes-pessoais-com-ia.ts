import type { WaitlistCourseDetail } from "./types";

export const assistentesPessoaisComIa: WaitlistCourseDetail = {
  kind: "waitlist",
  why: [
    "A maior parte do uso de IA ainda começa quando alguém abre uma interface, escreve um prompt e espera uma resposta. Isso funciona para muita coisa, mas deixa de fora um uso cada vez mais importante: assistentes que ficam disponíveis 24/7, recebem mensagens pelo WhatsApp, Telegram, Slack, Teams ou por uma interface web e podem executar tarefas sem depender de uma sessão manual toda vez.",
    "Um assistente com IA pode servir uma pessoa, um time ou uma empresa. Ele pode receber pedidos, consultar arquivos, acionar APIs, rodar tarefas recorrentes, falar com outros agentes e manter um canal contínuo entre quem usa e o sistema que executa o trabalho.",
    "OpenClaw e Hermes tornaram esse tipo de assistente mais concreto: um agente sempre disponível, conectado a canais reais e capaz de usar ferramentas. Assistentes Pessoais com IA parte dessa categoria para estudar o desenho por trás dela: onde o assistente deve rodar, quais canais usar, que permissões conceder, como proteger credenciais, como lidar com prompt injection e como controlar custo, latência e capacidade sem transformar o assistente em um risco.",
  ],
  learn: [
    "Decidir quando um assistente com IA faz sentido para uma pessoa, um time ou uma empresa, em vez de usar apenas uma interface manual.",
    "Escolher onde o assistente deve rodar: VPS, máquina pessoal, servidor interno ou outro ambiente controlado.",
    "Conectar o assistente a canais reais, como WhatsApp, Telegram, Slack, Teams ou uma interface web.",
    "Desenhar quais ferramentas, arquivos, APIs e rotinas o assistente pode acessar sem abrir permissões demais.",
    "Automatizar tarefas recorrentes com cron jobs, webhooks ou outros disparos controlados.",
    "Avaliar segurança, custo, latência, privacidade e limites de uso antes de deixar o assistente continuamente disponível.",
  ],
  audience: [
    "Para quem quer construir um assistente com IA para uso pessoal, com acesso a canais, ferramentas, arquivos e rotinas próprias.",
    "Para quem quer criar um assistente compartilhado para um time ou uma empresa, sem tratar isso como apenas mais um chatbot.",
    "Para desenvolvedores que já usam agentes, automações ou Claude Code e querem levar esse tipo de capacidade para canais como WhatsApp, Telegram, Slack, Teams ou uma interface web.",
    "Para quem acompanha OpenClaw, Hermes e ferramentas parecidas, mas quer entender o desenho técnico por trás da categoria.",
    "Para quem precisa avaliar segurança, permissões, credenciais, custo e privacidade antes de deixar um agente continuamente disponível.",
  ],
  coverage: [
    "O que torna um assistente com IA diferente de uma conversa manual com ChatGPT, Claude ou outro modelo.",
    "Casos de uso para assistentes pessoais, assistentes compartilhados por times e assistentes internos de uma empresa.",
    "Canais de comunicação: WhatsApp, Telegram, Slack, Teams e interfaces web.",
    "OpenClaw, Hermes e outras referências para entender a categoria de assistentes sempre disponíveis.",
    "Onde o assistente deve rodar: VPS, máquina pessoal, servidor interno, Tailscale e outros caminhos para manter acesso controlado.",
    "Automação com cron jobs, webhooks, rotinas recorrentes e tarefas disparadas por mensagem.",
    "Ferramentas, arquivos, APIs, memória e outros recursos que o assistente pode usar para executar trabalho real.",
    "Segurança: prompt injection, permissões, variáveis de ambiente, credenciais, acesso a dados e limites de ação.",
    "Custos, latência, escolha de modelo e requisitos mínimos para manter um assistente útil sem perder controle.",
  ],
  faq: [
    {
      question: "Preciso saber programar para fazer este curso?",
      answer: "Não precisa ser programador para acompanhar o curso. Saber programar ajuda em algumas partes, principalmente quando entramos em servidores, APIs, automações e integrações, mas o foco é entender o desenho do assistente: onde ele roda, por quais canais responde, que ferramentas pode usar e quais limites precisa respeitar.",
    },
    {
      question: "Preciso usar OpenClaw ou Hermes?",
      answer: "Não necessariamente. OpenClaw e Hermes aparecem como referências importantes porque ajudam a entender a categoria, mas o curso não depende de uma única ferramenta. O ponto é entender o desenho: canal de comunicação, ambiente de execução, ferramentas, permissões, memória, automações e limites.",
    },
    {
      question: "Preciso ter um servidor próprio?",
      answer: "Não obrigatoriamente. O curso compara caminhos como VPS, máquina pessoal, servidor interno e acesso via Tailscale. A escolha depende do canal que você quer usar, do tipo de tarefa, do nível de disponibilidade, do custo e dos dados que o assistente pode acessar.",
    },
    {
      question: "Funciona com WhatsApp?",
      answer: "Sim, mas com ressalvas. Muita gente quer um assistente pelo WhatsApp porque é ali que a conversa já acontece. O problema é que a integração costuma ter mais fricção do que Telegram, Slack ou Teams, por causa de conta, API, provedor, templates e regras da plataforma.",
    },
    {
      question: "Qual é a diferença entre este curso e Automação com IA?",
      answer: "Automação com IA olha para tarefas e workflows: cron jobs, scraping, pipelines, relatórios e processos recorrentes. Assistentes Pessoais com IA olha para uma interface contínua de uso: um assistente que recebe mensagens, usa ferramentas, executa rotinas e pode servir uma pessoa, um time ou uma empresa.",
    },
    {
      question: "O que acontece quando eu entro na lista de espera?",
      answer: "Você registra seu interesse neste curso. Isso me ajuda a entender quais temas devem entrar primeiro em produção. Quando houver novidades sobre o curso, você ficará sabendo pelo e-mail informado.",
    },
  ],
};
