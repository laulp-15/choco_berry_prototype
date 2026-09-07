// src/features/admin/orders/components/OrderProductLineItem.jsx
import React from "react";
import { IconButton } from "@mui/material";
import { formatPrice } from "../../../../shared/utils/formatPrice";
import "./OrderProductLineItem.css";

/**
 * @param {object} props
 * @param {object} props.line
 * @param {(lineId: string) => void} props.onRemove
 */
export default function OrderProductLineItem({ line, onRemove }) {
  const lineTotal = line.unitPrice * line.units;

  return (
    <div className="order-line-item">
      <div className="order-line-item-info">
        <div className="order-line-item-name">
          {line.productName} <span className="order-line-item-units">x{line.units}</span>
        </div>
        <div className="order-line-item-meta">
          <span>{line.quantity} fresas</span>
          <span className="order-line-item-color">
            <span className="color-dot" style={{ backgroundColor: line.colorHex }} />
            {line.color}
          </span>
        </div>
        {(line.decorativeMessage || line.extraCustomization) && (
          <div className="order-line-item-notes">
            {line.decorativeMessage && <span>“{line.decorativeMessage}”</span>}
            {line.extraCustomization && <span>{line.extraCustomization}</span>}
          </div>
        )}
      </div>
      <div className="order-line-item-price">{formatPrice(lineTotal)}</div>
      <IconButton className="order-line-item-remove" disableRipple onClick={() => onRemove(line.lineId)}>
        <i className="fa-solid fa-trash" />
      </IconButton>
    </div>
  );
}