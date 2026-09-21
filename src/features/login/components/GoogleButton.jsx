// src/features/login/components/GoogleButton.jsx
import React from "react";
import "./GoogleButton.css";

/**
 * Botón "Continuar con Google". El SSO real no está conectado (no hay
 * backend todavía): por ahora muestra un aviso. Cuando exista el
 * proveedor OAuth, solo hay que reemplazar handleClick.
 */
export default function GoogleButton({ label = "Continuar con Google", onClick }) {
  const handleClick = () => {
    if (onClick) return onClick();
    window.alert(
      "El inicio de sesión con Google se conectará cuando el backend de autenticación esté disponible."
    );
  };

  return (
    <button type="button" className="google-btn" onClick={handleClick}>
      <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 35.1 27 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.5l6.6 5.4C41.4 36 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
        />
      </svg>
      {label}
    </button>
  );
}
