//componente visual que exibe o card de cada Pokémon na lista da Home

import { Link } from "react-router-dom";
import { usePokemonTeam } from "../../context/pokemonteamcontext"; //favoritar pokemons
import type { FC } from "react";
import heartOutline from "../../assets/icons/heart-outline.png";//favoritar pokemons
import heartFilled from "../../assets/icons/heart-filled.png";

interface PokemonCardProps {
  name: string;
  image: string;
}

export const PokemonCard: FC<PokemonCardProps> = ({ name, image }) => {
  const { team, toggleFavorite } = usePokemonTeam();

  const isFavorite = team.includes(name);

  return (
    <div className="card-wrapper">

      <button // FAVORITAR POKEMONS
        className="favorite-button"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(name);
        }}
      >
        <img
          src={isFavorite ? heartFilled : heartOutline}
          alt="favorite icon"
          className={`heart-icon ${isFavorite ? "filled" : ""}`}
        />
      </button>

      <Link to={`/pokemon/${name}`} className="card">
        <img src={image} alt={name} className="card-img" />
        <h3 className="card-title">{name}</h3>
      </Link>
    </div>
  );
};
