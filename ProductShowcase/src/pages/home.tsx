import { useEffect, useState } from "react";
import { getPokemonList, getPokemonDetails } from "../api/api";
import type { PokemonListItem, PokemonDetails } from "../api/api";
import { PokemonCard } from "../components/cards/pokemoncard";
import { usePokemonTeam } from "../context/pokemonteamcontext";

interface PokemonCardData {
  name: string;
  image: string;
}

export function Home() {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

    // contexto
  const { team } = usePokemonTeam(); 

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

  // extrair somente os pokémons favoritos da lista completa
  const favoritePokemons = pokemons.filter((p) => team.includes(p.name));

  return (
    <div className="pokedex-container">

      <header className="pokedex-header">
        <h1 className="pokedex-title">Pokédex</h1>
      </header>

            {/* Barra de Busca */}
      <section className="search-bar">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* favoritos */}
      {team.length > 0 && (
        <section className="team-section">
          <h2 className="team-title">Pokémons Favoritos</h2>

          <div className="pokemon-list">
            {favoritePokemons.map((p) => (
              <PokemonCard key={p.name} name={p.name} image={p.image} />
            ))}
          </div>
        </section>
      )}


      {/* Lista completa */}
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
