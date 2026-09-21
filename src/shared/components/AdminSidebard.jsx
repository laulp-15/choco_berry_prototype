// src/shared/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

// Un solo lugar para las secciones del panel admin. Si se agrega un módulo
// nuevo (ej. "reportes"), solo se añade aquí y aparece para todos.
const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "fa-chart-line" },
  { to: "/admin/pedidos", label: "Pedidos", icon: "fa-box" },
  { to: "/admin/ventas", label: "Ventas", icon: "fa-credit-card" },
  { to: "/admin/entregas", label: "Entregas", icon: "fa-truck-fast" },
  { to: "/admin/productos", label: "Productos", icon: "fa-store" },
  { to: "/admin/categorias", label: "Categorías", icon: "fa-tag" },
  { to: "/admin/clientes", label: "Clientes", icon: "fa-user-group" },
  { to: "/admin/resenas", label: "Reseñas", icon: "fa-star" },
  { to: "/admin/usuarios", label: "Usuarios", icon: "fa-users" },
  { to: "/admin/roles", label: "Roles", icon: "fa-shield-halved" },
];

/**
 * @param {object} props
 * @param {boolean} props.open - visible en mobile (colapsado por defecto)
 * @param {() => void} props.onClose
 */
export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <div className="admin-sidebar-logo">ChocoBerry</div>

        <nav className="admin-sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
              onClick={onClose}
            >
              <i className={`fa-solid ${item.icon}`} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button type="button" className="admin-sidebar-logout">
          <i className="fa-solid fa-right-to-bracket" />
          Cerrar sesión
        </button>
      </aside>
    </>
  );
}