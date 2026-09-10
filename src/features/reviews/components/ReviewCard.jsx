import React from 'react';

export default function ReviewCard({ review }) {
  // Obtener la inicial del nombre del cliente
  const initial = review.clientName ? review.clientName.charAt(0).toUpperCase() : 'C';

  return (
    <div className="review-card">
      <div className="review-card-top">
        <i className="fa-solid fa-quote-left quote-icon" style={{ fontSize: '2rem' }} aria-hidden="true" />
        <span className="review-tag">{review.tag || 'Compra Verificada'}</span>
      </div>

      <p className="review-text">"{review.comment}"</p>

      <div className="review-stars-row">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={i < review.rating ? "fa-solid fa-star" : "fa-regular fa-star"}
            style={{
              fontSize: '1rem',
              color: i < review.rating ? "#F49B05" : "#E2D9D5"
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="review-card-footer">
        {/* Avatar basado en iniciales en lugar de foto */}
        <div className="avatar-initial">
          {initial}
        </div>
        <div className="user-details">
          <h4 className="user-name">
            {review.clientName}
            <i 
              className="fa-solid fa-circle-check verified-icon" 
              style={{ fontSize: '0.9rem', marginLeft: '0.3rem' }} 
              title="Cliente verificado" 
              aria-hidden="true" 
            />
          </h4>
          <span className="review-date">{review.date}</span>
        </div>
      </div>
    </div>
  );
}