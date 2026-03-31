import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { type PokemonListItem } from "../services/pokemonService";

interface PokemonContextType {
  favorites: PokemonListItem[];
  toggleFavorite: (pokemon: PokemonListItem) => void;
  setFavorites: (favorites: PokemonListItem[]) => void;
}

const PokemonContext = createContext<PokemonContextType>({
  favorites: [],
  toggleFavorite: () => {},
  setFavorites: () => {},
});

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favoritePokemons");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (pokemon: PokemonListItem) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.name === pokemon.name);
      let updated: PokemonListItem[];
      if (exists) {
        updated = prev.filter((p) => p.name !== pokemon.name);
      } else {
        if (prev.length >= 6) return prev;
        updated = [...prev, pokemon];
      }
      localStorage.setItem("favoritePokemons", JSON.stringify(updated));
      return updated;
    });
  };

  const setFavoritesFromList = (next: PokemonListItem[]) => {
    setFavorites(next);
    try {
      localStorage.setItem("favoritePokemons", JSON.stringify(next));
    } catch (e) {
      console.log("Erro ao salvar favoritos", e);
    }
  };

  return (
    <PokemonContext.Provider value={{ favorites, toggleFavorite, setFavorites: setFavoritesFromList }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);