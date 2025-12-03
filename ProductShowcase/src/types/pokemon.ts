export interface PokemonListResult {
  name: string;
  url: string;
}
export interface PokemonListResponse {
  results: PokemonListResult[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}
export interface PokemonSprites {
  other?: { "official-artwork"?: { front_default?: string } };
}
export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: PokemonSprites;
}
