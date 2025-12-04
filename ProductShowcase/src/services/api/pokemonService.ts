import { api } from './pokeApi';
import type { PokemonDetails, PokemonListResponse } from '../../interfaces/Pokemon';

// Tempo de expiração do cache
const LIST_CACHE_TTL = 5 * 60 * 1000; // 5 minutos
const DETAILS_CACHE_TTL = 10 * 60 * 1000; // 10 minutos

// -----------------------------
// LISTA DE POKÉMONS (HOME)
// -----------------------------
export async function getPokemonList(limit = 151) {
  const cacheKey = `pokemon_list_cache_${limit}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const parsed = JSON.parse(cached);

    // ainda está válido?
    if (Date.now() - parsed.timestamp < LIST_CACHE_TTL) {
      return parsed.data;
    }
  }

  // Caso não tenha cache ou tenha expirado
  const res = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}`);

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      timestamp: Date.now(),
      data: res.data,
    })
  );

  return res.data;
}

// -----------------------------
// DETALHES (PÁGINA DO POKÉMON)
// -----------------------------
export async function getPokemonDetails(name: string) {
  const cacheKey = `pokemon_details_${name}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const parsed = JSON.parse(cached);

    if (Date.now() - parsed.timestamp < DETAILS_CACHE_TTL) {
      return parsed.data;
    }
  }

  const res = await api.get<PokemonDetails>(`/pokemon/${name}`);

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      timestamp: Date.now(),
      data: res.data,
    })
  );

  return res.data;
}
