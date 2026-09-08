// src/features/cart/pages/CartPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItemCard from "../components/CartItemCard";
import OrderCardMessage from "../components/OrderCardMessage";
import CartSummary from "../components/CartSummary";
import ConfirmModal from "../../../shared/components/ConfirmModal";
import "./CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateUnits, updateField, clearCart, cardMessage, setCardMessage } = useCart();
  const [clearModalOpen, setClearModalOpen] = useState(false);

  const handleCheckout = () => {
    navigate("/carrito/pago");
  };

  const handleConfirmClear = () => {
    clearCart();
    setClearModalOpen(false);
  };

  return (
    <div className="cart-page">
      <div className="container cart-wrap">
        <h1 className="cart-title">Tu Carrito</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <i className="fa-solid fa-cart-plus"  />

            <h2>Tu carrito está vacío</h2>

            <p>
              Aún no has agregado productos a tu carrito.
              Explora nuestro catálogo y encuentra algo delicioso.
            </p>

            <button
              type="button"
              className="cart-empty-link"
              onClick={() => navigate("/productos")}
            >
              Ver catálogo
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 col-lg-8">
              <OrderCardMessage value={cardMessage} onChange={setCardMessage} />
              {items.map((item) => (
                <CartItemCard
                  key={item.cartItemId}
                  item={item}
                  onUnitsChange={updateUnits}
                  onFieldChange={updateField}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <div className="col-12 col-lg-4">
              <CartSummary items={items} onCheckout={handleCheckout} />

              <div className="cart-side-actions">
                <button
                  type="button"
                  className="btn-back-catalog"
                  onClick={() => navigate("/productos")}
                >
                  <i className="fa-solid fa-arrow-left-long" />
                  Volver al catálogo
                </button>
                <button
                  type="button"
                  className="btn-clear-cart"
                  onClick={() => setClearModalOpen(true)}
                >
                  <i className="fa-solid fa-trash" />
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        onConfirm={handleConfirmClear}
        variant="warning"
        title="Vaciar carrito"
        description="Vas a eliminar todos los productos de tu carrito. Esta acción no se puede deshacer."
        confirmLabel="Sí, vaciar"
      />
    </div>
  );
}