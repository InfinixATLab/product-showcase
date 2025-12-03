import { useEffect, useState } from "react";
import { getPokemons } from "../../services/pokemon.service";
import type { PokemonListItem } from "../../types/pokemon";
import { Link } from "react-router-dom";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPokemons();
        setPokemons(data.results);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Carregando Pokémons...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className="bg-red-700 max-w-3xl mx-auto rounded-lg p-6 w-full sm:w-11/12 md:w-3/4">
        <h1 className="text-3xl font-bold text-center mb-6">Pokédex</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
          {pokemons.map((pokemon) => {
            const id = pokemon.url.split("/").filter(Boolean).pop(); // Extrai o ID da URL
            const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

            return (
              <Link
                key={pokemon.name}
                to={`/pokemon/${pokemon.name}`}
                className="border rounded-md p-3 flex flex-col items-center bg-white hover:shadow-md transition"
              >
                <img src={img} alt={pokemon.name} className="w-20 h-20" />
                <span className="mt-2 capitalize font-medium">
                  {pokemon.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
