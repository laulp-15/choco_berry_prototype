// src/features/catalog/components/QuantitySelector.jsx
import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import "./QuantitySelector.css";

/**
 * Selector de cantidad de fresas (opciones fijas, selección única).
 *
 * @param {object} props
 * @param {number[]} props.options - ej: [6, 8, 12, 16, 30]
 * @param {number} props.value
 * @param {(value: number) => void} props.onChange
 * @param {string} [props.label]
 */
export default function QuantitySelector({ options, value, onChange, label = "Cantidad de fresas" }) {
  return (
    <div className="selector-block">
      <div className="selector-label">{label}</div>
      <ToggleButtonGroup
        className="quantity-group"
        value={value}
        exclusive
        onChange={(_, newValue) => {
          if (newValue !== null) onChange(newValue);
        }}
      >
        {options.map((opt) => (
          <ToggleButton key={opt} value={opt} className="quantity-btn" disableRipple>
            {opt}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}