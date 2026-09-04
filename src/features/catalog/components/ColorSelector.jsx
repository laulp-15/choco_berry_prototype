// src/features/catalog/components/ColorSelector.jsx
import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import "./ColorSelector.css";

/**
 * Selector de color de glaseado (selección única).
 *
 * @param {object} props
 * @param {{value: string, hex: string, label: string}[]} props.options
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.label]
 */
export default function ColorSelector({ options, value, onChange, label = "Colores del glaseado" }) {
  return (
    <div className="selector-block">
      <div className="selector-label">{label}</div>
      <ToggleButtonGroup
        className="color-group"
        value={value}
        exclusive
        onChange={(_, newValue) => {
          if (newValue !== null) onChange(newValue);
        }}
      >
        {options.map((opt) => (
          <ToggleButton
            key={opt.value}
            value={opt.value}
            className="color-btn"
            disableRipple
            title={opt.label}
            style={{ "--swatch": opt.hex }}
          >
            <span className="color-swatch" style={{ backgroundColor: opt.hex }} />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}