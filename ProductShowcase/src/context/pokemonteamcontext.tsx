import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface PokemonTeamContextType {
  team: string[];
  toggleFavorite: (name: string) => void;
}

const PokemonTeamContext = createContext<PokemonTeamContextType | undefined>(undefined);

export function PokemonTeamProvider({ children }: { children: ReactNode }) {
  const [team, setTeam] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("pokemon-team");
    if (saved) {
      setTeam(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemon-team", JSON.stringify(team));
  }, [team]);

  function toggleFavorite(name: string) {
    setTeam((prev) => {
      if (prev.includes(name)) {
        return prev.filter((p) => p !== name);
      }

      if (prev.length >= 6) {
        alert("Seu time já tem 6 Pokémon!");
        return prev;
      }

      return [...prev, name];
    });
  }

  return (
    <PokemonTeamContext.Provider value={{ team, toggleFavorite }}>
      {children}
    </PokemonTeamContext.Provider>
  );
}

export function usePokemonTeam() {
  const ctx = useContext(PokemonTeamContext);
  if (!ctx) throw new Error("usePokemonTeam must be inside PokemonTeamProvider");
  return ctx;
}
