📝 README-CANDIDATO
Seção 1: Instruções para Rodar

Este projeto foi construído utilizando React (Vite + TypeScript), Tailwind CSS e React Router DOM.

✅ Variáveis de Ambiente Necessárias

Nenhuma variável de ambiente é necessária.
A aplicação utiliza a PokeAPI, que é pública e não exige tokens ou chaves de API.

✅ Instalar Dependências

Certifique-se de ter o Node.js (versão LTS recomendada) instalado.

npm install
# ou
yarn install

✅ Rodar o Projeto
npm run dev
# ou
yarn dev


O Vite iniciará o servidor local, geralmente em:

👉 http://localhost:5173

Seção 2: Decisões de Design
🧩 1. Estrutura de Pastas

Escolhi uma estrutura modular e escalável, com separação clara de responsabilidades:

src/
  api/        → serviços e integração com PokeAPI (inclui cache)
  components/ → componentes reutilizáveis da interface
  context/    → estado global (Time/Favoritos)
  pages/      → páginas principais (Home, Details)
  routes/     → roteamento centralizado usando react-router-dom
  types/      → tipagens TypeScript
  assets/     → imagens e ícones


✔ O uso de react-router-dom foi essencial para manter um roteamento limpo e organizado, permitindo navegar entre Home, Detalhes e Favoritos sem recarregar a página.

🧠 2. Maior dificuldade e como superei

A lista inicial da PokeAPI não retorna imagens, apenas:

{ "name": "...", "url": "..." }

🔍 Solução

Implementei um fluxo de data enrichment:

Buscar lista inicial (151 nomes + URLs)

Fazer requisições paralelas (Promise.all) para cada Pokémon

Extrair a imagem oficial (Official Artwork)

Construir objetos PokemonData tipados

Aplicar cache para evitar requisições desnecessárias

Benefícios:

Imagens oficiais em alta qualidade

Carregamento otimizado

Menos lógica duplicada

Performance melhorada com cache local

⏳ 3. O que não tive tempo de fazer (dentro do timebox) e como faria
❌ 1. Testes unitários e de integração

Jest + React Testing Library

Testes para filtro, contexto e rotas (via react-router)

❌ 2. Paginação real

Utilizar next e previous da PokeAPI

Implementar paginação ou infinite scroll

Cache por página

❌ 3. Debounce no filtro

Criar useDebounce

Evitar re-render a cada tecla digitada

❌ 4. Melhor tratamento de erros

Error boundaries

Mensagens visuais de erro

Botão "tentar novamente"

Seção 3: Link para Deploy (Bônus)

Aqui é onde o link deveria ser inserido, porém o deploy não foi concluído.

🚫 Por que o deploy falhou?

O deploy falhou por dois motivos principais:

1. Erros de compilação do TypeScript

Erros encontrados:

ts(1484)

ts(2304)

Esses erros ocorreram porque o ambiente de produção da Vercel é mais estrito, exigindo:

import type em imports de tipagens

Ajustes que o ambiente local não apontou

Com isso, o build foi interrompido antes da conclusão.

2. Configuração incorreta na Vercel

Diretório de build incorreto

Detecção automática da Vercel falhou

Necessidade de corrigir build command e output directory

📌 Colar o link aqui quando estiver funcionando:

(Ainda indisponível por causa dos erros acima.)

Seção Final: Recomendações e Melhorias Futuras

✔ Melhorar strictness do TypeScript
✔ Implementar paginação ou infinite scroll
✔ Criar tema dark/light
✔ Adicionar testes unitários e E2E
✔ Criar animações de entrada nos cards
✔ Substituir alerts por toasts estilizados
✔ Adicionar ARIA labels para acessibilidade
✔ Migrar fetch para React Query ou SWR

💬 Considerações Finais

O projeto foi desenvolvido priorizando:

Organização

Escalabilidade

Tipagem forte

Boas práticas de UI/UX

Reutilização de componentes

Performance com cache

Entrega dentro do timebox definido