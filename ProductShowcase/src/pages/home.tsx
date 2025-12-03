import { useEffect, useState } from "react";
import { getPokemonList, getPokemonDetails } from "../api/api";
import type { PokemonListItem, PokemonDetails } from "../api/api";
import { PokemonCard } from "../components/cards/pokemoncard";

interface PokemonCardData {
  name: string;
  image: string;
}

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPokemons() {
      setLoading(true);

      try {
        const listData = await getPokemonList();

        const pokemonDetailsPromises = listData.results.map(
          async (p: PokemonListItem) => {
            const details: PokemonDetails = await getPokemonDetails(p.name);
            return {
              name: p.name,
              image: details.sprites.other["official-artwork"].front_default,
            };
          }
        );

        const results = await Promise.all(pokemonDetailsPromises);
        setPokemons(results);
      } catch (error) {
        console.error("Erro ao buscar Pokémons:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pokedex-container">

      <header className="pokedex-header">
        <h1 className="pokedex-title">Pokédex</h1>
      </header>

      <section className="search-bar">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section>
        {loading ? (
          <p>Carregando...</p>
        ) : filteredPokemons.length === 0 ? (
          <p>Nenhum Pokémon encontrado</p>
        ) : (
          <div className="pokemon-list">
            {filteredPokemons.map((p) => (
              <PokemonCard key={p.name} name={p.name} image={p.image} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
