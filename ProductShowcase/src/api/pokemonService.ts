import axios from 'axios';
import type { PokemonDetails, PokemonListResponse } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const CACHE_PREFIX = 'pokemon_details_';

const api = axios.create({
  baseURL: POKEAPI_BASE_URL,
});

export const fetchPokemonList = async (): Promise<PokemonListResponse> => {
  const { data } = await api.get<PokemonListResponse>('/pokemon', {
    params: {
      limit: 151,
      offset: 0,
    },
  });
  return data;
};

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const cacheKey = `${CACHE_PREFIX}${name}`;

  try {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      console.log(`[Cache] Retornando detalhes de ${name} do cache.`);
      return JSON.parse(cachedData) as PokemonDetails;
    }
  } catch (e) {
    console.error('Erro ao ler cache:', e);
  }

  console.log(`[API] Buscando detalhes de ${name} via API.`);
  const { data } = await api.get<PokemonDetails>(`/pokemon/${name}`);

  try {
    localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch (e) {
    console.error('Erro ao salvar no cache:', e);
  }

  return data;
};

export const clearPokemonCache = () => {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
  localStorage.removeItem('pokemonTime');
  console.log('[Cache] Cache de detalhes e Time Pokémon limpos.');
};