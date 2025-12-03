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
    <div 
      onClick={() => onClick(pokemon.name)}
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 border border-gray-200"
    >

      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors hover:scale-110"
        title={favorite ? `Remover ${pokemon.name} dos favoritos` : `Adicionar ${pokemon.name} aos favoritos`}
      >
        {favorite ? (
          <span className="text-2xl text-red-500 animate-pulse">❤️</span>
        ) : (
          <span className="text-2xl text-gray-400 hover:text-red-500 transition-colors">🤍</span>
        )}
      </button>
      
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs font-bold bg-white/90 backdrop-blur-sm text-gray-600 px-3 py-1.5 rounded-full shadow-sm">
          #{id.toString().padStart(3, '0')}
        </span>
      </div>

      <div className="relative p-5 flex flex-col items-center">
        {/* Image container */}
        <div className="w-32 h-32 mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 p-2 group-hover:from-red-100 group-hover:to-blue-100 transition-all duration-300">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img 
              src={imageUrl} 
              alt={pokemon.name}
              className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
        
        <h3 className="font-bold text-gray-800 text-lg text-center capitalize mb-2 group-hover:text-blue-600 transition-colors">
          {pokemon.name}
        </h3>
        
        <div className="flex space-x-1 mb-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Pokémon</span>
        </div>
        
        <div className="mt-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm text-blue-600 font-medium">Ver detalhes</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default PokemonCard;