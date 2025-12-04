import React, { createContext, useContext, useEffect, useState } from 'react';

interface PokemonTeamContextType {
  team: string[];
  addToTeam: (name: string) => void;
  removeFromTeam: (name: string) => void;
  clearTeam: () => void;
}

const PokemonTeamContext = createContext<PokemonTeamContextType | null>(null);

export function PokemonTeamProvider({ children }: { children: React.ReactNode }) {
  const [team, setTeam] = useState<string[]>([]);

  // Carrega time do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('pokemon_team');
    if (stored) {
      setTeam(JSON.parse(stored));
    }
  }, []);

  // Salva sempre que o time mudar
  useEffect(() => {
    localStorage.setItem('pokemon_team', JSON.stringify(team));
  }, [team]);

  function addToTeam(name: string) {
    if (team.includes(name)) return;

    if (team.length >= 6) {
      alert('Seu time já contém 6 Pokémons!');
      return;
    }

    setTeam([...team, name]);
  }

  function removeFromTeam(name: string) {
    setTeam(team.filter((p) => p !== name));
  }

  function clearTeam() {
    setTeam([]);
  }

  return (
    <PokemonTeamContext.Provider
      value={{ team, addToTeam, removeFromTeam, clearTeam }}
    >
      {children}
    </PokemonTeamContext.Provider>
  );
}

export function usePokemonTeam() {
  const ctx = useContext(PokemonTeamContext);
  if (!ctx) {
    throw new Error('usePokemonTeam deve ser usado dentro de PokemonTeamProvider');
  }
  return ctx;
}
