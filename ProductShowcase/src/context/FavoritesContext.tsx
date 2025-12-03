import { useEffect, useState, type ReactNode } from 'react';
import { FavoritesContext, type FavoritesContextData } from './types';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Inicializa o estado lendo do LocalStorage (Persistência)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('pokedex-favorites');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        localStorage.removeItem('pokedex-favorites');
        return [];
      }
    }
    return [];
  });

  // Sincroniza com o localStorage quando favorites muda
  useEffect(() => {
    localStorage.setItem('pokedex-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name: string) => {
    setFavorites(prevFavorites => {
      let newFavorites;
      if (prevFavorites.includes(name)) {
        // Remover
        newFavorites = prevFavorites.filter((fav) => fav !== name);
      } else {
        // Adiciona(com limite de 6)
        if (prevFavorites.length >= 6) {
          alert("Seu Time Pokémon só pode ter 6 membros!");
          return prevFavorites; // Não altera o estado
        }
        newFavorites = [...prevFavorites, name];
      }
      
      return newFavorites;
    });
  };

  const isFavorite = (name: string) => favorites.includes(name);

  const value: FavoritesContextData = { favorites, toggleFavorite, isFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
