import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F0E8E6',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(71, 28, 38, 0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.8rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* LOGO (Izquierda) */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/img/Logo/LogoLight_2.png"
            alt="ChocoBerry Logo"
            style={{ height: '45px', width: 'auto', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
            }}
          />
          <span
            style={{
              display: 'none',
              fontSize: '1.5rem',
              fontWeight: '800',
              color: '#471C26',
            }}
          >
            <span style={{ color: '#C2435A' }}>Choco</span>Berry
          </span>
        </Link>

        {/* ENLACES DE NAVEGACIÓN (Centro empujado con flex: 1) */}
        <ul
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: '#471C26', fontWeight: '600', fontSize: '0.95rem' }}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" style={{ textDecoration: 'none', color: '#471C26', fontWeight: '600', fontSize: '0.95rem' }}>
              Catálogo
            </Link>
          </li>
          <li>
            <Link to="/reseñas" style={{ textDecoration: 'none', color: '#471C26', fontWeight: '600', fontSize: '0.95rem' }}>
              Reseñas
            </Link>
          </li>
          <li>
            <Link to="/conocenos" style={{ textDecoration: 'none', color: '#471C26', fontWeight: '600', fontSize: '0.95rem' }}>
              Conócenos
            </Link>
          </li>
        </ul>

        {/* ACCIONES Y BOTONES (Derecha) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/carrito')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#471C26',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Carrito de Compras"
          >
            <i className="fa-solid fa-cart-shopping" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
          </button>

          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#471C26',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Iniciar Sesión"
          >
            <i className="fa-solid fa-user" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
          </button>
        </div>

      </div>
    </nav>
  );
}