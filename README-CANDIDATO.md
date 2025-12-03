# README - Desafio Front-End Pokédex

## Seção 1: Instruções para Rodar

### Variáveis de Ambiente
Nenhuma variável de ambiente é necessária. A aplicação utiliza a API pública do PokeAPI.co.

### Instalação de Dependências
```bash
cd ProductShowcase
npm install
```

### Rodar o Projeto

**Modo Desenvolvimento:**
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou a porta indicada pelo Vite)

**Build para Produção:**
```bash
npm run build
```

**Preview da Build:**
```bash
npm run preview
```

---

## Seção 2: Decisões de Design

### 2.1. Estrutura de Pastas

```
src/
├── api/              # Serviços de API (pokemonService.ts)
├── components/       # Componentes React reutilizáveis
│   ├── pokemon/      # Componentes relacionados a Pokémon
│   └── ui/           # Componentes genéricos de UI
├── context/          # Context API para gerenciamento de estado global
├── hooks/            # Custom hooks (useFavorites)
├── pages/            # Páginas/rotas da aplicação
├── types/            # Tipos TypeScript
├── utils/            # Funções utilitárias
├── App.tsx           # Componente principal com rotas
└── main.tsx          # Entry point da aplicação
```

**Justificativa:**
- **Separação de Responsabilidades**: Cada pasta tem uma responsabilidade clara (API, Components, Context, Pages, etc.)
- **Escalabilidade**: Fácil de estender com novos componentes, páginas ou utilitários
- **Manutenibilidade**: Código organizado e fácil de navegar
- **Type Safety**: Tipos centralizados em uma pasta dedicada

### 2.2. Decisões Técnicas

#### Problema das Imagens (Requisito Essencial)
**Desafio**: A API de lista do PokeAPI não retorna imagens, apenas nomes e URLs de detalhes.

**Solução Implementada**:
```typescript
// src/utils/pokemonUtils.ts
export const getImageUrl = (id: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};
```
- Extraem o ID do Pokemon da URL de detalhes usando `getPokemonIdFromUrl()`
- Constroem a URL da imagem oficial usando a estrutura do repositório GitHub do PokeAPI
- Resultado: Cards com imagens funcionando perfeitamente sem chamadas adicionais

#### Cache (Bônus)
- Implementado usando `Map<string, unknown>` para type safety
- Armazena em memória a lista de Pokémons e detalhes
- Função `clearCache()` permite limpar e recarregar dados
- Console logs para debug ("Cache hit: ...")

#### Context API para Favoritos (Bônus)
- `FavoritesContext.tsx`: Provider que gerencia estado global
- `useFavorites.ts`: Custom hook para acessar o contexto facilmente
- Persistência automática em `localStorage` sob a chave `pokedex-favorites`
- Limite de 6 Pokémons no time (com alerta ao usuário)

#### Filtro por Nome (Bônus)
- Implementado com `useMemo` na Home.tsx
- Busca em tempo real, lado cliente (sem chamadas API adicionais)
- Case-insensitive, funciona parcialmente também

#### Paginação (Melhorado)
- 20 Pokémons por página
- Navegação com botões "Anterior" e "Próxima"
- Botões de números de página para acesso direto
- Reset automático para página 1 ao fazer uma busca

#### Routing
- `react-router-dom` v7
- Rotas:
  - `/` - Home com lista de 151 Pokémons
  - `/pokemon/:name` - Detalhes de um Pokémon
  - `/favorites` - Time Pokémon (link direto ainda não adicionado, mas rota funciona)

### 2.3. Maior Dificuldade Encontrada

**Problema**: Configurar corretamente os aliases de path (`@/`) com TypeScript e Vite.

**Solução**:
1. Adicionado `paths` em `tsconfig.app.json`
2. Configurado `resolve.alias` em `vite.config.ts`
3. Instalado `npm install path` (já era devdependency)

**Resultado**: Imports limpos e organizados (`import { ... } from '@/api/pokemonService'`)

### 2.4. O Que Não Foi Feito (Dentro do Timebox)

1. **Deploy em Produção**:
   - Aplicação pronta para deploy
   - Poderia fazer via Vercel/Netlify (~20 minutos)

### 2.5. Se Tivesse Mais Tempo

1. **Mais Informações no Detalhes** → Adicionar stats (ataque, defesa, velocidade, etc)
2. **Evolução de Pokémons** → Mostrar cadeia evolutiva
3. **Busca com Filtros Avançados** → Filtrar por tipo, altura, peso
4. **Modo Escuro** → Toggle theme com Tailwind
5. **Responsividade Mobile Melhorada** → Testes em dispositivos reais
6. **Tratamento de Erros Robusto** → Retry automático, fallbacks
7. **PWA Support** → Funcionar offline com Service Workers
8. **Testes Automatizados** → Vitest + React Testing Library

## Seção final: Recomendações

### Para Melhorar o Desafio

1. **Especificar Duração Máxima de Deploy** → Seria bom ter tempo alocado para deploy
2. **Fornecer Design Mockups** → Facilita implementação
3. **Detalhar Comportamento de Erros** → Como tratar erros de rede?
4. **Exemplos de Tipagem** → Alguns devs menos experientes em TS poderiam lutar
5. **Mencionar Performance como Critério** → Lazy loading, code splitting, etc.

### Melhorias para o Código

1. **Error Boundary** → Componente wrapper para tratar erros
2. **Loading Estados Granulares** → Diferente entre lista e detalhes carregando
3. **Debounce no Filtro** → Evita re-renders excessivos em inputs
4. **Testes** → Vitest + React Testing Library
5. **Documentation** → Comentários JSDoc nas funções complexas
6. **Environment Variables** → Para API base URLs em diferentes ambientes

### Git e Processo

- ✅ Commits atômicos: Separei em logical commits
- ✅ README completo: Este arquivo cobre tudo
- ✅ Estrutura escalável: Fácil adicionar novos Pokémons ou features
- ✅ TypeScript strict: Sem `any`, tipagem forte

---

## Comandos Rápidos

```bash
# Instalar dependências
npm install

# Rodar dev server
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

