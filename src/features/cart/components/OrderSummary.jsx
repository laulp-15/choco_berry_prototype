// src/features/cart/components/OrderSummary.jsx
import React from "react";
import { Button } from "@mui/material";
import { getPriceByQuantity } from "../../catalog/data/pricing";
import { formatPrice } from "../../../shared/utils/formatPrice";
import "./OrderSummary.css";

/**
 * @param {object} props
 * @param {object[]} props.items - items del carrito (ver useCart)
 * @param {number} props.shippingCost
 * @param {() => void} props.onSubmit
 */
export default function OrderSummary({ items, shippingCost, onSubmit }) {
  const lines = items.map((it) => ({
    cartItemId: it.cartItemId,
    name: it.name,
    image: it.image,
    units: it.units,
    total: getPriceByQuantity(it.quantity) * it.units,
  }));

  const subtotal = lines.reduce((sum, line) => sum + line.total, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="order-summary">
      <h2 className="order-summary-title">Resumen de Pedido</h2>

      <div className="order-summary-items">
        {lines.map((line) => (
          <div key={line.cartItemId} className="order-summary-item">
            <div className="order-summary-thumb">
              {line.image ? (
                <img src={line.image} alt={line.name} />
              ) : (
                <i className="fa-solid fa-image" />
              )}
            </div>
            <div className="order-summary-item-info">
              <div className="order-summary-item-name">{line.name}</div>
              <div className="order-summary-item-qty">Cant: {line.units}</div>
            </div>
            <div className="order-summary-item-price">{formatPrice(line.total)}</div>
          </div>
        ))}
      </div>

      <hr className="order-summary-divider" />

      <div className="order-summary-row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="order-summary-row">
        <span>Envío</span>
        <span>{shippingCost > 0 ? formatPrice(shippingCost) : "$0"}</span>
      </div>

      <hr className="order-summary-divider" />

      <div className="order-summary-row order-summary-total">
        <span>Total general</span>
        <span>{formatPrice(total)}</span>
      </div>

      <Button
        className="btn-finish-order"
        variant="contained"
        disableRipple
        fullWidth
        onClick={onSubmit}
        endIcon={<i className="fa-solid fa-arrow-right-long" />}
      >
        Finalizar pedido
      </Button>
    </div>
  );
}