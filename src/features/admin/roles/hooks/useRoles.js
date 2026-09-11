// src/features/admin/roles/hooks/useRoles.js
// Estado y reglas de negocio del subproceso de Roles y Permisos.
// TODO: cuando exista API real, reemplazar las funciones internas por
// llamadas a features/admin/roles/services y quitar el setTimeout de simulación.
import { useCallback, useMemo, useState } from "react";
import { INITIAL_ROLES } from "../data/MockRoles";
import { INITIAL_PERMISSIONS } from "../data/Permissions";

// TODO: reemplazar por el usuario real de la sesión (mismo que en AdminLayout).
const CURRENT_ADMIN = "Leidy Figueroa";

const normalize = (text) => text.trim().toLowerCase();

/** Simula latencia de red para que las pantallas de carga/errores tengan sentido. */
function simulateRequest(fn, { failRate = 0 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failRate > 0 && Math.random() < failRate) {
        reject(new Error("No se pudo completar la operación. Intenta nuevamente."));
        return;
      }
      try {
        resolve(fn());
      } catch (err) {
        reject(err);
      }
    }, 350);
  });
}

export default function useRoles() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS);

  const isPermissionInUse = useCallback(
    (permissionId) => roles.some((r) => r.permissionIds.includes(permissionId)),
    [roles]
  );

  const isRoleNameTaken = useCallback(
    (name, excludeId) =>
      roles.some((r) => r.id !== excludeId && normalize(r.name) === normalize(name)),
    [roles]
  );

  // ---------------------------------------------------------------------
  // Roles: crear, editar, eliminar, cambiar estado
  // ---------------------------------------------------------------------

  const createRole = useCallback(
    (data) =>
      simulateRequest(() => {
        if (!data.name.trim()) throw new Error("El nombre del rol es obligatorio.");
        if (isRoleNameTaken(data.name)) throw new Error("Ya existe un rol con ese nombre.");
        if (!data.permissionIds || data.permissionIds.length === 0)
          throw new Error("Debes asignar como mínimo un permiso.");

        const newRole = {
          id: Date.now(),
          name: data.name.trim(),
          description: data.description?.trim() || "",
          permissionIds: data.permissionIds,
          usersCount: 0,
          active: true,
          createdBy: CURRENT_ADMIN,
          createdAt: new Date().toISOString(),
        };
        setRoles((prev) => [...prev, newRole]);
        // CA_01_07: log de creación (usuario administrador + fecha/hora).
        console.info(`[log] Rol "${newRole.name}" creado por ${CURRENT_ADMIN} el ${newRole.createdAt}`);
        return newRole;
      }),
    [isRoleNameTaken]
  );

  const updateRole = useCallback(
    (id, data) =>
      simulateRequest(() => {
        if (!data.name.trim()) throw new Error("El nombre del rol es obligatorio.");
        if (isRoleNameTaken(data.name, id)) throw new Error("Ya existe un rol con ese nombre.");
        if (!data.permissionIds || data.permissionIds.length === 0)
          throw new Error("Debes asignar como mínimo un permiso.");

        let updated = null;
        setRoles((prev) =>
          prev.map((r) => {
            if (r.id !== id) return r;
            updated = {
              ...r,
              name: data.name.trim(),
              description: data.description?.trim() || "",
              permissionIds: data.permissionIds,
            };
            return updated;
          })
        );
        console.info(`[log] Rol "${data.name}" editado por ${CURRENT_ADMIN} el ${new Date().toISOString()}`);
        return updated;
      }),
    [isRoleNameTaken]
  );

  const deleteRole = useCallback(
    (id) =>
      simulateRequest(() => {
        const role = roles.find((r) => r.id === id);
        if (!role) throw new Error("El rol ya no existe.");
        if (role.usersCount > 0)
          throw new Error("No se puede eliminar: el rol tiene usuarios activos asociados.");
        setRoles((prev) => prev.filter((r) => r.id !== id));
        return true;
      }),
    [roles]
  );

  const toggleRoleActive = useCallback((id, value) => {
    setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, active: value } : r)));
  }, []);

  // ---------------------------------------------------------------------
  // Permisos: crear, editar, consultar, cambiar estado
  // ---------------------------------------------------------------------

  const createPermission = useCallback(
    (data) =>
      simulateRequest(() => {
        if (!data.module) throw new Error("Selecciona el módulo del permiso.");
        if (!data.label.trim()) throw new Error("El nombre del permiso es obligatorio.");

        const newPermission = {
          id: Date.now(),
          module: data.module,
          moduleLabel: data.moduleLabel,
          action: data.action || "personalizado",
          actionLabel: data.actionLabel || "Personalizado",
          label: data.label.trim(),
          status: "activo",
        };
        setPermissions((prev) => [...prev, newPermission]);
        return newPermission;
      }),
    []
  );

  const updatePermission = useCallback(
    (id, data) =>
      simulateRequest(() => {
        if (isPermissionInUse(id))
          throw new Error("No se puede editar: el permiso está asociado a un rol en uso.");
        if (!data.label.trim()) throw new Error("El nombre del permiso es obligatorio.");

        let updated = null;
        setPermissions((prev) =>
          prev.map((p) => {
            if (p.id !== id) return p;
            updated = { ...p, label: data.label.trim() };
            return updated;
          })
        );
        return updated;
      }),
    [isPermissionInUse]
  );

  const togglePermissionStatus = useCallback(
    (id, nextStatus) =>
      simulateRequest(() => {
        if (nextStatus === "inactivo" && isPermissionInUse(id))
          throw new Error("No se puede desactivar: el permiso está asociado a un rol en uso.");
        setPermissions((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
        );
        return true;
      }),
    [isPermissionInUse]
  );

  const activePermissions = useMemo(
    () => permissions.filter((p) => p.status === "activo"),
    [permissions]
  );

  return {
    roles,
    permissions,
    activePermissions,
    isPermissionInUse,
    createRole,
    updateRole,
    deleteRole,
    toggleRoleActive,
    createPermission,
    updatePermission,
    togglePermissionStatus,
  };
}
