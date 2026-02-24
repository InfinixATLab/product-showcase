<section>
  <h1>Instruções para Rodar!</h1>
  <p>
    <strong>Variáveis de ambiente:</strong> Não são necessárias variáveis de ambiente (.env) para este projeto, pois utilizamos a PokeAPI pública.<br>
    <strong>Instalação:</strong> Execute <code>npm install</code> no terminal para baixar as bibliotecas necessárias. Certifíque-se de ter o Node.js instalado!<br>
    <strong>Execução:</strong> Utilize <code>npm run dev</code> para iniciar o servidor local e rodar a aplicação.
    
  </p>
</section>

<hr />

<section>
  <h2>Seção 2: Decisões de Design</h2>
  <p>
    <strong>Estrutura de pastas:</strong> Adotei uma separação entre pages (visualização de rotas) e components (peças reutilizáveis como o PokemonCard).
    Criei uma pasta hooks para isolar a lógica de consumo do Contexto, para garantir  que o projeto siga os padrões de "Fast Refresh" do React/Vite.<br>
    <strong>Dificuldade:</strong> A maior dificuldade foi gerenciar renderizações em cascata e erros de exportação no Context API.<br>
    <strong>O que faltou:</strong> Não tive tempo de implementar testes unitários com Vitest nem de corrigir um erro de "Fast Refresh" na pasta <code>context/TeamContext</code> 
  </p>
</section>

<hr />

<section>
  <h2>Seção 3: Link para Deploy</h2>
  <p>
    
  </p>
</section>

<hr />

<section>
  <h2>Recomendações</h2>
  <p>
   Recomendo o uso de bibliotecas de busca de dados como o React Query, que gerenciaria o cache da API de forma automática, reduzindo a necessidade de lógica manual de <code>useEffect.</code> 
  </p>
</section>
