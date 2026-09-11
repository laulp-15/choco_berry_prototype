// src/features/admin/deliveries/components/DeliveryStatusBadge.jsx
import React from "react";
import { getDeliveryStatusMeta } from "../data/deliveryStatus";
import "./DeliveryStatusBadge.css";

export default function DeliveryStatusBadge({ status }) {
  const meta = getDeliveryStatusMeta(status);
  return (
    <span
      className="delivery-status-badge"
      style={{ color: meta.color, backgroundColor: `${meta.color}1F` /* ~12% opacidad */ }}
    >
      {meta.label}
    </span>
  );
}
