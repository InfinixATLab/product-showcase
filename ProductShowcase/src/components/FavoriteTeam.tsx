import { useFavorites } from '../context/FavoritesContext';
import type { PokemonData } from '../types/pokemon';
import { Link } from 'react-router-dom';

const TeamCard = ({ pokemon }: { pokemon: PokemonData }) => {
  const { toggleFavorite } = useFavorites();

  return (
    <div className="relative w-24 h-24 bg-white rounded-full shadow-lg border-2 border-red-400 flex flex-col items-center justify-center m-1 group transition duration-300 transform hover:scale-105">
      <Link to={`/pokemon/${pokemon.name}`} className="block w-full h-full">
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="w-full h-full object-contain p-1"
          loading="lazy"
        />
      </Link>
      
      <button
        onClick={() => toggleFavorite(pokemon)}
        className="absolute top-0 right-0 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={`Remover ${pokemon.name}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <span className="absolute bottom-[-18px] text-xs capitalize text-gray-700 font-semibold">{pokemon.name}</span>
    </div>
  );
};

export const FavoriteTeam = () => {
  const { favorites } = useFavorites();

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-l-4 border-red-500">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        🏆 Seu Time Pokémon ({favorites.length}/6)
      </h3>
      
      <div className="flex flex-wrap gap-4 justify-center">
        {favorites.length > 0 ? (
          favorites.map((pokemon) => (
            <TeamCard key={pokemon.name} pokemon={pokemon} />
          ))
        ) : (
          <p className="text-gray-500 italic">
            Clique no coração nos cards para montar seu time!
          </p>
        )}
      </div>
    </div>
  );
};