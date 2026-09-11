// src/features/admin/deliveries/components/DeliveryDetailModal.jsx
import React from "react";
import Modal from "../../../../shared/components/Modal";
import DeliveryDetailContent from "./DeliveryDetailContent";

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {object} props.delivery
 */
export default function DeliveryDetailModal({ open, onClose, delivery }) {
  if (!delivery) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Detalle de entrega — Pedido #${delivery.orderId}`}
      maxWidth="sm"
    >
      <DeliveryDetailContent delivery={delivery} />
    </Modal>
  );
}
