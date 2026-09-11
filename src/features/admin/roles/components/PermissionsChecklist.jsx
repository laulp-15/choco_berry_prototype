// src/features/admin/roles/components/PermissionsChecklist.jsx
import React from "react";
import { Checkbox } from "@mui/material";
import { groupPermissionsByModule } from "../data/Permissions";
import "./PermissionsChecklist.css";

/**
 * Checklist de permisos por módulo, usado en Crear/Editar rol. Cada
 * tarjeta representa el acceso completo a un módulo: marcarla selecciona
 * todas las acciones activas de ese módulo; desmarcarla las quita todas.
 * Solo se listan módulos con al menos un permiso activo.
 *
 * @param {object} props
 * @param {object[]} props.permissions - catálogo de permisos activos
 * @param {number[]} props.selectedIds
 * @param {(ids: number[]) => void} props.onChange
 * @param {string} [props.error]
 */
export default function PermissionsChecklist({ permissions, selectedIds, onChange, error }) {
  const groups = groupPermissionsByModule(permissions);

  const toggleModule = (groupPermissions, allSelected) => {
    const ids = groupPermissions.map((p) => p.id);
    if (allSelected) {
      onChange(selectedIds.filter((id) => !ids.includes(id)));
    } else {
      onChange([...new Set([...selectedIds, ...ids])]);
    }
  };

  return (
    <div className="permissions-checklist">
      <div className="form-label">
        <i className="fa-solid fa-shield-halved" /> Configuración de Permisos *
      </div>

      <div className="permissions-grid">
        {groups.map((group) => {
          const ids = group.permissions.map((p) => p.id);
          const allSelected = ids.every((id) => selectedIds.includes(id));

          return (
            <label
              key={group.module}
              className={`permission-card ${allSelected ? "checked" : ""}`}
            >
              <Checkbox
                size="small"
                disableRipple
                checked={allSelected}
                onChange={() => toggleModule(group.permissions, allSelected)}
              />
              {group.moduleIcon && <i className={`fa-solid ${group.moduleIcon}`} />}
              <span>{group.moduleLabel}</span>
            </label>
          );
        })}
      </div>

      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
