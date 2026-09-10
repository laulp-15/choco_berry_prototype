// src/shared/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Phone, MapPin, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#471C26",
        color: "#ffffff",
        paddingTop: "3rem",
        paddingBottom: "1.5rem",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {/* COLUMNA 1: MARCA */}
        <div>
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#ffffff",
            }}
          >
            <span style={{ color: "#C2435A" }}>Choco</span>Berry
          </h3>
          <p style={{ color: "#E5DCD8", fontSize: "0.9rem", lineHeight: "1.6" }}>
            Detalles artesanales y fresas cubiertas con chocolate de alta calidad para endulzar momentos especiales.
          </p>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN RÁPIDA */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#F49B05",
            }}
          >
            Navegación
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            <li>
              <Link to="/" style={{ color: "#E5DCD8", textDecoration: "none", fontSize: "0.9rem" }}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/productos" style={{ color: "#E5DCD8", textDecoration: "none", fontSize: "0.9rem" }}>
                Catálogo de Productos
              </Link>
            </li>
            <li>
              <Link to="/conocenos" style={{ color: "#E5DCD8", textDecoration: "none", fontSize: "0.9rem" }}>
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="/reseñas" style={{ color: "#E5DCD8", textDecoration: "none", fontSize: "0.9rem" }}>
                Reseñas de Clientes
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMNA 3: CONTACTO & SÍGUENOS */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#F49B05",
            }}
          >
            Contacto
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
              color: "#E5DCD8",
              fontSize: "0.9rem",
              marginBottom: "1.8rem",
            }}
          >
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={18} color="#C2435A" />
              <span>Medellín, Colombia</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Phone size={18} color="#C2435A" />
              <span>+57 300 000 0000</span>
            </li>
          </ul>

          {/* REDES SOCIALES (Debajo de Contacto) */}
          <h5
            style={{
              fontSize: "0.95rem",
              fontWeight: "600",
              marginBottom: "0.8rem",
              color: "#F49B05",
            }}
          >
            Síguenos
          </h5>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href="https://www.instagram.com/fresasmedellin_?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram - @fresasmedellin_"
              style={{
                backgroundColor: "#7A3542",
                color: "#ffffff",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@fresasmedellin?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok - @fresasmedellin"
              style={{
                backgroundColor: "#7A3542",
                color: "#ffffff",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.39V9.08a6.32 6.32 0 1 0 6.34 6.26V9.45a8.21 8.21 0 0 0 4.77 1.51V7.51a4.82 4.82 0 0 1-1.00-.82z" />
              </svg>
            </a>
          </div>
        </div>

        {/* COLUMNA 4: DESARROLLADORES */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#F49B05",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Code size={18} color="#F49B05" />
            Desarrolladores
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              color: "#E5DCD8",
              fontSize: "0.9rem",
            }}
          >
            <li>Ana María Mesa E.</li>
            <li>Laura Sofia Ulloa P.</li>
            <li>Mariana Cardona M.</li>
          </ul>
        </div>
      </div>

      {/* DERECHOS DE AUTOR */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "2.5rem auto 0 auto",
          padding: "1.5rem 1.5rem 0 1.5rem",
          borderTop: "1px solid #7A3542",
          textAlign: "center",
          color: "#A0958F",
          fontSize: "0.85rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.3rem",
        }}
      >
        <span>© {new Date().getFullYear()} ChocoBerry. Hecho con</span>
        <Heart size={14} fill="#C2435A" color="#C2435A" />
        <span>para endulzar tus días.</span>
      </div>
    </footer>
  );
}