import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function StoreLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Barra de navegación superior */}
      <Navbar />

      {/* Contenido dinámico de las páginas públicas (Home, Catálogo, Reseñas, etc.) */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}