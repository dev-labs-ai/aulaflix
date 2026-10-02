import type { WaitlistCourseDetail } from "./types";

export const dominandoClaudeCode: WaitlistCourseDetail = {
  kind: "waitlist",
  why: [
    "Claude Code já vai além de pedir alterações em código. Ele consegue ler um projeto, editar arquivos, rodar comandos, criar subagentes, usar MCPs, seguir slash commands e trabalhar por várias etapas. Mas essa potência só aparece quando o ambiente está bem preparado.",
    "A diferença entre usar Claude Code como curiosidade e usar como ferramenta diária está no contexto: CLAUDE.md, comandos, permissões, skills, subagentes, escolha de modelo, testes, git e critérios claros para aceitar ou rejeitar o que foi feito. Sem isso, a velocidade vira ruído.",
    "Dominando o Claude Code é um crash course para transformar a CLI em parte séria do seu workflow. O curso vai direto às práticas que ajudam a delegar tarefas, revisar resultados, paralelizar trabalho e usar a ferramenta com mais autonomia sem perder controle técnico.",
  ],
  learn: [
    "Configurar Claude Code para um projeto real, com contexto, permissões, comandos e limites bem definidos.",
    "Escrever e manter um CLAUDE.md que orienta o agente sem virar um depósito de instruções contraditórias.",
    "Criar slash commands, subagentes e skills para tarefas que se repetem no seu fluxo de trabalho.",
    "Conectar MCPs, plugins, hooks e ferramentas externas sem abrir acesso demais ao ambiente.",
    "Escolher modelos, thinking levels e modos de execução de acordo com custo, latência, risco e complexidade da tarefa.",
    "Paralelizar trabalho com múltiplas sessões, worktrees, revisão de diffs, testes e controle de git.",
  ],
  audience: [
    "Para desenvolvedores que já usam Claude Code, mas sentem que ainda estão tirando pouco proveito da ferramenta.",
    "Para quem quer sair de prompts improvisados e criar um workflow mais consistente com CLAUDE.md, slash commands, subagentes e skills.",
    "Para tech leads que precisam padronizar o uso de Claude Code em um time sem depender apenas de preferência individual.",
    "Para quem usa Cursor, Codex, OpenCode ou outras ferramentas e quer entender onde Claude Code entra melhor.",
    "Para profissionais que querem usar Claude Code também em documentos, planilhas, apresentações, navegação, automações e outros trabalhos fora do código puro.",
  ],
  coverage: [
    "O que Claude Code faz melhor, onde ele falha e como ele se diferencia de IDEs, chats e outros agentes de programação.",
    "Setup, autenticação, atualização, configuração local e primeiros cuidados antes de dar acesso ao repositório.",
    "CLAUDE.md, memória, contexto do projeto, convenções, comandos permitidos e documentação mínima para orientar o agente.",
    "Slash commands: comandos nativos, comandos customizados e workflows reutilizáveis dentro do projeto.",
    "Subagentes: quando criar, como escrever instruções, como isolar contexto e como evitar delegação inútil.",
    "Skills, MCPs, plugins, hooks, permissões e integrações com ferramentas externas.",
    "Modelos, thinking levels, custo, latência e escolha de configuração para cada tipo de tarefa.",
    "Paralelização, worktrees, múltiplas sessões, revisão de diffs, testes e controle de git.",
    "Claude Code fora do código puro: documentos, planilhas, apresentações, navegador, Computer Use, Browser Use, Cowork, Dispatch e controle remoto.",
  ],
  faq: [
    {
      question: "Preciso ser desenvolvedor para fazer este curso?",
      answer: "O curso é mais útil para quem já se sente confortável com terminal, arquivos, comandos e repositórios. Algumas partes também servem para usos profissionais fora do código, mas a base do curso é Claude Code como ferramenta de trabalho técnico.",
    },
    {
      question: "Preciso ter feito Programação Agêntica antes?",
      answer: "Não é obrigatório. Programação Agêntica dá uma visão mais ampla do workflow de desenvolvimento com agentes. Dominando o Claude Code é mais direto: foca na ferramenta, nos comandos, nas configurações e nas práticas que tornam o uso diário mais eficiente.",
    },
    {
      question: "O curso cobre subagentes, skills e MCPs?",
      answer: "Sim. Esses temas entram como parte do uso avançado da ferramenta: quando criar subagentes, quando uma skill faz mais sentido, quando conectar um MCP e como evitar que integrações demais deixem o ambiente mais difícil de controlar.",
    },
    {
      question: "Funciona em macOS, Linux e Windows?",
      answer: "O curso trata os caminhos principais e as diferenças práticas entre ambientes. Quando houver ressalvas de sistema operacional, elas entram na configuração e nos exemplos, especialmente para terminal, permissões, shell e ferramentas locais.",
    },
    {
      question: "Claude Code substitui Codex ou Cursor?",
      answer: "Não como substituição direta. O curso ajuda a entender onde Claude Code é forte e como ele se encaixa ao lado de outras ferramentas. A escolha depende do projeto, do tipo de tarefa, do custo, do modelo e da superfície de trabalho que você prefere usar.",
    },
    {
      question: "O que acontece quando eu entro na lista de espera?",
      answer: "Você registra seu interesse neste curso. Isso me ajuda a entender quais temas devem entrar primeiro em produção. Quando houver novidades sobre o curso, você ficará sabendo pelo e-mail informado.",
    },
  ],
};
