import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Home.css';
import { 
  Heart, Gift, Medal, Plus, ChevronLeft, ChevronRight, Star, Sparkles, ShoppingBag 
} from 'lucide-react';

export default function HomePage() {
  const [currentReview, setCurrentReview] = useState(0);
  const navigate = useNavigate();

  // Ruta absoluta directa desde la carpeta /public
  const heroImg = "/img/conocenos/cajas.jpg";

  const projectInfo = {
  
    description: "Nacimos inspirados en la creatividad y el amor por el detalle. Elaboramos y comercializamos fresas con chocolate preparadas con la mejor calidad, ideales para sorprender y endulzar momentos especiales."
  };

  const pillars = [
    {
      icon: <Heart size={28} />,
      title: "Sabor Irresistible",
      desc: "Chocolates seleccionados e ingredientes frescos combinados a la perfección."
    },
    {
      icon: <Gift size={28} />,
      title: "Presentación Única",
      desc: "Diseños personalizados y empaques de regalo listos para cautivar."
    },
    {
      icon: <Medal size={28} />,
      title: "Calidad Garantizada",
      desc: "Preparación ágil, cuidando cada detalle en el proceso artesanal y entrega."
    }
  ];

  const reviews = [
    {
      id: 1,
      comment: "¡Las fresas más deliciosas que he probado! La presentación de la caja fue impecable y llegó justo a tiempo para nuestro aniversario.",
      client: "Mariana Gómez",
      tag: "Cliente Verificado"
    },
    {
      id: 2,
      comment: "El detalle personalizado en el chocolate superó mis expectativas. Mi pareja quedó fascinada con la sorpresa. 100% recomendados.",
      client: "Carlos Restrepo",
      tag: "Regalo de Cumpleaños"
    },
    {
      id: 3,
      comment: "Excelente servicio de atención y la calidad del chocolate es superior. Sin duda volveré a comprar para mis eventos especiales.",
      client: "Andrea Morales",
      tag: "Cliente Frecuente"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="home-container">
      
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-wrapper">
          <div className="hero-content">
            <div className="badge-trajectory">
              <Sparkles size={16} />
              {projectInfo.trajectory}
            </div>
            
            <h1 className="hero-title">
              La combinación perfecta entre <span className="text-berry">Arte</span> y <span className="text-choco">Sabor</span>.
            </h1>
            
            <p className="hero-description">{projectInfo.description}</p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/productos')}>
                <Plus size={20} />
                Explorar Catálogo
              </button>
              
              {/* Botón Saber más sin ícono */}
              <button className="btn-secondary" onClick={() => navigate('/conocenos')}>
                Saber más
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="card-showcase" onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>
              <div className="card-image-container" style={{ height: '240px', overflow: 'hidden', borderRadius: '16px' }}>
                <img src={heroImg} alt="Caja de fresas decoradas ChocoBerry" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="card-footer-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <div>
                  <small style={{ color: '#A0958F' }}>Medellín</small>
                  <div style={{ fontWeight: 'bold', color: '#471C26' }}>Sorprende a las personas que mas quieres </div>
                </div>
                <ShoppingBag color="#471C26" size={22} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section id="conocenos" className="pillars-section">
        <div className="pillars-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-icon">{pillar.icon}</div>
              <h3 style={{ color: '#471C26', fontSize: '1.25rem', marginBottom: '8px' }}>{pillar.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#6B5A54', margin: 0 }}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN RESEÑAS */}
      <section id="reseñas" className="reviews-section">
        <h2 className="reviews-title">Lo que dicen nuestros clientes</h2>
        <p className="reviews-subtitle">Experiencias dulces que nos inspiran a seguir creando momentos mágicos.</p>

        <div className="carousel-card">
          <button className="nav-btn btn-left" onClick={prevReview} title="Anterior">
            <ChevronLeft size={24} />
          </button>

          <div className="stars-wrapper">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#F49B05" color="#F49B05" />
            ))}
          </div>

          <p className="review-comment">"{reviews[currentReview].comment}"</p>

          <div className="client-info">
            <div className="client-name">{reviews[currentReview].client}</div>
            <span className="client-badge">{reviews[currentReview].tag}</span>
          </div>

          <button className="nav-btn btn-right" onClick={nextReview} title="Siguiente">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="dots-container">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentReview ? 'active' : ''}`}
              onClick={() => setCurrentReview(idx)}
            />
          ))}
        </div>
      </section>

    </div>
  );
}