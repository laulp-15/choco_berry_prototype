import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductFormModal from '../components/ProductFormModal';

export default function ProductsListPage() {
  const {
    searchTerm,
    handleSearchChange,
    statusFilter,
    handleStatusFilterChange,
    currentPage,
    totalPages,
    handlePageChange,
    isModalOpen,
    setIsModalOpen,
    isDetailOpen,
    setIsDetailOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedProduct,
    productToEdit,
    currentProducts,
    totalProductsCount,
    handleToggleStatus,
    handleSaveProduct,
    handleConfirmDelete,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetail,
    handleOpenDelete
  } = useProducts();

  return (
    <div style={{ padding: '2rem', backgroundColor: '#FAFAFA', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#471C26', margin: 0 }}>Productos</h1>
      <p style={{ color: '#6B5A54', marginTop: '0.4rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Consulta y administra el catálogo de productos de ChocoBerry.
      </p>

      {/* FILTROS Y BÚSQUEDA */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleOpenCreate}
          style={{
            backgroundColor: '#E63950',
            color: '#ffffff',
            border: 'none',
            padding: '0.65rem 1.2rem',
            borderRadius: '25px',
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(230, 57, 80, 0.2)',
          }}
        >
          <i className="fa-solid fa-plus" aria-hidden="true" />
          Crear producto
        </button>

        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Buscar producto, descripción o categoría..."
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
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#A0958F', fontSize: '0.9rem' }}
            aria-hidden="true"
          />
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
          <i className="fa-solid fa-filter" style={{ color: '#E63950' }} aria-hidden="true" />
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

      {/* TABLA DE PRODUCTOS */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#FCE8EC', color: '#471C26', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Nombre</th>
              <th style={{ padding: '1rem 1.5rem' }}>Descripción</th>
              <th style={{ padding: '1rem 1.5rem' }}>Categoría</th>
              <th style={{ padding: '1rem 1.5rem' }}>Precio</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((prod, index) => (
                <tr
                  key={prod.id}
                  style={{
                    borderBottom: index !== currentProducts.length - 1 ? '1px solid #F5EFEA' : 'none',
                    fontSize: '0.9rem',
                    color: '#471C26',
                  }}
                >
                  <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>
                    {prod.nombre}
                  </td>

                  <td style={{ padding: '1rem 1.5rem', color: '#6B5A54', maxWidth: '300px' }}>
                    {prod.descripcion}
                  </td>

                  <td style={{ padding: '1rem 1.5rem', color: '#6B5A54' }}>
                    {prod.categoria}
                  </td>

                  <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold', color: '#E63950' }}>
                    ${prod.precio.toLocaleString()}
                  </td>

                  {/* SWITCH TOGGLE */}
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleToggleStatus(prod.id)}
                      style={{
                        width: '46px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: prod.estado === 'Activo' ? '#2E7D32' : '#E8D7DC',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background-color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px'
                      }}
                      title={`Estado: ${prod.estado}. Clic para cambiar.`}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          position: 'absolute',
                          left: prod.estado === 'Activo' ? '24px' : '2px',
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
                        onClick={() => handleOpenDetail(prod)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5A54' }} 
                        title="Ver detalle"
                      >
                        <i className="fa-solid fa-eye" style={{ fontSize: '0.95rem' }} aria-hidden="true" />
                      </button>
                      <button 
                        onClick={() => handleOpenEdit(prod)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E63950' }} 
                        title="Editar"
                      >
                        <i className="fa-solid fa-pen-to-square" style={{ fontSize: '0.95rem' }} aria-hidden="true" />
                      </button>
                      <button 
                        onClick={() => handleOpenDelete(prod)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E63950' }} 
                        title="Eliminar"
                      >
                        <i className="fa-solid fa-trash-can" style={{ fontSize: '0.95rem' }} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6B5A54' }}>
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINACIÓN */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#FAFAFA', borderTop: '1px solid #F5EFEA' }}>
          <span style={{ fontSize: '0.85rem', color: '#6B5A54' }}>
            Mostrando {currentProducts.length} de {totalProductsCount} productos
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
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Anterior
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
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              Siguiente <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>

      {/* MODAL CREAR / EDITAR */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveProduct}
        initialData={productToEdit}
      />

      {/* MODAL VER DETALLE */}
      <ProductFormModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        initialData={selectedProduct}
        isReadOnly={true}
      />

      {/* MODAL CONFIRMAR ELIMINACIÓN */}
      {isDeleteOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '1.8rem', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#FDF2F4', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ color: '#E63950', fontSize: '1.25rem' }} aria-hidden="true" />
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#471C26' }}>¿Eliminar producto?</h3>
            <p style={{ color: '#6B5A54', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>
              ¿Estás seguro de que deseas eliminar el producto <strong>"{selectedProduct?.nombre}"</strong>? Esta acción no se puede deshacer.
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