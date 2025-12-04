# 🛍️ Product Showcase - Desafio Técnico

Este projeto é uma vitrine de produtos (Pokémon, neste caso) desenvolvido utilizando **React**, **TypeScript** e **TailwindCSS**. O objetivo foi demonstrar habilidades de organização de código, integração com API externa e decisões de design front-end em um _timebox_ definido.

## 1️⃣ Instruções para Rodar Localmente

Siga os passos abaixo para clonar e iniciar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** (ou **yarn**) instalados.

### 🚀 Instalação e Execução

1.  **Clonar o repositório e acessar a _branch_:**

    ```bash
    git clone <SEU-FORK-URL>
    cd ProductShowcase
    git checkout feature/alison-souza
    ```

2.  **Instalar dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Rodar o projeto:**

    ```bash
    npm run dev
    ```

O projeto será iniciado automaticamente em `http://localhost:3000`.  
Abra este endereço em seu navegador para visualizar a aplicação.

💡 **Dica:** Sempre que alterar algum arquivo no código, o Vite recarregará automaticamente a página para refletir as mudanças.  
Não é necessário configurar nenhuma variável de ambiente para rodar localmente.

---

## 2️⃣ Decisões de Design e Desenvolvimento

### 📂 Estrutura de Pastas

O projeto foi organizado para facilitar a manutenção e a escalabilidade, separando as responsabilidades de forma clara:

- `src/pages`: Contém as _views_ principais da aplicação.
- `src/components`: Armazena todos os componentes reutilizáveis (_presentational_ e _container_).
- `src/services`: Focado na lógica de acesso a dados e integração com APIs (ex: `PokeAPI`).
- `src/hooks`: Para lógica de estados e efeitos reutilizáveis (_custom hooks_).

> "Essa organização facilita a manutenção, a escalabilidade e deixa claro onde cada responsabilidade está concentrada."

### 🚧 Maior Dificuldade Encontrada

O maior desafio foi **integrar a API externa da PokeAPI e tratar a grande quantidade de dados sem travar a interface** durante o carregamento inicial e a paginação.

**Solução:** Foi implementada uma arquitetura com funções de _fetch_ dedicadas e estados separados para controlar o ciclo de vida da requisição (`loading`, `data`, `error`), garantindo uma experiência de usuário mais fluida.

### ⏱️ Funcionalidades Não Finalizadas (_Timebox_)

Devido à limitação do tempo, as seguintes funcionalidades não foram implementadas:

- **Animações suaves:** Implementação de animações nos _cards_ ao carregar ou na transição para a página de detalhes.
- **Responsividade aprimorada:** Melhorias adicionais no _design_ responsivo, especificamente para dispositivos móveis muito pequenos.

---

## 3️⃣ Link para Deploy (Bônus)

O projeto está hospedado e acessível no Vercel:

🔗 **[Link para o Deploy no Vercel]** (https://product-showcase-henna.vercel.app/)

---

## 4️⃣ Recomendações e Próximos Passos

A estrutura do desafio é excelente para avaliar a organização de código, commits e decisões técnicas. Recomendo fortemente a prática de **commits atômicos** para contar a história clara do desenvolvimento.

### 💡 Sugestões de Melhorias Futuras

Se tivesse mais tempo, estas seriam as próximas implementações:

- **Adicionar Testes Unitários:** Escrever testes unitários nos componentes e serviços críticos para aumentar a confiabilidade e garantir a integridade do código em futuras modificações.
- **Melhorar UX com Animações:** Incluir animações e interações visuais (transições de estado, _micro-interações_) para melhorar a experiência geral do usuário.

---

_Este README reflete minha experiência durante o timebox e o raciocínio por trás do desenvolvimento do projeto._
