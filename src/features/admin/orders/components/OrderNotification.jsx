// src/features/admin/orders/components/OrderNotification.jsx
import React, { useEffect } from "react";
import "./OrderNotification.css";

/**
 * Notificación flotante de éxito, específica del módulo de Pedidos
 * (patrón "Notificaciones flotantes" del proyecto). Se cierra sola a los
 * 5 segundos, o con la X.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {string} props.message
 */
export default function OrderNotification({ open, onClose, title, message }) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="order-notification">
      <div className="order-notification-icon">
        <i className="fa-solid fa-check" />
      </div>
      <div className="order-notification-body">
        <div className="order-notification-title">{title}</div>
        <div className="order-notification-message">{message}</div>
      </div>
      <button type="button" className="order-notification-close" onClick={onClose}>
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}