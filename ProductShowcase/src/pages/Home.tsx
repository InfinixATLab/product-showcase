import { useEffect, useState, useMemo } from 'react';
import { PokemonCard } from '../components/PokemonCard';
import { fetchPokemonList, fetchPokemonDetails, clearPokemonCache } from '../api/pokemonService';
import type { PokemonData, PokemonListItem } from '../types/pokemon';
import { Spinner } from '../components/Spinner';
import { FavoriteTeam } from '../components/FavoriteTeam';

export const HomePage = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClearCacheAndReload = () => {
        clearPokemonCache();
        window.location.reload(); 
    };

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

  const filteredPokemons = useMemo(() => {
        if (!searchTerm) return pokemons;
        return pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }, [pokemons, searchTerm]);

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
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Lista de Pokémons (1ª Geração)</h2>
            <button
              onClick={handleClearCacheAndReload}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition shadow-md text-sm whitespace-nowrap"
            > Atualizar
            </button>
        </div>
      <FavoriteTeam />
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-sm"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredPokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
         ))}
      </div>
    </div>
  );
};