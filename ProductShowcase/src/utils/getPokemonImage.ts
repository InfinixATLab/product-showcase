import axios from "axios";
import type { PokemonDetail } from "../types/pokemons";

export const getPokemonImage = async (url: string): Promise<string> => {
  try {
    const res = await axios.get<PokemonDetail>(url);

    return (
      res.data.sprites.other?.["official-artwork"]?.front_default ||
      res.data.sprites.front_default ||
      ""
    );
  } catch (error) {
    console.error("Erro ao buscar a imagem do Pokémon:", error);
    return "";
  }
};
