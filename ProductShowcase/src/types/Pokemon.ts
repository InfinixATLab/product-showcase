export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

export interface Move {
  move: {
    name: string;
    url: string;
  };
}

export interface TypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Sprites {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface PokemonDetails {
  name: string;
  id: number;
  height: number;
  weight: number;
  base_experience: number;
  abilities: Ability[];
  moves: Move[];
  types: TypeSlot[];
  sprites: Sprites;
}
