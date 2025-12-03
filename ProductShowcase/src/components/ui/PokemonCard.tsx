import React from 'react';
import type { PokemonListItem } from '../../types/pokemon';
import { extractPokemonId, getPokemonImageUrl } from '../../services/pokemonApi';

interface PokemonCardProps {
  pokemon: PokemonListItem;
  onClick: (name: string) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const id = extractPokemonId(pokemon.url);
  const imageUrl = getPokemonImageUrl(id);

  return (
    <div onClick={() => onClick(pokemon.name)} style={{ cursor: 'pointer' }}>
      <img 
        src={imageUrl} 
        alt={pokemon.name}
        width={96}
        height={96}
      />
      <h3>{pokemon.name}</h3>
    </div>
  );
};

export default PokemonCard;