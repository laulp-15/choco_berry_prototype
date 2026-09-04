// src/features/catalog/components/CategoryChips.jsx
import React from "react";
import { Chip } from "@mui/material";
import "./CategoryChips.css";

/**
 * Fila de chips de categoría, centrada.
 * Layout con Bootstrap (flex-wrap utilities), chips con Material UI.
 *
 * @param {object} props
 * @param {{value: string, label: string}[]} props.categories
 * @param {string} props.activeCategory
 * @param {(value: string) => void} props.onChange
 */
export default function CategoryChips({ categories, activeCategory, onChange }) {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 categories-scroll">
      {categories.map((cat) => (
        <Chip
          key={cat.value}
          label={cat.label}
          clickable
          onClick={() => onChange(cat.value)}
          className={`chip ${activeCategory === cat.value ? "active" : ""}`}
        />
      ))}
    </div>
  );
}