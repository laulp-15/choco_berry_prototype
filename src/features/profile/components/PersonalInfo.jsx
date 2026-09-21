// src/features/profile/components/PersonalInfo.jsx
import React, { useState } from 'react';

export default function PersonalInfo() {
  const [user, setUser] = useState({
    name: 'MARI',
    email: 'mari0244xt@gmail.com',
    phone: '+57 3146494472'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
    setSuccessMessage('¡Información actualizada correctamente!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Información Personal</h2>

      {successMessage && <div style={styles.alert}>{successMessage}</div>}

      {!isEditing ? (
        <div>
          <p style={styles.welcomeText}>¡Hola <strong>{user.name}</strong>!</p>
          <p style={styles.description}>
            Desde la página principal usted tiene la posibilidad de ver un status de su actividad reciente y actualizar la información de su cuenta. Seleccione los siguientes enlaces para ver o editar la información.
          </p>

          <h3 style={styles.subtitle}>Información de Contacto</h3>
          
          <div style={styles.infoBox}>
            <p style={styles.infoText}><strong>{user.name}</strong></p>
            <p style={styles.infoText}>{user.email}</p>
            <p style={styles.infoText}>{user.phone}</p>
            
            <div style={styles.actionsList}>
              <a href="#cambiar-password" onClick={(e) => { e.preventDefault(); alert('Redirigiendo a cambiar contraseña...'); }} style={styles.linkAction}>
                🔑 Cambiar Contraseña
              </a>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked /> Recibir notificaciones de ChocoBerry.com
              </label>
              <button onClick={() => setIsEditing(true)} style={styles.editButton}>
                ✏️ Editar Información Personal
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} style={styles.form}>
          <p style={styles.description}>Modifica los campos que desees actualizar:</p>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre completo:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo electrónico:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Teléfono:</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.saveButton}>Guardar Cambios</button>
            <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}

const styles = {
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  title: { fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginBottom: '15px' },
  subtitle: { fontSize: '18px', fontWeight: 'bold', color: '#111', marginTop: '25px', marginBottom: '15px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' },
  welcomeText: { fontSize: '16px', color: '#374151', marginBottom: '10px' },
  description: { fontSize: '14px', color: '#6b7280', lineHeight: '1.5', marginBottom: '20px' },
  infoBox: { border: '1px solid #e5e7eb', borderRadius: '6px', padding: '20px', background: '#fafafa' },
  infoText: { fontSize: '14px', color: '#374151', marginBottom: '6px' },
  actionsList: { marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' },
  linkAction: { color: '#dc2626', fontSize: '14px', textDecoration: 'none', fontWeight: '500' },
  checkboxLabel: { fontSize: '13px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  editButton: { background: 'transparent', color: '#dc2626', border: '1px solid #dc2626', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', marginTop: '5px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '14px', color: '#374151', fontWeight: '500' },
  input: { padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' },
  buttonGroup: { display: 'flex', gap: '10px', marginTop: '10px' },
  saveButton: { background: '#dc2626', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  cancelButton: { background: '#e5e7eb', color: '#374151', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  alert: { background: '#d1fae5', color: '#065f46', padding: '10px 15px', borderRadius: '6px', fontSize: '14px', marginBottom: '15px', fontWeight: '500' }
};