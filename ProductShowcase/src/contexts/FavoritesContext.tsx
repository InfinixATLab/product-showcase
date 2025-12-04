// FavoritesContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  const toggleFavorite = (name: string) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((f) => f !== name));
    } else {
      if (favorites.length >= 6) {
        alert("O limite de Pokémon favoritos é 6!");
        return;
      }
      setFavorites([...favorites, name]);
    }
  };

  const isFavorite = (name: string) => favorites.includes(name);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites deve ser usado dentro de um FavoritesProvider"
    );
  }
  return context;
}
