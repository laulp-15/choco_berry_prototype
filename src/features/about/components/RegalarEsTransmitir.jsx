// src/features/about/components/RegalarEsTransmitir.jsx
import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./RegalarEsTransmitir.css";

const FRASES = [
  "Estoy pensando en ti.",
  "Te quiero.",
  "Gracias.",
  "Feliz cumpleaños.",
  "Felicidades.",
  "Quería hacerte sonreír.",
];

function Frase({ text, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <p
      ref={ref}
      className={`ret-phrase reveal ${visible ? "reveal-visible" : ""}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      “{text}”
    </p>
  );
}

/**
 * "Regalar es transmitir emociones" — sección oscura (fondo chocolate),
 * la más dramática y distinta de toda la página, con las frases
 * apareciendo una a una al hacer scroll.
 *
 * Imagen: public/img/conocenos/regalo.jpg (se reutiliza la misma foto de
 * "Más que un regalo" con un tratamiento distinto: aquí en blanco y negro
 * suave + overlay oscuro, para no repetir visualmente la misma imagen).
 */
export default function RegalarEsTransmitir() {
  const [imgRef, imgVisible] = useScrollReveal();

  return (
    <section className="regalar-transmitir">
      <div className="about-inner">
        <div className="row align-items-center g-5">
          <div
            ref={imgRef}
            className={`col-12 col-lg-5 reveal reveal-left ${
              imgVisible ? "reveal-visible" : ""
            }`}
          >
            <div className="ret-image-wrap">
              <img
                src="/img/conocenos/img3.png"
                alt="Regalo de Chocoberry entregado con cariño"
                className="ret-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <h2 className="ret-title">Regalar es transmitir emociones</h2>
            <p className="ret-intro">
              Creemos que regalar no se trata solamente de entregar algo
              bonito o delicioso. Regalar es encontrar una manera de
              decir:
            </p>

            <div className="ret-phrases">
              {FRASES.map((f, i) => (
                <Frase key={f} text={f} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
