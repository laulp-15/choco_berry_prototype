// src/features/profile/layout/ProfileLayout.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
// ⚠️ Importación corregida apuntando al contexto centralizado
import { useAuth } from '../../login/context/AuthContext';
import './ProfileLayout.css';

export default function ProfileLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    navigate('/');
  };

  return (
    <div className="profile-layout-container">
      <aside className="profile-sidebar">
        <h3>Mi Cuenta</h3>
        <ul>
          {/* Información Personal (Usando ruta absoluta limpia) */}
          <li>
            <Link to="/users/informacion-personal">
              <i className="fa-solid fa-user-pen" style={{ marginRight: '8px' }} />
              Información Personal
            </Link>
          </li>

          {/* Mis Pedidos (Usando ruta absoluta limpia) */}
          <li>
            <Link to="/users/pedidos">
              <i className="fa-solid fa-box-archive" style={{ marginRight: '8px' }} />
              Mis Pedidos
            </Link>
          </li>

          {/* Botón de Cerrar Sesión */}
          <li>
            <button 
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#C2435A',
                cursor: 'pointer',
                padding: '0.75rem 1rem',
                fontWeight: '600',
                fontSize: '0.95rem',
                textAlign: 'left',
                width: '100%',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fa-solid fa-right-from-bracket" />
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </aside>

      <main className="profile-content">
        {/* Aquí se cargan dinámicamente ProfileWelcome, UserOrders y PersonalInfo */}
        <Outlet />
      </main>
    </div>
  );
}