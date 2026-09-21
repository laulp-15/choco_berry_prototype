import React, { useState, useEffect } from "react";

export default function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    { id: 1, image: "/img/carrusel/imagen1.png", alt: "Imagen 1" },
    { id: 2, image: "/img/carrusel/imagen2.png", alt: "Imagen 2" },
    { id: 3, image: "/img/carrusel/imagen3.png", alt: "Imagen 3" },
    { id: 4, image: "/img/carrusel/imagen4.png", alt: "Imagen 4" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="full-width-carousel">
      <div className="carousel-inner">
        <img
          src={banners[currentBanner].image}
          alt={banners[currentBanner].alt}
          className="carousel-img"
        />

        {/* Botón Izquierda */}
        <button onClick={prevBanner} className="carousel-nav-btn btn-left" title="Anterior">
          <i className="fa-solid fa-chevron-left" aria-hidden="true" />
        </button>

        {/* Botón Derecha */}
        <button onClick={nextBanner} className="carousel-nav-btn btn-right" title="Siguiente">
          <i className="fa-solid fa-chevron-right" aria-hidden="true" />
        </button>

        {/* Puntos Indicadores */}
        <div className="carousel-dots">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`dot ${idx === currentBanner ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}