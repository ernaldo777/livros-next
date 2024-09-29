import React from 'react';
import Link from 'next/link';

// Definindo o componente Menu
export const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/LivroLista">
                Catálogo de Livros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/LivroDados">
                Adicionar Livro
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
