import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import type { PokemonDetails as PokemonDetailsType } from "../types/pokemon";

export function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null);

  //esse useeffect serve para verificar se houve uma troca de nomes de pokemons na URL
  //ex: de pikachu foi pra charmander, o useeffect dispara essa diferença com a ajuda do PokemonDetailsType
  useEffect(() => {
    api.get<PokemonDetailsType>(`/pokemon/${name}`).then((response) => {
      setPokemon(response.data);
    });
  }, [name]);

  if (!pokemon) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="mx-auto h-40"
      />

      <h1 className="text-2xl font-bold capitalize mt-4">{pokemon.name}</h1>

      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            {type.type.name}
          </span>
        ))}
      </div>

      <p className="mt-4">Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
    </div>
  );
}
