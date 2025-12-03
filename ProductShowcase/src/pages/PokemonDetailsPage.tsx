import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { PokemonDetail } from "../types/pokemons";

const PokemonDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (!name) return;

    const fetchPokemon = async () => {
      try {
        const res = await axios.get<PokemonDetail>(
          `https://pokeapi.co/api/v2/pokemon/${name}/`
        );
        setPokemon(res.data);
        setImage(
          res.data.sprites.other?.["official-artwork"]?.front_default ||
            res.data.sprites.front_default ||
            ""
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, [name]);

  if (!pokemon) return <p>Carregando...</p>;

  return (
    <div className="max-w-md mx-auto mt-8 text-center">
      <h1 className="text-2xl font-bold mb-4">{pokemon.name}</h1>
      {image && <img src={image} alt={pokemon.name} className="mx-auto mb-4" />}
      <pre className="text-left bg-gray-100 p-4 rounded">
        {JSON.stringify(pokemon, null, 2)}
      </pre>
    </div>
  );
};

export default PokemonDetailPage;
