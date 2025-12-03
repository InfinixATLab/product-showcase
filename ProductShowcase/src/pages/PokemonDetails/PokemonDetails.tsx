import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonByNameOrId } from "../../services/pokemon.service";
import type { PokemonDetails as PokemonType } from "../../types/pokemon";

export const PokemonDetails = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        if (name) {
          const data = await getPokemonByNameOrId(name);
          setPokemon(data);
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Carregando detalhes...
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <p className="text-2xl font-bold mb-4">Pokémon não encontrado!</p>
        <Link to="/" className="text-blue-600 underline">
          Voltar para a Pokédex
        </Link>
      </div>
    );
  }

  const image = pokemon.sprites.other["official-artwork"].front_default ?? "";

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Link to="/" className="text-black font-bold block mb-4">
        ← Voltar
      </Link>

      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <img src={image} alt={pokemon.name} className="w-40 h-40 mx-auto" />

        <h1 className="text-3xl font-bold capitalize mt-4">{pokemon.name}</h1>

        <div className="mt-4">
          <p className="text-lg">
            <span className="font-semibold">ID:</span> {pokemon.id}
          </p>

          <p className="text-lg mt-2">
            <span className="font-semibold">Tipos:</span>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>

          <p className="text-lg mt-2">
            <span className="font-semibold">Altura:</span> {pokemon.height}
          </p>

          <p className="text-lg mt-2">
            <span className="font-semibold">Peso:</span> {pokemon.weight}
          </p>
        </div>
      </div>
    </div>
  );
};
