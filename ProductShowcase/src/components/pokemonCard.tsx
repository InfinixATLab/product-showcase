import React from "react";
import { Link } from "react-router-dom";

type Props = { name:string; imageUrl?:string };

export const PokemonCard: React.FC<Props> = ({ name, imageUrl }) => (
  <Link to={`/pokemon/${name}`} className="block p-3 rounded-lg hover:shadow">
    <div className="aspect-square">
      {imageUrl ? <img src={imageUrl} alt={name} className="object-contain w-full h-full" /> : <div className="flex items-center justify-center h-full">Sem imagem</div>}
    </div>
    <p className="mt-2 text-center capitalize">{name}</p>
  </Link>
);
