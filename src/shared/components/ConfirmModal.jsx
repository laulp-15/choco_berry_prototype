// src/shared/components/ConfirmModal.jsx
import React from "react";
import { Dialog, IconButton, Button } from "@mui/material";
import "./ConfirmModal.css";

const VARIANT_ICON = {
  warning: "fa-triangle-exclamation",
  info: "fa-circle-info",
};

/**
 * Modal de confirmación, según el patrón "Notificaciones tipo modal" de ChocoBerry.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} props.onConfirm
 * @param {"warning" | "info"} [props.variant] - define color/ícono (naranja o azul)
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.cancelLabel]
 * @param {string} [props.confirmLabel]
 */
export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  variant = "warning",
  title,
  description,
  cancelLabel = "Cancelar",
  confirmLabel = "Continuar",
}) {
  return (
    <Dialog open={open} onClose={onClose} className={`confirm-modal confirm-modal-${variant}`}>
      <IconButton className="confirm-modal-close" disableRipple onClick={onClose}>
        <i className="fa-solid fa-xmark" />
      </IconButton>

      <div className={`confirm-modal-icon confirm-modal-icon-${variant}`}>
        <i className={`fa-solid ${VARIANT_ICON[variant]}`} />
      </div>

      <h2 className="confirm-modal-title">{title}</h2>
      <p className="confirm-modal-description">{description}</p>

      <div className="confirm-modal-actions">
        <Button className="confirm-modal-cancel" variant="outlined" disableRipple onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          className={`confirm-modal-confirm confirm-modal-confirm-${variant}`}
          variant="contained"
          disableRipple
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}