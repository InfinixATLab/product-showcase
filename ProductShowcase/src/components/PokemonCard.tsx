import { Link } from 'react-router-dom';
import type { PokemonData } from '../types/pokemon';
import { useFavorites } from '../context/FavoritesContext'; 

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-6 h-6 transition-colors ${filled ? 'text-red-500 fill-red-500' : 'text-gray-400 fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

interface PokemonCardProps {
  pokemon: PokemonData;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { name, imageUrl } = pokemon;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(name);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    toggleFavorite(pokemon);
  };

  return (
    <Link to={`/pokemon/${name}`} className="block">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition duration-300 p-4 text-center cursor-pointer relative">
        <button 
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md z-10"
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <HeartIcon filled={favorite} />
        </button>
        
        <div className="h-28 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="w-24 h-24 object-contain"
            loading="lazy"
          />
        </div>
        <h3 className="mt-2 text-lg font-semibold capitalize text-gray-800">
          {name}
        </h3>
      </div>
    </Link>
  );
};