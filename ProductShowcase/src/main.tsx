import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PokemonTeamProvider } from './context/PokemonTeamContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PokemonTeamProvider>
      <App/>
    </PokemonTeamProvider>
  </StrictMode>,
)
