// src/features/login/components/AuthLayout.jsx

import React from "react";

import {
  Link,
} from "react-router-dom";

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
     ============================================================ */

  const logoSrc =
    theme === "dark"
      ? "/img/Logo/LogoDark_2.png"
      : "/img/Logo/LogoLight_2.png";

  /* ============================================================
     VARIANTE
     ============================================================ */

  const isSplit =
    variant === "split";

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
            PANEL IZQUIERDO / IMAGEN
            ====================================================== */}

        {isSplit && (
          <aside className="auth-visual">

            {/* IMAGEN */}

            {image && (
              <div className="auth-visual-media">

                <img
                  src={image}
                  alt={imageAlt}
                  className="auth-visual-image"
                />

                {/* OVERLAY */}

                <div className="auth-visual-overlay" />

              </div>
            )}

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
            PANEL DERECHO / FORMULARIO
            ====================================================== */}

        <section className="auth-panel">

          <div className="auth-panel-inner">

            {/* ==================================================
                LOGO
                ================================================== */}

            <Link
            
              className="auth-logo-link auth-logo-link--form"
              
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