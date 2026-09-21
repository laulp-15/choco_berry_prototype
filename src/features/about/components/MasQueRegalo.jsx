
// src/features/about/components/MasQueRegalo.jsx

import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./MasQueRegalo.css";

const PALABRAS = ["Sorprender", "Celebrar", "Agradecer", "Amar", "Compartir"];

/**
 * "Más que un regalo, una emoción"
 *
 * Sección emocional de la página "Conócenos".
 * Utiliza el rosa como color protagonista para diferenciarla
 * visualmente del resto de la página.
 *
 * La imagen aparece a la izquierda para alternar la composición
 * respecto a la sección "Quiénes somos".
 *
 * Imagen: public/img/conocenos/img.png
 */

export default function MasQueRegalo() {
  const [imgRef, imgVisible] = useScrollReveal();
  const [textRef, textVisible] = useScrollReveal();

  return (
    <section className="mas-regalo" aria-labelledby="mas-regalo-title">
      <div className="about-inner">
        <div className="row align-items-center g-5">
          {/* Imagen */}
          <div
            ref={imgRef}
            className={`col-12 col-lg-5 order-2 order-lg-1 reveal reveal-left ${
              imgVisible ? "reveal-visible" : ""
            }`}
          >
            <div className="mr-image-wrap">
              <img
                src="/img/conocenos/img.png"
                alt="Detalle personalizado de Chocoberry preparado para regalar"
                className="mr-image"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.hidden = true;

                  const fallback = event.currentTarget.nextElementSibling;

                  if (fallback) {
                    fallback.classList.add("mr-image-fallback-visible");
                  }
                }}
              />

              <div
                className="mr-image-fallback"
                aria-hidden="true"
              >
                <i className="fa-solid fa-gift" />
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div
            ref={textRef}
            className={`col-12 col-lg-7 order-1 order-lg-2 reveal reveal-right ${
              textVisible ? "reveal-visible" : ""
            }`}
          >
            <div className="mr-content">
              <span className="mr-eyebrow">
                <i className="fa-solid fa-gift" aria-hidden="true" />
                <span>Filosofía</span>
              </span>

              <h2 id="mas-regalo-title" className="mr-title">
                Más que un regalo, una emoción
              </h2>

              <p className="mr-text">
                Para nosotros, cada pedido es diferente, porque entendemos
                que no existe una sola forma de celebrar, sorprender o
                demostrar cariño.
              </p>

              <p className="mr-text">
                Nos gusta escuchar lo que nuestros clientes imaginan y
                convertir esas ideas en detalles que representen realmente
                la ocasión y a la persona que los va a recibir.
              </p>

              <div
                className="mr-words"
                aria-label="Lo que buscamos transmitir con cada detalle"
              >
                {PALABRAS.map((palabra, index) => (
                  <React.Fragment key={palabra}>
                    <span className="mr-word">{palabra}</span>

                    {index < PALABRAS.length - 1 && (
                      <span className="mr-dot" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

