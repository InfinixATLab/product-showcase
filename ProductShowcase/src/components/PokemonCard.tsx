import React from "react";
import { getPokemonImage } from "../utils/getPokemonImage";

interface Props {
  name: string;
  image: string;
}

const PokemonCard = ({ name, image }: Props) => {
  const [imageUrl, setImageUrl] = React.useState("");

  React.useEffect(() => {
    const fetchImage = async () => {
      const imageResponse = await getPokemonImage(image);
      setImageUrl(imageResponse);
    };

    fetchImage();
  }, [image]);

  return (
    <div className="flex flex-col justify-center gap-4 min-w-[250px] border border-[#9c9c9c] rounded-md cursor-pointer min-h-[300px] transition-all ease-in delay-75  hover:scale-105">
      {imageUrl && (
        <img src={imageUrl} alt={name} className="w-full h-56 object-contain" />
      )}
      <p className="text-center text-lg font-semibold text-[#616161]">
        {name.toUpperCase()}
      </p>
    </div>
  );
};

export default PokemonCard;
