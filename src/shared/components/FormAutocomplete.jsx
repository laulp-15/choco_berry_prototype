// src/shared/components/FormAutocomplete.jsx
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./FormFields.css";
import "./FormAutocomplete.css";

/**
 * Campo de texto con sugerencias desplegables (ej. nombre de cliente).
 * `freeSolo` permite escribir un valor que no esté en la lista (para
 * clientes nuevos que aún no están registrados).
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string[]} props.options
 * @param {string} [props.placeholder]
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 */
export default function FormAutocomplete({
  label,
  value,
  onChange,
  options,
  placeholder,
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
      <Autocomplete
        className={`form-autocomplete ${error ? "has-error" : ""}`}
        freeSolo
        options={options}
        inputValue={value}
        onInputChange={(_, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField {...params} className="form-input" placeholder={placeholder} />
        )}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}