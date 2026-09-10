// src/features/login/components/ThemeToggle.jsx
import React from "react";
import "./ThemeToggle.css";

/**
 * Interruptor claro/oscuro. Ícono sol/luna con fa-solid, siguiendo la
 * iconografía del proyecto.
 */
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="auth-theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`} />
    </button>
  );
}
