import { useEffect, useState } from "react";
import type { PokemonListItem, PokemonResponse } from "../types/pokemon";
import { api } from "../services/api";
import { PokemonCard } from "../components/PokemonCard";

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get<PokemonResponse>("pokemon?limit=151")
      .then((res) => {
        setPokemons(res.data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-red-500">Carregando...</p>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-4">
      <section className=" rounded-lg shadow w-full md:w-64 xl:w-72 p-4 flex flex-col gap-2">
        <label className="text-sm font-semibold">Buscar Pokémon</label>

        <input
          type="text"
          
          placeholder="Ex: pikachu"
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </section>

      <section className="flex-1 p-4 bg-black rounded-l-xl">
        <div className="grid gap-4 rounded-l-2xl p-4 bg-white/10 backdrop-blur-xl backdrop-saturate-150 backdrop-contrast-125 border border-white/10  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 max-h-[calc(100vh-2rem)] overflow-y-scroll">
          {pokemons.map((p) => (
            <PokemonCard key={p.name} pokemon={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
