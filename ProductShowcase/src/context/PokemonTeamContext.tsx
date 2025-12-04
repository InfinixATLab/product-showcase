import React, { createContext, useContext, useEffect, useState } from 'react';

interface PokemonTeamContextType{
  team: string[];
  addToTeam: (name: string) => void;
  removeFromTeam:(name:string)=>void
}

const PokemonTeamContext = createContext<PokemonTeamContextType | null>(null)

export function PokemonTeamProvider({ children }: { children: React.ReactNode }) {
  const [team, setTeam] = useState<string[]>([])
  
  //carrega time do localstorage
  useEffect(() => {
    const stored=localStorage.getItem('pokemon_team')
    
    if (stored) {
      setTeam(JSON.parse(stored))
    }
  }, [])
  
  //salva alteração de estado
  useEffect(() => {
    localStorage.setItem('pokemon_team',JSON.stringify(team))
  },[team])
}