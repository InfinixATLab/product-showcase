import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPokemonDetails } from '@/api/pokemonService';
import type { PokemonDetails } from '@/types/pokemon';
import { useFavorites } from '@/hooks/useFavorites';
import { ArrowLeft, Heart } from 'lucide-react';
import { capitalize } from '@/utils/pokemonUtils';

export function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [pokemonDetails, setPokemonDetails] = useState<Record<string, PokemonDetails>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const details: Record<string, PokemonDetails> = {};
        
        for (const name of favorites) {
          try {
            const data = await getPokemonDetails(name);
            details[name] = data;
          } catch {
            console.error(`Erro ao buscar detalhes de ${name}`);
          }
        }
        
        setPokemonDetails(details);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchDetails();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Pokédex
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Meu Time Pokémon</h1>
          <p className="text-gray-600 mb-6">
            {favorites.length}/6 Pokémons no seu time
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Carregando detalhes...</p>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">
                Você ainda não tem Pokémons no seu time
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Ir para Pokédex
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((name) => {
                const pokemon = pokemonDetails[name];
                if (!pokemon) return null;

                const types = pokemon.types.sort((a, b) => a.slot - b.slot);
                const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
                const heightInMeters = (pokemon.height * 0.1).toFixed(1);
                const weightInKg = (pokemon.weight * 0.1).toFixed(1);

                return (
                  <div
                    key={name}
                    className="bg-gradient-to-b from-red-50 to-white rounded-xl border-2 border-red-300 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Card Header */}
                    <div className="relative p-4 bg-gradient-to-r from-red-400 to-red-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white text-sm font-semibold">
                            #{pokemon.id.toString().padStart(3, '0')}
                          </p>
                          <h3 className="text-white text-2xl font-bold capitalize mt-1">
                            {capitalize(pokemon.name)}
                          </h3>
                        </div>
                        <button
                          onClick={() => toggleFavorite(name)}
                          className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
                        >
                          <Heart className="w-6 h-6 fill-red-500 text-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="text-center py-6">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={pokemon.name}
                          className="w-40 h-40 object-contain mx-auto drop-shadow-lg"
                        />
                      )}
                    </div>

                    {/* Types */}
                    <div className="px-4 py-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600 font-semibold mb-2">TIPOS</p>
                      <div className="flex flex-wrap gap-2">
                        {types.map((typeData) => {
                          const typeName = typeData.type.name;
                          const typeColors: Record<string, string> = {
                            normal: 'bg-gray-400',
                            fire: 'bg-red-500',
                            water: 'bg-blue-500',
                            electric: 'bg-yellow-400',
                            grass: 'bg-green-500',
                            ice: 'bg-cyan-400',
                            fighting: 'bg-red-700',
                            poison: 'bg-purple-500',
                            ground: 'bg-yellow-600',
                            flying: 'bg-indigo-400',
                            psychic: 'bg-pink-500',
                            bug: 'bg-lime-500',
                            rock: 'bg-stone-500',
                            ghost: 'bg-purple-700',
                            dragon: 'bg-indigo-600',
                            dark: 'bg-gray-700',
                            steel: 'bg-slate-400',
                            fairy: 'bg-pink-400',
                          };
                          const color = typeColors[typeName] || 'bg-gray-500';
                          return (
                            <span
                              key={typeName}
                              className={`${color} text-white px-3 py-1 rounded-full text-xs font-semibold capitalize`}
                            >
                              {capitalize(typeName)}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="px-4 py-3 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <p className="text-xs text-gray-600">Altura</p>
                          <p className="font-bold text-red-600">{heightInMeters} m</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded text-center">
                          <p className="text-xs text-gray-600">Peso</p>
                          <p className="font-bold text-red-600">{weightInKg} kg</p>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="p-4 border-t border-gray-200">
                      <Link
                        to={`/pokemon/${name}`}
                        className="block w-full text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
