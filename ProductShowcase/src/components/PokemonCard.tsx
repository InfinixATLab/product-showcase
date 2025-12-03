import { Link } from 'react-router-dom';
import type { PokemonData } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonData;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { name, imageUrl } = pokemon;

  return (
    <Link to={`/pokemon/${name}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 text-center cursor-pointer">
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