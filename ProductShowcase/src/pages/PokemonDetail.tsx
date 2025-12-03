import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonDetails } from '@/api/pokemonService';
import type { PokemonDetails } from '@/types/pokemon';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart, ArrowLeft, Loader } from 'lucide-react';
import { capitalize } from '@/utils/pokemonUtils';

export function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!name) {
        setError('Pokémon não encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonDetails(name);
        setPokemon(data);
      } catch {
        setError('Falha ao carregar detalhes do Pokémon. Tente novamente.');
        console.error(`Erro ao buscar ${name}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [name]);

  // Mapa de cores por tipo
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-6 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Pokédex
          </Link>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-xl text-red-600 font-semibold">{error || 'Pokémon não encontrado'}</p>
          </div>
        </div>
      </div>
    );
  }

  const liked = isFavorite(pokemon.name);
  const types = pokemon.types.sort((a, b) => a.slot - b.slot);
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
  const heightInMeters = (pokemon.height * 0.1).toFixed(1);
  const weightInKg = (pokemon.weight * 0.1).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-8 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5 color-red-600" />
          Voltar para Pokédex
        </Link>

       
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-40 bg-gradient-to-r from-red-400 to-red-500 flex items-end justify-between px-6 pb-6">
            <div>
              <p className="text-white text-sm font-semibold opacity-90">
                #{pokemon.id.toString().padStart(3, '0')}
              </p>
              <h1 className="text-4xl font-bold text-white capitalize mt-2">
                {capitalize(pokemon.name)}
              </h1>
            </div>
            <button
              onClick={() => toggleFavorite(pokemon.name)}
              className={`p-3 rounded-full transition-all ${
                liked
                  ? 'bg-white text-red-500'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-8 h-8 ${liked ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-8">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  className="w-40 h-40 sm:w-64 sm:h-64 object-contain drop-shadow-xl"
                />
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Tipos</h2>
              <div className="flex gap-3 flex-wrap">
                {types.map((typeData) => {
                  const typeName = typeData.type.name;
                  const color = typeColors[typeName] || 'bg-gray-500';
                  return (
                    <span
                      key={typeName}
                      className={`${color} text-white px-4 py-2 rounded-full font-semibold capitalize text-sm`}
                    >
                      {capitalize(typeName)}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <p className="text-gray-600 font-semibold text-sm mb-2">ALTURA</p>
                <p className="text-3xl font-bold text-blue-600">{heightInMeters} m</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <p className="text-gray-600 font-semibold text-sm mb-2">PESO</p>
                <p className="text-3xl font-bold text-orange-600">{weightInKg} kg</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to="/"
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
              >
                Voltar para Pokédex
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
