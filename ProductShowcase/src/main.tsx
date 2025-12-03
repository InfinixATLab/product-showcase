import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PokemonTeamProvider } from "./context/pokemonteamcontext.tsx"; //para favoritar pokemons
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PokemonTeamProvider>
      <App />
    </PokemonTeamProvider>
  </StrictMode>,
)
