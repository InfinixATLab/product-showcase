# ProductShowcase - Luiz Antonio Haenisch

Descrição curta: aplicação para exibir produtos (SPA). README com instruções, decisões de design, link de deploy e recomendações.

## Seção 1: Instruções para rodar

Requisitos
- Node.js >= 19
- npm ou yarn
- Git

Instalação
1. Clonar o repositório:
  - git clone <repo-url>
  - cd ProductShowcase
2. Instalar dependências:
  - npm install
  - ou yarn

Rodando localmente
- Desenvolvimento:
  - npm run dev
  - ou npm start

## Seção 2: Decisões de design

Estrutura de pastas atual (conforme este repositório)
- `src/`
  - `pages/`       — telas/rotas principais (ex.: `Home.tsx`, `PokemonDetail.tsx`, `PokemonContext.tsx`)
  - `services/`    — integração com a API e tipos relacionados (`pokemonService.ts`)
  - `main.tsx` e `App.tsx` — entrada da aplicação e configuração de rotas

Motivação e justificativa das escolhas
- Separação por responsabilidade: a lógica de chamadas à API fica em `services/`, as rotas e a UI ficam em `pages/` e o estado compartilhado (favoritos) está encapsulado em um `PokemonContext` — isso facilita entendimento e manutenção por um desenvolvedor júnior.
- Simplicidade e clareza para um projeto de estágio: a estrutura evita over‑engineering. Em vez de muitos níveis de abstração, decidi manter o código direto e fácil de seguir (útil em entrevistas e revisões técnicas).
- Persistência simples: o cache em `localStorage` (implementado no `Home` e sincronizado pelo `PokemonContext`) melhora UX sem introduzir infra complexa. Para um protótipo/portfólio isso demonstra preocupação com performance/estado sem adicionar backend.

Maior dificuldade e solução
- Dificuldade principal: Tive dificuldades com a implementação da lista de favoritos durante o desenvolvimento e com a tipagem da API no início do projeto.
- Como foi superado:
  - Favoritos: a funcionalidade de favoritos foi implementada de forma simples (lista local com limite de 6 itens) por limitação de tempo. Durante o desenvolvimento havia um bug onde, ao atualizar a lista de Pokémon, os favoritos ficavam inconsistentes (alguns favoritos “órfãos” permaneciam no cache). Para resolver isso eu adotei uma reconciliação direta contra o `localStorage` no refresh e atualizei o contexto de favoritos com apenas os itens válidos — isso evita condições de corrida entre o carregamento do provider e o efeito de fetch na página.
  - API / Tipagem: inicialmente eu estava usando uma tipagem incorreta ao consumir a API (o tipo esperado pelo componente não batia com o formato retornado). Consertei centralizando as interfaces em `src/services/pokemonService.ts` e importando os tipos corretos nos componentes; também corrigi pequenos erros de sintaxe no `PokemonDetail` (bloco try/catch mal fechado) e usei um alias (`PokemonDetailType`) para evitar colisão de nomes entre tipo e componente.

O que ficou de fora (timebox) e plano se tivesse mais tempo
- Deploy: não tive tempo de configurar e publicar o deploy (era um dos itens bônus). Planejo usar Vercel/Netlify para deploy contínuo a partir da branch `main` com CI que rode lint/build/test.
- Pokemons Favoritos: apagar os pokemons favoritos quando utilizado o botão Atualizar Lista

## Seção 3: Link para Deploy (Bônus)

Deploy
- Não tive tempo

## Seção final: Recomendações

- Melhorar a explicação de como deve ser enviado o projeto.
