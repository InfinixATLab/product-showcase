import React from 'react';
import type { PokemonListItem } from '../../types/pokemon';
import { extractPokemonId, getPokemonImageUrl } from '../../services/pokemonApi';
import { usePokemonContext } from '../../contexts/PokemonContext';

interface PokemonCardProps {
  pokemon: PokemonListItem;
  onClick: (name: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const { isFavorite, addFavorite, removeFavorite } = usePokemonContext();
  const id = extractPokemonId(pokemon.url);
  const imageUrl = getPokemonImageUrl(id);
  const favorite = isFavorite(pokemon.name);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(pokemon.name);
    } else {
      addFavorite(pokemon.name);
    }
  };

  return (
    <div onClick={() => onClick(pokemon.name)}>
      <button
        onClick={handleFavoriteClick}
        title={favorite ? `Remover ${pokemon.name} dos favoritos` : `Acionar ${pokemon.name} aos favoritos`}
      >
        {favorite ? '♥' : '♡'}
      </button>
      
      <div>
        #{id.toString().padStart(3, '0')}
      </div>

      <div>
        <img 
          src={imageUrl} 
          alt={pokemon.name}
          width={96}
          height={96}
        />
        
        <h3>
          {pokemon.name}
        </h3>
      </div>
    </div>
  );
};

export default PokemonCard;