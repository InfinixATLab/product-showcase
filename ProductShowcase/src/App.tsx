import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PokemonDetail } from "./pages/PokemonDetail";
import { PokemonProvider } from "./pages/PokemonContext";

function App() {
  return (
    <Router>
      <PokemonProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </PokemonProvider>
    </Router>
  );
}

export default App