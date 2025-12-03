import { useEffect, useState } from 'react';
import { PokemonCard } from '../components/PokemonCard';
import { fetchPokemonList, fetchPokemonDetails } from '../api/pokemonService';
import type { PokemonData, PokemonListItem } from '../types/pokemon';
import { Spinner } from '../components/Spinner';

export const HomePage = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        const listResponse = await fetchPokemonList();
        const listItems = listResponse.results;

        const enrichedPokemonsPromises = listItems.map(async (item: PokemonListItem) => {
          const details = await fetchPokemonDetails(item.name);
          const imageUrl = details.sprites.other['official-artwork'].front_default || details.sprites.front_default;
          return {
            name: item.name,
            url: item.url,
            imageUrl: imageUrl || '', 
          } as PokemonData;
        });

        const enrichedPokemons = await Promise.all(enrichedPokemonsPromises);
        setPokemons(enrichedPokemons);
      } catch (error) {
        console.error("Erro ao carregar Pokémons:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
        <p className="ml-3 text-lg text-gray-700">Carregando Pokémons...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Lista de Pokémons (1ª Geração)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};