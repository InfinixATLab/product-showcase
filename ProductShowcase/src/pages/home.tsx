import React from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import { PokemonCard } from "../components/PokemonCard";
import { extractIdFromUrl } from "../api/utils";

export const Home: React.FC = () => {
  const { data, loading, error } = usePokemonList(151);

  if (loading) return <div className="p-4">Carregando pokémons...</div>;
  if (error) return <div className="p-4">Erro: {error}</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map(p => {
          const id = extractIdFromUrl(p.url);
          const imageUrl = id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` : undefined;
          return <PokemonCard key={p.name} name={p.name} imageUrl={imageUrl} />;
        })}
      </div>
    </div>
  );
};
