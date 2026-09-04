// src/features/catalog/components/FeatureHighlights.jsx
import React from "react";
import "./FeatureHighlights.css";

// Iconos reutilizados del set ya definido en el proyecto (ninguno nuevo):
// pen, envelope, file-word y gift ya existen en la iconografía de ChocoBerry.
const FEATURES = [
  {
    icon: "fa-pen",
    title: "Personalización",
    desc: "Puedes personalizar el diseño de tu pedido escogiendo el color del glaseado o retirando alguna decoración que no desees.",
  },
  {
    icon: "fa-envelope",
    title: "Mensaje decorativo",
    desc: "Agrega letras decorativas de chocolate. Recuerda que la frase debe ser corta y acorde con la cantidad de fresas de tu pedido.",
  },
  {
    icon: "fa-heart",
    title: "Tarjeta con mensaje",
    desc: "Puedes agregar una tarjeta con un mensaje personalizado sin costo adicional.",
  },
  {
    icon: "fa-gift",
    title: "Extras incluidos",
    desc: "Todos nuestros pedidos incluyen caja, moño, masmelos y decoraciones en chocolate.",
  },
];

export default function FeatureHighlights() {
  return (
    <div className="feature-highlights">
      <h2 className="feature-title">Una Experiencia para los Sentidos</h2>
      <div className="row">
        {FEATURES.map((f) => (
          <div key={f.title} className="col-12 col-sm-6 col-lg-3 feature-col">
            <div className="feature-card">
              <div className="feature-icon">
                <i className={`fa-solid ${f.icon}`} />
              </div>
              <div className="feature-card-title">{f.title}</div>
              <div className="feature-card-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}