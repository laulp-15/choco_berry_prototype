import React, { useState } from 'react';
import { useReviews } from '../hooks/useReviews';
import ReviewCard from '../components/ReviewCard';
import ReviewFormModal from '../components/ReviewFormModal';
import { Star, MessageSquarePlus, HeartHandshake, Sparkles } from 'lucide-react';
import './ReviewsPage.css';

export default function ReviewsPage() {
  const { reviews, loading, addReview } = useReviews();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="reviews-page-wrapper">
      {/* Fondo Decorativo Sutil */}
      <div className="bg-glow-pink"></div>
      <div className="bg-glow-choco"></div>

      <div className="reviews-page-container">
        
        {/* ENCABEZADO DESTACADO */}
        <header className="reviews-hero">
          <div className="hero-badge">
            <Sparkles size={14} />
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
                    <Star key={i} size={18} fill="#F49B05" color="#F49B05" />
                  ))}
                </div>
                <span className="count-label">Basado en opiniones reales</span>
              </div>
            </div>

            <button className="btn-add-review-hero" onClick={() => setIsModalOpen(true)}>
              <MessageSquarePlus size={20} />
              <span>Dejar mi Reseña</span>
            </button>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="reviews-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Cargando comentarios llenos de dulzura...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="empty-state">
              <HeartHandshake size={48} color="#7A3245" />
              <h3>¡Sé el primero en opinar!</h3>
              <p>Aún no hay reseñas registradas. Cuéntanos tu experiencia con ChocoBerry.</p>
              <button className="btn-add-review-hero" onClick={() => setIsModalOpen(true)}>
                Escribir Reseña
              </button>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((item) => (
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