import { useEffect, useState } from "react";
import { api } from "../services/api";
import { PokemonListItem } from "../types/Pokemon";
import { PokemonCard } from "../components/PokemonCard";
import { useFavorites } from "../contexts/FavoritesContext";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // estado do filtro
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function loadPokemons() {
      try {
        const response = await api.get("/pokemon?limit=151");
        setPokemons(response.data.results);
      } finally {
        setLoading(false);
      }
    }
    loadPokemons();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-600 animate-pulse">
        Carregando Pokédex...
      </div>
    );

  // Filtra os Pokémon pelo nome com base no input
  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 drop-shadow text-center flex justify-center items-center gap-2">
        <span className="text-red-500">Poké</span>
        <span className="text-white">dex</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-8 h-8"
        >
          <circle cx="256" cy="256" r="256" fill="#FFffff" />
          <path d="M0 256a256 256 0 0 1 512 0" fill="#FF0000" />
          <circle cx="256" cy="256" r="64" fill="#FFFFFF" />
          <circle cx="256" cy="256" r="32" fill="#000000" />
        </svg>
      </h1>

      {/* Favoritos */}
      <div className="mb-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-white mb-2 text-center">
          Seu Time Pokémon
        </h2>
        {favorites.length === 0 ? (
          <p className="text-white italic text-center">
            Nenhum Pokémon favoritado ainda.
          </p>
        ) : (
          <div className="flex gap-3 flex-wrap justify-center">
            {favorites.map((name) => {
              const pokemon = pokemons.find((p) => p.name === name);
              if (!pokemon) return null;
              const index = pokemon.url.split("/").filter(Boolean).pop();
              const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;
              return (
                <div key={name} className="relative">
                  <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 rounded-lg"
                  />
                  <button
                    onClick={() => toggleFavorite(name)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Campo de busca */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-full max-w-md text-black"
        />
      </div>

      {/* Grade de Pokémon filtrados */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPokemons.map((pokemon) => {
          const index = pokemon.url.split("/").filter(Boolean).pop();
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;
          return (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              image={image}
              isFavorite={isFavorite(pokemon.name)}
              onToggleFavorite={() => toggleFavorite(pokemon.name)}
            />
          );
        })}
      </div>
    </div>
  );
}
