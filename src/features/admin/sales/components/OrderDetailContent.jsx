// src/features/admin/orders/components/OrderDetailContent.jsx
import React from "react";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatPrice } from "../../../../shared/utils/formatPrice";
import { formatDisplayDate, getMunicipioLabel, getPaymentLabel, getProofUrl } from "../utils/orderDisplay";
import "./OrderDetailContent.css";

/**
 * Contenido de "ver detalle" de un pedido — sin ningún wrapper (ni Modal,
 * ni layout de página). Se usa dentro de OrderDetailModal (Pedidos).
 * Ventas tiene su propia presentación (SaleReceipt), aunque usa la misma
 * data y los mismos helpers de utils/orderDisplay.js.
 *
 * @param {object} props
 * @param {object} props.order
 */
export default function OrderDetailContent({ order }) {
  const municipioLabel = getMunicipioLabel(order.municipio);
  const paymentLabel = getPaymentLabel(order.medioPago);
  const proofUrl = getProofUrl(order.comprobante);

  return (
    <div className="order-detail-content">
      <div className="order-detail-top">
        <OrderStatusBadge status={order.estado} />
        <span className="order-detail-date">
          <i className="fa-solid fa-calendar" /> {formatDisplayDate(order.fecha)}
        </span>
      </div>

      {/* --- Datos del cliente y entrega --- */}
      <div className="detail-section">
        <div className="detail-section-title">
          <i className="fa-solid fa-truck-fast" />
          Datos de entrega
        </div>
        <div className="order-detail-grid">
          <div>
            <div className="order-detail-label">Cliente</div>
            <div className="order-detail-value">{order.cliente}</div>
          </div>
          <div>
            <div className="order-detail-label">Municipio</div>
            <div className="order-detail-value">{municipioLabel}</div>
          </div>
          <div className="order-detail-grid-full">
            <div className="order-detail-label">Dirección</div>
            <div className="order-detail-value">{order.direccion || "—"}</div>
          </div>
          {order.instrucciones && (
            <div className="order-detail-grid-full">
              <div className="order-detail-label">Instrucciones de entrega</div>
              <div className="order-detail-value">{order.instrucciones}</div>
            </div>
          )}
        </div>
      </div>

      {/* --- Pago --- */}
      <div className="detail-section">
        <div className="detail-section-title">
          <i className="fa-solid fa-credit-card" />
          Información de pago
        </div>
        <div className="order-detail-grid">
          <div>
            <div className="order-detail-label">Medio de pago</div>
            <div className="order-detail-value">{paymentLabel}</div>
          </div>
          <div>
            <div className="order-detail-label">Comprobante</div>
            {proofUrl ? (
              <a href={proofUrl} target="_blank" rel="noreferrer" className="order-detail-proof-link">
                <img src={proofUrl} alt="Comprobante de pago" className="order-detail-proof-thumb" />
              </a>
            ) : (
              <div className="order-detail-value order-detail-muted">Sin comprobante adjunto</div>
            )}
          </div>
        </div>
      </div>

      {/* --- Productos --- */}
      <div className="detail-section">
        <div className="detail-section-title">
          <i className="fa-solid fa-box" />
          Productos
        </div>

        <div className="order-detail-products">
          {order.products.map((line) => (
            <div key={line.lineId} className="order-detail-product-row">
              <div>
                <div className="order-detail-product-name">
                  {line.productName} <span>x{line.units}</span>
                </div>
                <div className="order-detail-product-meta">
                  <span>{line.quantity} fresas</span>
                  <span className="order-detail-product-color">
                    <span className="color-dot" style={{ backgroundColor: line.colorHex }} />
                    {line.color}
                  </span>
                </div>
                {(line.decorativeMessage || line.extraCustomization) && (
                  <div className="order-detail-product-note">
                    {line.decorativeMessage && <span>“{line.decorativeMessage}”</span>}
                    {line.extraCustomization && <span>{line.extraCustomization}</span>}
                  </div>
                )}
              </div>
              <div className="order-detail-product-price">{formatPrice(line.unitPrice * line.units)}</div>
            </div>
          ))}
        </div>

        {order.cardMessage && (
          <div className="order-detail-card-message">
            <i className="fa-solid fa-envelope" />
            <div>
              <div className="order-detail-label">Mensaje para la tarjeta</div>
              <div className="order-detail-value">{order.cardMessage}</div>
            </div>
          </div>
        )}
      </div>

      {/* --- Totales --- */}
      <div className="order-detail-totals">
        <div>
          <span>Subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div>
          <span>Envío</span>
          <span>{formatPrice(order.shippingCost)}</span>
        </div>
        <div className="order-detail-total-row">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}