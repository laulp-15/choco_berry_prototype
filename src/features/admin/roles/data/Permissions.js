// src/features/admin/roles/data/Permissions.js
// Catálogo de permisos disponibles en el sistema: cada permiso combina un
// módulo (Dashboard, Roles, Usuarios...) con una acción autorizada
// (Ver, Crear, Editar, Eliminar). Es la fuente para:
//  - el checklist de permisos al crear/editar un rol
//  - el panel "Administrar permisos" (crear, editar, consultar, cambiar estado)

export const MODULES = [
  { key: "dashboard", label: "Dashboard", icon: "fa-chart-line" },
  { key: "roles", label: "Roles", icon: "fa-shield-halved" },
  { key: "usuarios", label: "Usuarios", icon: "fa-users" },
  { key: "categorias", label: "Categorías", icon: "fa-tag" },
  { key: "productos", label: "Productos", icon: "fa-store" },
  { key: "carrito", label: "Carrito", icon: "fa-cart-shopping" },
  { key: "clientes", label: "Clientes", icon: "fa-user-group" },
  { key: "resenas", label: "Reseñas", icon: "fa-star" },
  { key: "pedidos", label: "Pedidos", icon: "fa-box" },
  { key: "ventas", label: "Ventas", icon: "fa-credit-card" },
  { key: "entregas", label: "Entregas", icon: "fa-truck-fast" },
];

export const ACTIONS = [
  { key: "ver", label: "Ver" },
  { key: "crear", label: "Crear" },
  { key: "editar", label: "Editar" },
  { key: "eliminar", label: "Eliminar" },
];

function buildInitialPermissions() {
  const permissions = [];
  let autoId = 1;
  for (const mod of MODULES) {
    for (const action of ACTIONS) {
      permissions.push({
        id: autoId++,
        module: mod.key,
        moduleLabel: mod.label,
        action: action.key,
        actionLabel: action.label,
        label: `${action.label} ${mod.label}`,
        status: "activo",
      });
    }
  }
  return permissions;
}

export const INITIAL_PERMISSIONS = buildInitialPermissions();

/** Agrupa un arreglo de permisos por módulo, en el orden definido en MODULES. */
export function groupPermissionsByModule(permissions) {
  return MODULES.map((mod) => ({
    module: mod.key,
    moduleLabel: mod.label,
    moduleIcon: mod.icon,
    permissions: permissions.filter((p) => p.module === mod.key),
  })).filter((group) => group.permissions.length > 0);
}

// Ícono sugerido por nombre de rol, para el badge del listado (fallback:
// fa-user-shield para roles nuevos que el admin cree).
const ROLE_ICONS = {
  administrador: "fa-shield-halved",
  repartidor: "fa-truck-fast",
  cliente: "fa-user",
};

export function getRoleIcon(roleName) {
  return ROLE_ICONS[roleName.trim().toLowerCase()] || "fa-user-shield";
}
