import React from 'react';
import { Link } from 'react-router-dom';

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const id = url.split('/').filter(Boolean).pop()
  const image=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${name}`}>
      <div className="bg-white shadow rounded p-3 cursor-pointer hover:scale-105 transition">
        <img src={image} alt={name} className='w-24 h-24 mx-auto' />
        <p className="text-center capitalize mt-2 font-semibold"> {name} </p>
      </div>
    </Link>
  )
}