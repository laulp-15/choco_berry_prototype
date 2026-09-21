// src/features/profile/components/UserOrders.jsx
import React from 'react';

export default function UserOrders() {
  // Datos de ejemplo para los pedidos del cliente
  const orders = [
    { 
      id: 'CB-1092', 
      date: '15/09/2026', 
      total: '$45.000', 
      status: 'Entregado', 
      items: 'Caja de 12 Fresas con Chocolate Tradicional' 
    },
    { 
      id: 'CB-1105', 
      date: '18/09/2026', 
      total: '$28.000', 
      status: 'En camino', 
      items: 'Bouquet Romántico Chocoberry' 
    }
  ];

  return (
    <div>
      <h2 style={{ color: '#471C26', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>
        Mis Pedidos 
      </h2>

      {orders.length === 0 ? (
        <p style={{ color: '#666' }}>Aún no has realizado ningún pedido con nosotros.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map((order) => (
            <div 
              key={order.id}
              style={{
                border: '1px solid #F0E8E6',
                borderRadius: '12px',
                padding: '1.2rem',
                backgroundColor: '#FFFBFB',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <span style={{ fontWeight: '700', color: '#C2435A', fontSize: '0.95rem' }}>
                  Pedido #{order.id}
                </span>
                <p style={{ margin: '0.3rem 0 0', color: '#471C26', fontWeight: '600', fontSize: '1.05rem' }}>
                  {order.items}
                </p>
                <small style={{ color: '#777' }}>Fecha de compra: {order.date}</small>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '0.3rem 0.8rem', 
                  borderRadius: '20px', 
                  fontSize: '0.85rem', 
                  fontWeight: '600',
                  backgroundColor: order.status === 'Entregado' ? '#E6F4EA' : '#FEF7E0',
                  color: order.status === 'Entregado' ? '#137333' : '#B06000'
                }}>
                  {order.status}
                </span>
                <p style={{ margin: '0.4rem 0 0', fontWeight: 'bold', color: '#471C26', fontSize: '1.1rem' }}>
                  {order.total}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}