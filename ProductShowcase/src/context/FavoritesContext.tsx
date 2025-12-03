/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { PokemonData } from '../types/pokemon';

interface FavoritesContextType {
  favorites: PokemonData[];
  isFavorite: (name: string) => boolean;
  toggleFavorite: (pokemon: PokemonData) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<PokemonData[]>(() => {
    try {
      const stored = localStorage.getItem('pokemonTime');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return []; 
    }
  });

  const isFavorite = useCallback((name: string) => {
    return favorites.some(fav => fav.name === name);
  }, [favorites]);

  const toggleFavorite = useCallback((pokemon: PokemonData) => {
    setFavorites(prevFavorites => {
      let newFavorites: PokemonData[];
      const isAlreadyFavorite = prevFavorites.some(fav => fav.name === pokemon.name);

      if (isAlreadyFavorite) {
        newFavorites = prevFavorites.filter(fav => fav.name !== pokemon.name);
      } else if (prevFavorites.length < 6) {
        newFavorites = [...prevFavorites, pokemon];
      } else {
        alert("Seu Time Pokémon está completo! (Máximo de 6). Remova um para adicionar este.");
        newFavorites = prevFavorites;
      }

      localStorage.setItem('pokemonTime', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []); 

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};