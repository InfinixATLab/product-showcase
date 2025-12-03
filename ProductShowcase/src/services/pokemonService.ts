import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
}

export const getPokemonList = async (): Promise<PokemonListItem[]> => {
  try {
    const res = await api.get(`/pokemon?limit=151`);
    return res.data.results;
  } catch (err) {
    console.log("Erro ao buscar lista de Pokémon", err);
    return [];
  }
};

export const getPokemonDetail = async (name: string): Promise<PokemonDetail | null> => {
  try {
    const res = await api.get(`/pokemon/${name}`);
    return res.data;
  } catch (err) {
    console.log("Erro ao buscar detalhes do Pokémon", err);
    return null;
  }
};
