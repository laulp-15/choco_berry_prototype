// src/features/admin/sales/components/SaleReceipt.jsx
import React from "react";
import { formatPrice } from "../../../../shared/utils/formatPrice";
import { formatDisplayDate, getMunicipioLabel, getPaymentLabel, getProofUrl } from "../utils/orderDisplay.js";
import { PRODUCTS } from "../../../catalog/data/products";
import "./SaleReceipt.css";

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getProductImage(productId) {
  return PRODUCTS.find((p) => p.id === productId)?.image ?? null;
}

/**
 * Presentación de "ver venta": tarjeta de cliente/pago + total destacado
 * arriba, tabla de productos abajo. Misma data que OrderDetailContent
 * (Pedidos), pero organizada distinto porque aquí el foco es el comprobante.
 *
 * @param {object} props
 * @param {object} props.sale
 */
export default function SaleReceipt({ sale }) {
  const municipioLabel = getMunicipioLabel(sale.municipio);
  const paymentLabel = getPaymentLabel(sale.medioPago);
  const proofUrl = getProofUrl(sale.comprobante);

  return (
    <div className="sale-receipt">
      {/* --- Cliente/Pago + Total --- */}
      <div className="sale-top-row">
        <div className="sale-info-card">
          <div className="sale-info-col">
            <div className="sale-info-label">Cliente</div>
            <div className="sale-client">
              <div className="sale-client-avatar">{getInitials(sale.cliente)}</div>
              <div>
                <div className="sale-client-name">{sale.cliente}</div>
                <div className="sale-client-sub">{municipioLabel}</div>
              </div>
            </div>
          </div>

          <div className="sale-info-col">
            <div className="sale-info-label">Método de pago</div>
            <div className="sale-info-with-icon">
              <i className="fa-solid fa-credit-card" />
              {paymentLabel}
            </div>
          </div>

          <div className="sale-info-col sale-info-col-full">
            <div className="sale-info-label">Fecha de venta</div>
            <div className="sale-info-value">{formatDisplayDate(sale.fecha)}</div>
          </div>
        </div>

        <div className="sale-total-card">
          <div className="sale-total-label">Total de la venta</div>
          <div className="sale-total-value">{formatPrice(sale.total)}</div>
          <div className="sale-total-caption">Incluye envío</div>
        </div>
      </div>

      {/* --- Productos --- */}
      <div className="sale-products-card">
        <h2 className="sale-products-title">Resumen de Productos</h2>

        <div className="sale-products-table">
          <div className="sale-products-head">
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Precio unitario</span>
            <span>Subtotal</span>
          </div>

          {sale.products.map((line) => {
            const image = getProductImage(line.productId);
            const personalization = [
              line.color && `Color ${line.color}`,
              line.decorativeMessage && `“${line.decorativeMessage}”`,
              line.extraCustomization,
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <div key={line.lineId} className="sale-products-row">
                <div className="sale-product-cell">
                  <div className="sale-product-thumb">
                    {image ? <img src={image} alt={line.productName} /> : <i className="fa-solid fa-image" />}
                  </div>
                  <div>
                    <div className="sale-product-name">{line.productName}</div>
                    {personalization && <div className="sale-product-personalization">{personalization}</div>}
                  </div>
                </div>
                <span className="sale-products-qty">{line.units}</span>
                <span>{formatPrice(line.unitPrice)}</span>
                <span className="sale-products-subtotal">{formatPrice(line.unitPrice * line.units)}</span>
              </div>
            );
          })}
        </div>

        <div className="sale-products-totals">
          <div className="sale-totals-row">
            <span>Subtotal</span>
            <span>{formatPrice(sale.subtotal)}</span>
          </div>
          <div className="sale-totals-row">
            <span>Envío</span>
            <span>{formatPrice(sale.shippingCost)}</span>
          </div>
          <div className="sale-totals-row sale-totals-final">
            <span>Total</span>
            <span>{formatPrice(sale.total)}</span>
          </div>
        </div>
      </div>

      {proofUrl && (
        <div className="sale-proof-card">
          <div className="sale-info-label">Comprobante de pago</div>
          <a href={proofUrl} target="_blank" rel="noreferrer">
            <img src={proofUrl} alt="Comprobante de pago" className="sale-proof-thumb" />
          </a>
        </div>
      )}
    </div>
  );
}