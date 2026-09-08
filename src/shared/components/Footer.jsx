import React from 'react';
import './Layout.css';
import { Phone } from 'lucide-react';

export default function Footer() {
  const chocolateDark = '#471C26';
  const chocolateLight = '#7A3245';
  const rosaLight = '#FAD2E1';
  const textSoft = '#ECE1DD';

  return (
    <footer className="footer" style={{ backgroundColor: chocolateDark, color: '#FFFFFF', padding: '40px 24px 20px 24px', marginTop: 'auto' }}>
      <div className="footer-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
        
        {/* Marca y Descripción */}
        <div className="footer-brand">
          <h3 style={{ color: rosaLight, fontSize: '1.5rem', marginBottom: '12px' }}>ChocoBerry</h3>
          <p style={{ color: textSoft, fontSize: '0.9rem', lineHeight: '1.5' }}>
            Elaboración y comercialización de fresas cubiertas con chocolate y detalles personalizados para endulzar tus momentos especiales.
          </p>
        </div>

        {/* Contactos y Redes Sociales */}
        <div className="footer-section">
          <h4 style={{ color: rosaLight, marginBottom: '12px' }}>Contacto & Redes</h4>
          <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: textSoft, fontSize: '0.9rem', marginBottom: '16px' }}>
            <Phone size={18} />
            <span>+57 300 000 0000</span>
          </div>

          <div className="social-links" style={{ display: 'flex', gap: '12px' }}>
            {/* INSTAGRAM SVG NATIVO */}
            <a 
              href="https://www.instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn"
              title="Síguenos en Instagram"
              style={{
                backgroundColor: chocolateLight,
                color: rosaLight,
                padding: '10px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* TIKTOK SVG NATIVO */}
            <a 
              href="https://www.tiktok.com/@fresasmedellin?is_from_webapp=1&sender_device=pc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn"
              title="Síguenos en TikTok"
              style={{
                backgroundColor: chocolateLight,
                color: rosaLight,
                padding: '10px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Medios de Pago */}
        <div className="footer-section">
          <h4 style={{ color: rosaLight, marginBottom: '12px' }}>Medios de Pago</h4>
          <div className="payment-badges" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: chocolateLight, color: '#FEF7F9', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600' }}>Nequi</span>
            <span style={{ backgroundColor: chocolateLight, color: '#FEF7F9', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600' }}>Bancolombia</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom" style={{ textAlign: 'center', borderTop: `1px solid ${chocolateLight}`, marginTop: '32px', paddingTop: '16px', fontSize: '0.8rem', color: '#A96A7B' }}>
        <p>&copy; {new Date().getFullYear()} ChocoBerry. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}