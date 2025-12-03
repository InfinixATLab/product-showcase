export interface PokemonListResult {
  name: string;
  url: string;
}

// Interface para a resposta da lista
export interface PokemonListResponse {
  count: number;
  next: string | null;
  results: PokemonListResult[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number; // Decímetros (dm)
  weight: number; // Hectogramas (hg)
  types: Array<{
    slot: number;
    type: {
      name: string; // ex: 'fire', 'water'
      url: string;
    };
  }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}