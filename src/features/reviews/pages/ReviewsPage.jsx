import React, { useState } from 'react';
import { useReviews } from '../hooks/useReviews';
import ReviewCard from '../components/ReviewCard';
import ReviewFormModal from '../components/ReviewFormModal';
import './ReviewsPage.css';

export default function ReviewsPage() {
  const { reviews, loading, addReview } = useReviews();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado para controlar el filtro de estrellas (null u 0 significa "Todas")
  const [selectedRating, setSelectedRating] = useState(null);

  // Filtrar las reseñas según la estrella seleccionada
  const filteredReviews = selectedRating 
    ? reviews.filter((review) => Number(review.rating) === Number(selectedRating))
    : reviews;

  return (
    <div className="reviews-page-wrapper">
      {/* Fondo Decorativo Sutil */}
      <div className="bg-glow-pink"></div>
      <div className="bg-glow-choco"></div>

      <div className="reviews-page-container">
        
        {/* ENCABEZADO DESTACADO */}
        <header className="reviews-hero">
          <div className="hero-badge">
            <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
            <span>Voces de ChocoBerry</span>
          </div>
          <h1>Historias que nos <span className="highlight-text">Endulzan</span></h1>
          <p className="hero-subtitle">
            Descubre por qué nuestros clientes eligen ChocoBerry para regalar amor y momentos inolvidables en Medellín.
          </p>

          {/* TARJETA RESUMEN DE CALIFICACIÓN */}
          <div className="rating-summary-hero">
            <div className="score-block">
              <div className="big-number">4.9</div>
              <div className="stars-and-label">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className="fa-solid fa-star" 
                      style={{ color: '#F49B05', fontSize: '1.1rem' }} 
                      aria-hidden="true" 
                    />
                  ))}
                </div>
                <span className="count-label">Basado en opiniones reales</span>
              </div>
            </div>

            <button className="btn-add-review-hero" onClick={() => setIsModalOpen(true)}>
              <i className="fa-solid fa-comment-medical" aria-hidden="true" />
              <span>Dejar mi Reseña</span>
            </button>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="reviews-content">
          
          {/* BARRA DE FILTROS POR ESTRELLAS */}
          <div className="reviews-filter-bar" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setSelectedRating(null)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid #7A3245',
                backgroundColor: selectedRating === null ? '#7A3245' : 'transparent',
                color: selectedRating === null ? '#fff' : '#7A3245',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              Todas
            </button>

            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid #7A3245',
                  backgroundColor: selectedRating === star ? '#7A3245' : 'transparent',
                  color: selectedRating === star ? '#fff' : '#7A3245',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.2s'
                }}
              >
                <span>{star}</span>
                <i className="fa-solid fa-star" style={{ color: selectedRating === star ? '#F49B05' : '#F49B05', fontSize: '0.9rem' }} />
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Cargando comentarios llenos de dulzura...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="empty-state">
              <i 
                className="fa-solid fa-handshake-angle" 
                style={{ fontSize: '3rem', color: '#7A3245' }} 
                aria-hidden="true" 
              />
              <h3>No hay reseñas con este filtro</h3>
              <p>Intenta seleccionando otro número de estrellas o sé el primero en opinar.</p>
            </div>
          ) : (
            <div className="reviews-grid">
              {filteredReviews.map((item) => (
                <ReviewCard key={item.id} review={item} />
              ))}
            </div>
          )}
        </main>

        {/* MODAL PARA NUEVA RESEÑA */}
        <ReviewFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={addReview} 
        />

      </div>
    </div>
  );
}