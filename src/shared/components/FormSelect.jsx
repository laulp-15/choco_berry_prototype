// src/shared/components/FormSelect.jsx
import React from "react";
import { Select, MenuItem } from "@mui/material";
import "./FormFields.css";

/**
 * Select con label, error y estilo consistente para toda la app.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {{ value: string, label: string }[]} props.options
 * @param {string} [props.placeholder]
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 */
export default function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecciona una opción",
  error,
  required,
}) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-label">
          {label} {required && "*"}
        </label>
      )}
      <Select
        className={`form-input form-select ${error ? "has-error" : ""}`}
        fullWidth
        displayEmpty
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="">
          <span className="form-select-placeholder">{placeholder}</span>
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}