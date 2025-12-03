import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getPokemonDetails } from "../services/pokeapi";
import { useParams } from "react-router-dom";
import type { PokemonDetails } from "../interfaces/pokemon";

export default function Details() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    async function loadPokemonDetails() {
      if (!name) return;
      const data = await getPokemonDetails(name);
      setPokemon(data);
    }
    loadPokemonDetails();
  }, [name]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Header />
      <div className="grow grid place-items-center">
        <div className="flex flex-col justify-center items-center bg-neutral-100 m-8 p-4 rounded-md shadow-md">
          <p className="text-4xl">{pokemon?.name}</p>
          <img src={pokemon?.sprites.other["official-artwork"].front_default} />

          <div className="flex justify-center items-center gap-1">
            <p className="font-medium">Types:</p>
            <ul className="flex justify-center items-center gap-1">
              {pokemon?.types.map((type) => {
                return <li>{type.type.name}</li>;
              })}
            </ul>
          </div>
          <p className="flex justify-center items-center gap-1">
            <span className="font-medium">Weight:</span> {pokemon?.weight}
          </p>
          <p className="flex justify-center items-center gap-1">
            <span className="font-medium">Height:</span> {pokemon?.height}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
