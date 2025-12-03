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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!pokemon) {
    return (
      <div>
        <p>Pokémon não encontrado!</p>
        <button onClick={() => navigate('/')}>
          Voltar para Home Page
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>
        Voltar para Home Page
      </button>

      {/* Favorite Button */}
      <button onClick={handleFavoriteToggle}>
        {isFavorite(pokemon.name) ? 'Remover do Time' : 'Adicionar ao Time'}
      </button>

      <div>
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name}
          width={192}
          height={192}
        />
        
        <h1>{pokemon.name}</h1>
        
        <div>
          <div>
            <h3>Altura</h3>
            <p>{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div>
            <h3>Peso</h3>
            <p>{(pokemon.weight / 10).toFixed(1)} Kg</p>
          </div>
        </div>

        <div>
          <h3>Tipo</h3>
          <div>
            {pokemon.types.map((typeInfo) => (
              <span key={typeInfo.slot}>
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;