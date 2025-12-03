import axios from "axios";
import type { PokemonList } from "../interfaces/Pokemon";

export async function getAllPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
  const response = await axios.get<PokemonList>(url);
  return response.data;
}

async function fetchPokemon<T>(pokemon: string) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const response = await axios.get<T>(url);
  return response.data;
}
