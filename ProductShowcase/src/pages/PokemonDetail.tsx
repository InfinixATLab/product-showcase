import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pokemonApi } from '../services/pokemonApi';
import type { Pokemon } from '../types/pokemon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { usePokemonContext } from '../contexts/PokemonContext';

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = usePokemonContext();

  useEffect(() => {
    if (name) {
      fetchPokemonDetails(name);
    }
  }, [name]);

  const fetchPokemonDetails = async (pokemonName: string) => {
    try {
      setLoading(true);
      const data = await pokemonApi.getPokemonByName(pokemonName);
      setPokemon(data);
    } catch (error) {
      console.error('Erro ao encontrar detalhes do Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!pokemon) return;
    
    if (isFavorite(pokemon.name)) {
      removeFavorite(pokemon.name);
    } else {
      addFavorite(pokemon.name);
    }
  };

  const getTypeColor = (typeName: string) => {
    const colors: Record<string, string> = {
      normal: 'bg-gray-500',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-500',
      grass: 'bg-green-500',
      ice: 'bg-cyan-400',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-700',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-lime-500',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dark: 'bg-gray-800',
      dragon: 'bg-indigo-700',
      steel: 'bg-gray-400',
      fairy: 'bg-pink-300',
    };
    return colors[typeName] || 'bg-gray-500';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!pokemon) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-40 h-40 mx-auto mb-8 text-gray-300">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-bold text-lg hover:scale-105"
        >
          Voltar para Pokédex
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-gray-700 font-medium hover:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Voltar para Pokédex</span>
        </button>
        
      </div>


      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white capitalize mb-2">
                {pokemon.name}
              </h1>
            </div>
            
            <button
              onClick={handleFavoriteToggle}
              className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all transform hover:scale-105 ${
                isFavorite(pokemon.name)
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
              }`}
            >
              {isFavorite(pokemon.name) ? (
                <>
                  <span className="text-2xl">❤️</span>
                  <span className="font-bold text-lg">Remover do Time</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">🤍</span>
                  <span className="font-bold text-lg">Adicionar ao Time</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-2/5">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-inner">
                <div className="aspect-square relative">
                  <img 
                    src={pokemon.sprites.other['official-artwork'].front_default} 
                    alt={pokemon.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                
                {pokemon.sprites.front_default && (
                  <div className="mt-8">
                    <h4 className="font-bold text-gray-700 mb-4 text-lg">Sprite Alternativo</h4>
                    <div className="bg-white rounded-xl p-4 inline-block shadow-md">
                      <img 
                        src={pokemon.sprites.front_default} 
                        alt={`${pokemon.name} front`}
                        className="w-24 h-24"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>


            <div className="lg:w-3/5">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  Tipos
                </h3>
                <div className="flex flex-wrap gap-4">
                  {pokemon.types.map((typeInfo) => (
                    <span 
                      key={typeInfo.slot}
                      className={`px-6 py-3 rounded-full text-white text-lg font-bold capitalize shadow-lg ${getTypeColor(typeInfo.type.name)}`}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <h4 className="font-bold text-gray-800 text-xl">Altura</h4>
                  </div>
                  <p className="text-5xl font-bold text-gray-900">
                    {(pokemon.height / 10).toFixed(1)}
                    <span className="text-2xl text-gray-600 ml-2">metros</span>
                  </p>
                  <p className="text-gray-500 mt-2">Altura média do Pokémon</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4 mb-4">
                    <h4 className="font-bold text-gray-800 text-xl">Peso</h4>
                  </div>
                  <p className="text-5xl font-bold text-gray-900">
                    {(pokemon.weight / 10).toFixed(1)}
                    <span className="text-2xl text-gray-600 ml-2">quilogramas</span>
                  </p>
                  <p className="text-gray-500 mt-2">Peso médio do Pokémon</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
                <h4 className="font-bold text-gray-800 text-xl mb-6 flex items-center">
                  Informações do Pokémon
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Número na Pokédex</span>
                    <span className="font-bold text-gray-900 text-lg">#{pokemon.id.toString().padStart(3, '0')}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Tipos</span>
                    <div className="flex gap-2">
                      {pokemon.types.map((typeInfo) => (
                        <span key={typeInfo.slot} className="font-bold capitalize bg-gray-200 px-3 py-1 rounded-lg">
                          {typeInfo.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
            <button 
              onClick={() => {
                const prevId = pokemon.id - 1;
                if (prevId > 0) navigate(`/pokemon/${prevId}`);
              }}
              disabled={pokemon.id <= 1}
              className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-xl transition-all ${
                pokemon.id <= 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:scale-105'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-bold">Pokémon Anterior</span>
            </button>
            
            <button 
              onClick={() => {
                const nextId = pokemon.id + 1;
                if (nextId <= 151) navigate(`/pokemon/${nextId}`);
              }}
              disabled={pokemon.id >= 151}
              className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-xl transition-all ${
                pokemon.id >= 151
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:scale-105'
              }`}
            >
              <span className="font-bold">Próximo Pokémon</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;