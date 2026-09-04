// src/features/catalog/components/RelatedProducts.jsx
import React from "react";
import ProductCard from "./ProductCard";
import "./RelatedProducts.css";

/**
 * Sección "También te podría gustar": reutiliza ProductCard del catálogo.
 *
 * @param {object} props
 * @param {object[]} props.products
 * @param {() => void} [props.onViewAll]
 * @param {(product: object) => void} [props.onAddToCart]
 * @param {(product: object) => void} [props.onViewDetail]
 */
export default function RelatedProducts({ products, onViewAll, onAddToCart, onViewDetail }) {
  return (
    <div className="related-products">
      <div className="related-header">
        <h2 className="related-title">También te podría gustar</h2>
        <button type="button" className="related-view-all" onClick={onViewAll}>
          Ver todo
        </button>
      </div>
      <div className="row">
        {products.map((product) => (
          <div key={product.name} className="col-12 col-sm-6 col-lg-3 product-col">
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onViewDetail={onViewDetail}
            />
          </div>
        ))}
      </div>
    </div>
  );
}