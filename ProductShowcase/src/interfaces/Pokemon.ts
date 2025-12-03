export interface PokemonListResponse{
  results: {
    name: string;
    url:string
  }[]
}

export interface PokemonDetails{
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      ["official-artwork"]: {
        front_default: string;
      }
    }
  }
  types: {
    type: { name: string }
  }
  height: number;
  weight: number;
}