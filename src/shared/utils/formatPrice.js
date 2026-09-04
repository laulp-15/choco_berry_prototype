/**
 * Formatea un número como precio en pesos colombianos.
 * @param {number} value
 * @returns {string} ej: "$85.000"
 */
export function formatPrice(value) {
  return "$" + value.toLocaleString("es-CO");
}