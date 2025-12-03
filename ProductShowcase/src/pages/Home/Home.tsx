import React from 'react';
import { api } from '../../services/api/pokeApi';
import { PokemonListResponse } from '../../interfaces/Pokemon';

export async function getPokemonList(limit = 151) {
    const res = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}`)
    return res.data
}

// const Home: React.FC = () => {
//     return (
//         <div>
//             <h1>Bem-vindo ao Pokédex!</h1>
//             <p>Aqui você pode encontrar informações sobre seus Pokémon favoritos.</p>
//             {/* Aqui você pode adicionar a lógica para renderizar a lista de Pokémon */}
//         </div>
//     );
// };

// export default Home;