// src/features/about/components/QuienesSomos.jsx
import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./QuienesSomos.css";

/**
 * "¿Quiénes somos?" — texto a la izquierda, imagen a la derecha.
 * Estilo editorial: número "01", comilla decorativa grande y párrafos
 * cortos (según el brief, nada de bloques de texto gigantes).
 *
 * Imagen: public/img/conocenos/quienes-somos.jpg
 */
export default function QuienesSomos() {
  const [textRef, textVisible] = useScrollReveal();
  const [imgRef, imgVisible] = useScrollReveal();

  return (
    <section className="quienes-somos">
      <div className="about-inner">
        <div className="row align-items-center g-5">
          <div
            ref={textRef}
            className={`col-12 col-lg-6 reveal reveal-left ${
              textVisible ? "reveal-visible" : ""
            }`}
          >
            <span className="qs-number">01</span>
            <span className="qs-quote-mark" aria-hidden="true">
              “
            </span>
            <h2 className="qs-title">¿Quiénes somos?</h2>

            <p className="qs-text">
              Somos <strong>Chocoberry – Fresas Medellín</strong>, un
              emprendimiento creado con amor por los detalles, la
              creatividad y, sobre todo, por esos pequeños momentos que
              merecen convertirse en recuerdos especiales.
            </p>

            <p className="qs-text">
              Nos dedicamos a crear fresas cubiertas con chocolate,
              detalles personalizados y regalos pensados para sorprender,
              combinando sabores, colores, diseños y presentaciones que
              hacen que cada creación tenga algo especial.
            </p>
          </div>

          <div
            ref={imgRef}
            className={`col-12 col-lg-6 reveal reveal-right ${
              imgVisible ? "reveal-visible" : ""
            }`}
          >
            <div className="qs-image-wrap">
              <img
                src="/img/conocenos/About_2.webp"
                alt="Fresas cubiertas de chocolate de Chocoberry"
                className="qs-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="qs-image-fallback">
                <i className="fa-solid fa-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
