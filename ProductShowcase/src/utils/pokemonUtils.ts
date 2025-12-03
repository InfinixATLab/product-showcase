export const getPokemonIdFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

export const getImageUrl = (id: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

// Função para deixar maiúscula a primeira letra de uma string
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};