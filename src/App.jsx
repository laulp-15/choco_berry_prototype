// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importaciones de páginas y componentes principales:
import LoginPage from './features/login/pages/LoginPage';
// Si tienes un RegisterPage, asegúrate de importarlo aquí:
// import RegisterPage from './features/login/pages/RegisterPage'; 

import HomePage from './features/home/pages/HomePage';
import AboutPage from './features/about/pages/AboutPage';
import ProductCatalog from './features/catalog/pages/ProductCatalog';
import ReviewsPage from './features/reviews/pages/ReviewsPage';

import ProfileRoutes from './routes/ProfileRoutes';
import AdminRoutes from './routes/AdminRoutes'; // 👈 1. Importamos las rutas del administrador
import StoreLayout from './shared/layouts/StoreLayout';

export default function App() {
  return (
    <Routes>
      {/* Ruta de Login (fuera del layout general) */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Ruta de Registro */}
      {/* <Route path="/registro" element={<RegisterPage />} /> */}

      {/* 🍓 2. Rutas del Panel de Administración (con asterisco para que reconozca todas sus subrutas como /admin/productos, /admin/pedidos, etc.) */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Rutas principales envueltas en el StoreLayout (Navbar y diseño global de la tienda) */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio" element={<Navigate to="/" replace />} />
        <Route path="/conocenos" element={<AboutPage />} />
        <Route path="/catalogo" element={<ProductCatalog />} />
        <Route path="/resenas" element={<ReviewsPage />} />
        
        {/* Rutas de la cuenta del usuario/cliente */}
        <Route path="/users/*" element={<ProfileRoutes />} />
      </Route>

      {/* Redirección por defecto para cualquier otra ruta no encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}