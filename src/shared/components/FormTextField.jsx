// src/shared/components/FormTextField.jsx
import React from "react";
import { OutlinedInput } from "@mui/material";
import "./FormFields.css";

/**
 * Input de texto con label, error y estilo consistente para toda la app
 * (catálogo, carrito, admin). Úsalo para cualquier campo de texto en
 * formularios de "Agregar/Editar".
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.placeholder]
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 * @param {boolean} [props.multiline]
 * @param {number} [props.minRows]
 * @param {string} [props.type] - "text" | "number" | "email" | etc.
 */
export default function FormTextField({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  multiline,
  minRows = 3,
  type = "text",
}) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-label">
          {label} {required && "*"}
        </label>
      )}
      <OutlinedInput
        className={`form-input ${error ? "has-error" : ""}`}
        fullWidth
        type={type}
        multiline={multiline}
        minRows={multiline ? minRows : undefined}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}