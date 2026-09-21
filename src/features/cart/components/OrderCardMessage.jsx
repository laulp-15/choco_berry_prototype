// src/features/cart/components/OrderCardMessage.jsx
import React from "react";
import { OutlinedInput } from "@mui/material";
import "./OrderCardMessage.css";

/**
 * Mensaje para la tarjeta física que acompaña TODO el pedido
 * (una sola tarjeta, no una por producto/caja).
 *
 * @param {object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 */
export default function OrderCardMessage({ value, onChange }) {
  return (
    <div className="order-card-message">
      <div className="order-card-message-label">Mensaje para tu tarjeta</div>
      <div className="order-card-message-hint">
        Escribe un mensaje para la tarjeta de tu pedido.
      </div>
      <OutlinedInput
        className="order-card-message-input"
        fullWidth
        multiline
        minRows={2}
        placeholder="Escribe aquí el mensaje que quieres incluir en la tarjeta..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}