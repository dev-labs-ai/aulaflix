# Proposta: estrutura de páginas e fluxos

Outubro de 2026.

A identidade visual do Aulaflix já é própria (direção Lousa), mas a estrutura das páginas e dos fluxos ainda segue a réplica de [programe.ai](https://programe.ai/) que deu origem ao protótipo. Esta proposta reorganiza essa estrutura com dois objetivos: afastar o Aulaflix do original e resolver lacunas reais do produto.

## 1. Home: "Como funciona" no lugar de várias listas

- **Hoje:** topo, cursos à venda, lista de espera e Sobre, na mesma sequência do original.
- **Proposta:**
  - No quadro-negro do topo, botões com as áreas (Programação, Design, Dados, Negócios, Fotografia, Finanças) que abrem o catálogo já filtrado.
  - Abaixo, "Como funciona" em 3 passos: escolher, comprar uma vez, estudar no seu ritmo. Esse bloco substitui a seção Sobre.
  - Por último, só uma faixa curta com os cursos que estão chegando.

## 2. Catálogo: um lugar só, com filtro

- **Hoje:** duas listas separadas em `/cursos`, À venda e Em breve.
- **Proposta:** todas as fichas numa grade única, com filtro por área e por situação (`/cursos?area=dados`). Os cursos em lista de espera aparecem como ficha com a faixa tracejada.

## 3. Página de curso: ementa primeiro e uma aula aberta

- **Hoje:** coluna longa e card de preço fixo na lateral, como no original.
- **Proposta:**
  - O título fica escrito no próprio quadro-negro, com preço e botão de compra logo abaixo.
  - A ementa vem logo depois, porque é o que decide a compra.
  - Uma aula gratuita para assistir antes de comprar.
  - No celular, uma barra fixa embaixo com preço e "Comprar", no lugar do card no meio da página.

## 4. Entrar e cadastrar no mesmo fluxo

- **Hoje:** páginas separadas, botões de Google e GitHub em cima e código de 6 dígitos no cadastro, como no original.
- **Proposta:**
  - Uma tela só que começa pelo e-mail. Se a conta existe, pede a senha; se não existe, pede nome e senha e cria a conta.
  - Google e GitHub continuam como alternativas ao e-mail.
  - A confirmação do e-mail vira um aviso depois, e não um passo que bloqueia o cadastro.

## 5. Área do aluno: a página de aula e uma conta só

- **Hoje:** o botão "Continuar" de Meus cursos leva para a página de venda do curso, porque não existe página para assistir à aula. O menu tem 3 páginas separadas, como no original.
- **Proposta:**
  - Criar `/aprender/[curso]/[aula]`, com o vídeo, a lista de aulas e um botão para marcar a aula como concluída.
  - Em Meus cursos, um destaque "Continuar de onde parou" no topo.
  - Juntar Minhas compras e Configurações em `/conta`, com abas. O menu fica com Meus cursos, Conta e Sair.

## 6. Compra e lista de espera

- **Compra:** hoje o botão só mostra um aviso. A proposta é um fluxo próprio em `/cursos/[slug]/comprar`: identificação (entrar ou criar conta ali mesmo), pagamento (Pix ou cartão), confirmação e acesso direto à primeira aula.
- **Lista de espera:**
  - Hoje o formulário pede nome, e-mail e telefone com seletor de país, como no original.
  - A proposta é que, com login, baste um clique em "Avise-me", usando o e-mail da conta. Sem login, pedir só o e-mail.

## Ordem sugerida

1. Catálogo e página de curso (itens 2 e 3), que são as partes públicas mais parecidas com o original.
2. Entrar e cadastrar no mesmo fluxo (item 4).
3. Página de aula (item 5), que corrige o "Continuar" levando para a página de venda.
4. Compra e conta (item 6 e o resto do item 5).
