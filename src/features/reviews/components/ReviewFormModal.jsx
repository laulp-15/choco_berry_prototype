import React, { useState } from 'react';
import './ReviewFormModal.css';

export default function ReviewFormModal({ isOpen, onClose, onSubmit }) {
  const [clientName, setClientName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim()) return;

    onSubmit({
      clientName,
      rating,
      comment,
      date: 'Hoy',
      tag: 'Cliente Satisfecho'
    });

    setClientName('');
    setComment('');
    setRating(5);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Botón de cierre */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
          <i className="fa-solid fa-xmark" style={{ fontSize: '1.1rem' }} aria-hidden="true" />
        </button>

        {/* Encabezado limpio en bloque */}
        <div className="modal-header">
          <h2>Tu opinión nos inspira ✨</h2>
          <p>Cuéntanos qué tal fue tu experiencia con ChocoBerry</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Estrellas */}
          <div className="form-group">
            <label>Calificación</label>
            <div className="star-picker">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="star-btn"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <i
                    className={(hoverRating || rating) >= star ? "fa-solid fa-star" : "fa-regular fa-star"}
                    style={{
                      fontSize: '1.6rem',
                      color: (hoverRating || rating) >= star ? "#F49B05" : "#D0C4C0"
                    }}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Input Nombre */}
          <div className="form-group">
            <label htmlFor="clientName">Tu Nombre</label>
            <input
              type="text"
              id="clientName"
              placeholder="Ej. María Camila"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>

          {/* Textarea Comentario */}
          <div className="form-group">
            <label htmlFor="comment">Tu Reseña</label>
            <textarea
              id="comment"
              rows="3"
              placeholder="¿Qué fue lo que más te gustó de tu pedido?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Botones */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              <span>Publicar Reseña</span>
              <i className="fa-solid fa-paper-plane" style={{ fontSize: '0.9rem' }} aria-hidden="true" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}