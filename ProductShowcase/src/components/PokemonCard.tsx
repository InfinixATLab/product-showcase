import { Link } from "react-router-dom";

interface Props {
  name: string;
  image: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function PokemonCard({
  name,
  image,
  isFavorite,
  onToggleFavorite,
}: Props) {
  return (
    <div className="relative">
      {/* Card com link */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center border border-gray-200 hover:-translate-y-1 relative">
        {/* Coração no topo central */}
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-6 h-6 flex items-center justify-center"
          >
            {isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 24 24"
                stroke="red"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            )}
          </button>
        )}

        {/* Clique na imagem/nome leva à página */}
        <Link to={`/pokemon/${name}`} className="flex flex-col items-center">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 mb-2 transition-transform duration-300 hover:scale-110"
          />
          <p className="capitalize font-bold text-base text-gray-500 tracking-wide drop-shadow">
            {name}
          </p>
        </Link>
      </div>
    </div>
  );
}
