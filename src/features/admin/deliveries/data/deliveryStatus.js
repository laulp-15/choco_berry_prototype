// src/features/admin/deliveries/data/deliveryStatus.js

export const DELIVERY_STATUSES = [
  
  { value: "entregado", label: "Entregada", color: "#24943C" },
  { value: "fallido", label: "Cancelada", color: "#DD322D" },
];

export function getDeliveryStatusMeta(value) {
  return DELIVERY_STATUSES.find((s) => s.value === value) ?? DELIVERY_STATUSES[0];
}
