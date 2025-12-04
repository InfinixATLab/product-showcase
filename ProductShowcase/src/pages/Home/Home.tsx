import React, { useEffect, useState } from 'react';
import type { PokemonListResponse } from '../../interfaces/Pokemon';
import { getPokemonList } from '../../services/api/pokemonService';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';

export function Home() {
    const [data, setData] = useState<PokemonListResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch]=useState("")
    
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
    
    return (
    <div className="p-5 max-w-4xl mx-auto">

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
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