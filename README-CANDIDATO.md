Pokédex — Desafio Front-End

Este projeto foi desenvolvido para o desafio técnico, utilizando React + TypeScript + Vite + TailwindCSS e consumindo a API pública PokeAPI.co.

## 1. Instruções para rodar o projeto
Variáveis de ambiente

O projeto não utiliza variáveis de ambiente.
A única fonte externa é a PokeAPI:

https://pokeapi.co/api/v2

Versão do Tailwind usada

O projeto utiliza a versão TailwindCSS 3.4.x, pois a versão 4 apresentou incompatibilidades com:

CSS externo em arquivos separados

PostCSS

Plugins do Vite

Instalação utilizada no projeto:

npm install -D tailwindcss postcss autoprefixer

Inicialização:

npx tailwindcss init -p

Instalar as dependências

npm install

Rodar o projeto
npm run dev


Após isso, o Vite abrirá ou mostrará um link como:

http://localhost:5173


## 2. Decisões de design
Estrutura de pastas escolhida
src/
 ├─ api/          → funções de requisição à API
 ├─ components/   → componentes reutilizáveis (ex: PokemonCard)
 ├─ context/      → Context API para favoritos
 ├─ pages/        → páginas principais (Home / Details)
 ├─ styles/       → CSS separado por tela (Home / Details)
 └─ App.tsx       → definição de rotas

Motivos da escolha:

facilita manutenção;

separa responsabilidades;

é escalável para futuras features;

segue boas práticas de organização em React.

Maior dificuldade e como superei

A maior dificuldade foi a configuração do Tailwind com Vite, por causa de conflitos entre versões mais recentes.
A solução foi:

voltar para o Tailwind 3.4, estável e totalmente compatível;

reconfigurar corretamente postcss.config.js, tailwind.config.js e index.css;

Depois disso, o ambiente se comportou corretamente.

O que não tive tempo de fazer dentro do timebox

Por limitação de tempo, não consegui implementar:

Sistema de cache (lista + detalhes)
Botão de atualização que limpa cache e recarrega lista

Se tivesse mais tempo, faria:

cache via localStorage para evitar requisições repetidas;

design mais bonito e moderno, com efeitos visuais.

controle de loading mais avançado;

feedback visual para atualização.

## 3. Link para Deploy

https://pokedex-lh5ncp4pf-thawanys-projects.vercel.app

## 4. Recomendações

A PokeAPI tem respostas lentas, então implementar cache é essencial em projetos reais.

Para evolução do projeto:

animações com Framer Motion;

dark mode;

