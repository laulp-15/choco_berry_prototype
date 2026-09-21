import React from 'react';

export default function ReviewDetailModal({ isOpen, onClose, review }) {
  if (!isOpen || !review) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#471C26', fontSize: '1.3rem', fontWeight: 'bold' }}>
            Detalle de la Reseña
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5A54' }}>
            <i className="fa-solid fa-xmark" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ backgroundColor: '#FDF2F4', padding: '1rem', borderRadius: '12px' }}>
            <h3 style={{ margin: 0, color: '#471C26', fontSize: '1.1rem' }}>{review.cliente}</h3>
            <span style={{ fontSize: '0.85rem', color: '#6B5A54', marginTop: '0.2rem', display: 'block' }}>Producto: <strong>{review.producto}</strong></span>
          </div>

          <div>
            <label style={{ color: '#6B5A54', fontWeight: 'bold', fontSize: '0.8rem', display: 'block', marginBottom: '0.3rem' }}>CALIFICACIÓN</label>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={star <= review.calificacion ? "fa-solid fa-star" : "fa-regular fa-star"}
                  style={{
                    fontSize: '1.25rem',
                    color: star <= review.calificacion ? '#FFB800' : '#EADBDA'
                  }}
                  aria-hidden="true"
                />
              ))}
              <span style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: '#471C26', fontSize: '0.95rem' }}>{review.calificacion}/5</span>
            </div>
          </div>

          <div>
            <label style={{ color: '#6B5A54', fontWeight: 'bold', fontSize: '0.8rem', display: 'block' }}>FECHA</label>
            <p style={{ color: '#471C26', marginTop: '0.3rem', fontSize: '0.95rem' }}>{review.fecha}</p>
          </div>

          <div>
            <label style={{ color: '#6B5A54', fontWeight: 'bold', fontSize: '0.8rem', display: 'block' }}>COMENTARIO</label>
            <p style={{ color: '#471C26', marginTop: '0.3rem', fontSize: '0.95rem', backgroundColor: '#FAFAFA', padding: '0.8rem', borderRadius: '8px', border: '1px solid #F5EFEA' }}>
              "{review.comentario}"
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button onClick={onClose} style={{ backgroundColor: '#E63950', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}