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

export interface PokemonDetails {
  name: string;
  weight: number;
  height: number;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}
