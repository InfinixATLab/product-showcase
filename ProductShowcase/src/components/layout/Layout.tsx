import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <div>
            <Link to="/">
              <h1>Pokédex</h1>
            </Link>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer>
        <p>por Tiago de Noronha Leopoldo</p>
      </footer>
    </div>
  );
};

export default Layout;