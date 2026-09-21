// src/features/cart/components/CartNotification.jsx
import React, { useEffect } from "react";
import "./CartNotification.css";

/**
 * Notificación flotante informativa, específica del carrito (ej. cuando un
 * producto se fusiona con una línea existente en vez de crear una nueva).
 * Se cierra sola a los 4 segundos, o con la X.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {string} props.message
 */
export default function CartNotification({ open, onClose, title, message }) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="cart-notification">
      <div className="cart-notification-icon">
        <i className="fa-solid fa-circle-exclamation" />
      </div>
      <div className="cart-notification-body">
        <div className="cart-notification-title">{title}</div>
        <div className="cart-notification-message">{message}</div>
      </div>
      <button type="button" className="cart-notification-close" onClick={onClose}>
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}