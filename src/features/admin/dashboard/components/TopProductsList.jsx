// src/features/admin/dashboard/components/TopProductsList.jsx

import React from "react";
import "./TopProductsList.css";

/**
 * @param {object} props
 * @param {{ name: string, sold: number }[]} props.products
 */

export default function TopProductsList({ products }) {

  const maxSold = Math.max(...products.map((p) => p.sold), 1);

  return (
    <div className="top-products-card">

      <h3 className="top-products-title">
        Productos más vendidos
      </h3>

      <div className="top-products-list">

        {products.map((p, i) => {

          const barWidth = (p.sold / maxSold) * 100;

          return (
            <div key={p.name} className="top-products-row">

              <span className="top-products-rank">
                {i + 1}
              </span>

              <div className="top-products-info">

                <div className="top-products-header">

                  <span className="top-products-name">
                    {p.name}
                  </span>

                  <span className="top-products-sold">
                    {p.sold}
                  </span>

                </div>

                <div className="top-products-bar">
                  <div
                    className="top-products-bar-fill"
                    style={{ width: `${barWidth}%` }}
                  ></div>
                </div>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}