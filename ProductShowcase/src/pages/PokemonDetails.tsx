import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  return (
    <div>
      <section>
        <nav className="px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-white/90 backdrop-blur text-cyan-600 font-medium shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
          >
            ← Voltar
          </Link>
        </nav>
      </section>
      <section>
        <div className="p-6 max-w-md mx-auto text-center group">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="mx-auto h-40 transition-all duration-300 ease-in-out group-hover:scale-105"
          />

          <h1 className="transition-all duration-300 ease-in-out group-hover:scale-105 text-2xl font-bold capitalize mt-4">
            {pokemon.name}
          </h1>

          <div className="flex justify-center gap-2 mt-2 transition-all duration-300 ease-in-out group-hover:scale-105 ">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className=" px-3 py-1 bg-gray-200 rounded-full text-sm text-cyan-600 capitalize font-bold "
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="transition-all duration-300 ease-in-outs group-hover:scale-105 font-semibold ">
            <p className="mt-4">Altura: {pokemon.height}</p>
            <p>Peso: {pokemon.weight}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
