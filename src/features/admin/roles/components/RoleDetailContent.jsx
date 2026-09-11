// src/features/admin/roles/components/RoleDetailContent.jsx
import React from "react";
import { groupPermissionsByModule } from "../data/Permissions";
import "./RoleDetailContent.css";

function formatDisplayDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/**
 * Contenido de "ver detalle" de un rol (CA_06). Solo lectura.
 *
 * @param {object} props
 * @param {object} props.role
 * @param {object[]} props.permissions - catálogo completo de permisos
 */
export default function RoleDetailContent({ role, permissions }) {
  const rolePermissions = permissions.filter((p) => role.permissionIds.includes(p.id));
  const groups = groupPermissionsByModule(rolePermissions);

  return (
    <div className="role-detail-content">
      <div className="role-detail-top">
        <span className={`role-detail-status ${role.active ? "active" : "inactive"}`}>
          <i className="fa-solid fa-circle" /> {role.active ? "Activo" : "Inactivo"}
        </span>
        <span className="role-detail-date">
          <i className="fa-solid fa-calendar" /> Creado el {formatDisplayDate(role.createdAt)}
        </span>
      </div>

      <div className="detail-section">
        <div className="role-detail-label">Nombre del rol</div>
        <div className="role-detail-value">{role.name}</div>
      </div>

      <div className="detail-section">
        <div className="role-detail-label">Descripción</div>
        <div className="role-detail-value">{role.description || "Sin descripción."}</div>
      </div>

      <div className="detail-section">
        <div className="role-detail-label">Usuarios asignados</div>
        <div className="role-detail-value">{role.usersCount}</div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <i className="fa-solid fa-shield-halved" />
          Permisos ({rolePermissions.length})
        </div>

        {groups.length === 0 ? (
          <div className="role-detail-muted">Este rol no tiene permisos asignados.</div>
        ) : (
          <div className="role-detail-permission-groups">
            {groups.map((group) => (
              <div key={group.module} className="role-detail-permission-group">
                <div className="role-detail-permission-module">{group.moduleLabel}</div>
                <div className="role-detail-permission-chips">
                  {group.permissions.map((p) => (
                    <span key={p.id} className="role-detail-chip">
                      {p.actionLabel}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
