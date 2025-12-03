import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface PokemonContextType {
  favorites: string[];
  addFavorite: (name: string) => void;
  removeFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext deve ser usado dentro de PokemonProvider');
  }
  return context;
};

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pokemon_favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('pokemon_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (name: string) => {
    if (favorites.length >= 6) {
      alert('Você só pode ter até 6 Pokémons no seu time!');
      return;
    }
    
    const updatedFavorites = [...favorites, name];
    setFavorites(updatedFavorites);
  };

  const removeFavorite = (name: string) => {
    const updatedFavorites = favorites.filter(fav => fav !== name);
    setFavorites(updatedFavorites);
  };

  const isFavorite = (name: string) => {
    return favorites.includes(name);
  };

  return (
    <PokemonContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};