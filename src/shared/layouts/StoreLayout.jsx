// src/shared/layouts/StoreLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Ajusta la ruta si es necesario
import Footer from '../components/Footer'; // Ajusta la ruta si es necesario

export default function StoreLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar fijo arriba */}
      <Navbar />

      {/* Contenido dinámico de cada vista (Catálogo, Inicio, Reseñas, etc.) */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer fijo abajo para que aparezca en todas las vistas */}
      <Footer />
    </div>
  );
}