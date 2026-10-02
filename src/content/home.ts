// Conteúdo da página inicial (placeholders copiados da referência).

export const testimonials = [
  {
    author: "Paula Caires",
    video: "Clawdbot (OpenClaw) é o futuro dos agentes ou um pesadelo de segurança? (Testei na prática)",
    quote: "O melhor canal de tecnologia atualmente. Todos os vídeos são sempre muito completos e instrutivos.",
    href: "https://www.youtube.com/watch?v=3zKee31X9Sw&lc=UgyF4UlMlPJ7XoAmMA94AaABAg",
  },
  {
    author: "Diego Silva",
    video: "Primeiras impressões do Claude Fable 5 em tarefas reais",
    quote:
      "Sempre que alguém me pergunta sobre IA, eu compartilho este canal, porque vejo aqui um conteúdo sem exageros, sem clickbait e com muita coerência no que é apresentado.",
    href: "https://www.youtube.com/watch?v=3VaLMYJgR3g&lc=Ugx0gL7jIXTDayYfXt94AaABAg",
  },
  {
    author: "Moacir Braga",
    video: "Testei o GPT 5.6 Luna: o melhor custo-benefício do momento?",
    quote:
      "Mesmo pra nós que já estamos muito bem empregados fora do país e com bastante experiência, o teu trabalho ajuda muuuuuito, pois o esforço pra comparar esses modelos é relativamente grande. Tu sempre traz de forma científica, não só uma opinião sem embasamento.",
    href: "https://www.youtube.com/watch?v=B4DZV3ow4aA&lc=Ugw5dDUuysheGhhIkIZ4AaABAg",
  },
  {
    author: "Mauricio Ambrosio",
    video: "Programar sem IA ainda faz sentido em 2026?",
    quote:
      "Sou analista de sistemas e programador, e através dos seus conteúdos tenho ampliado muito minha visão sobre a inteligência artificial como uma ferramenta indispensável na rotina de empresas de desenvolvimento de software.",
    href: "https://www.youtube.com/watch?v=GmaYtk2Izow&lc=Ugz8G1aAwVECXEtGE7l4AaABAg",
  },
  {
    author: "Diego Dias",
    video: "Guia completo de Git e GitHub: programe com IA da forma certa",
    quote: "Pode rodar na Internet por 24h inteiras dedicadas a Isso que não vai encontrar aula mais didática e melhor.",
    href: "https://www.youtube.com/watch?v=Mgp2PM7AJzk&lc=Ugx0pOXJ-OV53iQRSf94AaABAg",
  },
  {
    author: "Tiago Paes",
    video: "Pare de escrever prompts. Crie loops para seus agentes de IA",
    quote: "melhor canal disparado sobre desenvolvimento com ia",
    href: "https://www.youtube.com/watch?v=SZTwdyUmmjs&lc=UgxqCvxwAbPoYYU0bGB4AaABAg",
  },
  {
    author: "Marcel dos Santos",
    video: "O que realmente faz o Claude Code funcionar (não é o modelo)",
    quote:
      "Os conteúdos com profundidade técnica são os que mais gosto e que mais me despertam interesse. As referências também são incríveis e de profissionais que são destaques no cenário mundial de IA.",
    href: "https://www.youtube.com/watch?v=SQm3-NpOvJU&lc=UgzBOhFcnIKsa9_S3v54AaABAg",
  },
  {
    author: "Jeferson Harris",
    video: "Claude Opus 4.5: finalmente corrigiram o maior defeito desse modelo",
    quote: "Cara, seus vídeos são muito tops! Parabéns pelo conteúdo rico em informações e embasamentos técnicos com fontes!",
    href: "https://www.youtube.com/watch?v=lURfgs4PpZc&lc=Ugz-2OfXqQ2CC_UQ82p4AaABAg",
  },
  {
    author: "Alex Guimarães",
    video: "Reduzi o retrabalho com agentes de IA usando essa skill",
    quote: "Seus videos tem uma qualidade altíssima. Fico impressionado! Parabéns!",
    href: "https://www.youtube.com/watch?v=0yS7sSgdJCA&lc=UgwIQ3lG2dpBEu712nJ4AaABAg",
  },
  {
    author: "Alan",
    video: "Essa skill é a melhor forma de criar frontend com IA?",
    quote: "Seus videos são incríveis mesmo! conteúdo de qualidade e nacional. Valeu demais!",
    href: "https://www.youtube.com/watch?v=vo0iWCIIjr4&lc=UgxES46BWUmD2Aa9d1Z4AaABAg",
  },
  {
    author: "Thiago Nogueira",
    video: "Escrever prompt em inglês economiza tokens?",
    quote:
      "Acompanho seu canal acho que a cerca de um mês ou pouco mais só mas é impressionante o quanto já aprendi contigo, mais até do que com outros youtubers... Parabéns pela didatica e esforço para sempre passar algo útil para nós.",
    href: "https://www.youtube.com/watch?v=wF15C3IPCCc&lc=UgwHQkJxc9LW1g_XpnJ4AaABAg",
  },
  {
    author: "Gabriel Carniel",
    video: "Codex Mobile vs Claude Remote Control: a diferença ficou clara",
    quote: "Parabéns pelo canal, é minha fonte diária pra me atualizar sobra IA.",
    href: "https://www.youtube.com/watch?v=DnJfhPj0MvA&lc=UgxVGm7GqVgtzfn03t94AaABAg",
  },
];

