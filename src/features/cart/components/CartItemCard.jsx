// src/features/cart/components/CartItemCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, OutlinedInput, Button } from "@mui/material";
import { getPriceByQuantity } from "../../catalog/data/pricing";
import { formatPrice } from "../../../shared/utils/formatPrice";
import "./CartItemCard.css";

/**
 * Una línea del carrito: una configuración específica (producto + cantidad
 * de fresas + color de glaseado + personalización), con su propio contador
 * de unidades. El mensaje de tarjeta NO va aquí: es uno solo por pedido
 * completo (ver OrderCardMessage en CartPage).
 *
 * @param {object} props
 * @param {object} props.item - { cartItemId, productId, name, image, quantity, color, colorHex, units, decorativeMessage, extraCustomization }
 * @param {(cartItemId: string, delta: number) => void} props.onUnitsChange
 * @param {(cartItemId: string, field: string, value: string) => void} props.onFieldChange
 * @param {(cartItemId: string) => void} props.onRemove
 */
export default function CartItemCard({ item, onUnitsChange, onFieldChange, onRemove }) {
  const navigate = useNavigate();
  const {
    cartItemId,
    productId,
    name,
    image,
    quantity,
    color,
    colorHex,
    units,
    decorativeMessage,
    extraCustomization,
  } = item;

  const unitPrice = getPriceByQuantity(quantity);
  const lineTotal = unitPrice * units;

  return (
    <div className="cart-item-card">
      <div className="cart-item-image">
        {image ? <img src={image} alt={name} /> : <i className="fa-solid fa-image" />}
      </div>

      <div className="cart-item-body">
        <div className="cart-item-top">
          <div>
            <div className="cart-item-name">{name}</div>
            <div className="cart-item-meta">
              <span>{quantity} fresas</span>
              <span className="cart-item-color">
                <span className="color-dot" style={{ backgroundColor: colorHex }} />
                {color}
              </span>
            </div>
          </div>

          <IconButton
            className="cart-item-remove"
            title="Eliminar"
            disableRipple
            onClick={() => onRemove(cartItemId)}
          >
            <i className="fa-solid fa-trash" />
          </IconButton>
        </div>

        <div className="cart-item-fields">
          <div>
            <OutlinedInput
              className="cart-item-input"
              placeholder="Mensaje decorativo (chocolate)"
              value={decorativeMessage}
              onChange={(e) => onFieldChange(cartItemId, "decorativeMessage", e.target.value)}
            />
            <div className="cart-field-hint">
              Debe ser una frase corta, acorde con las {quantity} fresas de esta caja.
            </div>
          </div>

          <div>
            <div className="cart-field-label">Personalización extra</div>
            <OutlinedInput
              className="cart-item-input"
              placeholder="Ej: quitar decoraciones de mariposa"
              multiline
              minRows={2}
              value={extraCustomization}
              onChange={(e) => onFieldChange(cartItemId, "extraCustomization", e.target.value)}
            />
          </div>
        </div>

        <div className="cart-item-bottom">
          <div className="cart-item-bottom-left">
            <div className="cart-item-stepper">
              <IconButton disableRipple onClick={() => onUnitsChange(cartItemId, -1)}>
                <i className="fa-solid fa-minus" />
              </IconButton>
              <span className="cart-item-units">{units}</span>
              <IconButton disableRipple onClick={() => onUnitsChange(cartItemId, 1)}>
                <i className="fa-solid fa-plus" />
              </IconButton>
            </div>

            <Button
              className="btn-add-another"
              variant="text"
              disableRipple
              onClick={() => navigate(`/productos/${productId}`)}
            >
              Agregar otro
            </Button>
          </div>

          <div className="cart-item-price">{formatPrice(lineTotal)}</div>
        </div>
      </div>
    </div>
  );
}