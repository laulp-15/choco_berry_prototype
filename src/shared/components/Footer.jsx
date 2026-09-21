import React from "react";
import { Link } from "react-router-dom";

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

          // Las 5 columnas quedan en una misma fila
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",

          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* 1. LOGO */}
        <div>
         <img
  src="/img/Logo/LogoDark_2.png"
  alt="ChocoBerry"
  style={{
    width: "200px",
    height: "auto",
    marginBottom: "1rem",
    display: "block",
  }}
/>


          <p
            style={{
              color: "#E5DCD8",
              fontSize: "0.9rem",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Detalles artesanales y fresas cubiertas con chocolate de alta
            calidad para endulzar momentos especiales.
          </p>
        </div>

        {/* 2. NAVEGACIÓN */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#FCFAF8",
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
              <Link
                to="/"
                style={{
                  color: "#E5DCD8",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Inicio
              </Link>
            </li>

            <li>
              <Link
                to="/productos"
                style={{
                  color: "#E5DCD8",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Catálogo de Productos
              </Link>
            </li>

            <li>
              <Link
                to="/conocenos"
                style={{
                  color: "#E5DCD8",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Sobre Nosotros
              </Link>
            </li>

            <li>
              <Link
                to="/reseñas"
                style={{
                  color: "#E5DCD8",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Reseñas de Clientes
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. CONTACTO */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#FAF9F8",
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
            }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <i
                className="fa-solid fa-location-dot"
                style={{
                  color: "#C2435A",
                  fontSize: "1rem",
                }}
              />
              <span>Medellín, Colombia</span>
            </li>

            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <i
                className="fa-solid fa-phone"
                style={{
                  color: "#C2435A",
                  fontSize: "1rem",
                }}
              />
              <span>+57 300 000 0000</span>
            </li>
          </ul>

          <h5
            style={{
              fontSize: "0.95rem",
              fontWeight: "600",
              marginTop: "1.8rem",
              marginBottom: "0.8rem",
              color: "#F7F4EF",
            }}
          >
            Síguenos
          </h5>

          <div
            style={{
              display: "flex",
              gap: "0.8rem",
            }}
          >
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
              <i className="fa-brands fa-instagram" />
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
              <i className="fa-brands fa-tiktok" />
            </a>
          </div>
        </div>

        {/* 4. HORARIOS */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#FCFBF9",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <i
              className="fa-regular fa-clock"
              style={{
                color: "#C2435A",
              }}
            />
            Horarios
          </h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 0.3rem",
                  color: "#C2435A",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                }}
              >
                Atención
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#E5DCD8",
                  fontSize: "0.9rem",
                }}
              >
                7:00 a. m. - 12:00 p. m.
              </p>
            </div>

            <div>
              <p
                style={{
                  margin: "0 0 0.3rem",
                  color: "#C2435A",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                }}
              >
                Entregas
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#E5DCD8",
                  fontSize: "0.9rem",
                }}
              >
                1:00 p. m. - 7:00 p. m.
              </p>
            </div>
          </div>
        </div>

        {/* 5. DESARROLLADORES */}
        <div>
          <h4
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#FCFBF9",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <i
              className="fa-solid fa-code"
              style={{
                color: "#C2435A",
              }}
            />
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
          margin: "2.5rem auto 0",
          padding: "1.5rem 1.5rem 0",

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
        <span>
          © {new Date().getFullYear()} ChocoBerry. Hecho con amor
        </span>

        <span>para endulzar tus días.</span>
      </div>
    </footer>
  );
}