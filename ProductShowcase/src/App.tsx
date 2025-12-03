import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";
import { FavoritesProvider } from "./contexts/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
