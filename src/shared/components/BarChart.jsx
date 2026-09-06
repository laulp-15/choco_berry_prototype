// src/shared/components/BarChart.jsx
import React from "react";
import "./BarChart.css";

/**
 * Gráfica de barras simple, sin librerías externas — solo CSS.
 * Útil para "Ventas por semana/mes" y gráficas similares del dashboard.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {{ label: string, value: number }[]} props.data
 * @param {(value: number) => string} [props.formatValue] - para el tooltip (ej: formatPrice)
 */
export default function BarChart({ title, data, formatValue = (v) => v }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const maxIndex = data.findIndex((d) => d.value === max);

  return (
    <div className="bar-chart-card">
      {title && <h3 className="bar-chart-title">{title}</h3>}
      <div className="bar-chart">
        {data.map((d, i) => (
          <div key={d.label} className="bar-chart-col">
            <div className="bar-chart-track">
              <div
                className={`bar-chart-bar ${i === maxIndex ? "highlight" : ""}`}
                style={{ height: `${(d.value / max) * 100}%` }}
                title={formatValue(d.value)}
              />
            </div>
            <span className="bar-chart-label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}