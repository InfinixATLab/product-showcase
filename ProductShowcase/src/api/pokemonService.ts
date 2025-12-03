import { api } from "./axiosInstance";
import type { PokemonListResponse, PokemonDetails } from "../types/pokemon";

export const getPokemonList = async (limit = 151) => {
  const { data } = await api.get<PokemonListResponse>(
    `/pokemon?limit=${limit}`
  );
  return data;
};

export const getPokemonDetails = async (nameOrId: string | number) => {
  const { data } = await api.get<PokemonDetails>(`/pokemon/${nameOrId}`);
  return data;
};
