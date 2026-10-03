# Aulaflix

> [!IMPORTANT]
> Este repositório está arquivado. O protótipo foi portado para Nuxt 4 e continua em [`dev-labs-ai/aulaflix-web`](https://github.com/dev-labs-ai/aulaflix-web), com as mesmas páginas, textos e endereços. O que está aqui fica só para consulta.

Protótipo do site do Aulaflix, uma plataforma de cursos online para desenvolvedores de software (backend, frontend, banco de dados, DevOps, IA e outras áreas). A estrutura das páginas partiu de uma réplica de [programe.ai](https://programe.ai/); a identidade visual é própria (veja abaixo). Textos e cursos são conteúdo de exemplo e as capas são placeholders.

Stack: Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript · lucide-react.

## Rodando

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # build de produção
pnpm lint
```

## Rotas

| Rota | Arquivo |
| --- | --- |
| `/` | `src/app/(site)/page.tsx` |
| `/como-funciona` | `src/app/(site)/como-funciona/page.tsx` |
| `/cursos` (filtros `?area=` e `?situacao=a-venda\|em-breve`) | `src/app/(site)/cursos/page.tsx` |
| `/cursos/[slug]` (7 cursos) | `src/app/(site)/cursos/[slug]/page.tsx` |
| `/cursos/[slug]/comprar` (cursos à venda) | `src/app/(site)/cursos/[slug]/comprar/page.tsx` |
| `/meus-cursos` (só logado) | `src/app/(site)/meus-cursos/page.tsx` |
| `/aprender/[curso]` (só para quem tem o curso) | `src/app/(site)/aprender/[curso]/page.tsx`, que leva à aula onde o aluno parou |
| `/aprender/[curso]/[aula]` (só para quem tem o curso) | `src/app/(site)/aprender/[curso]/[aula]/page.tsx` |
| `/conta` (só logado; aba Dados da conta) | `src/app/(site)/conta/page.tsx`, com as abas em `src/app/(site)/conta/layout.tsx` |
| `/conta/compras` (só logado; aba Compras) | `src/app/(site)/conta/compras/page.tsx` |
| `/entrar` (entrar e criar conta) | `src/app/entrar/page.tsx` (sem header/rodapé) |
| `/redefinir-senha` | `src/app/redefinir-senha/page.tsx` (sem header/rodapé) |

O grupo `(site)` aplica header e rodapé; as telas de autenticação (`/entrar`, `/redefinir-senha`) ficam fora dele. `/cadastrar` redireciona para `/entrar`, e os endereços antigos `/compras` e `/configuracoes` para as abas de `/conta` (em `next.config.ts`).

## Onde mudar as coisas

- **Marca, título e descrição do site, menu:** `src/content/site.ts`
- **Lista de cursos (título, área, resumo, status, ícone, cor, capa) e áreas do filtro do catálogo:** `src/content/courses.ts`
- **Conteúdo de cada curso (ementa, aula grátis, preços, FAQ do curso):** `src/content/course-details/<slug>.ts`. A aula marcada com `free: true` aparece no player da página do curso. O endereço de cada aula em `/aprender` sai do título (`lessonSlug` em `src/content/course-details/index.ts`).
- **Como funciona (passos, lista de espera e dúvidas que valem para todos os cursos):** `src/content/how-it-works.ts`. Cada passo tem o resumo da home (`summary`) e o texto da página `/como-funciona` (`details`). As dúvidas de um curso só ficam no `faq` dele; as que valem para todos, em `platformFaq`.
- **Home:** os botões de área da lousa saem de `areas` em `src/content/courses.ts`, com os ícones de `areaIcons` em `src/components/placeholders.tsx`.
- **Login, cadastro e redefinição de senha (textos, mensagens de erro, regras de senha e código):** `src/content/auth.ts`
- **Cores, raios, sombras, animações:** `src/app/globals.css` (tokens `@theme` do Tailwind)
- **Fontes:** `src/app/layout.tsx` (Bricolage Grotesque nos títulos, Atkinson Hyperlegible Next no texto)
- **Logo e favicon:** `src/components/logo.tsx` e `src/app/icon.svg`
- **Imagens:** `src/components/placeholders.tsx` gera os placeholders. Para usar uma capa real de curso, coloque o arquivo em `public/` e preencha `image` no curso em `courses.ts`.

## Identidade visual

Direção "Lousa": a sala de aula como referência. Fundo de papel, texto em grafite e verde de quadro-negro como cor principal.

- **Lousa:** painel verde com a régua de madeira embaixo (`Board` em `src/components/ui.tsx`), usado no topo da home (com os botões de área, que abrem o catálogo filtrado), da página de curso (com o título, o preço e o botão de compra) e no "Continuar de onde parou" de Meus cursos. Os títulos aparecem como se fossem escritos a giz.
- **Fichas pautadas:** os cursos são fichas com linhas a cada 28px (`pautado`) e uma faixa no topo na cor do curso (`tone` em `courses.ts`: coral, amarelo ou sálvia). Nos cursos em lista de espera, a faixa é tracejada (`tracejado`).
- **Giz amarelo:** botão principal sobre a lousa, avatar, marcadores e selos de destaque.

## Login e cadastro

`/entrar` começa pelo e-mail. Se já existe conta, pede a senha; se não existe, pede nome e senha e cria a conta na hora. Para a conta de demonstração, use **aulaflix@email.com** com a senha **aulaflix**. Tudo é conferido no servidor (Server Actions em `src/lib/auth-actions.ts`) e a sessão fica num cookie `httpOnly` por 7 dias; o header passa a mostrar o usuário e o botão Sair. `/entrar?next=/caminho` define para onde ir depois de entrar.

A conta criada no cadastro fica num cookie deste navegador (com a senha em hash), e só uma por vez: um novo cadastro substitui a anterior. Ela começa sem cursos e com o e-mail por confirmar; enquanto isso, uma faixa abaixo do header pede a confirmação, sem bloquear nada, e oferece um botão de protótipo que faz o papel do link do e-mail.

As contas e a sessão ficam em `src/lib/auth.ts`; os cursos e o progresso inicial da conta de demonstração, em `src/lib/enrollments.ts` (as aulas concluídas e a última aula aberta de cada curso ficam em cookies deste navegador; é daí que sai o "Continuar de onde parou"), e os pedidos, em `src/lib/purchases.ts` (os feitos em `/cursos/[slug]/comprar` também ficam num cookie). Os cursos do aluno são os que aparecem nos pedidos dele. Páginas só para quem está logado usam `requireUser()`, que manda para `/entrar?next=…`. Em Conta, o nome editado fica num cookie e aparece no header; a troca de senha é só simulada (a senha continua a mesma). É uma simulação: o cookie guarda só o e-mail e não é protegido contra falsificação, então deve ser substituído por um backend de autenticação real.

## Limitações do protótipo

Fora o login, o cadastro, a compra e a lista de espera, os formulários (Google/GitHub, redefinição de senha) são só visuais: validam no navegador e mostram um estado de confirmação, mas não enviam nada. A compra não cobra nada: o pedido é aprovado na hora, e os dados do cartão são validados no navegador e nem chegam ao servidor. A lista de espera guarda a inscrição num cookie deste navegador (`src/lib/waitlist.ts`): com a conta, basta um clique em "Avise-me"; sem ela, só o e-mail. Nenhum e-mail é enviado de verdade. O player da aula grátis também é só visual: ainda não há vídeos. Na redefinição de senha, qualquer código de 6 dígitos é aceito.
