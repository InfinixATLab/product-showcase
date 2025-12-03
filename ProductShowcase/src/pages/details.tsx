import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetails } from "../api/pokemonService";
import type { PokemonDetails } from "../types/pokemon";

export const Details: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [data, setData] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    getPokemonDetails(name)
      .then(res => setData(res))
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <div className="p-4">Carregando...</div>;
  if (error) return <div className="p-4">Erro: {error}</div>;
  if (!data) return <div className="p-4">Pokémon não encontrado</div>;

  const image = data.sprites?.other?.["official-artwork"]?.front_default;

  return (
    <div className="p-4">
      <h1 className="text-2xl capitalize">{data.name}</h1>
      {image && <img src={image} alt={data.name} className="w-64 h-64 object-contain" />}
      <div className="mt-4">
        <p>Tipos: {data.types.map(t => t.type.name).join(", ")}</p>
        <p>Altura: {data.height / 10} m</p>
        <p>Peso: {data.weight / 10} kg</p>
      </div>
    </div>
  );
};
