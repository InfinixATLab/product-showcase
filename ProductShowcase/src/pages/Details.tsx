import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPokemonDetails } from '../api/pokemonService';
import type { PokemonDetails } from '../types/pokemon';
import { Spinner } from '../components/Spinner';

export const DetailsPage = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    const loadDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchPokemonDetails(name);
        setPokemon(details);
      } catch (error) {
        console.error(`Erro ao buscar detalhes de ${name}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [name, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
        <p className="ml-3 text-lg text-gray-700">Carregando detalhes de {name}...</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl text-red-500">Pokémon não encontrado!</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Voltar para a Lista
        </button>
      </div>
    );
  }

  const heightInMeters = pokemon.height / 10;
  const weightInKgs = pokemon.weight / 10;

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-red-600 hover:text-red-800 font-medium mb-4 flex items-center"
      >
        &larr; Voltar
      </button>

      <div className="text-center">
        <h2 className="text-4xl font-bold capitalize text-gray-800">
          {pokemon.name} <span className="text-gray-500">#{String(pokemon.id).padStart(3, '0')}</span>
        </h2>
        <div className="mt-4 mb-6">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-48 h-48 mx-auto object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center border-t pt-4">
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.slot}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 capitalize"
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Estatísticas Básicas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Altura</p>
            <p className="text-lg font-bold">{heightInMeters.toFixed(1)} m</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Peso</p>
            <p className="text-lg font-bold">{weightInKgs.toFixed(1)} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
};