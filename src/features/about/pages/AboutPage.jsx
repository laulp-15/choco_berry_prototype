// src/features/about/pages/AboutPage.jsx
import React from "react";
import HeroBanner from "../components/HeroBanner";
import QuienesSomos from "../components/QuienesSomos";
import MasQueRegalo from "../components/MasQueRegalo";
import HechoConDedicacion from "../components/HechoConDedicacion";
import NuestraEsencia from "../components/NuestraEsencia";
import RegalarEsTransmitir from "../components/RegalarEsTransmitir";
import NuestraPromesa from "../components/NuestraPromesa";
import CierreMarca from "../components/CierreMarca";
import "./AboutPage.css";

/**
 * Vista "Conócenos" v3 — Chocoberry / Fresas Medellín.
 * 8 secciones full-bleed con fondos alternados (blanco / rosa suave /
 * crema / chocolate oscuro), cada una en su propio componente.
 * Reutiliza únicamente 4 imágenes en total, distribuidas así:
 *
 *   /img/conocenos/hero.jpg          → Hero + Cierre de marca
 *   /img/conocenos/quienes-somos.jpg → ¿Quiénes somos?
 *   /img/conocenos/proceso.jpg       → Cada detalle cuenta
 *   /img/conocenos/regalo.jpg        → Más que un regalo + Regalar es
 *                                      transmitir emociones
 */
export default function AboutPage() {
  return (
    <div className="about-page">
      <HeroBanner />
      <QuienesSomos />
      <MasQueRegalo />
      <HechoConDedicacion />
      <NuestraEsencia />
      <RegalarEsTransmitir />
      <NuestraPromesa />
      <CierreMarca />
    </div>
  );
}
