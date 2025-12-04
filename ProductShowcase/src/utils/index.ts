export const formatPokemonName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const calculatePokemonStrength = (types: string[]): number => {
    return types.length * 10; // Exemplo simples de cálculo de força
};