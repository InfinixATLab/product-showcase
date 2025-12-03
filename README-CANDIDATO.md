## Seção 1: Instruções para rodar

### Quais variáveis de ambiente são necessárias?

Nenhuma.

### Como instalar dependências?

Rode no terminal:

```
npm install
```

### Como rodar o projeto?

Rode no terminal:

```
npm run dev
```

## Seção 2: Decisões de design

### Por que você escolheu essa estrutura de pastas?

Por que essa estrutura facilita a organização de cada parte do projeto, permitindo que os componentes reutilizáveis sejam encontrados em `components`, as interfaces de um determinado elemento estejam concentradas em um arquivo em `interfaces`, as páginas da aplicação estejam em `pages`, e o consumo de serviços de terceiros (APIs) organizados em arquivos dentro de `services`. Além disso, essa estrutura garantia escalabilidade para o projeto, permitindo ele crescer e mantendo a organização.

### Qual foi a maior dificuldade que você encontrou e como superou?

Criação da interface dos detalhes do pokemon, especificamente para pegar a imagem oficial do pokemon. Abri a URL no navegador, ativei a extensão JSON Formatter, e fui fechando as chaves do json que eu não iria utilizar, até chegar na imagem oficial.

### O que você não teve tempo de fazer (dentro do timebox) e como você faria se tivesse mais tempo?

- Mensagem de erro, caso o usuário mudasse a URL de detalhes de um pokemon manualmente para um que não existe. Eu implementaria um try/catch nas funções que pegam os dados do pokemon (`services/pokeapi.ts`) e retornaria o erro para o useEffect de `pages/Details.tsx`, que também possuiria um try/catch e trataria mostrando uma mensagem de erro na tela.

- Caixa de texto para filtragem de pokemons. Implementaria acima das cards da `pages/Home.tsx`, e utilizaria um const filteredPokemons, que seria utilizado para receber os pokemons com um .filter().

- Hospedagem. Eu faria deploy na Vercel.

- Time pokemon. Como nunca utilizei a Context API, iria estudar a documentação para aprender.

Cache. Não mexi com cache, então eu teria que estudar também.

Atualização. Não consigo imaginar como implementaria isso.

## Seção final: Recomendações

Não tenho nenhuma.
