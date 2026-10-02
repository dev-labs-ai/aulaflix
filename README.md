# Aulaflix

Protótipo do site do Aulaflix, construído inicialmente como réplica visual de [programe.ai](https://programe.ai/). Os textos ainda são os da referência (exceto a marca) e as imagens são placeholders — tudo pensado para ser trocado.

Stack: Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript · lucide-react.

## Rodando

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # build de produção (todas as páginas são estáticas)
pnpm lint
```

## Rotas

| Rota | Arquivo |
| --- | --- |
| `/` | `src/app/(site)/page.tsx` |
| `/cursos` | `src/app/(site)/cursos/page.tsx` |
| `/cursos/[slug]` (11 cursos) | `src/app/(site)/cursos/[slug]/page.tsx` |
| `/privacidade` | `src/app/(site)/privacidade/page.tsx` |
| `/entrar` | `src/app/entrar/page.tsx` (sem header/rodapé) |

O grupo `(site)` aplica header e rodapé; `/entrar` fica fora dele.

## Onde mudar as coisas

- **Marca, menu, rodapé, redes, instrutor:** `src/content/site.ts`
- **Lista de cursos (título, resumo, status, ícone/capa):** `src/content/courses.ts`
- **Conteúdo de cada curso (ementa, preços, FAQ):** `src/content/course-details/<slug>.ts`
- **Home (depoimentos, FAQ, vídeos/artigos):** `src/content/home.ts`
- **Cores, raios, fontes, animações:** `src/app/globals.css` (tokens `@theme` do Tailwind)
- **Imagens:** `src/components/placeholders.tsx` gera os placeholders. Para usar uma capa real de curso, coloque o arquivo em `public/` e preencha `image` no curso em `courses.ts`.

## Limitações do protótipo

Formulários (login, compra, lista de espera) são só visuais: validam no navegador e mostram um estado de confirmação, mas não enviam nada. `/cadastrar` e `/redefinir-senha` ainda não existem.
