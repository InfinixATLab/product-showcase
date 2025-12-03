export interface PokemonList {
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonImage {
  sprites: {
    front_default: string;
  };
}

export interface Pokemon {
  name: string;
  image: string;
}
