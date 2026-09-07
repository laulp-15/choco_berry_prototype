// src/features/admin/orders/components/OrderStatusBadge.jsx
import React from "react";
import { getStatusMeta } from "../data/orderStatus";
import "./OrderStatusBadge.css";

export default function OrderStatusBadge({ status }) {
  const meta = getStatusMeta(status);
  return (
    <span
      className="order-status-badge"
      style={{ color: meta.color, backgroundColor: `${meta.color}1F` /* ~12% opacidad */ }}
    >
      {meta.label}
    </span>
  );
}