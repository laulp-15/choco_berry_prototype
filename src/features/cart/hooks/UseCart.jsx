// src/features/cart/hooks/useCart.jsx
import React, { createContext, useContext, useState, useMemo, useCallback } from "react";

const CartContext = createContext(null);

/**
 * Envolver la app con <CartProvider> (ej. en App.jsx) para que
 * cualquier feature pueda leer/modificar el carrito con useCart().
 *
 * El carrito vive solo en memoria (state de React): no hay tabla de BD
 * para el carrito, solo se persiste como pedido al confirmar la compra.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  // El mensaje de tarjeta es UNO por pedido completo (no por caja/producto).
  const [cardMessage, setCardMessage] = useState("");

  // Si ya hay una línea con el mismo producto + misma cantidad de fresas +
  // mismo color, se suma una unidad ahí en vez de crear una línea nueva
  // (el mensaje decorativo y la personalización extra de esa línea existente
  // no se tocan). Devuelve { merged } para que quien llame pueda avisar al
  // usuario si fue fusión o línea nueva.
  const addItem = useCallback(
    (item) => {
      const existing = items.find(
        (it) => it.productId === item.productId && it.quantity === item.quantity && it.color === item.color
      );

      if (existing) {
        setItems(
          items.map((it) =>
            it.cartItemId === existing.cartItemId ? { ...it, units: it.units + 1 } : it
          )
        );
        return { merged: true };
      }

      const cartItemId = `${item.productId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setItems([
        ...items,
        {
          cartItemId,
          units: 1,
          decorativeMessage: "",
          extraCustomization: "",
          ...item,
        },
      ]);
      return { merged: false };
    },
    [items]
  );

  const removeItem = useCallback((cartItemId) => {
    setItems((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCardMessage("");
  }, []);

  const updateUnits = useCallback((cartItemId, delta) => {
    setItems((prev) =>
      prev.map((it) =>
        it.cartItemId === cartItemId
          ? { ...it, units: Math.max(1, it.units + delta) }
          : it
      )
    );
  }, []);

  const updateField = useCallback((cartItemId, field, value) => {
    setItems((prev) =>
      prev.map((it) => (it.cartItemId === cartItemId ? { ...it, [field]: value } : it))
    );
  }, []);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateUnits,
      updateField,
      clearCart,
      cardMessage,
      setCardMessage,
    }),
    [items, addItem, removeItem, updateUnits, updateField, clearCart, cardMessage]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}