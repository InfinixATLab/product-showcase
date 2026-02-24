import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { PokemonDetails } from "../pages/PokemonDetails";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home/>}></Route>
        <Route path="/pokemon/:name" element={<PokemonDetails/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
