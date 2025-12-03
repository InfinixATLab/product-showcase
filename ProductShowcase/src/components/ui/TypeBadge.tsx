import { capitalize } from '@/utils/pokemonUtils';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

// Mapa de cores por tipo
const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-stone-500',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-400',
};

const SIZE_CLASSES = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const color = TYPE_COLORS[type] || 'bg-gray-500';
  const sizeClass = SIZE_CLASSES[size];

  return (
    <span className={`${color} text-white rounded-full font-semibold capitalize ${sizeClass}`}>
      {capitalize(type)}
    </span>
  );
}
