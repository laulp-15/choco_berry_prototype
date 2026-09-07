
// src/features/about/components/NuestraEsencia.jsx

import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

import "./NuestraEsencia.css";

const ESENCIA = [
  {
    icon: "fa-medal",
    title: "Calidad",
    desc: "Seleccionamos y cuidamos cada producto para ofrecer creaciones preparadas con dedicación.",
  },
  {
    icon: "fa-star",
    title: "Creatividad",
    desc: "Transformamos cada idea en una creación especial, pensada para sorprender y disfrutar.",
  },
  {
    icon: "fa-gift",
    title: "Personalización",
    desc: "Adaptamos cada detalle a la ocasión para crear regalos únicos para personas especiales.",
  },
  {
    icon: "fa-heart",
    title: "Compromiso",
    desc: "Trabajamos con cercanía y dedicación para brindar una experiencia confiable.",
  },
];

function EsenciaCard({ icon, title, desc, index }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <article
        ref={ref}
        className={`esencia-card reveal ${
          visible ? "reveal-visible" : ""
        }`}
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        <span className="esencia-card-number">
          0{index + 1}
        </span>

        <div className="esencia-card-icon">
          <i className={`fa-solid ${icon}`} aria-hidden="true" />
        </div>

        <h3 className="esencia-card-title">
          {title}
        </h3>

        <div className="esencia-card-line" />

        <p className="esencia-card-desc">
          {desc}
        </p>
      </article>
    </div>
  );
}

export default function NuestraEsencia() {
  return (
    <section className="nuestra-esencia">
      <div className="about-inner">

        <div className="esencia-heading">
          <span className="esencia-eyebrow">
            <i className="fa-solid fa-heart" aria-hidden="true" />
            Nuestra esencia
          </span>

         

          <p className="esencia-subtitle">
            Cada creación refleja la dedicación, creatividad y cariño
            que ponemos en cada detalle.
          </p>
        </div>

        <div className="row g-4">
          {ESENCIA.map((item, i) => (
            <EsenciaCard
              key={item.title}
              {...item}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

