//componente visual que exibe o card de cada Pokémon na lista da Home

import { Link } from "react-router-dom";
import type { FC } from "react";

interface PokemonCardProps {
  name: string;
  image: string;
}

export const PokemonCard: FC<PokemonCardProps> = ({ name, image }) => {
  return (
    <Link to={`/pokemon/${name}`} className="card">
      <img src={image} alt={name} className="card-img" />
      <h3 className="card-title">{name}</h3>
    </Link>
  );
};