export type Testimonial = (typeof testimonials)[number];

export const howItWorks = [
  {
    term: "Escolha",
    description: "Entre nas listas dos cursos que fazem sentido para o que você quer construir.",
  },
  {
    term: "O currículo",
    description:
      "O currículo combina fundamentos, aprofundamentos e cursos focados em dominar ferramentas ou assuntos específicos.",
  },
  {
    term: "Prioridade",
    description: "As listas ajudam a decidir quais cursos entram primeiro em produção.",
  },
  {
    term: "Acesso vitalício",
    description:
      "Quando um curso é lançado, você compra uma vez. O acesso é vitalício: o curso é seu para assistir quantas vezes quiser, no seu tempo.",
  },
];

export const recentVideos = [
  {
    title: "Tire suas dúvidas sobre a Trilha do Engenheiro de IA (Live 3/3)",
    date: "02 out 2026",
    href: "https://www.youtube.com/watch?v=h1_Fuor2ZvA",
  },
  {
    title: "Trilha do Engenheiro de IA: lançamento da Turma Fundadora (Live 2/3)",
    date: "01 out 2026",
    href: "https://www.youtube.com/watch?v=T6HIAgxLm_A",
  },
  {
    title: "O que você vai aprender na Trilha do Engenheiro de IA? (Live 1/3)",
    date: "30 set 2026",
    href: "https://www.youtube.com/watch?v=C1SDnojwxMg",
  },
];

export const recentArticles = [
  {
    title: "Os dois tipos de harness que você precisa conhecer",
    date: "29 set 2026",
    href: "https://codecapital.substack.com/p/os-dois-tipos-de-harness-que-voce-precisa-conhecer",
  },
  {
    title: "O que restou para nós?",
    date: "27 set 2026",
    href: "https://codecapital.substack.com/p/o-que-restou-para-nos",
  },
  {
    title: "Meus principais casos de uso para o Grok Bot",
    date: "26 ago 2026",
    href: "https://codecapital.substack.com/p/meus-principais-casos-de-uso-para-o-grok-bot",
  },
];

export const homeFaq = [
  {
    question: "O Aulaflix funciona como uma assinatura?",
    answer:
      "Não. Você compra os cursos que quer estudar, individualmente ou em pacotes. O acesso é vitalício: uma vez comprado, o curso é seu para assistir quantas vezes quiser, no seu tempo. No futuro, a ideia é ter também um passe anual para quem preferir acessar todos os cursos publicados sem comprar cada curso separadamente.",
  },
  {
    question: "Preciso saber programar para estudar pelo Aulaflix?",
    answer:
      "Depende do curso. Alguns cursos vão exigir código e vão deixar isso claro antes da compra; outros podem ser úteis para quem precisa dirigir, avaliar ou operar sistemas com IA sem escrever código todos os dias. O Aulaflix não parte da ideia de que todo aluno já é programador, mas também não tenta transformar a Engenharia de IA em um conteúdo superficial.",
  },
  {
    question: "O Aulaflix é para iniciantes?",
    answer:
      "A formação terá cursos em níveis diferentes. Alguns vão começar pelos fundamentos, para quem quer construir uma base antes de avançar; outros serão cursos mais diretos, quase como crash courses, para quem já tem conhecimento e precisa dominar um assunto específico. A ideia é que você consiga entrar pelo ponto certo para o seu momento, sem transformar tudo em uma introdução genérica.",
  },
  {
    question: "Os cursos já estão disponíveis?",
    answer:
      "Alguns cursos podem estar disponíveis para compra, enquanto outros ainda estarão em lista de espera. Nesta fase, as listas ajudam a medir interesse e a decidir quais cursos entram primeiro em produção. Conforme os cursos forem lançados, eles passam a aparecer com a opção de compra e acesso vitalício.",
  },
  {
    question: "O que acontece quando eu entro em uma lista de espera?",
    answer:
      "Você registra interesse em um curso específico e recebe as próximas atualizações por e-mail. As listas também ajudam a decidir quais cursos devem entrar primeiro em produção, então entrar na lista é a melhor forma de sinalizar quais temas você quer ver antes.",
  },
  {
    question: "Vou ter acesso por quanto tempo aos cursos que comprar?",
    answer:
      "O acesso aos cursos comprados é vitalício. Depois da compra, o curso fica seu para assistir no seu ritmo, voltar em aulas específicas e revisar o conteúdo quando quiser.",
  },
];
