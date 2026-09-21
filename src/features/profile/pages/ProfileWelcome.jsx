// src/features/profile/pages/ProfileWelcome.jsx
import React from 'react';
// ⚠️ Importación corregida apuntando al contexto centralizado
import { useAuth } from '../../login/context/AuthContext';

export default function ProfileWelcome() {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h2 style={{ color: '#471C26', marginBottom: '1rem', fontSize: '1.8rem' }}>
        Bienvenida Mariana
      </h2>
      <p style={{ color: '#666', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
        Nos alegra tenerte de vuelta. Desde el menú de la izquierda puedes administrar tu información personal y consultar el estado de tus pedidos.
      </p>
    </div>
  );
}