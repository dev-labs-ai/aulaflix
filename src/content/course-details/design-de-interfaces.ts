import type { OnSaleCourseDetail } from "./types";

export const designDeInterfaces: OnSaleCourseDetail = {
  kind: "on-sale",
  pricing: { price: 597, installments: 10, pixDiscount: 0.1 },
  why: [
    "Uma boa interface quase não é percebida: as pessoas encontram o que procuram e seguem em frente. Por trás dessa sensação existem decisões sobre espaço, tipografia, cor e hierarquia que podem ser aprendidas.",
    "Este curso ensina esses fundamentos de forma prática. Você analisa telas reais, entende por que algumas funcionam melhor que outras e aplica cada princípio em exercícios que terminam em um protótipo navegável.",
  ],
  learn: [
    "Montar layouts com grid, alinhamento e espaçamento consistentes.",
    "Escolher e combinar fontes para criar hierarquia e facilitar a leitura.",
    "Usar cor com intenção, com contraste suficiente para todos.",
    "Criar componentes reutilizáveis e manter a consistência entre telas.",
    "Transformar rascunhos em um protótipo navegável para testar com pessoas.",
  ],
  audience: [
    "Para quem quer começar em design de interfaces e não sabe por onde.",
    "Para desenvolvedores que querem deixar suas telas mais claras e bonitas.",
    "Para profissionais de produto e marketing que trabalham perto de times de design.",
    "Para quem já desenha telas, mas quer embasar as decisões em princípios.",
  ],
  modules: [
    {
      title: "Fundamentos visuais",
      lessons: [
        { title: "O que torna uma interface clara", duration: "13:20" },
        { title: "Espaçamento, alinhamento e grid", duration: "19:45" },
        { title: "Hierarquia visual", duration: "16:10" },
      ],
    },
    {
      title: "Tipografia e cor",
      lessons: [
        { title: "Escolhendo e combinando fontes", duration: "18:02" },
        { title: "Escalas tipográficas", duration: "14:36" },
        { title: "Paletas de cor e contraste", duration: "22:18" },
      ],
    },
    {
      title: "Componentes",
      lessons: [
        { title: "Botões, campos e estados", duration: "20:44" },
        { title: "Criando uma biblioteca de componentes", duration: "25:09" },
        { title: "Consistência entre telas", duration: "15:53" },
      ],
    },
    {
      title: "Do rascunho ao protótipo",
      lessons: [
        { title: "Rascunhos e fluxos", duration: "17:27" },
        { title: "Montando o protótipo navegável", duration: "26:40" },
        { title: "Testando com pessoas" },
      ],
    },
  ],
  faq: [
    {
      question: "Preciso saber desenhar?",
      answer:
        "Não. Design de interfaces tem mais a ver com organização e clareza do que com desenho à mão livre. Tudo é feito com ferramentas digitais.",
    },
    {
      question: "Qual ferramenta o curso usa?",
      answer:
        "As aulas usam uma ferramenta de design gratuita, e os princípios valem para qualquer outra que você prefira.",
    },
    {
      question: "Por quanto tempo tenho acesso ao curso?",
      answer: "O acesso é vitalício. Depois da compra, você pode assistir às aulas quantas vezes quiser, no seu ritmo.",
    },
  ],
};
