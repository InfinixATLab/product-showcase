import PokemonCard from "./components/PokemonCard";
import { useFetch } from "./hooks/useFetch";
import type { PokemonListResponse } from "./types/pokemons";

const App = () => {
  const { data, loading, error } = useFetch<PokemonListResponse>(
    "https://pokeapi.co/api/v2/pokemon"
  );

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center">
        <p className="text-black font-bold text-2xl">
          Erro ao carregar os dados
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-6">
      <h1 className="text-black font-bold text-4xl mt-6">Pokemon Desk</h1>

      {loading && <p className="mt-12">Loading...</p>}

      <div className="mt-8 mx-auto grid gap-4 grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.results.map((item, index) => (
            <PokemonCard
              key={`${item.name}-${index}`}
              name={item.name}
              image={item.url}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
