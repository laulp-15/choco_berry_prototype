// src/shared/components/ImageLightbox.jsx
import React, { useEffect } from "react";
import "./ImageLightbox.css";

/**
 * Visor de imagen a pantalla completa, sobre la misma página (sin abrir
 * pestaña nueva). Se cierra con la X, haciendo clic afuera, o con Escape.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} props.src
 * @param {string} [props.alt]
 */
export default function ImageLightbox({ open, onClose, src, alt = "" }) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="image-lightbox-backdrop" onClick={onClose}>
      <button type="button" className="image-lightbox-close" onClick={onClose}>
        <i className="fa-solid fa-xmark" />
      </button>
      <img
        src={src}
        alt={alt}
        className="image-lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}