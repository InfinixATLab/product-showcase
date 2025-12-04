import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import PokemonDetails from "./pages/PokemonDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pokemon/:name" element={<PokemonDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
