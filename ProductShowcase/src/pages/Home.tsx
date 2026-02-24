import { useEffect, useState } from "react";
import type { PokemonListItem, PokemonResponse } from "../types/pokemon";
import { api } from "../services/api";
import { PokemonCard } from "../components/PokemonCard";
import { useSearchParams } from "react-router-dom";

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams("");

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

  //aqui eu crio uam const que vai ser responsável por passar o valor que ta sendo escrito no input
  const search = (searchParams.get("search") ?? "").trim();

  //aqui eu crio uma const onde filtra todos os pokemons na pesquisa do search, filtracao com tudo minusculo para n causar erro e mais legibilidade.
  const filteredPok = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLocaleLowerCase()),
  );

  //aqui eu crio uma const onde que, se eu tiver pesquisado algo, vai aparecer os pokemons que estão sendo filtrados a cada letra! senão, vai aparecer todos os pokemons mesmo.
  const listeredPoke = search ? filteredPok : pokemons;

  //console para teste
  console.log("pokemons", pokemons);
  console.log("POkemon selecionado:", search);

  if (loading) {
    return <p className="text-center text-red-500">Carregando...</p>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-4">
      <section className=" rounded-lg shadow w-full md:w-64 xl:w-72 p-4 flex flex-col gap-2">
        <label className="text-sm font-semibold">Buscar Pokémon</label>

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearchParams(e.target.value ? { search: e.target.value } : {});
          }}
          placeholder="Ex: pikachu"
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </section>

      <section className="flex-1 p-4 bg-black rounded-l-xl">
        <div className="grid gap-4 rounded-l-2xl p-4 bg-white/10 backdrop-blur-xl backdrop-saturate-150 backdrop-contrast-125 border border-white/10  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 max-h-[calc(100vh-2rem)] overflow-y-scroll">
          {filteredPok.length === 0 && (
            <p className="col-span-full text-center text-white/70">
              Nenhum Pokémon encontrado
            </p>
          )}

          {listeredPoke.map((p) => (
            <PokemonCard key={p.name} pokemon={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
