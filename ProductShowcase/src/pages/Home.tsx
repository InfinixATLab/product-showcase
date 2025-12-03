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
    <div>
      <h2>Lista com os 150 primeiros Pokémons</h2>
      
      <input
        type="text"
        placeholder="Busque por nome"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {favorites.length > 0 && (
        <div>
          <h3>Meu Time: ({favorites.length}/6)</h3>
          <div>
            {favorites.map((fav) => (
              <div 
                key={fav}
                onClick={() => navigate(`/pokemon/${fav}`)}
                style={{ cursor: 'pointer' }}
              >
                {fav}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        {filteredPokemons.map((pokemon) => (
          <PokemonCard 
            key={pokemon.name}
            pokemon={pokemon}
            onClick={handlePokemonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;