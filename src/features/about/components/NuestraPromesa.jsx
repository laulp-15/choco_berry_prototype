// src/features/about/components/NuestraPromesa.jsx
import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./NuestraPromesa.css";

/**
 * "Queremos ser parte de tus momentos especiales" — sección deliberadamente
 * minimalista: solo texto centrado y mucho espacio en blanco, como
 * respiro antes del cierre de marca. Sin imagen (el brief la marca como
 * opcional), para no repetir una quinta vez alguna de las 4 fotos.
 */
export default function NuestraPromesa() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="nuestra-promesa">
      <div
        ref={ref}
        className={`about-inner promesa-inner reveal ${
          visible ? "reveal-visible" : ""
        }`}
      >
        <h2 className="promesa-title">
          Queremos ser parte de tus momentos especiales
        </h2>

        <p className="promesa-text">
          Queremos ser esa opción a la que puedas acudir cuando estés
          buscando algo diferente, bonito y hecho con intención.
        </p>
        <p className="promesa-text">
          Ya sea para celebrar una fecha importante, sorprender a alguien
          que amas o simplemente tener un detalle porque sí.
        </p>

        <p className="promesa-emphasis">
          Porque no siempre necesitamos una ocasión para regalar.
        </p>
        <p className="promesa-emphasis promesa-emphasis-strong">
          A veces, una sonrisa es motivo suficiente.
        </p>
      </div>
    </section>
  );
}
