# Desafio Técnico (Frontend)

Este projeto é uma solução para o desafio técnico de estágio, implementando uma Pokédex interativa utilizando React, TypeScript e TailwindCSS. O foco principal foi criar uma arquitetura limpa, performática e organizada.

## Seção 1: Instruções para rodar

### Pré-requisitos
* Node.js (versão 18 ou superior recomendada)
* npm (gerenciador de pacotes)

### Variáveis de Ambiente
Neste estágio do projeto, **não são necessárias variáveis de ambiente** (.env) para rodar localmente, pois a API pública está configurada diretamente nos serviços.

### Instalação e Execução

1.  **Clone o repositório (ou baixe os arquivos):**
    ```bash
    git clone <seu-link-do-repo-aqui>
    cd ProductShowcase
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Rode o projeto:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    O terminal exibirá o link, geralmente: `http://localhost:5173/`

---

## Seção 2: Decisões de design

### Estrutura de Pastas
Optei por uma estrutura modular focada em **Separação de Preocupações (SoC)**, para facilitar a escalabilidade e manutenção:

* `src/api`: Centraliza a comunicação com a API externa (Axios) e funções utilitárias. Isso evita espalhar lógica de fetch dentro dos componentes.
* `src/pages`: Contém as visões principais (Home e Details), separando a lógica da página dos componentes visuais menores.
* `src/router`: Configuração isolada das rotas, mantendo o `App.tsx` limpo.
* `src/types`: Interfaces TypeScript compartilhadas (ex: `PokemonListResult`) para garantir tipagem forte e evitar o uso de `any`.
* `src/hooks`: Preparado para lógica reutilizável (Custom Hooks).

### Dificuldade Encontrada e Solução
**Desafio:** A lista inicial da API (`/pokemon`) não retorna a imagem do Pokémon, apenas o nome e uma URL de detalhes. Fazer uma nova requisição para cada um dos 151 itens causaria lentidão e sobrecarga (Problema N+1).

**Solução:** Percebi que a URL de detalhes contém o ID do Pokémon (ex: `.../pokemon/25/`). Criei uma função utilitária (`getPokemonId`) para extrair esse ID diretamente da string e utilizá-lo para montar a URL da imagem oficial (`official-artwork`) hospedada no GitHub da PokeAPI. Assim, renderizei a lista completa fazendo **apenas 1 requisição** ao invés de 152.

### O que faria se tivesse mais tempo
Devido ao timebox, e da minha falta de experiência com TypeScript, foquei nos requisitos essenciais e na qualidade do código base. Com mais tempo, implementaria alguns dos requisitos bônus:

- Filtro: Adicione um campo de <input> na tela Home que filtra a lista de Pokémon por nome (no lado do cliente)
- Contexto: Use a Context API para criar um "Time Pokémon", permitindo ao usuário "favoritar" até 6 Pokémon, e exibir os favoritos em algum lugar do site.


---

## Seção final: Recomendações sobre o desafio

Achei muito interessante o desafio, foi muito bem estruturado para testar conhecimentos fundamentais.
* **Ponto Positivo:** O requisito de não ter imagens na lista inicial é excelente para filtrar candidatos que se preocupam com performance versus aqueles que fazem "brute force" de requisições.
