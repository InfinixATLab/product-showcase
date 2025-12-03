//criando a instancia do axios com a url base da pokeapi para nao precisar ficar repetindo a url toda hora.

import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export default api; //exportando a instancia do axios para ser usada em outros arquivos

// lista de 151 pokémons
export const getPokemonList = async () => {
  const response = await api.get(`/pokemon?limit=151`);
  return response.data; // retorna { results: [...] }
};

// detalhes do pokemon pelo nome
export const getPokemonDetails = async (name: string) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data; // retorna o objeto completo do Pokémon
};

export interface PokemonListItem {
  name: string;
  url: string; // URL para os detalhes do Pokémon
}

export interface PokemonListResponse {
  count: number;
  results: PokemonListItem[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: { other: { "official-artwork": { front_default: string } } };
}
