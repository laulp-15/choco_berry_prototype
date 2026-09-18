// src/shared/components/FormSearchableSelect.jsx
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./FormFields.css";
import "./FormAutocomplete.css";

/**
 * Select "buscable": igual que un FormSelect normal (solo se puede elegir
 * una de las opciones reales, no texto libre), pero además permite escribir
 * para filtrar la lista mientras se busca. Úsalo cuando el campo debe
 * quedar ligado a un valor real (ej. un producto del catálogo) — para un
 * campo de texto libre con sugerencias (ej. nombre de cliente), usa
 * FormAutocomplete en su lugar.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value - el `value` de la opción seleccionada (ej. el id del producto)
 * @param {(value: string) => void} props.onChange
 * @param {{ value: string, label: string }[]} props.options
 * @param {string} [props.placeholder]
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 */
export default function FormSearchableSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Escribe para buscar...",
  error,
  required,
}) {
  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  return (
    <div className="form-field">
      {label && (
        <label className="form-label">
          {label} {required && "*"}
        </label>
      )}
      <Autocomplete
        className={`form-autocomplete ${error ? "has-error" : ""}`}
        options={options}
        value={selectedOption}
        getOptionLabel={(opt) => opt.label ?? ""}
        isOptionEqualToValue={(opt, val) => opt.value === val.value}
        onChange={(_, newValue) => onChange(newValue?.value ?? "")}
        renderInput={(params) => (
          <TextField {...params} className="form-input" placeholder={placeholder} />
        )}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}