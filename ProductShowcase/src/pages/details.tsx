import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetails } from "../api/api";
import type { PokemonDetails } from "../api/api";

export function Details() {
  const { name } = useParams() as { name: string };
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    async function fetchPokemon() {
      setLoading(true);
      try {
        const data = await getPokemonDetails(name);
        setPokemon(data);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [name]);

  if (loading) return <p>Carregando...</p>;
  if (!pokemon) return <p>Pokémon não encontrado</p>;

  return (
    <div className="details-container">

      <Link to="/" className="details-back">
        ← Voltar
      </Link>

      <h1 className="details-title">{pokemon.name}</h1>

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="details-image"
      />

      <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
      <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>

      <div className="details-types">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={`type-badge type-${t.type.name}`}
          >
            {t.type.name}
          </span>
        ))}
      </div>

    </div>
  );
}
