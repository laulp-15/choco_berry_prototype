// src/features/catalog/data/pricing.js
// El precio depende de la cantidad de fresas, no del producto.
// Esta tabla aplica igual para todos los productos.

export const PRICE_BY_QUANTITY = {
  6: 35000,
  8: 45000,
  12: 55000,
  16: 75000,
  30: 130000,
};

export function getPriceByQuantity(quantity) {
  return PRICE_BY_QUANTITY[quantity] ?? 0;
}

// Menor precio disponible, para mostrar "Desde $35.000" en el catálogo.
export const MIN_PRICE = Math.min(...Object.values(PRICE_BY_QUANTITY));