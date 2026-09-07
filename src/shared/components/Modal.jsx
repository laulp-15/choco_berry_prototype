// src/shared/components/Modal.jsx
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import "./Modal.css";

/**
 * Modal genérico para toda la app (crear/editar/ver detalle en cualquier
 * módulo admin). Trae título con botón de cerrar, contenido con scroll
 * propio, y un pie opcional para los botones de acción.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 * @param {React.ReactNode} [props.footer] - normalmente botones Guardar/Cancelar
 * @param {"sm" | "md" | "lg"} [props.maxWidth]
 */
export default function Modal({ open, onClose, title, children, footer, maxWidth = "sm" }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth className="app-modal">
      <DialogTitle className="app-modal-title">
        {title}
        <IconButton className="app-modal-close" disableRipple onClick={onClose}>
          <i className="fa-solid fa-xmark" />
        </IconButton>
      </DialogTitle>
      <DialogContent className="app-modal-content">{children}</DialogContent>
      {footer && <DialogActions className="app-modal-footer">{footer}</DialogActions>}
    </Dialog>
  );
}