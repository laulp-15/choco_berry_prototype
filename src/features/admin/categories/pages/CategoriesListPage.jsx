// src/features/admin/categories/pages/CategoriesListPage.jsx
import React from 'react';
import { Plus, Search, Filter, Eye, Edit3, Trash2, Heart, User, Sparkles, Cake, Calendar, Gift, AlertTriangle } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import CategoryFormModal from '../components/CategoryFormModal';

const renderIcon = (name) => {
  const props = { size: 18, color: '#C2435A' };
  switch (name) {
    case 'Heart': return <Heart {...props} />;
    case 'User': return <User {...props} color="#471C26" />;
    case 'Sparkles': return <Sparkles {...props} color="#F49B05" />;
    case 'Cake': return <Cake {...props} />;
    case 'Calendar': return <Calendar {...props} />;
    default: return <Gift {...props} color="#F49B05" />;
  }
};

export default function CategoriesListPage() {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    isDetailOpen,
    setIsDetailOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedCategory,
    categoryToEdit,
    filteredCategorias,
    handleToggleStatus,
    handleSaveCategory,
    handleConfirmDelete,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetail,
    handleOpenDelete
  } = useCategories();

  return (
    <div style={{ padding: '2rem', backgroundColor: '#FAFAFA', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#471C26', margin: 0 }}>Categorías</h1>
      <p style={{ color: '#6B5A54', marginTop: '0.4rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Consulta y administra las categorías de productos del negocio.
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
          <Plus size={18} />
          Crear categoría
        </button>

        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Buscar por categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          onChange={(e) => setStatusFilter(e.target.value)}
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

      {/* TABLA DE CATEGORÍAS */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#FCE8EC', color: '#471C26', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Categoría</th>
              <th style={{ padding: '1rem 1.5rem' }}>Descripción</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategorias.map((cat, index) => (
              <tr
                key={cat.id}
                style={{
                  borderBottom: index !== filteredCategorias.length - 1 ? '1px solid #F5EFEA' : 'none',
                  fontSize: '0.9rem',
                  color: '#471C26',
                }}
              >
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ backgroundColor: '#FDF2F4', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderIcon(cat.iconName)}
                    </div>
                    <span>{cat.nombre}</span>
                  </div>
                </td>

                <td style={{ padding: '1rem 1.5rem', color: '#6B5A54', maxWidth: '350px' }}>
                  {cat.descripcion}
                </td>

                {/* SWITCH / TOGGLE COMO LA IMAGEN */}
                <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                  <button
                    onClick={() => handleToggleStatus(cat.id)}
                    style={{
                      width: '46px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: cat.estado === 'Activo' ? '#2E7D32' : '#E8D7DC',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background-color 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '2px'
                    }}
                    title={`Estado: ${cat.estado}. Clic para cambiar.`}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        position: 'absolute',
                        left: cat.estado === 'Activo' ? '24px' : '2px',
                        transition: 'left 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }}
                    />
                  </button>
                </td>

                {/* BOTONES DE ACCIÓN */}
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <button 
                      onClick={() => handleOpenDetail(cat)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5A54' }} 
                      title="Ver detalle"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleOpenEdit(cat)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E63950' }} 
                      title="Editar"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleOpenDelete(cat)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E63950' }} 
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL CREAR / EDITAR */}
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveCategory}
        initialData={categoryToEdit}
      />

      {/* MODAL VER DETALLE */}
      <CategoryFormModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        initialData={selectedCategory}
        isReadOnly={true}
      />

      {/* MODAL CONFIRMAR ELIMINACIÓN */}
      {isDeleteOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '1.8rem', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#FDF2F4', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <AlertTriangle size={24} color="#E63950" />
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#471C26' }}>¿Eliminar categoría?</h3>
            <p style={{ color: '#6B5A54', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>
              ¿Estás seguro de que deseas eliminar la categoría <strong>"{selectedCategory?.nombre}"</strong>? Esta acción no se puede deshacer.
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