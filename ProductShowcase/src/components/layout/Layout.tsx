import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">

      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-500 to-blue-600 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform">
                Pokédex
              </h1>
            </Link>

          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>

      <footer className="mt-auto bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base">
                <span className="font-semibold">Pokédex Online</span> • Desafio Front-end
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Utilizando a <a href="https://pokeapi.co/" className="text-yellow-400 hover:underline">PokeAPI</a> • Primeiros 151 Pokémon
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm">
                Desenvolvido por <span className="font-bold text-yellow-300">Tiago de Noronha Leopoldo</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;