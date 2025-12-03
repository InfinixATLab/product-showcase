import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPokemonList, clearCache } from '@/api/pokemonService';
import type { PokemonListResult } from '@/types/pokemon';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { useFavorites } from '@/hooks/useFavorites';
import { RefreshCw, Search, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

export function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonListResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonList(151);
        setPokemonList(data);
      } catch {
        setError('Falha ao carregar Pokémons. Tente novamente.');
        console.error('Erro ao carregar lista de Pokémon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filtrar Pokémons por termo de busca (lado do cliente)
  const filteredPokemon = useMemo(() => {
    return pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemonList, searchTerm]);

  // Paginação
  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Função para atualizar a lista (limpar cache e recarregar)
  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      clearCache();
      const data = await getPokemonList(151);
      setPokemonList(data);
      setCurrentPage(1);
    } catch {
      setError('Falha ao atualizar Pokémons. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-7xl mx-auto flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-red-600">Pokédex</h1>
                <p className="text-sm text-gray-500 mt-1">Geração I - 151 Pokémons</p>
              </div>
              {favorites.length > 0 && (
                <Link
                  to="/favorites"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-md hover:shadow-lg font-semibold"
                  title={`Seu time: ${favorites.length}/6`}
                >
                  <Heart className="w-5 h-5 fill-white color-white" />
                  <span className="color-white">{favorites.length}/6</span>
                </Link>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar Pokémon por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                />
              </div>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold whitespace-nowrap shadow-md hover:shadow-lg"
                title="Atualizar lista de Pokémons"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Atualizar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="text-center py-12">
              <p className="text-xl text-red-600 font-semibold">{error}</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-semibold"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
              ))}
            </div>
          )}

          {!loading && !error && currentPokemon.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                {currentPokemon.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-gray-700"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                          currentPage === page
                            ? 'bg-red-500 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-gray-700"
                  >
                    <span className="hidden sm:inline">Próxima</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}

          {!loading && !error && currentPokemon.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Nenhum Pokémon encontrado para "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-semibold"
              >
                Limpar Busca
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
