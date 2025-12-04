import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { PokemonDetails as PokemonDetailsType } from '../../interfaces/Pokemon';
import { getPokemonDetails } from '../../services/api/pokemonService';

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>()
  
  const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchPokemon() {
      try {
        if (!name) {
          return
        }

        const data = await getPokemonDetails(name)
        setPokemon(data)

      } catch (error) {
        console.error("Erro ao carregar detalhes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [name])
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Carregando detalhes...
      </div>
    );
  }

  
  if (!pokemon) {
    return <div className="p-5">Pokémon não encontrado.</div>;
  }

  const image = pokemon.sprites.other['official-artwork'].front_default
  
  return (
    <div className="p-5 max-w-xl mx-auto text-gray-900">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        ← Voltar
      </Link>

      <div className="bg-white shadow rounded p-5 text-center">
        <img src={image} alt={pokemon.name} className="w-48 mx-auto" />

        <h1 className="text-3xl font-bold capitalize mt-4">{pokemon.name}</h1>

        <div className="mt-4">
          <h2 className="font-semibold mb-1">Tipos</h2>
          <div className="flex justify-center gap-2">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-3 py-1 bg-gray-200 rounded capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  );
}