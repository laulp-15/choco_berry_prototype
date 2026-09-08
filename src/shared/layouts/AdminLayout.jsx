// src/shared/layouts/AdminLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./AdminLayout.css";

// Un solo lugar para el menú del admin. Si se agrega un módulo nuevo,
// solo hay que agregar una línea aquí — no hay que tocar cada página.
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
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-brand">
          <img src="/img/Logo/CHOCOBERRY.png" alt="ChocoBerry" className="admin-brand-logo" />
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <i className={`fa-solid ${item.icon}`} />
              {item.label}
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

      {sidebarOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="admin-content">
        <header className="admin-topbar">
          <IconButton
            className="admin-menu-toggle"
            disableRipple
            onClick={() => setSidebarOpen(true)}
          >
            <i className="fa-solid fa-bars" />
          </IconButton>
        </header>

        <main className="admin-main">
          {/* Aquí se monta la página de cada módulo (Roles, Usuarios, etc.) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}