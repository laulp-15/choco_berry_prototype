// src/features/profile/components/UserTransactions.jsx
import React from 'react';

export default function UserTransactions() {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Mis Transacciones</h2>
      <p style={styles.text}>Aquí podrás ver el historial de tus pagos y facturas.</p>
    </div>
  );
}

const styles = {
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '30px' },
  title: { fontSize: '22px', fontWeight: 'bold', color: '#dc2626', marginBottom: '20px' },
  text: { color: '#4b5563', fontSize: '14px' }
};