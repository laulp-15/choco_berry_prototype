// src/features/admin/orders/components/CancelReasonModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "../../../../shared/components/Modal";
import FormTextField from "../../../../shared/components/FormTextField";
import "./CancelReasonModal.css";

/**
 * Segundo paso de la cancelación: una vez confirmada la acción (ver
 * ConfirmModal), se pide el motivo antes de aplicar el cambio de estado.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {(reason: string) => void} props.onSubmit
 */
export default function CancelReasonModal({ open, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setReason("");
      setError("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError("Escribe el motivo de la cancelación.");
      return;
    }
    onSubmit(reason.trim());
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Motivo de la cancelación"
      maxWidth="sm"
      footer={
        <>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-save" onClick={handleSubmit}>
            Guardar
          </button>
        </>
      }
    >
      <FormTextField
        label="Motivo"
        required
        multiline
        minRows={3}
        value={reason}
        onChange={setReason}
        placeholder="Ej: El cliente solicitó cancelar por cambio de fecha."
        error={error}
      />
    </Modal>
  );
}