// src/features/admin/roles/data/MockRoles.js
// TODO: reemplazar por fetch a la API real (features/admin/roles/services).
// El sistema maneja 3 roles base: Administrador (acceso total), Repartidor
// y Cliente. El módulo permite crear más roles si el negocio lo requiere.

import { INITIAL_PERMISSIONS } from "./Permissions";

const idsFor = (moduleKey, actionKeys) =>
  INITIAL_PERMISSIONS.filter((p) => p.module === moduleKey && actionKeys.includes(p.action)).map(
    (p) => p.id
  );

const ALL_PERMISSION_IDS = INITIAL_PERMISSIONS.map((p) => p.id);

const REPARTIDOR_PERMISSION_IDS = [
  ...idsFor("dashboard", ["ver"]),
  ...idsFor("pedidos", ["ver"]),
  ...idsFor("entregas", ["ver", "editar"]),
];

const CLIENTE_PERMISSION_IDS = [
  ...idsFor("categorias", ["ver"]),
  ...idsFor("productos", ["ver"]),
  ...idsFor("carrito", ["ver", "crear", "editar"]),
  ...idsFor("pedidos", ["ver", "crear"]),
  ...idsFor("resenas", ["ver", "crear"]),
];

export const INITIAL_ROLES = [
  {
    id: 1,
    name: "Administrador",
    description: "Acceso total a todos los procesos, módulos y funcionalidades del sistema.",
    permissionIds: ALL_PERMISSION_IDS,
    usersCount: 2,
    active: true,
    createdBy: "Leidy Figueroa",
    createdAt: "2026-01-15T09:00:00.000Z",
  },
  {
    id: 2,
    name: "Repartidor",
    description: "Acceso a las entregas asignadas y consulta de pedidos.",
    permissionIds: REPARTIDOR_PERMISSION_IDS,
    usersCount: 3,
    active: true,
    createdBy: "Leidy Figueroa",
    createdAt: "2026-01-15T09:05:00.000Z",
  },
  {
    id: 3,
    name: "Cliente",
    description: "Acceso al catálogo, categorías, su carrito, sus pedidos y reseñas.",
    permissionIds: CLIENTE_PERMISSION_IDS,
    usersCount: 48,
    active: true,
    createdBy: "Leidy Figueroa",
    createdAt: "2026-01-15T09:10:00.000Z",
  },
];
