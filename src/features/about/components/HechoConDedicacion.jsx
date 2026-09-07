// src/features/about/components/HechoConDedicacion.jsx

import useScrollReveal from "../hooks/useScrollReveal";
import "./HechoConDedicacion.css";

export default function HechoConDedicacion() {
  const [textRef, textVisible] = useScrollReveal();
  const [imgRef, imgVisible] = useScrollReveal();

  return (
    <section className="hecho-dedicacion">
      <div className="about-inner">
        <div className="row align-items-center g-5">

          {/* =========================
              TEXTO
          ========================= */}

          <div
            ref={textRef}
            className={`col-12 col-lg-6 reveal reveal-left ${
              textVisible ? "reveal-visible" : ""
            }`}
          >
            <div className="hd-content">

              <span className="hd-eyebrow">
                <span className="hd-eyebrow-icon">
                  <i className="fa-solid fa-heart" aria-hidden="true" />
                </span>

                Hecho con dedicación
              </span>

              <h2 className="hd-title">
                Cada detalle <span>cuenta</span>
              </h2>

              <div className="hd-title-decoration">
                <span />
                <i className="fa-solid fa-star" aria-hidden="true" />
                <span />
              </div>

              <p className="hd-text">
                Trabajamos principalmente{" "}
                <strong>bajo pedido</strong> y con{" "}
                <strong>servicio a domicilio</strong>, preparando
                cada creación especialmente para nuestros clientes.
              </p>

              <p className="hd-text">
                Cuidamos cada etapa del proceso, desde la selección
                y preparación de nuestros productos hasta la
                decoración, presentación y entrega.
              </p>

              {/* =========================
                  SEGUNDA IMAGEN
              ========================= */}

              <div className="hd-secondary-image">
                <img
                  src="/img/conocenos/About_4.png"
                  alt="Detalles de una creación ChocoBerry"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display =
                      "flex";
                  }}
                />

                <div className="hd-secondary-fallback">
                  <i
                    className="fa-solid fa-image"
                    aria-hidden="true"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* =========================
              IMAGEN PRINCIPAL
          ========================= */}

          <div
            ref={imgRef}
            className={`col-12 col-lg-6 reveal reveal-right ${
              imgVisible ? "reveal-visible" : ""
            }`}
          >
            <div className="hd-visual">

              <div className="hd-decor hd-decor-one" />
              <div className="hd-decor hd-decor-two" />

              <div className="hd-image-frame">
                <div className="hd-image-wrap">

                  <img
                    src="/img/conocenos/About_3.jpeg"
                    alt="Preparación artesanal de fresas ChocoBerry"
                    className="hd-image"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display =
                        "flex";
                    }}
                  />

                  <div className="hd-image-fallback">
                    <i
                      className="fa-solid fa-image"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="hd-image-overlay" />

                </div>
              </div>

              {/* BADGE */}

              <div className="hd-badge">
                <span className="hd-badge-icon">
                  <i
                    className="fa-solid fa-heart"
                    aria-hidden="true"
                  />
                </span>

                <span className="hd-badge-text">
                  Hecho con
                  <strong>amor</strong>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}