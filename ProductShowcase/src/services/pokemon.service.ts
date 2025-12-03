import type { PokemonListResponse, PokemonDetails } from "../types/pokemon";
import { api } from "./api";

export const getPokemons = async (): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(`/pokemon?limit=151`);
  return response.data;
};

export const getPokemonByNameOrId = async (
  nameOrId: string | number
): Promise<PokemonDetails> => {
  const response = await api.get<PokemonDetails>(`/pokemon/${nameOrId}`);
  return response.data;
};
