import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemonList, type PokemonListItem } from "../services/pokemonService";

export const Home = () => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const list = await getPokemonList();
        setPokemons(list);
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredPokemons.map((pokemon) => {
          const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <Link
              to={`/pokemon/${pokemon.name}`}
              key={pokemon.name}
              className="border p-2 rounded hover:shadow-lg flex flex-col items-center"
            >
              <img src={imageUrl} alt={pokemon.name} className="w-20 h-20" />
              <span className="capitalize mt-2">{pokemon.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};