// src/features/admin/roles/pages/RolesListPage.jsx
import React, { useState } from "react";
import DataTable from "../../../../shared/components/DataTable";
import StatusToggle from "../../../../shared/components/StatusToggle";
import FormSelect from "../../../../shared/components/FormSelect";
import ConfirmModal from "../../../../shared/components/ConfirmModal";
import Toast from "../../../../shared/components/Toast";
import { useRolesContext } from "../context/RolesContext";
import { getRoleIcon } from "../data/Permissions";
import RoleDetailModal from "../components/RoleDetailModal";
import RoleFormModal from "../components/RoleFormModal";
import PermissionsManagerModal from "../components/PermissionsManagerModal";
import "./RolesListPage.css";

export default function RolesListPage() {
  const {
    roles,
    permissions,
    isPermissionInUse,
    deleteRole,
    toggleRoleActive,
    createPermission,
    updatePermission,
    togglePermissionStatus,
  } = useRolesContext();

  const [statusFilter, setStatusFilter] = useState("");
  const [detailRole, setDetailRole] = useState(null);
  const [deletingRole, setDeletingRole] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [permissionsManagerOpen, setPermissionsManagerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Crear/Editar rol: un solo modal (RoleFormModal). formOpen controla si
  // se ve, editingRole indica si es edición (con datos) o creación (null).
  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const openCreate = () => {
    setEditingRole(null);
    setFormOpen(true);
  };

  const openEdit = (role) => {
    setEditingRole(role);
    setFormOpen(true);
  };

  const handleSaved = (message) => {
    setFormOpen(false);
    setToast({ message, severity: "success" });
  };

  const filteredByStatus = roles.filter((r) => {
    if (statusFilter === "activo") return r.active;
    if (statusFilter === "inactivo") return !r.active;
    return true;
  });

  const confirmDelete = async () => {
    try {
      await deleteRole(deletingRole.id);
      setToast({ message: "Rol eliminado correctamente.", severity: "success" });
      setDeletingRole(null);
      setDeleteError("");
    } catch (err) {
      setDeleteError(err.message || "No se pudo eliminar el rol.");
    }
  };

  const columns = [
    {
      key: "name",
      label: "Nombre del rol",
      render: (row) => (
        <span className="roles-name-cell">
          <i className={`fa-solid ${getRoleIcon(row.name)}`} />
          {row.name}
        </span>
      ),
    },
    { key: "description", label: "Descripción" },
    {
      key: "permissionIds",
      label: "Permisos",
      render: (row) => <span className="roles-permission-count">{row.permissionIds.length}</span>,
    },
    { key: "usersCount", label: "Usuarios" },
    {
      key: "active",
      label: "Estado",
      render: (row) => (
        <StatusToggle checked={row.active} onChange={(v) => toggleRoleActive(row.id, v)} />
      ),
    },
    {
      key: "actions",
      label: "Acciones",
      render: (row) => (
        <div className="roles-row-actions">
          <i className="fa-solid fa-eye" title="Ver detalle" onClick={() => setDetailRole(row)} />
          <i className="fa-solid fa-pen" title="Editar" onClick={() => openEdit(row)} />
          <i
            className={`fa-solid fa-trash ${row.usersCount > 0 ? "disabled" : ""}`}
            title={row.usersCount > 0 ? "No se puede eliminar: tiene usuarios asociados" : "Eliminar"}
            onClick={() => {
              if (row.usersCount > 0) return;
              setDeleteError("");
              setDeletingRole(row);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Gestión de Roles"
        description="Define y administra los niveles de acceso para tu equipo de ChocoBerry."
        createLabel="Nuevo rol"
        onCreate={openCreate}
        columns={columns}
        data={filteredByStatus}
        searchPlaceholder="Buscar rol por nombre..."
        emptyMessage="No se encontraron roles."
        extraFilter={
          <div className="roles-extra-filter">
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
            <button
              type="button"
              className="btn-filters"
              onClick={() => setPermissionsManagerOpen(true)}
            >
              <i className="fa-solid fa-gear" />
              Administrar permisos
            </button>
          </div>
        }
      />

      <RoleFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialData={editingRole}
        onSaved={handleSaved}
      />

      <RoleDetailModal
        open={Boolean(detailRole)}
        onClose={() => setDetailRole(null)}
        role={detailRole}
        permissions={permissions}
      />

      <ConfirmModal
        open={Boolean(deletingRole)}
        onClose={() => setDeletingRole(null)}
        onConfirm={confirmDelete}
        variant="warning"
        title="¿Eliminar este rol?"
        description={
          deleteError ||
          `Esta acción no se puede deshacer. El rol "${deletingRole?.name}" se eliminará del sistema.`
        }
        confirmLabel="Eliminar"
      />

      <PermissionsManagerModal
        open={permissionsManagerOpen}
        onClose={() => setPermissionsManagerOpen(false)}
        permissions={permissions}
        isPermissionInUse={isPermissionInUse}
        onCreate={createPermission}
        onUpdate={updatePermission}
        onToggleStatus={togglePermissionStatus}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}
