// src/features/admin/roles/pages/RolesListPage.jsx
// EJEMPLO de cómo se usa DataTable en un módulo real, con título, botón
// "Crear", filtros y la columna de Estado con StatusToggle.
import React, { useState } from "react";
import DataTable from "../../../../shared/components/DataTable";
import StatusToggle from "../../../../shared/components/StatusToggle";
import FormSelect from "../../../../shared/components/FormSelect";

// TODO: reemplazar por fetch a la API real (features/admin/roles/services)
const INITIAL_ROLES = [
  { id: 1, name: "Administrador", description: "Acceso total al sistema", usersCount: 2, active: true },
  { id: 2, name: "Repartidor", description: "Acceso a entregas asignadas", usersCount: 3, active: true },
  { id: 3, name: "Editor de catálogo", description: "Solo gestiona productos", usersCount: 1, active: false },
];

export default function RolesListPage() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [statusFilter, setStatusFilter] = useState("");

  const toggleActive = (id, value) => {
    setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, active: value } : r)));
  };

  const filteredByStatus = roles.filter((r) => {
    if (statusFilter === "activo") return r.active;
    if (statusFilter === "inactivo") return !r.active;
    return true;
  });

  const columns = [
    { key: "name", label: "Nombre del rol" },
    { key: "description", label: "Descripción" },
    { key: "usersCount", label: "Usuarios asignados" },
    {
      key: "active",
      label: "Estado",
      render: (row) => (
        <StatusToggle checked={row.active} onChange={(value) => toggleActive(row.id, value)} />
      ),
    },
    {
      key: "actions",
      label: "Acciones",
      render: (row) => (
        <div style={{ display: "flex", gap: "12px", color: "var(--texto-muted)" }}>
          <i className="fa-solid fa-eye" style={{ cursor: "pointer" }} title="Ver detalle" />
          <i className="fa-solid fa-pen" style={{ color: "var(--primario)", cursor: "pointer" }} title="Editar" />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Roles"
      description="Administra los roles y permisos del sistema."
      createLabel="Crear rol"
      onCreate={() => console.log("TODO: abrir formulario de crear rol")}
      columns={columns}
      data={filteredByStatus}
      searchPlaceholder="Buscar rol por nombre..."
      extraFilter={
        <div style={{ minWidth: "160px" }}>
          <FormSelect
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Todos los estados"
            options={[
              { value: "activo", label: "Activo" },
              { value: "inactivo", label: "Inactivo" },
            ]}
          />
        </div>
      }
    />
  );
}