// src/features/catalog/components/ProductCard.jsx
import React from "react";
import { Button, IconButton } from "@mui/material";
import { formatPrice } from "../../../shared/utils/formatPrice";
import { MIN_PRICE } from "../data/Pricing";
import "./ProductCard.css";

/**
 * Tarjeta de producto.
 * El precio mostrado es el mínimo posible (6 fresas); el precio real
 * se define en el detalle según la cantidad elegida (ver data/pricing.js).
 *
 * @param {object} props
 * @param {object} props.product - { name, catLabel, desc, image }
 * @param {(product: object) => void} [props.onAddToCart]
 * @param {(product: object) => void} [props.onViewDetail]
 */
export default function ProductCard({ product, onAddToCart, onViewDetail }) {
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
            onClick={() => onViewDetail?.(product)}
          >
            Ver Detalle
          </Button>
          <IconButton
            className="btn-cart"
            title="Añadir al carrito"
            disableRipple
            onClick={() => onAddToCart?.(product)}
          >
            <i className="fa-solid fa-cart-plus" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}