// src/features/admin/roles/components/RoleFormModal.jsx
import React, { useEffect, useState } from "react";
import Modal from "../../../../shared/components/Modal";
import FormTextField from "../../../../shared/components/FormTextField";
import PermissionsChecklist from "./PermissionsChecklist";
import { useRolesContext } from "../context/RolesContext";
import "../../../../shared/css/buttons.css";
import "./RoleFormModal.css";

const EMPTY_ROLE = { name: "", description: "", permissionIds: [] };

/**
 * Modal de Crear/Editar rol — reemplaza a la antigua RoleFormPage
 * (que navegaba a /admin/roles/nuevo o /admin/roles/:id/editar en una
 * página aparte). Ahora todo pasa en la "ventanita" del listado, igual
 * que en el módulo de Usuarios: un solo formulario para ambos casos,
 * la diferencia es la prop `initialData` (si llega, es edición).
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {object} [props.initialData] - rol existente, cuando es edición
 * @param {(message: string) => void} props.onSaved - se llama con el
 *   mensaje de éxito para que la lista muestre el toast y cierre el modal
 */
export default function RoleFormModal({ open, onClose, initialData, onSaved }) {
  const { activePermissions, createRole, updateRole } = useRolesContext();
  const isEditing = Boolean(initialData);

  const [role, setRole] = useState(EMPTY_ROLE);
  const [errors, setErrors] = useState({});
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setRole(
      initialData
        ? {
            name: initialData.name,
            description: initialData.description,
            permissionIds: initialData.permissionIds,
          }
        : EMPTY_ROLE
    );
    setErrors({});
    setSaveError("");
  }, [open, initialData]);

  const update = (field, value) => setRole((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const newErrors = {};
    if (!role.name.trim()) newErrors.name = "El nombre del rol es obligatorio.";
    if (role.permissionIds.length === 0)
      newErrors.permissionIds = "Debes asignar como mínimo un permiso.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setSaveError("");
    try {
      if (isEditing) {
        await updateRole(initialData.id, role);
        onSaved("Rol actualizado correctamente.");
      } else {
        await createRole(role);
        onSaved("Rol creado correctamente.");
      }
    } catch (err) {
      // CA_01_08 / CA_02_05: si falla, se conserva la información en el
      // formulario (no se cierra el modal) y se informa el error.
      setSaveError(err.message || "No se pudo completar la operación.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Editar Rol" : "Crear Nuevo Rol"}
      maxWidth="md"
      footer={
        <>
          <button type="button" className="btn-cancel" onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button type="button" className="btn-save" onClick={handleSave} disabled={saving}>
            {saving ? "Guardando..." : isEditing ? "Guardar Cambios" : "Guardar Rol"}
          </button>
        </>
      }
    >
      {!isEditing && (
        <p className="role-form-subtitle">
          Define y administra los niveles de acceso para tu equipo de ChocoBerry.
        </p>
      )}

      {saveError && (
        <div className="form-error" style={{ marginBottom: 14 }}>
          {saveError}
        </div>
      )}

      <FormTextField
        label="Nombre del Rol"
        required
        value={role.name}
        onChange={(v) => update("name", v)}
        placeholder="Ej. Gestor de inventario"
        error={errors.name}
      />

      <FormTextField
        label="Descripción (Opcional)"
        value={role.description}
        onChange={(v) => update("description", v)}
        placeholder="Define las responsabilidades principales de este rol..."
        multiline
        minRows={3}
      />

      <PermissionsChecklist
        permissions={activePermissions}
        selectedIds={role.permissionIds}
        onChange={(ids) => update("permissionIds", ids)}
        error={errors.permissionIds}
      />
    </Modal>
  );
}
