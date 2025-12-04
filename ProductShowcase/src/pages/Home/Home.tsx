import React, { useEffect, useState } from 'react';
import type { PokemonListResponse } from '../../interfaces/Pokemon';
import { getPokemonList } from '../../services/api/pokemonService';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';
import { usePokemonTeam } from '../../context/PokemonTeamContext';

export function Home() {
    const [data, setData] = useState<PokemonListResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const { team,clearTeam } = usePokemonTeam();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getPokemonList()
                setData(response)
            }
            catch (error) {
                console.error("Erro ao carregar Pokemons:", error)
            }
            finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Carregando Pokémons...
      </div>
        )
    }

     const filteredPokemon = data?.results.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
     ) || [];
    
    function handleRefresh() {
  localStorage.removeItem("pokemon_list_cache_151");
  setLoading(true);

  getPokemonList().then((response) => {
    setData(response);
    setLoading(false);
  });
}

    
    return (
        <div className="p-5 max-w-4xl mx-auto">
            
            <button
  onClick={handleRefresh}
  className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
>
  Atualizar lista
</button>

            <button
  onClick={clearTeam}
  className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
>
  Limpar time
</button>


            <div className="mb-4 p-3 bg-gray-100 rounded shadow-sm">
  <h2 className="font-semibold mb-2 text-gray-900">Seu Time ({team.length}/6)</h2>

  {team.length === 0 ? (
    <p className="text-gray-600 text-sm">Você ainda não adicionou nenhum Pokémon.</p>
  ) : (
    <div className="flex gap-2 flex-wrap">
      {team.map((name) => (
        <span
          key={name}
          className="px-3 py-1 bg-blue-200 rounded capitalize text-blue-900 font-medium"
        >
          {name}
        </span>
      ))}
    </div>
  )}
</div>

      <input
  type="text"
  placeholder="Buscar Pokémon..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-2 border border-gray-300 rounded-lg mb-4 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
 />


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>

    </div>
  );
}