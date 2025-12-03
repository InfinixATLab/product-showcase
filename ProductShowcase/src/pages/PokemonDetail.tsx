import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetail } from "../services/pokemonService";
import type { PokemonDetail as PokemonDetailType } from "../services/pokemonService";

export const PokemonDetail: React.FC = () => {
    const { name } = useParams<{ name?: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            if (!name) return;

            try {
                setLoading(true);
                const data = await getPokemonDetail(name);
                setPokemon(data);
            } catch (err) {
                console.log("Erro ao buscar detalhes", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [name]);

    if (loading) {
        return <div className="text-center mt-10">Carregando...</div>;
    }

    if (!pokemon) {
        return <div className="text-center mt-10">Pokémon não encontrado.</div>;
    }

    return (
        <div className="p-4 max-w-md mx-auto border rounded shadow mt-6">
            <h1 className="text-2xl font-bold capitalize text-center">{pokemon.name}</h1>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-32 h-32 mx-auto mt-4"
            />

            <div className="mt-4">
                <p>
                    <strong>Tipos:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}
                </p>
                <p>
                    <strong>Altura:</strong> {pokemon.height}
                </p>
                <p>
                    <strong>Peso:</strong> {pokemon.weight}
                </p>
            </div>

            <Link to="/" className="block mt-6 text-center text-blue-500 hover:underline">
                Voltar para Home
            </Link>
        </div>
    );
};