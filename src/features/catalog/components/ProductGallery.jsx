// src/features/catalog/components/ProductGallery.jsx
import React, { useState } from "react";
import "./ProductGallery.css";

/**
 * Galería de imágenes del producto: imagen principal + miniaturas.
 * Si no se pasan imágenes, muestra un ícono placeholder.
 *
 * @param {object} props
 * @param {string[]} [props.images] - rutas de imágenes, ej: ["/img/productos/caja-lujo-1.jpg", ...]
 * @param {string} [props.alt]
 */
export default function ProductGallery({ images = [], alt = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images.length > 0;
  const activeImage = images[activeIndex];

  return (
    <div className="product-gallery">
      <div className="gallery-main">
        {hasImages ? (
          <img src={activeImage} alt={alt} />
        ) : (
          <i className="fa-solid fa-image" />
        )}
      </div>

      {hasImages && (
        <div className="gallery-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`gallery-thumb ${activeIndex === i ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={src} alt={`${alt} ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}