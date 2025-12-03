## Seção 1: Instruções para rodar

Para rodar o projeto, siga os passos abaixo:

1. **Variáveis de ambiente** <br/>

```
VITE_API_URL=https://api.exemplo.com
```

(Substitua pelos valores corretos do seu ambiente.)

2. **Instalar dependências** <br/>
   Use o gerenciador de pacotes de sua preferência:

```
npm install
yarn install
pnpm install
```

3. **Rodar o projeto em modo de desenvolvimento** <br/>
   Após instalar as dependências, execute:

```
npm run dev
yarn dev
pnpm run dev
```

## Seção 2: Decisões de design

### Por que você escolheu essa estrutura de pastas?

Escolhi essa estrutura por ser mais **adaptável e clara para um projeto de pequeno porte**. Ao abrir a pasta `src`, é fácil identificar a responsabilidade de cada arquivo e pasta. Para projetos maiores, poderia ser mais interessante adotar uma abordagem baseada em features, agrupando arquivos próximos à funcionalidade a que pertencem. Além disso, poderia criar pastas específicas para contexts e componentes menores, mantendo a organização sem poluir a raiz do projeto.

### Qual foi a maior dificuldade que você encontrou e como superou?

A maior dificuldade foi obter as imagens dos Pokémon, pois era necessário realizar requisições adicionais para cada item. Para resolver, criei uma função específica dentro de `utils` que centraliza essa lógica, deixando o código mais limpo e reutilizável.

### O que você não teve tempo de fazer (dentro do timebox) e como você faria se tivesse mais tempo?

Se tivesse mais tempo, eu:

- Quebraria a página de PokémonDetails em componentes menores, agrupando-os em pastas específicas para essa funcionalidade.
- Ajustaria a estilização com base em referências como:

  - [Pokémon oficial](https://www.pokemon.com/us/pokedex/bulbasaur)
  - [Dribbble redesign concept](https://dribbble.com/shots/15128634-Pokemon-Pokedex-Website-Redesign-Concept)
  - [Outras ideias de Pokedex web](https://dribbble.com/search/pokedex-web)

- Adicionaria novos elementos e informações na página de detalhes.
- Criaria um botão de voltar, evitando que o usuário precise usar o botão do navegador.
- Faria testes de responsividade, para encontrar possíveis falhas e resolver utilizando os media queries do `Tailwind`.
- Implementaria paginação através de botões, ajustando offset e limit para que os botões permitissem avançar e retroceder de 20 em 20 itens.
