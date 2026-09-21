// src/shared/components/AdminTopbar.jsx
import React from "react";
import "./AdminTopbar.css";

/**
 * @param {object} props
 * @param {() => void} props.onMenuClick - abre el sidebar en mobile
 * @param {string} [props.userName]
 */
export default function AdminTopbar({ onMenuClick, userName = "Usuario" }) {
  return (
    <header className="admin-topbar">
      <button type="button" className="admin-topbar-menu-btn" onClick={onMenuClick}>
        <i className="fa-solid fa-bars" />
      </button>

      <div className="admin-topbar-profile">
        <i className="fa-solid fa-circle-user" />
        <span>{userName}</span>
      </div>
    </header>
  );
}