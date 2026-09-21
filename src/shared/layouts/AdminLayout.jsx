// src/shared/layouts/AdminLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./AdminLayout.css";

// Menú de navegación principal del panel de administración
const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: "fa-chart-line", end: true },
  { to: "/admin/roles", label: "Roles", icon: "fa-shield-halved" },
  { to: "/admin/usuarios", label: "Usuarios", icon: "fa-users" },
  { to: "/admin/categorias", label: "Categorías", icon: "fa-tag" },
  { to: "/admin/productos", label: "Productos", icon: "fa-store" },
  { to: "/admin/clientes", label: "Clientes", icon: "fa-user-group" },
  { to: "/admin/resenas", label: "Reseñas", icon: "fa-star" },
  { to: "/admin/pedidos", label: "Pedidos", icon: "fa-box" },
  { to: "/admin/ventas", label: "Ventas", icon: "fa-credit-card" },
  { to: "/admin/entregas", label: "Entregas", icon: "fa-truck-fast" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Barra lateral de navegación */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-brand">
          <img 
            src="/img/Logo/CHOCOBERRY.png" 
            alt="ChocoBerry" 
            className="admin-brand-logo" 
          />
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 
                `admin-nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <i className={`fa-solid ${item.icon}`} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-profile">
            <i className="fa-solid fa-circle-user" />
            <div className="admin-profile-info">
              {/* TODO: reemplazar por el usuario real de la sesión */}
              <span className="admin-profile-name">Leidy Figueroa</span>
              <span className="admin-profile-role">Administradora</span>
            </div>
          </div>
          
          <button type="button" className="admin-logout">
            <i className="fa-solid fa-right-to-bracket" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Backdrop para móviles cuando el sidebar esté abierto */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Contenido principal de la administración */}
      <div className="admin-content">
        <header className="admin-topbar">
          <IconButton
            className="admin-menu-toggle"
            disableRipple
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <i className="fa-solid fa-bars" />
          </IconButton>
        </header>

        <main className="admin-main">
          {/* Aquí se montan dinámicamente las páginas del admin (Dashboard, Roles, Productos, etc.) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}