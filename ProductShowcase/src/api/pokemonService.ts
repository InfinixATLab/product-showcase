import axios from 'axios';
import type { PokemonDetails, PokemonListResult, PokemonListResponse } from '@/types/pokemon';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

const CACHE: Map<string, PokemonListResult[] | PokemonDetails> = new Map();

export const getPokemonList = async (limit = 151): Promise<PokemonListResult[]> => {
  const cacheKey = `list-${limit}`;
  
  const cached = CACHE.get(cacheKey);
  if (cached && Array.isArray(cached)) {
    console.log('Cache hit:', cacheKey);
    return cached;
  }

  try {
    const { data } = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}`);
    
    // Salvar no Cache
    CACHE.set(cacheKey, data.results);
    return data.results;
  } catch (error) {
    console.error('Erro ao buscar lista de Pokémon:', error);
    throw error;
  }
};

export const getPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const cached = CACHE.get(name);
  if (cached && 'id' in cached) {
    console.log('Cache hit:', name);
    return cached as PokemonDetails;
  }

  try {
    const { data } = await api.get<PokemonDetails>(`/pokemon/${name}`);
    CACHE.set(name, data);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do Pokémon ${name}:`, error);
    throw error;
  }
};

export const clearCache = (): void => {
  CACHE.clear();
  console.log('Cache limpo');
};