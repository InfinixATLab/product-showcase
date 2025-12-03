import React, { useEffect, useState } from 'react';
import { api } from '../../services/api/pokeApi';
import { PokemonListResponse } from '../../interfaces/Pokemon';
import { getPokemonList } from '../../services/api/pokemonService';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';

export function Home() {
    const [data, setData] = useState<PokemonListResponse | null>(null)
    const [loading, setLoading] = useState(true)
    
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
    return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Pokédex (1ª Geração)</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data?.results.map((pokemon) => (
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