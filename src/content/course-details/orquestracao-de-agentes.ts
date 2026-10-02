import type { WaitlistCourseDetail } from "./types";

export const orquestracaoDeAgentes: WaitlistCourseDetail = {
  kind: "waitlist",
  why: [
    "Depois que você entende como um agente funciona, a próxima pergunta logo aparece: quando faz sentido colocar mais de um agente no mesmo fluxo? Um agente pode explorar uma codebase, outro pode revisar uma decisão, outro pode olhar para segurança, e um coordenador pode decidir quem entra em cada etapa. Em alguns casos, essa divisão melhora o resultado. Em outros, a mesma confusão passa a ficar distribuída entre prompts, ferramentas, permissões e handoffs.",
    "Orquestrar agentes é desenhar como o trabalho circula entre eles: quem recebe o contexto, quem escolhe o próximo passo, quais ferramentas cada agente pode usar, quando o fluxo volta para o coordenador e como o resultado será verificado.",
    "Orquestração de Agentes aprofunda uma decisão que começa em Harness Engineering. A partir do momento em que existe um harness, você precisa decidir se o trabalho fica em um agente único, em um workflow mais determinístico ou em um sistema com agentes especializados. A ideia é aprender a usar essa divisão quando ela torna o sistema mais confiável, mais rápido ou mais fácil de avaliar.",
  ],
  learn: [
    "Decidir quando um problema pede um agente único, um workflow determinístico ou uma divisão entre agentes especializados.",
    "Desenhar o papel de cada agente: que contexto recebe, quais ferramentas pode usar, que parte do trabalho assume e quando deve devolver o controle.",
    "Separar tarefas que podem acontecer em paralelo de tarefas que dependem de uma sequência mais controlada.",
    "Avaliar o custo de uma orquestração olhando para tokens, latência, complexidade, depuração e qualidade do resultado.",
    "Criar subagentes para funções específicas, como exploração de código, revisão, segurança, pesquisa ou suporte.",
    "Verificar se a orquestração está ajudando o sistema ou apenas tornando o comportamento mais difícil de entender.",
  ],
  audience: [
    "Para quem já entende a lógica básica de agentes e quer saber quando faz sentido coordenar mais de um agente no mesmo fluxo.",
    "Para quem já usa Claude Code, OpenCode, Codex ou ferramentas parecidas e quer entender melhor o papel de subagentes, handoffs e workflows.",
    "Para quem quer construir agentes para contextos reais, mas ainda não sabe quando separar responsabilidades entre agentes especializados.",
    "Para desenvolvedores e tech leads que precisam avaliar arquiteturas com múltiplos agentes sem tratar complexidade como sinal de maturidade.",
    "Para quem já estudou Harness Engineering e quer avançar para decisões de coordenação, paralelização, custo, latência e avaliação.",
  ],
  coverage: [
    "Quando usar um agente único, quando usar um workflow determinístico e quando dividir o trabalho entre agentes especializados.",
    "O papel do coordenador: planejamento, delegação, síntese, verificação e decisão sobre o próximo passo.",
    "Subagentes na prática: agentes de exploração, revisão de código, segurança, pesquisa, suporte e outras funções especializadas.",
    "Handoffs, agentes chamados como ferramentas e outros padrões para transferir trabalho entre agentes sem perder contexto ou controle.",
    "Paralelização, sequência e dependências: como decidir o que pode rodar ao mesmo tempo e o que precisa de uma ordem mais controlada.",
    "Custo, latência, contexto e depuração em sistemas com múltiplos agentes.",
    "BMAD, Claude Code, OpenCode e outros exemplos de frameworks ou ferramentas que ajudam a organizar agentes especializados.",
    "Como avaliar uma orquestração: qualidade do resultado, rastreabilidade, falhas, loops, excesso de agentes e pontos de intervenção humana.",
  ],
  faq: [
    {
      question: "Preciso ter feito Harness Engineering antes?",
      answer: "É recomendado, mas não obrigatório. Orquestração de Agentes parte da ideia de que você já entende o que é um agente, como ele recebe contexto, usa ferramentas e executa tarefas dentro de um harness. Se esses conceitos ainda parecem confusos, Harness Engineering tende a ser uma base melhor antes deste curso.",
    },
    {
      question: "Esse curso é sobre BMAD?",
      answer: "BMAD aparece como uma referência importante, mas o curso não é um treinamento preso a um framework. A ideia é entender os padrões por trás da orquestração: coordenador, subagentes, handoffs, workflows, divisão de responsabilidades, custo, latência e formas de avaliação.",
    },
    {
      question: "Vou precisar programar?",
      answer: "Familiaridade com programação é desejada. O curso discute arquitetura, ferramentas, fluxos e exemplos práticos de agentes trabalhando em tarefas reais. Os exemplos serão principalmente em TypeScript e Python, com Claude Code e OpenCode aparecendo como ferramentas de referência.",
    },
    {
      question: "Qual é a diferença entre este curso e Harness Engineering?",
      answer: "Harness Engineering olha para a infraestrutura de um agente: contexto, tools, MCPs, skills, memória, permissões, execução e interface de uso. Orquestração de Agentes começa depois dessa base e pergunta como coordenar mais de um agente: quem faz o quê, quem decide o próximo passo, como o contexto circula e como o resultado é verificado.",
    },
    {
      question: "Quando faz sentido usar vários agentes?",
      answer: "Quando a divisão de trabalho melhora algo concreto: cobertura, especialização, isolamento de contexto, paralelização, revisão, segurança ou qualidade da decisão. Se a tarefa depende de um caminho simples e bem definido, um workflow determinístico ou um agente único pode ser melhor.",
    },
    {
      question: "O que acontece quando eu entro na lista de espera?",
      answer: "Você registra seu interesse neste curso. Isso me ajuda a entender quais temas devem entrar primeiro em produção. Quando houver novidades sobre o curso, você ficará sabendo pelo e-mail informado.",
    },
  ],
};
