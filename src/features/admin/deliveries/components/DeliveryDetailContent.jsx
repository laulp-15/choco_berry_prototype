// src/features/admin/deliveries/components/DeliveryDetailContent.jsx
import React from "react";
import DeliveryStatusBadge from "./DeliveryStatusBadge";
import { formatPrice } from "../../../../shared/utils/formatPrice";
import "./DeliveryDetailContent.css";

function formatDisplayDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Detalle de solo lectura de una entrega (CA_61): datos del cliente, del
 * pedido y del envío, y — si el repartidor ya la marcó como entregada o
 * fallida — sus observaciones y la foto de evidencia que dejó.
 *
 * @param {object} props
 * @param {object} props.delivery
 */
export default function DeliveryDetailContent({ delivery }) {
  const { evidence } = delivery;

  return (
    <div className="delivery-detail-content">
      <div className="delivery-detail-top">
        <DeliveryStatusBadge status={delivery.estado} />
        <span className="delivery-detail-date">
          <i className="fa-solid fa-calendar" /> {delivery.fecha}
        </span>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <i className="fa-solid fa-user" /> Cliente
        </div>
        <div className="delivery-detail-row">
          <div>
            <div className="delivery-detail-label">Nombre</div>
            <div className="delivery-detail-value">{delivery.cliente}</div>
          </div>
          <div>
            <div className="delivery-detail-label">Municipio</div>
            <div className="delivery-detail-value">{delivery.municipio}</div>
          </div>
        </div>
        <div className="delivery-detail-label" style={{ marginTop: 10 }}>
          Dirección
        </div>
        <div className="delivery-detail-value">{delivery.direccion}</div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <i className="fa-solid fa-box" /> Pedido #{delivery.orderId}
        </div>
        <ul className="delivery-detail-products">
          {delivery.products.map((p, i) => (
            <li key={i}>
              <span>
                {p.productName} <span className="delivery-detail-muted">x{p.quantity}</span>
              </span>
              <span className="delivery-detail-muted">{p.units} unid.</span>
            </li>
          ))}
        </ul>
        <div className="delivery-detail-total">
          <span>Total del pedido</span>
          <strong>{formatPrice(delivery.total)}</strong>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <i className="fa-solid fa-truck-fast" /> Repartidor asignado
        </div>
        <div className="delivery-detail-value">{delivery.repartidor}</div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <i className="fa-solid fa-clipboard-check" /> Evidencia de entrega
        </div>

        {!evidence ? (
          <div className="delivery-detail-muted">
            Esta entrega todavía está en camino: el repartidor aún no ha registrado evidencia.
          </div>
        ) : (
          <>
            <div className="delivery-detail-label">Fecha y hora registrada</div>
            <div className="delivery-detail-value" style={{ marginBottom: 12 }}>
              {formatDisplayDate(evidence.deliveredAt)}
            </div>

            <div className="delivery-detail-label">Observaciones del repartidor</div>
            <div className="delivery-evidence-comments">
              {evidence.comments || "Sin observaciones registradas."}
            </div>

            <div className="delivery-detail-label" style={{ marginTop: 14 }}>
              Foto de evidencia
            </div>
            {evidence.photoUrl ? (
              <img
                className="delivery-evidence-photo"
                src={evidence.photoUrl}
                alt={`Evidencia de entrega del pedido #${delivery.orderId}`}
              />
            ) : (
              <div className="delivery-evidence-photo-empty">
                <i className="fa-solid fa-image" />
                Sin foto de evidencia
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
