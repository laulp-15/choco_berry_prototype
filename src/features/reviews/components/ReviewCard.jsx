import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export default function ReviewCard({ review }) {
  // Obtener la inicial del nombre del cliente
  const initial = review.clientName ? review.clientName.charAt(0).toUpperCase() : 'C';

  return (
    <div className="review-card">
      <div className="review-card-top">
        <Quote className="quote-icon" size={32} />
        <span className="review-tag">{review.tag || 'Compra Verificada'}</span>
      </div>

      <p className="review-text">"{review.comment}"</p>

      <div className="review-stars-row">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < review.rating ? "#F49B05" : "#E2D9D5"}
            color={i < review.rating ? "#F49B05" : "#E2D9D5"}
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
            <CheckCircle2 size={15} className="verified-icon" title="Cliente verificado" />
          </h4>
          <span className="review-date">{review.date}</span>
        </div>
      </div>
    </div>
  );
}