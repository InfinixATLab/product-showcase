export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<PokemonListItem>;
}

export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        other: {
            ['official-artwork']: {
                front_default: string;
            };
        };
    };

    types: Array<{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }>;

    height: number;
    weight: number;
}