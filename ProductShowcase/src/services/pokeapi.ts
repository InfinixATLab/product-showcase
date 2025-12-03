import axios from "axios";
import type { PokemonList, Pokemon, PokemonImage } from "../interfaces/pokemon";

export async function getAllPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";
  const response = await axios.get<PokemonList>(url);

  const pokemons: Pokemon[] = [];

  for (const pokemon of response.data.results) {
    const pokemonImage = await getPokemonImage(pokemon.name);
    pokemons.push({
      name: pokemon.name,
      image: pokemonImage.sprites.front_default,
    });
  }

  return pokemons;
}

async function fetchPokemon<T>(pokemon: string) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const response = await axios.get<T>(url);
  return response.data;
}

async function getPokemonImage(pokemon: string) {
  return await fetchPokemon<PokemonImage>(pokemon);
}
