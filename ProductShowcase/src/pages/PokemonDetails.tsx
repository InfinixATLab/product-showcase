import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { PokemonDetails as PokemonDetailsType } from "../types/Pokemon";

export default function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null);
  const [curiosidade, setCuriosidade] = useState<string>("");
  const [regiao, setRegiao] = useState<string>("");

  useEffect(() => {
    async function loadDetails() {
      try {
        // Dados básicos do Pokémon
        const response = await api.get(`/pokemon/${name}`);
        setPokemon(response.data);

        // Dados da espécie
        const speciesResponse = await api.get(`/pokemon-species/${name}`);

        // Curiosidade
        const flavorEntry = speciesResponse.data.flavor_text_entries.find(
          (entry: any) => entry.language.name === "en"
        );
        const flavorText =
          flavorEntry?.flavor_text.replace(/\n|\f/g, " ") ??
          "Cada Pokémon possui habilidades únicas que o tornam especial no mundo Pokémon.";
        setCuriosidade(flavorText);

        // Região / Geração
        const generationName = speciesResponse.data.generation.name; // ex: generation-i
        const regionMap: Record<string, string> = {
          "generation-i": "Kanto",
          "generation-ii": "Johto",
          "generation-iii": "Hoenn",
          "generation-iv": "Sinnoh",
          "generation-v": "Unova",
          "generation-vi": "Kalos",
          "generation-vii": "Alola",
          "generation-viii": "Galar",
        };
        setRegiao(regionMap[generationName] || generationName);
      } catch (error) {
        console.error("Erro ao carregar detalhes do Pokémon:", error);
      }
    }
    loadDetails();
  }, [name]);

  if (!pokemon)
    return (
      <p className="text-center mt-20 text-lg text-gray-500 animate-pulse">
        Carregando...
      </p>
    );

  const image = pokemon.sprites.other["official-artwork"].front_default;

  const typeColors: Record<string, string> = {
    fire: "bg-red-100 text-red-800",
    water: "bg-blue-100 text-blue-800",
    grass: "bg-green-100 text-green-800",
    electric: "bg-yellow-100 text-yellow-800",
    bug: "bg-lime-100 text-lime-800",
    poison: "bg-purple-100 text-purple-700",
    fairy: "bg-pink-100 text-pink-700",
    normal: "bg-gray-100 text-gray-700",
    flying: "bg-indigo-100 text-indigo-700",
    psychic: "bg-pink-50 text-pink-800",
    dragon: "bg-purple-50 text-purple-900",
    ice: "bg-cyan-100 text-cyan-800",
    fighting: "bg-red-50 text-red-800",
    ground: "bg-yellow-50 text-yellow-900",
    rock: "bg-gray-200 text-gray-800",
    ghost: "bg-indigo-50 text-indigo-900",
    steel: "bg-gray-100 text-gray-900",
    dark: "bg-gray-300 text-gray-900",
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/" className="flex items-center font-medium">
        <span className="text-red-600 text-lg">←</span>
        <span className="text-red-600">Vol</span>
        <span className="text-white">tar</span>
      </Link>

      <div className="bg-white shadow-lg p-5 rounded-xl mt-4 border border-gray-200">
        <h1 className="text-3xl capitalize font-bold text-center mb-3 text-gray-900">
          {pokemon.name}
        </h1>
        <img
          src={image}
          alt={pokemon.name}
          className="w-52 mx-auto my-3 drop-shadow-lg"
        />

        <div className="text-center space-y-1 text-gray-900 text-sm">
          <p>
            <strong>Altura:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Peso:</strong> {pokemon.weight / 10} kg
          </p>
          <p>
            <strong>Experiência Base:</strong> {pokemon.base_experience}
          </p>
          <p>
            <strong>Região:</strong> {regiao}
          </p>
        </div>

        {/* Tipos */}
        <div className="mt-5 p-3 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Tipos</h2>
          <div className="flex gap-2 flex-wrap justify-center">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className={`px-3 py-1 rounded-full capitalize shadow ${
                  typeColors[t.type.name]
                }`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Habilidades */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Habilidades
          </h2>
          <div className="flex gap-2 flex-wrap justify-center">
            {pokemon.abilities.map((a) => (
              <span className="px-2 py-1 bg-indigo-50 text-indigo-900 rounded-full text-sm shadow-sm capitalize">
                {a.ability.name}
              </span>
            ))}
          </div>
        </div>

        {/* Movimentos */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Movimentos Principais
          </h2>
          <ul className="list-disc list-inside text-gray-900 space-y-0.5 max-h-32 overflow-y-auto text-sm">
            {pokemon.moves.slice(0, 5).map((m) => (
              <li key={m.move.name} className="capitalize">
                {m.move.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Curiosidades */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Curiosidades
          </h2>
          <p className="text-gray-800 italic text-center text-sm">
            {curiosidade}
          </p>
        </div>
      </div>
    </div>
  );
}
