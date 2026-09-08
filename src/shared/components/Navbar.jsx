import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';
import logoImg from '../../assets/logo.png';
import { ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar-custom">
      <div className="nav-container">
        
        {/* LOGO */}
        <Link to="/" className="nav-logo-link">
          <img src={logoImg} alt="ChocoBerry Logo" className="nav-logo-img" />
        </Link>

        {/* ENLACES DE NAVEGACIÓN */}
        <ul className="nav-links-list">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Catálogo</Link></li>
          <li><Link to="/reseñas">Reseñas</Link></li>
          <li><a href="/#conocenos">Conócenos</a></li>
        </ul>

        {/* ACCIONES / BOTONES */}
        <div className="nav-actions">
          <button className="nav-icon-btn" title="Carrito de Compras">
            <ShoppingCart size={20} />
          </button>
          <button className="nav-icon-btn" title="Perfil de Usuario">
            <User size={20} />
          </button>
        </div>

      </div>
    </nav>
  );
}