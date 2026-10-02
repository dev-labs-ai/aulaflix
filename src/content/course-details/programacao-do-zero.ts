import type { OnSaleCourseDetail } from "./types";

export const programacaoDoZero: OnSaleCourseDetail = {
  kind: "on-sale",
  pricing: { price: 497, installments: 10, pixDiscount: 0.1 },
  why: [
    "Começar a programar costuma parecer mais difícil do que é. Muita gente desiste no meio de tutoriais soltos, que ensinam comandos isolados sem mostrar como eles se juntam para resolver um problema de verdade.",
    "Este curso parte do zero e avança em passos pequenos. Cada aula introduz uma ideia nova, aplica essa ideia em um exercício curto e a conecta com o que veio antes, até você conseguir escrever programas completos sozinho.",
  ],
  learn: [
    "Entender como um computador executa instruções e o que é lógica de programação.",
    "Trabalhar com variáveis, tipos de dados, condições e repetições em Python.",
    "Organizar o código em funções reutilizáveis e fáceis de testar.",
    "Ler e gravar arquivos e lidar com erros sem travar o programa.",
    "Construir pequenos projetos completos, do problema à solução funcionando.",
  ],
  audience: [
    "Para quem nunca programou e quer começar com uma base sólida.",
    "Para quem já tentou aprender sozinho e se perdeu entre tutoriais desconectados.",
    "Para profissionais de outras áreas que querem automatizar tarefas do dia a dia.",
    "Para estudantes que vão encarar disciplinas de programação e querem chegar preparados.",
  ],
  modules: [
    {
      title: "Primeiros passos",
      lessons: [
        { title: "Como o computador executa um programa", duration: "12:40" },
        { title: "Instalando o Python e o editor", duration: "09:15" },
        { title: "Seu primeiro programa", duration: "14:02" },
      ],
    },
    {
      title: "Variáveis e decisões",
      lessons: [
        { title: "Variáveis e tipos de dados", duration: "18:31" },
        { title: "Operadores e expressões", duration: "15:47" },
        { title: "Condições com if, elif e else", duration: "21:10" },
      ],
    },
    {
      title: "Repetições e coleções",
      lessons: [
        { title: "Laços com for e while", duration: "19:22" },
        { title: "Listas e dicionários", duration: "24:05" },
        { title: "Percorrendo coleções", duration: "16:38" },
      ],
    },
    {
      title: "Funções e projetos",
      lessons: [
        { title: "Criando suas próprias funções", duration: "22:14" },
        { title: "Arquivos e tratamento de erros", duration: "20:51" },
        { title: "Projeto final: controle de gastos" },
      ],
    },
  ],
  faq: [
    {
      question: "Preciso saber alguma coisa antes de começar?",
      answer:
        "Não. O curso começa do zero e explica cada conceito antes de usá-lo. Basta saber usar o computador para tarefas do dia a dia.",
    },
    {
      question: "Por quanto tempo tenho acesso ao curso?",
      answer: "O acesso é vitalício. Depois da compra, você pode assistir às aulas quantas vezes quiser, no seu ritmo.",
    },
    {
      question: "E se o curso não for para mim?",
      answer: "Você tem 7 dias de garantia. Se não gostar, é só pedir o reembolso dentro desse prazo.",
    },
  ],
};
