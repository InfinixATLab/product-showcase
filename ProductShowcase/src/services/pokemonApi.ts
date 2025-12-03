import axios from 'axios';
import type { PokemonListResponse, Pokemon } from '../types/pokemon';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
});

export const pokemonApi = {
  getPokemonList: async (limit: number = 151): Promise<PokemonListResponse> => {
    const response = await api.get(`pokemon?limit=${limit}`);
    return response.data;
  },

  getPokemonByName: async (name: string): Promise<Pokemon> => {
    const response = await api.get(`pokemon/${name}`);
    return response.data;
  }
};

export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const extractPokemonId = (url: string): number => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? parseInt(matches[1], 10) : 1;
};
