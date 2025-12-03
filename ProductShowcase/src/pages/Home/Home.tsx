import React, { useEffect, useState } from 'react';
import { api } from '../../services/api/pokeApi';
import { PokemonListResponse } from '../../interfaces/Pokemon';
import { getPokemonList } from '../../services/api/pokemonService';

export function Home() {
    const [data, setData] = useState<PokemonListResponse | null>(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getPokemonList()
                setData(response)
            }
            catch (error) {
                console.error("Erro ao carregar Pokemons:", error)
            }
            finally {
                setLoading(false)
            }
        }
    })
}