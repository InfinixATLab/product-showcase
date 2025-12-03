import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { PokemonDetail } from "../types/pokemons";

const PokemonDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [image, setImage] = useState<string>("");

  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!name) return;

    const fetchPokemon = async () => {
      try {
        const res = await axios.get<PokemonDetail>(`${baseURL}/${name}/`);
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
  }, [baseURL, name]);

  if (!pokemon) return <p>Carregando...</p>;

  return (
    <div className="flex flex-row py-8 px-6 gap-8 items-center min-h-screen justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-[#616161]">
          {pokemon.name.toUpperCase()}
        </h1>
        {image && <img src={image} alt={pokemon.name} className="mx-auto" />}
      </div>
      <div className="flex flex-col items-center max-w-[400px]">
        <div className="flex flex-row gap-3 mb-6">
          {pokemon.types.map((item, index) => (
            <span
              key={`${item.type}-${index}`}
              className="px-8 py-2 bg-[#f1f1f1] rounded-full text-[#363636] flex items-center justify-center font-bold"
            >
              {item.type.name}
            </span>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-lg text-[#3d3d3d]">Height</span>
              <span className="px-12 py-0.5 bg-[#f1f1f1] rounded-md text-[#363636]">
                {pokemon.height}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-lg text-[#3d3d3d]">Weight</span>
              <span className="px-12 py-0.5 bg-[#f1f1f1] rounded-md text-[#363636]">
                {pokemon.weight}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-8 font-bold text-xl">Stats</p>
        <div className="flex flex-row gap-4 mt-4 flex-wrap justify-center">
          {pokemon.stats.map((item) => (
            <div className="flex flex-col items-center gap-3">
              <span className="font-bold text-lg text-[#3d3d3d]">
                {item.stat.name}
              </span>
              <span className="px-8 py-0.5 bg-[#f1f1f1] rounded-md text-[#363636]">
                {item.base_stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
