import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemonList, type PokemonListItem } from "../services/pokemonService";
import { usePokemon } from "./PokemonContext";

export const Home = () => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { favorites, toggleFavorite, setFavorites } = usePokemon();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);

        let list: typeof pokemons = [];
        const cached = localStorage.getItem("pokemonList");
        if (cached) {
          list = JSON.parse(cached);
          setPokemons(list);
        } else {
          list = await getPokemonList();
          setPokemons(list);
          localStorage.setItem("pokemonList", JSON.stringify(list));
        }

        try {
          const saved = localStorage.getItem("favoritePokemons");
          const currentFavs: typeof favorites = saved ? JSON.parse(saved) : [];
          if (currentFavs && currentFavs.length > 0) {
            const validFavs = currentFavs.filter((f) => list.some((p) => p.name === f.name));
            if (validFavs.length !== currentFavs.length) {
              setFavorites(validFavs);
            }
          }
        } catch (e) {
          console.log("Erro ao reconciliar favoritos", e);
        }
      } catch (err) {
        console.log("Erro ao buscar Pokémon", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  //Tela de Carregando
  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  //Filtro de busca
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  //Função para atualizar a lista
  const handleRefresh = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("pokemonList");

      const list = await getPokemonList();
      setPokemons(list);
      localStorage.setItem("pokemonList", JSON.stringify(list));

      try {
        const saved = localStorage.getItem("favoritePokemons");
        const currentFavs: typeof favorites = saved ? JSON.parse(saved) : [];
        if (currentFavs && currentFavs.length > 0) {
          const validFavs = currentFavs.filter((f) => list.some((p) => p.name === f.name));
          if (validFavs.length !== currentFavs.length) setFavorites(validFavs);
        }
      } catch (e) {
        console.log("Erro ao reconciliar favoritos", e);
      }
    } catch (err) {
      console.log("Erro ao atualizar lista", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Pokedéx</h1>

      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Buscar Pokémon"
          className="border p-2 rounded w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-4 text-center">
        <button
          onClick={handleRefresh}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Atualizar Lista
        </button>
      </div>

      {favorites.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold">Favoritos ({favorites.length}/6):</h2>
          <div className="flex gap-2 flex-wrap mt-1">
            {favorites.map((p) => (
              <span key={p.name} className="px-2 py-1 bg-yellow-200 rounded">
                {p.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredPokemons.map((pokemon) => {
          const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          const isFavorite = favorites.some((p) => p.name === pokemon.name);

          return (
            <div key={pokemon.name} className="relative border p-2 rounded hover:shadow-lg flex flex-col items-center">
              <Link to={`/pokemon/${pokemon.name}`} className="flex flex-col items-center">
                <img src={imageUrl} alt={pokemon.name} className="w-20 h-20" />
                <span className="capitalize mt-2">{pokemon.name}</span>
              </Link>

              <button
                onClick={() => toggleFavorite(pokemon)}
                className={`absolute top-1 right-1 text-lg ${isFavorite ? "text-yellow-400" : "text-gray-300"}`}
                aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                ★
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};