import type { OnSaleCourseDetail } from "./types";

export const analiseDeDadosComPlanilhas: OnSaleCourseDetail = {
  kind: "on-sale",
  pricing: { price: 397, installments: 10, pixDiscount: 0.1 },
  why: [
    "Quase todo trabalho gera dados: vendas, atendimentos, despesas, estoque. Ainda assim, muita gente usa planilhas só para guardar números, sem tirar delas as respostas que ajudariam a decidir melhor.",
    "Este curso mostra como transformar uma planilha bagunçada em análise. Você aprende a organizar e limpar dados, fazer as perguntas certas com fórmulas e tabelas dinâmicas e apresentar o resultado em gráficos fáceis de entender.",
  ],
  learn: [
    "Organizar dados em tabelas que facilitam a análise.",
    "Limpar dados com erros, duplicados e formatos inconsistentes.",
    "Usar as fórmulas mais úteis do dia a dia, como SOMASES, PROCX e SE.",
    "Resumir grandes volumes de dados com tabelas dinâmicas.",
    "Criar gráficos e painéis simples para comunicar resultados.",
  ],
  audience: [
    "Para quem usa planilhas no trabalho e quer ir além do básico.",
    "Para pequenos empreendedores que querem acompanhar os números do negócio.",
    "Para quem quer começar em análise de dados sem aprender programação primeiro.",
    "Para estudantes que precisam analisar dados em trabalhos e pesquisas.",
  ],
  modules: [
    {
      title: "Organizando os dados",
      lessons: [
        { title: "Como estruturar uma tabela de dados", duration: "11:48" },
        { title: "Formatos de número, data e texto", duration: "13:05" },
        { title: "Limpeza e remoção de duplicados", duration: "17:32" },
      ],
    },
    {
      title: "Fórmulas essenciais",
      lessons: [
        { title: "Somas e contagens com critérios", duration: "19:14" },
        { title: "Buscando informações com PROCX", duration: "16:50" },
        { title: "Decisões com SE e funções lógicas", duration: "18:27" },
      ],
    },
    {
      title: "Análise e visualização",
      lessons: [
        { title: "Tabelas dinâmicas na prática", duration: "23:41" },
        { title: "Escolhendo o gráfico certo", duration: "15:19" },
        { title: "Montando um painel simples", duration: "21:30" },
      ],
    },
  ],
  faq: [
    {
      question: "Funciona no Excel e no Google Planilhas?",
      answer:
        "Sim. As aulas mostram os dois quando há diferença, e as fórmulas e técnicas ensinadas funcionam em ambos.",
    },
    {
      question: "Preciso saber matemática avançada?",
      answer: "Não. As contas são do dia a dia, e cada fórmula é explicada com exemplos antes de ser usada.",
    },
    {
      question: "E se o curso não for para mim?",
      answer: "Você tem 7 dias de garantia. Se não gostar, é só pedir o reembolso dentro desse prazo.",
    },
  ],
};
