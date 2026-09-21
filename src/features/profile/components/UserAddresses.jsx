// src/features/profile/components/UserAddresses.jsx
import React from 'react';

export default function UserAddresses() {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Mis Direcciones</h2>
      <p style={styles.text}>No tienes direcciones registradas actualmente.</p>
      <button style={styles.button}>Agregar nueva dirección</button>
    </div>
  );
}

const styles = {
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '30px' },
  title: { fontSize: '22px', fontWeight: 'bold', color: '#dc2626', marginBottom: '20px' },
  text: { color: '#4b5563', fontSize: '14px', marginBottom: '15px' },
  button: { background: '#dc2626', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: 'fit-content' }
};