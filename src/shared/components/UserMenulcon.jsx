// src/shared/components/UserMenuIcon.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/login/hooks/useAuth";
import "./UserMenuIcon.css";

/**
 * Ícono de usuario para la cabecera del sitio (PERFIL_USUARIO en la
 * iconografía: fa-circle-user). Listo para colocar en el header público
 * en cuanto exista ("cuando le den click al ícono del usuario, va a
 * abrir..."):
 *
 *   import UserMenuIcon from "../../shared/components/UserMenuIcon";
 *   ...
 *   <UserMenuIcon />
 *
 * - Sin sesión: al hacer click navega directo a /login.
 * - Con sesión: abre un menú con el nombre, el rol y accesos rápidos
 *   (cambiar contraseña, panel admin si aplica, cerrar sesión).
 */
export default function UserMenuIcon() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleIconClick() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setOpen((o) => !o);
  }

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/productos");
  }

  return (
    <div className="user-menu" ref={wrapperRef}>
      <button
        type="button"
        className="user-menu-trigger"
        onClick={handleIconClick}
        aria-haspopup="menu"
        aria-expanded={open}
        title={isAuthenticated ? user.fullName : "Iniciar sesión"}
      >
        <i className="fa-solid fa-circle-user" />
      </button>

      {isAuthenticated && open && (
        <div className="user-menu-dropdown" role="menu">
          <div className="user-menu-header">
            <span className="user-menu-name">{user.fullName}</span>
            <span className={`user-menu-role user-menu-role--${user.role}`}>
              {roleLabel(user.role)}
            </span>
          </div>
          <button
            type="button"
            className="user-menu-item"
            onClick={() => {
              setOpen(false);
              navigate("/cambiar-contrasena");
            }}
          >
            <i className="fa-solid fa-lock" /> Cambiar contraseña
          </button>
          {(user.role === "administrador" || user.role === "repartidor") && (
            <button
              type="button"
              className="user-menu-item"
              onClick={() => {
                setOpen(false);
                navigate("/admin");
              }}
            >
              <i className="fa-solid fa-gear" /> Panel administrativo
            </button>
          )}
          <button type="button" className="user-menu-item user-menu-item--danger" onClick={handleLogout}>
            <i className="fa-solid fa-right-to-bracket" /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

function roleLabel(role) {
  if (role === "administrador") return "Administrador";
  if (role === "repartidor") return "Repartidor";
  return "Cliente";
}
