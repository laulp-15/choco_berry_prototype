// src/features/admin/users/pages/UserDetailPage.jsx
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUsersAdmin from "../hooks/useUsersAdmin";
import RoleBadge from "../components/RoleBadge";
import { ROLE_PERMISSIONS } from "../utils/roles";
import "./UserDetailPage.css";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById } = useUsersAdmin();
  const user = getUserById(id);

  if (!user) {
    return (
      <div className="user-detail-page">
        <button type="button" className="user-detail-back" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left-long" /> Regresar al listado
        </button>
        <div className="user-detail-empty">
          <i className="fa-solid fa-circle-exclamation" />
          <p>No encontramos ese usuario. Puede que ya haya sido eliminado.</p>
          <Link to="/admin/usuarios" className="btn-save" style={{ textDecoration: "none" }}>
            Ir al listado de usuarios
          </Link>
        </div>
      </div>
    );
  }

  const isActive = user.active !== false;
  const permissions = ROLE_PERMISSIONS[user.role] || [];

  return (
    <div className="user-detail-page">
      <button type="button" className="user-detail-back" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left-long" /> Regresar al listado
      </button>

      <div className="user-detail-heading-card">
        <div className="user-detail-heading-top">
          <h1 className="user-detail-name">{user.fullName}</h1>
          <span className={`user-detail-status-pill ${isActive ? "is-active" : "is-inactive"}`}>
            {isActive ? "ACTIVO" : "INACTIVO"}
          </span>
        </div>
        <p className="user-detail-email">{user.email}</p>
      </div>

      <div className="row user-detail-row">
        <div className="col-12 col-lg-6 user-detail-col">
          <div className="user-detail-card">
            <h2 className="user-detail-card-title">
              <i className="fa-solid fa-user" /> Información de la cuenta
            </h2>
            <dl className="user-detail-fields">
              <div className="user-detail-field">
                <dt>Nombre completo</dt>
                <dd>{user.fullName}</dd>
              </div>
              <div className="user-detail-field">
                <dt>Correo electrónico</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="user-detail-field">
                <dt>Rol de usuario</dt>
                <dd>
                  <RoleBadge role={user.role} />
                </dd>
              </div>
              <div className="user-detail-field">
                <dt>Fecha de creación</dt>
                <dd>{formatDate(user.createdAt)}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="col-12 col-lg-6 user-detail-col">
          <div className="user-detail-card">
            <h2 className="user-detail-card-title">
              <i className="fa-solid fa-shield-halved" /> Permisos del Sistema
            </h2>
            <ul className="user-detail-permissions">
              {permissions.map((perm) => (
                <li key={perm.title} className="user-detail-permission">
                  <span className="user-detail-permission-icon">
                    <i className={`fa-solid ${perm.icon}`} />
                  </span>
                  <div>
                    <p className="user-detail-permission-title">{perm.title}</p>
                    <p className="user-detail-permission-desc">{perm.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
