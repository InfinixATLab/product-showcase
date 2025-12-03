import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import { PokemonDetails } from "../pages/PokemonDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/pokemon/:name',
        element: <PokemonDetails />,
    },
])