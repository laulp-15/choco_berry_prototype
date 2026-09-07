// src/features/admin/orders/utils/orderDisplay.js
// Helpers de presentación compartidos entre OrderDetailContent (Pedidos)
// y SaleReceipt (Ventas) — misma data, distintas vistas.
import { MUNICIPIOS } from "../../../cart/data/Shipping";
import { PAYMENT_METHODS } from "../../../cart/data/PaymentMethods";

export function formatDisplayDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function getMunicipioLabel(municipio) {
  return MUNICIPIOS.find((m) => m.value === municipio)?.label ?? "Recojo en tienda";
}

export function getPaymentLabel(medioPago) {
  return PAYMENT_METHODS.find((p) => p.value === medioPago)?.label ?? "—";
}

/**
 * Devuelve una URL utilizable en <img>, ya sea que `comprobante` sea un
 * File (subido en esta sesión) o una URL/string (ya guardado en backend).
 */
export function getProofUrl(comprobante) {
  if (!comprobante) return null;
  if (typeof comprobante === "string") return comprobante;
  return URL.createObjectURL(comprobante);
}