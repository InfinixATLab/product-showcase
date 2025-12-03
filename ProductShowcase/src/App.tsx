import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetailPage from "./pages/PokemonDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
