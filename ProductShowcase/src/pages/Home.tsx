import { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getAllPokemons } from "../services/pokeapi";
import type { Pokemon } from "../interfaces/pokemon";
import Loading from "../components/Loading";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemons() {
      const data = await getAllPokemons();
      setPokemons(data);
      setLoading(false);
    }
    loadPokemons();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Header />
      <div className="grow w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-6 py-8 px-8">
        {loading ? (
          <Loading />
        ) : (
          pokemons?.map((pokemon, index) => {
            const isLast = index === pokemons.length - 1;
            return (
              <Card
                image={pokemon.image}
                name={pokemon.name}
                key={pokemon.name}
                isLast={isLast}
              />
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
}
