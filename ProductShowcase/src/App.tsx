import React from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home/Home"
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pokemon/:name" element={<PokemonDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}