import { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemonService";
import type { PokemonListResult } from "../types/pokemon";

export const usePokemonList = (limit = 151) => {
  const [data, setData] = useState<PokemonListResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getPokemonList(limit)
      .then((res) => {
        if (mounted) setData(res.results);
      })
      .catch((err) => {
        if (mounted) setError(String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [limit]);

  return { data, loading, error };
};
