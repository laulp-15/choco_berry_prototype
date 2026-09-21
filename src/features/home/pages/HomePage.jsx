import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import "../components/Home.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [currentReview, setCurrentReview] = useState(0);

  const categories = [
    {
      id: 1,
      title: "Cumpleaños",
      description:
        "Detalles dulces y personalizados para celebrar un año más de vida.",
      image: "/img/categorias/hbd tqm nb.jpg",
      tag: "Celebración",
    },
    {
      id: 2,
      title: "Fechas Especiales",
      description:
        "Arreglos exclusivos para San Valentín, Día de la Madre y más.",
      image: "/img/categorias/feliz dia mujer rb.jpg",
      tag: "Momentos",
    },
    {
      id: 3,
      title: "Aniversarios",
      description:
        "Expresa tu amor con combinaciones elegantes de chocolate.",
      image: "/img/categorias/feliz aniversario.jpg",
      tag: "Romance",
    },
    {
      id: 4,
      title: "Regalos Sorpresa",
      description:
        "Cajas sorpresas llenas de sabor para robar sonrisas imprevistas.",
      image: "/img/categorias/mi hermoso nb.jpg",
      tag: "Detalles",
    },
  ];

  const reviews = [
    {
      id: 1,
      comment:
        "¡Las fresas cubiertas con chocolate superaron mis expectativas! Llegaron súper frescas y la presentación fue hermosa.",
      client: "María Fernanda G.",
      badge: "Cliente Verificado",
    },
    {
      id: 2,
      comment:
        "El detalle perfecto para nuestro aniversario. La combinación del chocolate dorado y los arreglos florales es increíble.",
      client: "Carlos Mendoza",
      badge: "Cliente Frecuente",
    },
    {
      id: 3,
      comment:
        "Sabor inigualable y la entrega fue muy puntual. Definitivamente volveré a pedir para mis ocasiones especiales.",
      client: "Valeria Gómez",
      badge: "Cliente Verificado",
    },
  ];

  const nextReview = () =>
    setCurrentReview((prev) => (prev + 1) % reviews.length);

  const prevReview = () =>
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="home-page-wrapper">

      {/* =====================================================
          1. CARRUSEL PRINCIPAL
          ===================================================== */}
      <HeroBanner />


      {/* =====================================================
          2. CONTENEDOR PRINCIPAL
          ===================================================== */}
      <div className="home-container">

        {/* =================================================
            SECCIÓN PILARES
            ================================================= */}
        <section className="pillars-section">

          <div className="pillars-header">
            <span className="section-badge">
              ¿Por qué elegirnos?
            </span>

            <h2 className="pillars-title">
              La Experiencia Chocoberry
            </h2>
          </div>


          <div className="pillars-grid">

            {/* PILLAR 1 */}
            <div className="pillar-card">

              <span className="pillar-tag">
                100% Cacao
              </span>

              <div className="pillar-icon-wrapper">
                <div className="pillar-icon">
                  <i className="fa-solid fa-heart" />
                </div>
              </div>

              <h3 className="pillar-title">
                Sabor Irresistible
              </h3>

              <p className="pillar-text">
                Elaborados con chocolate de cobertura premium y
                fresas frescas seleccionadas diariamente.
              </p>

              <ul className="pillar-list">
                <li>
                  <i className="fa-solid fa-check" />
                  Cacao fino de aroma
                </li>

                <li>
                  <i className="fa-solid fa-check" />
                  Fruta 100% natural
                </li>
              </ul>

            </div>


            {/* PILLAR 2 */}
            <div className="pillar-card highlight">

              <span className="pillar-tag badge-star">
                Más Popular
              </span>

              <div className="pillar-icon-wrapper">
                <div className="pillar-icon">
                  <i className="fa-solid fa-gift" />
                </div>
              </div>

              <h3 className="pillar-title">
                Presentación Única
              </h3>

              <p className="pillar-text">
                Cada arreglo se diseña artesanalmente con empaques
                de lujo y detalles personalizados.
              </p>

              <ul className="pillar-list">
                <li>
                  <i className="fa-solid fa-check" />
                  Cajas de diseño exclusivo
                </li>

                <li>
                  <i className="fa-solid fa-check" />
                  Tarjeta con dedicatoria
                </li>
              </ul>

            </div>


            {/* PILLAR 3 */}
            <div className="pillar-card">

              <span className="pillar-tag">
                Garantía
              </span>

              <div className="pillar-icon-wrapper">
                <div className="pillar-icon">
                  <i className="fa-solid fa-award" />
                </div>
              </div>

              <h3 className="pillar-title">
                Calidad Garantizada
              </h3>

              <p className="pillar-text">
                Procesos cuidadosos de desinfección y armado para
                garantizar la máxima frescura.
              </p>

              <ul className="pillar-list">
                <li>
                  <i className="fa-solid fa-check" />
                  Envíos en transporte frío
                </li>

                <li>
                  <i className="fa-solid fa-check" />
                  Entrega puntual asegurada
                </li>
              </ul>

            </div>

          </div>
        </section>


        {/* =====================================================
            3. SECCIÓN TIKTOK
            ===================================================== */}
        <section className="tiktok-section">

          <div className="tiktok-header">
            <span className="section-badge">
              Síguenos
            </span>

            <h2 className="tiktok-title">
              Conoce más de Chocoberry
            </h2>

            <p className="tiktok-subtitle">
              Descubre nuestras creaciones, detalles y momentos especiales.
            </p>
          </div>


          <div className="tiktok-content">

            {/* Decoración izquierda */}
            <div className="tiktok-decoration tiktok-decoration-left">
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-strawberry"></i>
              <i className="fa-solid fa-heart"></i>
            </div>


            {/* Marco del video */}
            <div className="tiktok-phone">

              <div className="tiktok-phone-header">
                <span className="tiktok-camera"></span>
                <span className="tiktok-speaker"></span>
              </div>

              <iframe
                src="https://www.tiktok.com/player/v1/7119258539125656837?description=1&music_info=1"
                title="Video de Chocoberry en TikTok"
                className="tiktok-video"
                allow="fullscreen; autoplay"
                scrolling="no"
              />

              <div className="tiktok-phone-bottom">
                <span></span>
              </div>

            </div>


            {/* Información derecha */}
            <div className="tiktok-info">

              <span className="tiktok-small-title">
                CHOCOBERRY
              </span>

              <h3>
                Un poquito de lo que hacemos 
              </h3>

              <p>
                Conoce nuestras fresas, diseños y detalles
                preparados especialmente para cada ocasión.
              </p>

              <div className="tiktok-features">

                <div className="tiktok-feature">
                  <i className="fa-solid fa-heart"></i>
                  <span>Detalles personalizados</span>
                </div>

                <div className="tiktok-feature">
                  <i className="fa-solid fa-gift"></i>
                  <span>Presentaciones especiales</span>
                </div>

                <div className="tiktok-feature">
                  <i className="fa-solid fa-star"></i>
                  <span>Elaborados con cariño</span>
                </div>

              </div>

              <a
                href="https://www.tiktok.com/@fresasmedellin"
                target="_blank"
                rel="noopener noreferrer"
                className="tiktok-button"
              >
                Ver nuestro TikTok
                <i className="fa-solid fa-arrow-right"></i>
              </a>

            </div>


            {/* Decoración derecha */}
            <div className="tiktok-decoration tiktok-decoration-right">
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-heart"></i>
            </div>

          </div>

        </section>


        {/* =====================================================
            4. SECCIÓN CATEGORÍAS
            ===================================================== */}
        <section className="categories-section">

          <div className="categories-header">

            <span className="section-badge">
              Nuestra Colección
            </span>

            <h2 className="categories-title">
              Categorías de Nuestros Productos
            </h2>

            <p className="categories-subtitle">
              Explora nuestras creaciones diseñadas para cada
              momento especial
            </p>

          </div>


          <div className="categories-grid">

            {categories.map((cat) => (

              <div
                key={cat.id}
                className="category-card"
                onClick={() => navigate("/productos")}
                role="button"
                tabIndex={0}
              >

                <div className="category-image-wrapper">

                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="category-img"
                  />

                  <span className="category-tag">
                    {cat.tag}
                  </span>

                  <div className="category-overlay">

                    <span className="view-more-btn">
                      Ver Productos
                      <i className="fa-solid fa-arrow-right" />
                    </span>

                  </div>

                </div>


                <div className="category-content">

                  <h3 className="category-card-title">
                    {cat.title}
                  </h3>

                  <p className="category-card-desc">
                    {cat.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================================
            5. SECCIÓN RESEÑAS (MODERNA E INTERACTIVA)
            ===================================================== */}
        <section className="reviews-section">

          <div className="reviews-header-modern">
            <span className="section-badge">
              Testimonios
            </span>
            <h2 className="reviews-title">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="reviews-subtitle">
              Experiencias dulces compartidas por quienes ya probaron la magia de Chocoberry
            </p>
          </div>

          <div className="reviews-interactive-wrapper">
            
            {/* Botón Anterior */}
            <button
              className="review-arrow-btn btn-left-modern"
              onClick={prevReview}
              title="Reseña anterior"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>

            {/* Tarjeta de Reseña Central */}
            <div className="review-card-modern" key={reviews[currentReview].id}>
              <div className="quote-watermark">
                <i className="fa-solid fa-quote-left"></i>
              </div>

              <div className="stars-wrapper">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fa-solid fa-star star-icon" />
                ))}
              </div>

              <p className="review-comment-modern">
                "{reviews[currentReview].comment}"
              </p>

              <div className="client-info-wrapper">
                <div className="client-avatar">
                  {reviews[currentReview].client.charAt(0)}
                </div>
                <div className="client-details">
                  <h4 className="client-name-modern">{reviews[currentReview].client}</h4>
                  <span className="client-badge-modern">
                    <i className="fa-solid fa-circle-check" /> {reviews[currentReview].badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Botón Siguiente */}
            <button
              className="review-arrow-btn btn-right-modern"
              onClick={nextReview}
              title="Reseña siguiente"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>

          </div>

          {/* Indicadores Interactivos con Iniciales */}
          <div className="reviews-avatars-indicators">
            {reviews.map((rev, idx) => (
              <button
                key={rev.id}
                className={`avatar-dot ${idx === currentReview ? "active" : ""}`}
                onClick={() => setCurrentReview(idx)}
                title={`Ver reseña de ${rev.client}`}
              >
                <span>{rev.client.charAt(0)}</span>
                <span className="dot-tooltip">{rev.client}</span>
              </button>
            ))}
          </div>

        </section>

      </div>

    </div>
  );
}