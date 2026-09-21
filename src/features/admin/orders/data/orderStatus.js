// src/features/admin/orders/data/orderStatus.js

export const ORDER_STATUSES = [
  { value: "pendiente", label: "Pendiente", color: "#F49505" },
  { value: "en_preparacion", label: "En preparación", color: "#1D77ED" },
  { value: "despachado", label: "Despachado", color: "#24943C" },
  { value: "cancelado", label: "Cancelado", color: "#DD322D" },
];

export function getStatusMeta(value) {
  return ORDER_STATUSES.find((s) => s.value === value) ?? ORDER_STATUSES[0];
}