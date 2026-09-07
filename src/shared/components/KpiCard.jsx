// src/shared/components/KpiCard.jsx
import React from "react";
import "./KpiCard.css";

/**
 * Tarjeta de indicador (KPI) genérica: ícono en círculo + valor + chip de
 * comparación opcional + etiqueta. Reutilizable en Dashboard o cualquier
 * otra vista con métricas.
 *
 * @param {object} props
 * @param {string} props.icon - clase de FontAwesome, ej: "fa-clock"
 * @param {string} [props.iconColor] - color del ícono (usa un token, ej: "var(--primario)")
 * @param {string} props.value
 * @param {string} props.label
 * @param {{ text: string, positive: boolean }} [props.delta] - ej: { text: "10% más respecto al mes anterior", positive: true }
 */
export default function KpiCard({ icon, iconColor = "var(--primario)", value, label, delta }) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon" style={{ color: iconColor }}>
        <i className={`fa-solid ${icon}`} />
      </div>
      <div className="kpi-value">{value}</div>
      {delta && (
        <div className={`kpi-delta ${delta.positive ? "positive" : "negative"}`}>
          {delta.text}
        </div>
      )}
      <div className="kpi-label">{label}</div>
    </div>
  );
}