🚀 Product Showcase — Pokédex

Aplicação desenvolvida como parte do desafio técnico da Infinix AT, utilizando React + TypeScript + Vite + TailwindCSS para consumir a PokeAPI e exibir os 151 primeiros Pokémons, além de suas respectivas informações detalhadas.

🛠️ Tecnologias Utilizadas

React 19

TypeScript

Vite

Tailwind CSS

Axios

React Router DOM


📁 Estrutura de Pastas do Projeto
src/
 ├─ pages/
 │   ├─ Home/
 │   │   ├─ Home.tsx
 │   │   └─ index.ts
 │   └─ PokemonDetails/
 │       ├─ PokemonDetails.tsx
 │       └─ index.ts
 │
 ├─ router/
 │   └─ index.tsx
 │
 ├─ services/
 │   ├─ api.ts
 │   └─ pokemon.service.ts
 │
 ├─ types/
 │   └─ pokemon.ts
 │
 └─ App.tsx

Justificativa da estrutura

pages → separa claramente cada tela, facilitando escalabilidade e leitura.

router → centraliza a configuração de rotas.

services → concentra chamadas HTTP, seguindo o princípio de separação de responsabilidades.

types → organiza as tipagens do TypeScript, deixando o código mais limpo e previsível.

🧠 Decisões de Design
✔ Organização focada em escalabilidade

Mesmo sendo um projeto pequeno, mantive uma estrutura que permite crescer de forma organizada (novas rotas, novos serviços, novos tipos etc.).

✔ Tipagem forte com TypeScript

Evitei o uso de any e criei interfaces específicas em types/pokemon.ts para garantir segurança de tipo e prevenir erros.

✔ Serviços de API independentes

A comunicação com a API foi isolada em pokemon.service.ts, facilitando manutenção e testes.

✔ Tailwind para produtividade

Tailwind permitiu estilizar rapidamente sem criar dezenas de arquivos CSS separados.

🐛 Problemas Enfrentados e Soluções
1. CSS não centralizava de jeito nenhum

Perdi um tempo considerável tentando alinhar elementos, pois nada funcionava.
O problema estava no index.css, que continha estilos interferindo nos layouts.
🔧 Solução: revisei o arquivo, limpei estilos e após isso o Tailwind funcionou corretamente.

2. Erro no index.ts dentro de PokémonDetails

O export default não estava sendo reconhecido, o que quebrava a navegação.

💡 Solução: identifiquei o erro com ajuda do GitHub Copilot e ajustei a estrutura do arquivo e a forma de exportação. Após isso, o roteamento funcionou normalmente.

⏱️ Timebox e Entrega

Enfrentei algumas dificuldades que me fizeram perder tempo, mas consegui corrigi-las e manter a entrega dentro do possível.
Mesmo tendo levado um pouco mais que o esperado em algumas partes, consegui finalizar com consistência.


🎯 Considerações Finais

O desafio foi importante para testar minhas habilidades práticas em React, TypeScript e consumo de APIs.
Mesmo enfrentando alguns obstáculos, consegui encontrar soluções, ajustar o código e entregar um projeto funcional, limpo e bem estruturado.