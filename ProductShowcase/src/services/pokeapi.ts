import axios from "axios";
import type { PokemonList } from "../interfaces/Pokemon";

export async function getAllPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
  const response = await axios.get<PokemonList>(url);
  return response.data;
}
