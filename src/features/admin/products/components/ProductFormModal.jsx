import React, { useState, useEffect } from 'react';

export default function ProductFormModal({ isOpen, onClose, onSubmit, initialData, isReadOnly = false }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('Día de la Madre');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '');
      setDescripcion(initialData.descripcion || '');
      setCategoria(initialData.categoria || 'Día de la Madre');
      setPrecio(initialData.precio || '');
    } else {
      setNombre('');
      setDescripcion('');
      setCategoria('Día de la Madre');
      setPrecio('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !precio) return;
    onSubmit({
      nombre,
      descripcion,
      categoria,
      precio: Number(precio)
    });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#471C26', fontSize: '1.3rem', fontWeight: 'bold' }}>
            {isReadOnly ? 'Detalle del Producto' : initialData ? 'Editar Producto' : 'Crear Producto'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5A54' }}>
            <i className="fa-solid fa-xmark" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
          </button>
        </div>

        {isReadOnly ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ backgroundColor: '#FDF2F4', padding: '1rem', borderRadius: '12px' }}>
              <h3 style={{ margin: 0, color: '#471C26', fontSize: '1.15rem' }}>{initialData?.nombre}</h3>
              <span style={{ fontSize: '0.85rem', color: '#6B5A54', marginTop: '0.2rem', display: 'block' }}>Categoría: <strong>{initialData?.categoria}</strong></span>
            </div>

            <div>
              <label style={{ color: '#6B5A54', fontWeight: 'bold', fontSize: '0.8rem', display: 'block' }}>DESCRIPCIÓN</label>
              <p style={{ color: '#471C26', marginTop: '0.3rem', fontSize: '0.95rem' }}>{initialData?.descripcion}</p>
            </div>
            
            <div style={{ backgroundColor: '#FAFAFA', padding: '1rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#6B5A54', display: 'block' }}>PRECIO</span>
              <strong style={{ color: '#E63950', fontSize: '1.2rem' }}>${Number(initialData?.precio).toLocaleString()}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button onClick={onClose} style={{ backgroundColor: '#E63950', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', color: '#471C26', fontWeight: '600', fontSize: '0.85rem' }}>Nombre del Producto</label>
              <input
                type="text"
                placeholder="Ej: Caja Corazón Rosas"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{ width: '100%', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #EADBDA', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', color: '#471C26', fontWeight: '600', fontSize: '0.85rem' }}>Descripción</label>
              <textarea
                placeholder="Descripción del producto..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #EADBDA', outline: 'none', boxSizing: 'border-box', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.3rem', color: '#471C26', fontWeight: '600', fontSize: '0.85rem' }}>Categoría</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #EADBDA', outline: 'none', boxSizing: 'border-box', backgroundColor: '#fff' }}
                >
                  <option value="Día de la Madre">Día de la Madre</option>
                  <option value="Día del Padre">Día del Padre</option>
                  <option value="Aniversarios">Aniversarios</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Antojos">Antojos</option>
                  <option value="Regalos">Regalos</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.3rem', color: '#471C26', fontWeight: '600', fontSize: '0.85rem' }}>Precio ($)</label>
                <input
                  type="number"
                  placeholder="Ej: 85000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.6rem 0.9rem', borderRadius: '10px', border: '1px solid #EADBDA', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" onClick={onClose} style={{ backgroundColor: '#F5EFEA', color: '#471C26', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button type="submit" style={{ backgroundColor: '#E63950', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}>
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}