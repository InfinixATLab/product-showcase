import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { getImageUrl, getPokemonIdFromUrl, capitalize } from '@/utils/pokemonUtils';
import { useFavorites } from '@/hooks/useFavorites';

interface Props {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: Props) {
  const id = getPokemonIdFromUrl(url);
  const image = getImageUrl(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(name);

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-zinc-200 overflow-hidden">
      
      <button 
        onClick={(e) => {
            e.preventDefault();
            toggleFavorite(name);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/70 hover:bg-white transition-colors"
        aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Heart 
            className={`w-5 h-5 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-zinc-400'}`} 
        />
      </button>

      <Link to={`/pokemon/${name}`} className="block p-4 text-center hover:no-underline">
        
        <div className="relative w-32 h-32 mx-auto transform group-hover:scale-110 transition-transform duration-300">
          <img 
            src={image} 
            alt={`Imagem do Pokémon ${capitalize(name)}`} 
            className="object-contain w-full h-full drop-shadow-lg"
            loading="lazy" 
          />
        </div>
        
        <div className="mt-4">
            <span className="text-xs font-bold text-zinc-400">#{id.padStart(3, '0')}</span>
            <h2 className="text-lg font-bold capitalize text-zinc-800 mt-1">{capitalize(name)}</h2>
        </div>
      </Link>
    </div>
  );
}