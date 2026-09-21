import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/login/context/AuthContext';
import { useCart } from '../../features/cart/hooks/UseCart';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items } = useCart();

  const cartCount = items.reduce((sum, item) => sum + item.units, 0);

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #F0E8E6' }}>
      <div className="logo-container">
        <Link 
          to="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            color: '#471C26', 
            fontSize: '1.2rem' 
          }}
        >
          <img 
            src="/img/Logo/LogoLight_2.png" 
            alt="Logo Chocoberry" 
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </Link>
      </div>

      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#471C26', fontWeight: '600' }}>Inicio</Link>
        <Link to="/conocenos" style={{ textDecoration: 'none', color: '#471C26', fontWeight: '600' }}>Conócenos</Link>
        <Link to="/catalogo" style={{ textDecoration: 'none', color: '#471C26', fontWeight: '600' }}>Catálogo</Link>
        <Link to="/resenas" style={{ textDecoration: 'none', color: '#471C26', fontWeight: '600' }}>Reseñas</Link>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={() => navigate('/carrito')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#471C26',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
          title="Carrito de Compras"
        >
          <i className="fa-solid fa-cart-shopping" style={{ fontSize: '1.2rem' }} aria-hidden="true" />
          {cartCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                backgroundColor: '#C2435A',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: '700',
                lineHeight: 1,
                minWidth: '16px',
                height: '16px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
              }}
            >
              {cartCount}
            </span>
          )}
        </button>

        {/* Si el usuario existe, muestra un ícono de usuario y su nombre completo; si no, el botón de login */}
        {user ? (
          <Link 
            to="/users" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              textDecoration: 'none', 
              background: '#FFFBFB', 
              border: '1px solid #E8D3D0', 
              padding: '0.4rem 0.8rem', 
              borderRadius: '20px' 
            }}
          >
            <i className="fa-solid fa-user" style={{ color: '#471C26', fontSize: '1rem' }} />
            <span style={{ color: '#471C26', fontWeight: '600', fontSize: '0.9rem' }}>
              {user.name || 'Mi Perfil'}
            </span>
          </Link>
        ) : (
          <Link to="/login" style={{ color: '#471C26', fontSize: '1.2rem', textDecoration: 'none' }} title="Iniciar Sesión">
            <i className="fa-solid fa-user" />
          </Link>
        )}
      </div>
    </header>
  );
}