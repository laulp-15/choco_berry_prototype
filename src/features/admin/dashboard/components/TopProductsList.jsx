// src/features/admin/dashboard/components/TopProductsList.jsx
import React from "react";
import "./TopProductsList.css";

/**
 * @param {object} props
 * @param {{ name: string, sold: number }[]} props.products - ya ordenados de mayor a menor
 */
export default function TopProductsList({ products }) {
  return (
    <div className="top-products-card">
      <h3 className="top-products-title">Productos más vendidos</h3>
      <div className="top-products-list">
        {products.map((p, i) => (
          <div key={p.name} className="top-products-row">
            <span className="top-products-rank">{i + 1}</span>
            <span className="top-products-name">{p.name}</span>
            <span className="top-products-sold">
              {p.sold}
              <span className="top-products-sold-label">vendidos</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}