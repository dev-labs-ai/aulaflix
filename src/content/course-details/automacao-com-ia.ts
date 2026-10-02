import type { WaitlistCourseDetail } from "./types";

export const automacaoComIa: WaitlistCourseDetail = {
  kind: "waitlist",
  why: [
    "Automação sempre foi sobre tirar trabalho repetitivo do caminho. Antes da IA, isso normalmente significava escrever scripts para etapas bem definidas. Com IA, dá para automatizar partes menos rígidas: ler texto, classificar mensagens, extrair dados de páginas instáveis, resumir documentos, decidir o próximo passo e montar relatórios a partir de material desorganizado.",
    "Mas nem toda automação precisa virar um agente solto. Muitas vezes, o melhor desenho é manter o fluxo determinístico e usar IA apenas onde ela resolve uma parte específica do problema. A decisão importante é saber onde colocar o modelo, onde usar automação tradicional, onde registrar logs e onde exigir revisão humana.",
    "O curso aplica esse desenho a casos concretos: cron jobs, webhooks, scraping, APIs, arquivos, relatórios, VPS, assistentes pessoais, Codex, Claude Code e outros agentes. A ideia é criar automações úteis e observáveis, sem transformar tarefas recorrentes em processos caros, frágeis ou impossíveis de depurar.",
  ],
  learn: [
    "Identificar quais tarefas recorrentes podem ser automatizadas com segurança e quais ainda precisam de supervisão humana.",
    "Desenhar automações que combinam código, APIs, cron jobs, webhooks e IA no ponto certo do fluxo.",
    "Usar IA para extrair, classificar, resumir ou transformar informação sem depender de prompts manuais toda vez.",
    "Criar automações para relatórios, scraping, alertas, planilhas, documentos e rotinas operacionais.",
    "Escolher onde a automação deve rodar: máquina local, VPS, assistente pessoal, Codex, Claude Code ou outro agente.",
    "Avaliar custo, falhas, retries, logs, credenciais, privacidade e limites antes de deixar uma automação rodar sem supervisão constante.",
  ],
  audience: [
    "Para quem perde tempo com tarefas repetitivas e quer transformar parte desse trabalho em automações confiáveis.",
    "Para desenvolvedores que já mantêm scripts, crawlers ou relatórios recorrentes e querem usar IA sem deixar o processo frágil.",
    "Para analistas, operadores, consultores e empreendedores que precisam gerar relatórios, alertas ou rotinas a partir de dados espalhados.",
    "Para quem já usa assistentes pessoais, Codex ou Claude Code e quer entender quando esses agentes devem participar de uma automação.",
    "Para quem quer sair de automações improvisadas e aprender a pensar em gatilhos, execução, validação, custo, falhas e supervisão.",
  ],
  coverage: [
    "O que muda quando a IA entra em automações: onde ela ajuda, onde atrapalha e onde um script simples continua sendo melhor.",
    "Fundamentos de automação: cron jobs, webhooks, filas, agendamentos, eventos e tarefas recorrentes.",
    "Como combinar etapas determinísticas com IA para leitura, classificação, extração, resumo ou decisão assistida.",
    "Scraping com IA: coletar dados, lidar com páginas instáveis, extrair estrutura e validar o resultado.",
    "Relatórios, alertas, planilhas, e-mails, documentos e outros outputs recorrentes.",
    "APIs, autenticação, variáveis de ambiente, credenciais, arquivos, bancos de dados e armazenamento intermediário.",
    "Onde rodar a automação: máquina local, VPS, assistente pessoal, Codex, Claude Code ou outro agente.",
    "Supervisão, logs, retries, notificações, limites de custo e pontos de intervenção humana.",
    "Quando automatizar, quando supervisionar e quando deixar uma tarefa manual.",
  ],
  faq: [
    {
      question: "Preciso saber programar para fazer este curso?",
      answer: "Não precisa ser programador para entender o desenho das automações, mas saber um pouco de programação ajuda bastante nas partes de APIs, scraping, scripts e servidores. O curso também trata de caminhos mais acessíveis, como ferramentas visuais e assistentes que executam partes do fluxo.",
    },
    {
      question: "O curso é sobre n8n, Make ou Zapier?",
      answer: "Essas ferramentas podem aparecer como referências, mas o curso não é preso a uma plataforma. O foco é entender o desenho da automação: gatilho, dados de entrada, etapas determinísticas, uso de IA, validação, logs, custo e supervisão.",
    },
    {
      question: "Qual é a diferença entre este curso e Assistentes Pessoais com IA?",
      answer: "Assistentes Pessoais com IA olha para uma interface contínua de uso, como um assistente que recebe mensagens e executa tarefas. Automação com IA olha para workflows e rotinas recorrentes: algo dispara, o fluxo roda, um resultado é produzido e alguém pode ser notificado.",
    },
    {
      question: "Scraping com IA é seguro?",
      answer: "Scraping com IA exige cuidado com o site, os dados e o uso. O curso trata scraping como uma técnica que precisa respeitar termos, privacidade, rate limits e validação. A IA pode ajudar a extrair estrutura de páginas instáveis, mas não elimina a responsabilidade sobre a origem e o uso dos dados.",
    },
    {
      question: "O curso ajuda a controlar o custo das automações?",
      answer: "Sim. Automações recorrentes podem ficar caras quando tudo passa pelo modelo sem critério. O curso mostra como separar automação tradicional de uso de IA, quando usar modelos menores, como reduzir chamadas repetidas e como acompanhar custo ao longo do tempo.",
    },
    {
      question: "O que acontece quando eu entro na lista de espera?",
      answer: "Você registra seu interesse neste curso. Isso me ajuda a entender quais temas devem entrar primeiro em produção. Quando houver novidades sobre o curso, você ficará sabendo pelo e-mail informado.",
    },
  ],
};
