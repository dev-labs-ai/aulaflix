# Aulaflix

Protótipo do site do Aulaflix, uma plataforma de cursos online. O layout partiu de uma réplica visual de [programe.ai](https://programe.ai/); textos e cursos são conteúdo de exemplo do Aulaflix e as imagens são placeholders.

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
| `/cursos` | `src/app/(site)/cursos/page.tsx` |
| `/cursos/[slug]` (7 cursos) | `src/app/(site)/cursos/[slug]/page.tsx` |
| `/meus-cursos` (só logado) | `src/app/(site)/meus-cursos/page.tsx` |
| `/compras` (só logado) | `src/app/(site)/compras/page.tsx` |
| `/entrar` | `src/app/entrar/page.tsx` (sem header/rodapé) |
| `/cadastrar` | `src/app/cadastrar/page.tsx` (sem header/rodapé) |
| `/redefinir-senha` | `src/app/redefinir-senha/page.tsx` (sem header/rodapé) |

O grupo `(site)` aplica header e rodapé; as telas de autenticação (`/entrar`, `/cadastrar`, `/redefinir-senha`) ficam fora dele.

## Onde mudar as coisas

- **Marca, título e descrição do site, menu:** `src/content/site.ts`
- **Lista de cursos (título, resumo, status, ícone/capa):** `src/content/courses.ts`
- **Conteúdo de cada curso (ementa, preços, FAQ):** `src/content/course-details/<slug>.ts`
- **Home (texto da seção Sobre):** `src/content/home.ts`
- **Login, cadastro e redefinição de senha (textos, mensagens de erro, regras de senha e código):** `src/content/auth.ts`
- **Cores, raios, fontes, animações:** `src/app/globals.css` (tokens `@theme` do Tailwind)
- **Imagens:** `src/components/placeholders.tsx` gera os placeholders. Para usar uma capa real de curso, coloque o arquivo em `public/` e preencha `image` no curso em `courses.ts`.

## Login de demonstração

Em `/entrar`, use **aulaflix@email.com** com a senha **aulaflix**. As credenciais são conferidas no servidor (Server Action em `src/lib/auth-actions.ts`) e a sessão fica num cookie `httpOnly` por 7 dias; o header passa a mostrar o usuário e o botão Sair. `/entrar?next=/caminho` define para onde ir depois de entrar.

A conta e a sessão ficam em `src/lib/auth.ts`; os cursos e o progresso da conta de demonstração, em `src/lib/enrollments.ts`, e os pedidos, em `src/lib/purchases.ts`. Páginas só para quem está logado usam `requireUser()`, que manda para `/entrar?next=…`. É uma simulação: o cookie guarda só o e-mail e não é protegido contra falsificação, então deve ser substituído por um backend de autenticação real.

## Limitações do protótipo

Fora o login com a conta de demonstração, os formulários (Google/GitHub, cadastro, redefinição de senha, compra, lista de espera) são só visuais: validam no navegador e mostram um estado de confirmação, mas não enviam nada. No cadastro e na redefinição de senha, qualquer código de 6 dígitos é aceito.
