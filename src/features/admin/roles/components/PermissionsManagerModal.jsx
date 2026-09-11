// src/features/admin/roles/components/PermissionsManagerModal.jsx
import React, { useState } from "react";
import Modal from "../../../../shared/components/Modal";
import DataTable from "../../../../shared/components/DataTable";
import StatusToggle from "../../../../shared/components/StatusToggle";
import FormSelect from "../../../../shared/components/FormSelect";
import FormTextField from "../../../../shared/components/FormTextField";
import PermissionEditModal from "./PermissionEditModal";
import { MODULES } from "../data/Permissions";
import "../../../../shared/css/buttons.css";
import "./PermissionsManagerModal.css";

/**
 * Panel "Administrar permisos": lista el catálogo completo, permite crear
 * nuevos permisos, editarlos y cambiar su estado. No permite editar ni
 * desactivar permisos asociados a roles en uso.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {object[]} props.permissions
 * @param {(id: number) => boolean} props.isPermissionInUse
 * @param {(data: object) => Promise<any>} props.onCreate
 * @param {(id: number, data: object) => Promise<any>} props.onUpdate
 * @param {(id: number, status: string) => Promise<any>} props.onToggleStatus
 */
export default function PermissionsManagerModal({
  open,
  onClose,
  permissions,
  isPermissionInUse,
  onCreate,
  onUpdate,
  onToggleStatus,
}) {
  const [newModule, setNewModule] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [createError, setCreateError] = useState("");
  const [editingPermission, setEditingPermission] = useState(null);
  const [rowError, setRowError] = useState("");

  const handleCreate = async () => {
    setCreateError("");
    if (!newModule) {
      setCreateError("Selecciona un módulo.");
      return;
    }
    if (!newLabel.trim()) {
      setCreateError("Escribe el nombre del permiso.");
      return;
    }
    const moduleLabel = MODULES.find((m) => m.key === newModule)?.label ?? newModule;
    try {
      await onCreate({ module: newModule, moduleLabel, label: newLabel });
      setNewModule("");
      setNewLabel("");
    } catch (err) {
      setCreateError(err.message || "No se pudo crear el permiso.");
    }
  };

  const handleToggle = async (permission, checked) => {
    setRowError("");
    try {
      await onToggleStatus(permission.id, checked ? "activo" : "inactivo");
    } catch (err) {
      setRowError(err.message || "No se pudo cambiar el estado del permiso.");
    }
  };

  const columns = [
    { key: "moduleLabel", label: "Módulo" },
    { key: "label", label: "Permiso" },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <StatusToggle checked={row.status === "activo"} onChange={(v) => handleToggle(row, v)} />
      ),
    },
    {
      key: "actions",
      label: "Acciones",
      render: (row) => {
        const inUse = isPermissionInUse(row.id);
        return (
          <button
            type="button"
            className="permission-edit-btn"
            disabled={inUse}
            title={inUse ? "En uso por un rol: no se puede editar" : "Editar permiso"}
            onClick={() => setEditingPermission(row)}
          >
            <i className="fa-solid fa-pen" />
          </button>
        );
      },
    },
  ];

  return (
    <Modal open={open} onClose={onClose} title="Administrar permisos" maxWidth="md">
      <div className="permissions-manager-create">
        <div style={{ minWidth: "180px" }}>
          <FormSelect
            label="Módulo"
            value={newModule}
            onChange={setNewModule}
            options={MODULES.map((m) => ({ value: m.key, label: m.label }))}
            placeholder="Selecciona módulo"
          />
        </div>
        <div style={{ flex: 1 }}>
          <FormTextField
            label="Nombre del permiso"
            value={newLabel}
            onChange={setNewLabel}
            placeholder="Ej. Exportar reporte de ventas"
          />
        </div>
        <button type="button" className="btn-save permissions-manager-add-btn" onClick={handleCreate}>
          <i className="fa-solid fa-plus" /> Agregar
        </button>
      </div>
      {createError && <div className="form-error" style={{ marginBottom: 14 }}>{createError}</div>}
      {rowError && <div className="form-error" style={{ marginBottom: 14 }}>{rowError}</div>}

      <DataTable
        columns={columns}
        data={permissions}
        searchPlaceholder="Buscar permiso..."
        pageSize={6}
        emptyMessage="No hay permisos registrados."
      />

      <PermissionEditModal
        open={Boolean(editingPermission)}
        onClose={() => setEditingPermission(null)}
        permission={editingPermission}
        onSave={onUpdate}
      />
    </Modal>
  );
}
