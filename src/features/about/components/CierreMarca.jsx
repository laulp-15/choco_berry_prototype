// src/features/about/components/CierreMarca.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import useScrollReveal from "../hooks/useScrollReveal";
import "./CierreMarca.css";

/**
 * Cierre de marca: reutiliza la imagen del Hero (hero.jpg) como fondo,
 * esta vez con un overlay más oscuro y uniforme para que el texto
 * siempre sea legible. Bookend visual con la primera sección.
 *
 * CTA funcional: lleva al catálogo real (/productos).
 */
export default function CierreMarca() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="cierre-marca">
      <img
        src="/img/conocenos/About_1.jpg"
        alt=""
        aria-hidden="true"
        className="cierre-marca-img"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="cierre-marca-overlay" />

      <div
        ref={ref}
        className={`cierre-marca-content reveal ${
          visible ? "reveal-visible" : ""
        }`}
      >
        <span className="cierre-marca-brand">ChocoBerry</span>
        <span className="cierre-marca-sub">Fresas Medellín</span>

        <h2 className="cierre-marca-slogan">
          Regala Sonrisas, Regala Felicidad
        </h2>

        <p className="cierre-marca-text">
          Detalles hechos con amor para momentos que merecen ser
          recordados.
        </p>

        <Button
          component={Link}
          to="/productos"
          variant="contained"
          disableElevation
          className="cierre-marca-cta"
        >
          Ver Productos
        </Button>
      </div>
    </section>
  );
}
