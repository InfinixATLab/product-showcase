import { createContext } from 'react';

export interface FavoritesContextData {
  favorites: string[]; 
  toggleFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextData | null>(null);
