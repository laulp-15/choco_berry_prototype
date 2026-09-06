// src/features/catalog/components/ProductCard.jsx
import React from "react";
import { Button } from "@mui/material";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { MIN_PRICE } from "../data/pricing";
import "./ProductCard.css";

/**
 * Tarjeta de producto.
 * El precio mostrado es el mínimo posible (6 fresas); el precio real
 * se define en el detalle según la cantidad elegida (ver data/pricing.js).
 * La personalización (cantidad, color, mensajes) solo se hace desde el
 * detalle del producto, por eso esta tarjeta solo tiene "Ver Detalle".
 *
 * @param {object} props
 * @param {object} props.product - { name, catLabel, desc, image }
 * @param {(product: object) => void} [props.onViewDetail]
 */
export default function ProductCard({ product, onViewDetail }) {
  const { name, catLabel, desc, image } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <i className="fa-solid fa-image" />
        )}
      </div>
      <div className="product-body">
        <div className="product-category">{catLabel}</div>
        <div className="product-name">{name}</div>
        <div className="product-desc">{desc}</div>
        <div className="product-price">Desde {formatPrice(MIN_PRICE)}</div>
        <div className="product-actions">
          <Button
            className="btn-detail"
            variant="outlined"
            disableRipple
            fullWidth
            onClick={() => onViewDetail?.(product)}
          >
            Ver más
          </Button>
        </div>
      </div>
    </div>
  );
}