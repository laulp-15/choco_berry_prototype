// src/features/login/components/AuthLayout.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./AuthLayout.css";

export default function AuthLayout({
  variant = "split",
  image,
  imageAlt = "Chocoberry",
  visualEyebrow,
  visualTitle,
  title,
  subtitle,
  children,
  footer,
}) {
  /* ============================================================
     TEMA
     ============================================================ */

  const theme = "light";

  /* ============================================================
     LOGO
     
     IMPORTANTE:
     Si la imagen está en:
     
     public/img/Logo/logo_login.jpg
     
     entonces en React se llama con:
   
     ============================================================ */

  const logoSrc =
    theme === "dark"
      ? "/img/Logo/LogoDark_2.png"
      : "/img/Login/logo_login.png";

  /* ============================================================
     VARIANTE
     ============================================================ */

  const isSplit = variant === "split";
  const isCentered = variant === "centered";

  return (
    <main
      className={`auth-layout auth-layout--${variant}`}
      data-theme={theme}
    >
      {/* ========================================================
          CONTENEDOR PRINCIPAL
          ======================================================== */}

      <div className="auth-container">

        {/* ======================================================
            IMAGEN
            ======================================================

            En split:
            aparece como panel izquierdo.

            En centered:
            funciona como fondo detrás del formulario.
            ====================================================== */}

        {(isSplit || isCentered) && image && (
          <aside className="auth-visual">

            {/* IMAGEN */}

            <div className="auth-visual-media">
              <img
                src={image}
                alt={imageAlt}
                className="auth-visual-image"
              />

              {/* OVERLAY */}

              <div className="auth-visual-overlay" />
            </div>

            {/* CONTENIDO SOBRE LA IMAGEN */}

            {(visualEyebrow || visualTitle) && (
              <div className="auth-visual-content">
                <div className="auth-visual-caption">

                  {visualEyebrow && (
                    <span className="auth-visual-eyebrow">
                      {visualEyebrow}
                    </span>
                  )}

                  {visualTitle && (
                    <h2 className="auth-visual-title">
                      {visualTitle}
                    </h2>
                  )}

                </div>
              </div>
            )}

          </aside>
        )}

        {/* ======================================================
            PANEL DEL FORMULARIO
            ====================================================== */}

        <section className="auth-panel">

          <div className="auth-panel-inner">

            {/* ==================================================
                LOGO
                ================================================== */}

            <Link
              to="/"
              className="auth-logo-link auth-logo-link--form"
              aria-label="Ir al inicio de Chocoberry"
            >
              <img
                src={logoSrc}
                alt="Chocoberry"
                className="auth-logo"
              />
            </Link>

            {/* ==================================================
                CABECERA
                ================================================== */}

            {(title || subtitle) && (
              <header className="auth-panel-header">

                {title && (
                  <h1 className="auth-panel-title">
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <p className="auth-panel-subtitle">
                    {subtitle}
                  </p>
                )}

              </header>
            )}

            {/* ==================================================
                CONTENIDO
                ================================================== */}

            <div className="auth-panel-content">
              {children}
            </div>

            {/* ==================================================
                FOOTER
                ================================================== */}

            {footer && (
              <footer className="auth-panel-footer">
                {footer}
              </footer>
            )}

          </div>

        </section>

      </div>
    </main>
  );
}