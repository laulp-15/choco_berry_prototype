// src/features/home/components/HeroBanner.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HeroBanner({ banner }) {
  if (!banner) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--primary-color, #5c1d24)",
        color: "#ffffff",
        padding: "3rem 1.5rem",
        borderRadius: "12px",
        textAlign: "center",
        marginBottom: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        {banner.title}
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", opacity: 0.9 }}>
        {banner.subtitle}
      </p>
      <Link
        to={banner.buttonLink}
        className="btn btn-primary"
        style={{
          backgroundColor: "#ffffff",
          color: "var(--primary-color, #5c1d24)",
          padding: "0.75rem 1.5rem",
          fontWeight: "bold",
          borderRadius: "8px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        {banner.buttonText}
      </Link>
    </div>
  );
}