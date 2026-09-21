// src/shared/components/ConfirmModal.jsx
import React from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import "./ConfirmModal.css";

const VARIANT_ICON = {
  danger: "fa-triangle-exclamation",
  warning: "fa-triangle-exclamation",
  info: "fa-circle-exclamation",
};

/**
 * Modal de confirmación/alerta genérico: ícono centrado, título en negrita,
 * descripción, y uno o dos botones — sin barra de título (a diferencia de
 * Modal.jsx). Úsalo para confirmar acciones destructivas (cancelar un
 * pedido, vaciar el carrito) o para avisos simples de una sola acción.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} [props.onConfirm] - si no se pasa, el botón de confirmar solo cierra el modal
 * @param {"danger" | "warning" | "info"} [props.variant]
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.confirmLabel]
 * @param {string} [props.cancelLabel]
 * @param {boolean} [props.showCancel] - false para un aviso de un solo botón (ej. "Información")
 */
export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  variant = "danger",
  title,
  description,
  confirmLabel = "Continuar",
  cancelLabel = "Cancelar",
  showCancel = true,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth className="confirm-modal">
      <DialogContent className="confirm-modal-content">
        <IconButton className="confirm-modal-close" disableRipple onClick={onClose}>
          <i className="fa-solid fa-xmark" />
        </IconButton>

        <div className={`confirm-modal-icon ${variant}`}>
          <i className={`fa-solid ${VARIANT_ICON[variant]}`} />
        </div>

        <h2 className="confirm-modal-title">{title}</h2>
        <p className="confirm-modal-description">{description}</p>

        <div className="confirm-modal-actions">
          {showCancel && (
            <button type="button" className="confirm-modal-cancel" onClick={onClose}>
              {cancelLabel}
            </button>
          )}
          <button
            type="button"
            className={`confirm-modal-confirm ${variant}`}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}