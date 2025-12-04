# 📄 README-CANDIDATO

## Instruções para Rodar

#### **Variáveis de ambiente necessárias**

O projeto não requer variáveis de ambiente adicionais.  
A API utilizada (PokéAPI) é pública e não exige chave de acesso.

#### **Instalar dependências**

`npm install`

#### **Rodar o projeto em ambiente de desenvolvimento**

`npm run dev`

#### **Gerar build de produção**

`npm run build`

#### **Servir o build localmente**

`npm run preview`

## Decisões de Design

#### **Estrutura de pastas escolhida**

Optei por uma arquitetura simples e organizada por responsabilidade:

src/
├── components/ # Componentes reutilizáveis (Cards, Header, etc)
├── pages/ # Páginas principais da aplicação
├── services/ # Integração com API e lógica de cache
├── context/ # Context API para gerenciar o Time Pokémon
├── interfaces/ # Tipagens Typescript centralizadas
└── assets/ # Imagens e arquivos estáticos

Essa divisão facilita manutenção, escalabilidade e localização fácil dos arquivos.

#### **Maior dificuldade e como foi superada**

A maior dificuldade foi implementar cache persistente via localStorage para:
- Lista de Pokémons
- Detalhes dos Pokémons
- Lista de favoritos com limite de 6.
  Foi necessário garantir:
- Sincronização entre Context API e localStorage
- Atualizações manuais da lista via botão
- Reuso de dados mesmo após recarregar a página

A solução foi:
- Criar um hook de cache para encapsular o comportamento
- Atualizar sempre que o estado mudasse
- Fornecer um botão de "Atualizar" que limpa e refaz o cache

#### **O que não deu tempo de fazer**

Dentro do timebox, algumas melhorias ficaram de fora:

- Skeletons de carregamento
- Paginação real da PokéAPI
- Testes unitários para hooks e serviços
- Melhor organização de estilos com variáveis de design
- Tema Dark Mode
  Se tivesse mais tempo, minha priorização seria:
- **Testes → UX → Estilização**.

## Recomendações
- Clarificar se o layout é totalmente livre ou se existe algum guia visual.

## Considerações finais:
O desafio foi uma boa oportunidade para demonstrar organização, priorização e boas práticas com React + TypeScript.  
Foquei em entregar funcionalidades completas, código claro e arquitetura extensível dentro do tempo proposto.
