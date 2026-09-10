import React from 'react';
import { Search, Filter, Eye, Trash2, AlertTriangle, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useReviews } from '../hooks/useReviews';
import ReviewDetailModal from '../components/ReviewDetailModal';

export default function ReviewsListPage() {
  const {
    searchTerm,
    handleSearchChange,
    statusFilter,
    handleStatusFilterChange,
    currentPage,
    totalPages,
    handlePageChange,
    isDetailOpen,
    setIsDetailOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedReview,
    currentReviews,
    totalReviewsCount,
    handleToggleStatus,
    handleConfirmDelete,
    handleOpenDetail,
    handleOpenDelete
  } = useReviews();

  return (
    <div style={{ padding: '2rem', backgroundColor: '#FAFAFA', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#471C26', margin: 0 }}>Reseñas</h1>
      <p style={{ color: '#6B5A54', marginTop: '0.4rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Consulta y gestiona las calificaciones y comentarios enviados por los clientes.
      </p>

      {/* FILTROS Y BÚSQUEDA */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Buscar por cliente, producto o comentario..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              borderRadius: '25px',
              border: '1px solid #EADBDA',
              backgroundColor: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <Search size={18} color="#A0958F" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <button
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #EADBDA',
            padding: '0.65rem 1.2rem',
            borderRadius: '25px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#471C26',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
          }}
        >
          <Filter size={16} color="#E63950" />
          Filtros
        </button>

        <select
          value={statusFilter}
          onChange={(e) => handleStatusFilterChange(e.target.value)}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #EADBDA',
            padding: '0.65rem 1.2rem',
            borderRadius: '12px',
            fontSize: '0.9rem',
            color: '#6B5A54',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="todos">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      {/* TABLA DE RESEÑAS */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#FCE8EC', color: '#471C26', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Cliente</th>
              <th style={{ padding: '1rem 1.5rem' }}>Producto</th>
              <th style={{ padding: '1rem 1.5rem' }}>Calificación</th>
              <th style={{ padding: '1rem 1.5rem' }}>Comentario</th>
              <th style={{ padding: '1rem 1.5rem' }}>Fecha</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review, index) => (
                <tr
                  key={review.id}
                  style={{
                    borderBottom: index !== currentReviews.length - 1 ? '1px solid #F5EFEA' : 'none',
                    fontSize: '0.9rem',
                    color: '#471C26',
                  }}
                >
                  <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>
                    {review.cliente}
                  </td>

                  <td style={{ padding: '1rem 1.5rem', color: '#6B5A54' }}>
                    {review.producto}
                  </td>

                  {/* CALIFICACIÓN CON ESTRELLAS */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={star <= review.calificacion ? '#FFB800' : 'none'}
                          color={star <= review.calificacion ? '#FFB800' : '#EADBDA'}
                        />
                      ))}
                    </div>
                  </td>

                  {/* COMENTARIO */}
                  <td style={{ padding: '1rem 1.5rem', color: '#6B5A54', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {review.comentario}
                  </td>

                  {/* FECHA */}
                  <td style={{ padding: '1rem 1.5rem', color: '#6B5A54', fontSize: '0.85rem' }}>
                    {review.fecha}
                  </td>

                  {/* ESTADO (SWITCH TOGGLE) */}
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleToggleStatus(review.id)}
                      style={{
                        width: '46px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: review.estado === 'Activo' ? '#2E7D32' : '#E8D7DC',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background-color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px'
                      }}
                      title={`Estado: ${review.estado}. Clic para cambiar.`}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          position: 'absolute',
                          left: review.estado === 'Activo' ? '24px' : '2px',
                          transition: 'left 0.2s ease',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        }}
                      />
                    </button>
                  </td>

                  {/* ACCIONES */}
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <button 
                        onClick={() => handleOpenDetail(review)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5A54' }} 
                        title="Ver detalle"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleOpenDelete(review)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E63950' }} 
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#6B5A54' }}>
                  No se encontraron reseñas.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINACIÓN */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#FAFAFA', borderTop: '1px solid #F5EFEA' }}>
          <span style={{ fontSize: '0.85rem', color: '#6B5A54' }}>
            Mostrando {currentReviews.length} de {totalReviewsCount} reseñas
          </span>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                background: 'none',
                border: 'none',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                color: currentPage === 1 ? '#C5BDBA' : '#471C26',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              <ArrowLeft size={16} /> Anterior
            </button>

            <span style={{ fontSize: '0.85rem', color: '#471C26', fontWeight: 'bold', padding: '0 0.5rem' }}>
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                background: 'none',
                border: 'none',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                color: currentPage === totalPages ? '#C5BDBA' : '#471C26',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              Siguiente <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* MODAL VER DETALLE */}
      <ReviewDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        review={selectedReview}
      />

      {/* MODAL CONFIRMAR ELIMINACIÓN */}
      {isDeleteOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '1.8rem', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#FDF2F4', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <AlertTriangle size={24} color="#E63950" />
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#471C26' }}>¿Eliminar reseña?</h3>
            <p style={{ color: '#6B5A54', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>
              ¿Estás seguro de que deseas eliminar la reseña de <strong>"{selectedReview?.cliente}"</strong>? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
              <button onClick={() => setIsDeleteOpen(false)} style={{ backgroundColor: '#F5EFEA', color: '#471C26', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={handleConfirmDelete} style={{ backgroundColor: '#E63950', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}