import { Link } from 'react-router-dom';
import { Home as HomeIcon, AlertCircle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-red-600 mb-2">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Este Pokémon não existe na Pokédex.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-colors"
        >
          <HomeIcon className="w-5 h-5" />
            Voltar para Pokédex
        </Link>
      </div>
    </div>
  );
}
