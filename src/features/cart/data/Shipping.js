// src/features/cart/data/shipping.js
// TODO: valores de ejemplo — reemplazar por los costos reales de domicilio
// que confirme Leidy para cada municipio.

export const MUNICIPIOS = [
  { value: "bello", label: "Bello" },
  { value: "copacabana", label: "Copacabana" },
  { value: "barbosa", label: "Barbosa" },
  { value: "itagui", label: "Itagüí" },
  { value: "envigado", label: "Envigado" },
  { value: "sabaneta", label: "Sabaneta" },
  { value: "la-estrella", label: "La Estrella" },
];

const SHIPPING_COST_BY_MUNICIPIO = {
  bello: 12000,
  copacabana: 15000,
  barbosa: 20000,
  itagui: 10000,
  envigado: 10000,
  sabaneta: 12000,
  "la-estrella": 13000,
};

/**
 * Si no se elige municipio (ej. recogida en tienda), el envío es $0.
 */
export function getShippingCost(municipio) {
  if (!municipio) return 0;
  return SHIPPING_COST_BY_MUNICIPIO[municipio] ?? 0;
}