import { Link } from "react-router-dom";
import type { PokemonListItem } from "../types/pokemon";

interface Props {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: Props) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
    pokemon.url,
  )}.png`;

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="group rounded-2xl p-4 flex flex-col items-center justify-between bg-white/10 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="w-full aspect-square flex items-center justify-center rounded-xl bg-black/30 backdrop-blur-md overflow-hidden">
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="h-24 sm:h-28 md:h-32 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <p className="mt-3 capitalize font-semibold text-sm sm:text-base text-white/90 tracking-wide">
        {pokemon.name}
      </p>
    </Link>
  );

  function getPokemonId(url: string) {
    return url.split("/").filter(Boolean).pop();
  }
}
