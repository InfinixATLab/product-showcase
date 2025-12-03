import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pokemonApi } from '../services/pokemonApi';
import type { PokemonListItem } from '../types/pokemon';
import PokemonCard from '../components/ui/PokemonCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { usePokemonContext } from '../contexts/PokemonContext';

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { favorites } = usePokemonContext();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await pokemonApi.getPokemonList(151);
      setPokemons(data.results);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePokemonClick = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Pokédex Nacional
            </h2>
            <p className="text-gray-600">
              Explore os <span className="font-bold text-blue-600">151 primeiros Pokémon</span> da região de Kanto
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{pokemons.length}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{filteredPokemons.length}</div>
              <div className="text-sm text-gray-500">Filtrados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{favorites.length}</div>
              <div className="text-sm text-gray-500">Time</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar Pokémon por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <span className="text-gray-400 hover:text-gray-600 text-xl">×</span>
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 ml-1">
                {searchTerm ? `Encontrados ${filteredPokemons.length} Pokémon` : 'Digite para achar seu Pokémon...'}
              </p>
            </div>
            
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      </div>

      {favorites.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-md p-6 border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">⭐</span>
              Meu Time ({favorites.length}/6)
            </h3>
            <span className="text-sm text-gray-600">Clique para ver detalhes</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {favorites.map((fav) => (
              <div 
                key={fav}
                onClick={() => navigate(`/pokemon/${fav}`)}
                className="group bg-white px-4 py-3 rounded-xl border border-yellow-300 flex items-center space-x-3 shadow-sm hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              >
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="font-bold capitalize text-gray-800 group-hover:text-yellow-600 transition-colors">
                  {fav}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredPokemons.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">Nenhum Pokémon encontrado</h3>
          <p className="text-gray-500 mb-6">Tente buscar com um termo diferente</p>
          <button
            onClick={() => setSearchTerm('')}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            Mostrar todos os Pokémon
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Pokémon ({filteredPokemons.length} de {pokemons.length})
            </h3>
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <span>Clique em um card para ver detalhes</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">❤️ Clique no coração para favoritar</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredPokemons.map((pokemon) => (
              <PokemonCard 
                key={pokemon.name}
                pokemon={pokemon}
                onClick={handlePokemonClick}
              />
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-500">
              Exibindo <span className="font-semibold">{filteredPokemons.length}</span> Pokémon
              {searchTerm && ` para "${searchTerm}"`}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Dados fornecidos pela <a href="https://pokeapi.co/" className="text-blue-500 hover:underline">PokeAPI</a>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;