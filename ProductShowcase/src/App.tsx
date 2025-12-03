import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './contexts/PokemonContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
          </Routes>
        </Layout>
      </Router>
    </PokemonProvider>
  );
}

export default App;