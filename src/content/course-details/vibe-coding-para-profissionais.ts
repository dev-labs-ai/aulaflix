import type { WaitlistCourseDetail } from "./types";

export const vibeCodingParaProfissionais: WaitlistCourseDetail = {
  kind: "waitlist",
  why: [
    "Vibe coding ganhou uma conotação negativa, mas o comportamento é real: uma pessoa descreve o que quer construir, deixa a IA gerar uma primeira versão, testa o resultado, ajusta o pedido e repete até algo funcionar. Para protótipos, ferramentas internas, scripts pessoais e exploração de ideias, isso pode encurtar muito o caminho entre uma necessidade concreta e um software utilizável.",
    "O problema aparece quando uma demo que parecia suficiente começa a ser usada por outras pessoas, guardar dados, depender de login, rodar em produção ou fazer parte de uma rotina da empresa. A velocidade inicial continua útil, mas o risco muda de natureza.",
    "O curso trabalha essa fronteira a partir de casos concretos: quando faz sentido usar vibe coding, como limitar o escopo, que ferramentas escolher, quais sinais mostram que o risco aumentou e em que momento vale envolver um desenvolvedor para revisar a arquitetura, refazer partes críticas ou assumir a evolução do projeto.",
  ],
  learn: [
    "Entender o que é vibe coding, como ele se diferencia de programação agêntica e por que isso importa para quem está criando software com IA.",
    "Escolher casos de uso em que vibe coding faz sentido, como protótipos, ferramentas internas, scripts pessoais e provas de conceito.",
    "Reconhecer quando uma aplicação criada com IA começa a envolver risco real: dados sensíveis, autenticação, pagamentos, permissões, segurança, escala ou manutenção.",
    "Escolher e usar ferramentas como Replit, Lovable, Bolt, Claude Code e Codex de acordo com o tipo de projeto, o nível de risco e o conhecimento técnico necessário.",
    "Avaliar banco de dados, deploy, secrets, permissões e dependências antes de colocar uma aplicação criada com IA na mão de outras pessoas.",
    "Decidir quando continuar explorando sozinho com IA e quando envolver um desenvolvedor para revisar, corrigir ou evoluir o projeto.",
  ],
  audience: [
    "Para profissionais que não programam profissionalmente, mas querem usar IA para construir protótipos, ferramentas internas e aplicações simples.",
    "Para desenvolvedores que querem usar vibe coding em protótipos e ferramentas internas sem perder clareza sobre dívida técnica, segurança e manutenção.",
    "Para founders, PMs, designers, consultores e operadores que querem testar soluções antes de acionar um ciclo completo de engenharia.",
    "Para líderes que começam a ver ferramentas criadas com IA dentro da empresa e precisam avaliar risco, manutenção e responsabilidade sobre o código.",
    "Para quem quer usar Replit, Lovable, Bolt, Claude Code, Codex ou ferramentas parecidas sem depender apenas de tentativa e erro.",
  ],
  coverage: [
    "O que é vibe coding, de onde veio o termo e por que ele ganhou força com ferramentas como Replit, Lovable, Bolt, Claude Code e Codex.",
    "Diferenças entre vibe coding, programação agêntica e desenvolvimento de software com apoio de agentes.",
    "Casos em que vibe coding faz sentido: protótipos, ferramentas internas, scripts pessoais, provas de conceito e exploração de ideias.",
    "Casos em que vibe coding passa a exigir mais cuidado: produção, dados sensíveis, autenticação, pagamentos, integrações críticas e manutenção.",
    "Como escrever prompts, specs simples e critérios de validação para reduzir ambiguidade mesmo em um fluxo mais exploratório.",
    "Ferramentas e stacks comuns: Replit, Lovable, Bolt, Claude Code, Codex, Supabase, Neon, Vercel e alternativas parecidas.",
    "Banco de dados, autenticação, deploy, secrets, permissões e outros pontos que costumam sair de vista em demos rápidas.",
    "Revisão, teste, segurança, responsabilidade sobre o código e transição de protótipo para código que alguém consiga manter.",
  ],
  faq: [
    {
      question: "Vibe coding é legítimo profissionalmente?",
      answer: "Sim, em certos contextos. Ele pode ser muito útil para protótipos, ferramentas internas, scripts pessoais e provas de conceito. O problema é tratar qualquer coisa que funciona em uma demo como se já pudesse virar sistema de produção.",
    },
    {
      question: "Preciso saber programar?",
      answer: "Não é requisito. Profissionais que não programam profissionalmente já conseguem criar protótipos e ferramentas simples com IA. Justamente por isso, a ênfase é reconhecer limites, riscos e momentos em que vale envolver um desenvolvedor.",
    },
    {
      question: "Posso colocar uma aplicação criada com vibe coding em produção?",
      answer: "Pode, mas o risco define o nível de cuidado. Se envolve dados sensíveis, autenticação, pagamentos, usuários externos, compliance ou impacto material no negócio, entram revisão técnica, testes, segurança, observabilidade e responsabilidade clara sobre o código.",
    },
    {
      question: "Qual é a diferença entre este curso e Programação Agêntica?",
      answer: "Programação Agêntica é um curso para usar agentes dentro de um fluxo de desenvolvimento de software, com contexto, specs, revisão, testes e git. Vibe Coding para Profissionais olha para um modo mais exploratório de criação, usado para protótipos, ferramentas internas e aplicações simples, e ajuda a reconhecer quando o risco exige outro nível de engenharia.",
    },
    {
      question: "O curso é sobre Replit, Lovable ou Bolt?",
      answer: "Essas ferramentas aparecem porque são referências importantes do movimento, mas o curso não depende de uma delas. O foco é decidir quando usar cada ferramenta, que tipo de projeto cabe nesse fluxo e quais riscos aparecem quando a aplicação passa a lidar com dados, usuários, deploy e manutenção.",
    },
    {
      question: "O que acontece quando eu entro na lista de espera?",
      answer: "Você registra seu interesse neste curso. Isso me ajuda a entender quais temas devem entrar primeiro em produção. Quando houver novidades sobre o curso, você ficará sabendo pelo e-mail informado.",
    },
  ],
};
