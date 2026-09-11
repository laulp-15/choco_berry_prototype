// src/features/admin/roles/components/PermissionEditModal.jsx
import React, { useEffect, useState } from "react";
import Modal from "../../../../shared/components/Modal";
import FormTextField from "../../../../shared/components/FormTextField";
import "../../../../shared/css/buttons.css";

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {object} props.permission
 * @param {(id: number, data: object) => Promise<any>} props.onSave
 */
export default function PermissionEditModal({ open, onClose, permission, onSave }) {
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLabel(permission?.label ?? "");
    setError("");
    setSaveError("");
  }, [permission, open]);

  if (!permission) return null;

  const handleSave = async () => {
    if (!label.trim()) {
      setError("El nombre del permiso es obligatorio.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      await onSave(permission.id, { label });
      onClose();
    } catch (err) {
      setSaveError(err.message || "No se pudo completar la operación.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Editar permiso"
      maxWidth="xs"
      footer={
        <>
          <button type="button" className="btn-cancel" onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button type="button" className="btn-save" onClick={handleSave} disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </>
      }
    >
      {saveError && <div className="form-error" style={{ marginBottom: 14 }}>{saveError}</div>}
      <div className="form-field">
        <label className="form-label">Módulo</label>
        <div className="role-detail-value">{permission.moduleLabel}</div>
      </div>
      <FormTextField label="Nombre del permiso" required value={label} onChange={setLabel} error={error} />
    </Modal>
  );
}
