// src/features/admin/orders/components/OrderDetailModal.jsx
import React from "react";
import Modal from "../../../../shared/components/Modal";
import OrderDetailContent from "./OrderDetailContent";

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {object} props.order
 */
export default function OrderDetailModal({ open, onClose, order }) {
  if (!order) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Pedido #${order.id}`} maxWidth="md">
      <OrderDetailContent order={order} />
    </Modal>
  );
}