# Pokédex Online - Desafio Front-end

## 1. Instruções para rodar

### Variáveis de ambiente
Nenhuma variável de ambiente é necessária para desenvolvimento local.

### Instalação
```bash
npm install
```

### Execução
```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:5173`

## 2. Decisões de design
# Decisões de UI/UX
Mobile-first: Todo o design foi pensado para dispositivos móveis primeiro

TailwindCSS: Escolhido pela produtividade e design system consistente

Cores temáticas: Paleta baseada nos jogos Pokémon

Loading states: Spinner personalizado

Feedback visual: Notificações para ações de favoritos

Grid responsivo: Adapta de 1 coluna (mobile) a 6 colunas (desktop)


Utiliza sprites oficiais de alta qualidade
### Estrutura de pastas
Escolhi uma estrutura organizada por funcionalidade:
- `src/components/`: Componentes reutilizáveis
- `src/pages/`: Páginas/rotas da aplicação
- `src/services/`: Configuração da API e serviços
- `src/types/`: Interfaces e tipos TypeScript
- `src/contexts/`: Context API para gerenciamento de estado global

Esta estrutura permite separação clara de responsabilidades e facilita a manutenção.

### Maior dificuldade
A maior dificuldade foi resolver o problema das imagens na lista inicial de Pokémon. O endpoint de lista retorna apenas nomes e URLs de detalhes, não as imagens.

**Solução implementada:**
1. Extraí o ID do Pokémon da URL retornada
2. Utilizei o ID para construir a URL da imagem oficial usando o padrão da PokeAPI
3. Criada função auxiliar `getPokemonImageUrl(id)` no serviço da API

### O que não deu tempo de fazer
- **Deploy** Acredito que não tenha configurado corretamente as rotas, por ser uma aplicação web utilizando SPA
o GitHub Pages não renderiza a navegação.

## 3. Link para Deploy
[\[Pokedex Tiago de Noronha Leopoldo\]](https://tiagoleopoldo.github.io/product-showcase/)


### Para melhorar o desafio:
1. Nenhuma sugestão.

### Melhorias técnicas que faria:
- **Mais filtros:** Adicionaria filtros por tipo, geração e habilidades

---

**Desenvolvido por:** Tiago de Noronha Leopoldo  
**Data de entrega:** 03/12/2025  
**Tempo gasto:** ~4 horas


