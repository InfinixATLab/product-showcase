// "Tipagens typescript para uso geral no projeto com o endpoint `/pokemon`"
export interface PokemonListItem {
  name: string;
  url: string;
}

// PokemonReponse sera responsavel por mostrar uma lista de pokemon que é tipado pelo PokemonListItem
export interface PokemonResponse {
  results: PokemonListItem[];
}

// tipagem para detalhes dos pokemons
export interface PokemonDetails {
  name: string;
  height: string;
  weight: string;
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
