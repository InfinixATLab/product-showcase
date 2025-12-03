import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { Home } from '@/pages/Home';
import { PokemonDetailPage } from '@/pages/PokemonDetail';
import { FavoritesPage } from '@/pages/Favorites';
import { NotFound } from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
