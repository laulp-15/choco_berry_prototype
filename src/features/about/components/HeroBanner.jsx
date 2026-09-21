// src/features/about/components/HeroBanner.jsx
import React from "react";
import "./HeroBanner.css";

/**
 * Hero / tarjeta principal.
 * Imagen grande a pantalla completa con degradado oscuro encima y un
 * panel centrado tipo "vidrio esmerilado" con la marca y el lema.
 *
 * Imagen: public/img/conocenos/hero.jpg (horizontal, buena luz, fresas
 * con chocolate en primer plano funciona muy bien aquí).
 */
export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <img
        src="/img/conocenos/IMG_0473.jpg"
        alt="Fresas cubiertas de chocolate de Chocoberry - Fresas Medellín"
        className="hero-banner-img"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="hero-banner-overlay" />

      <div className="hero-banner-content">
        <div className="hero-banner-panel">
          <span className="hero-banner-brand">
            Chocoberry <span className="hero-banner-brand-dot">·</span> Fresas
            Medellín
          </span>

          <h1 className="hero-banner-title">
            Regala Sonrisas,
            <br />
            Regala Felicidad
          </h1>

          <p className="hero-banner-subtitle">
            Detalles creados para sorprender, emocionar y convertir momentos
            especiales en recuerdos inolvidables.
          </p>
        </div>
      </div>
    </section>
  );
}
