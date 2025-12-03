
import axios from 'axios';
import type { PokemonDetails, PokemonListResponse } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({
  baseURL: POKEAPI_BASE_URL,
});

/**
 * Busca a lista inicial de 151 Pokémons.
 * @returns {Promise<PokemonListResponse>}
 */
export const fetchPokemonList = async (): Promise<PokemonListResponse> => {
  const { data } = await api.get<PokemonListResponse>('/pokemon', {
    params: {
      limit: 151,
      offset: 0,
    },
  });
  return data;
};

/**
 * Busca os detalhes de um Pokémon específico pelo nome.
 * @param {string} name 
 * @returns {Promise<PokemonDetails>}
 */

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const { data } = await api.get<PokemonDetails>(`/pokemon/${name}`);
  return data;
};