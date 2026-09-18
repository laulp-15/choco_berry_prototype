// src/shared/components/FormRadioGroup.jsx
import React from "react";
import "./FormRadioGroup.css";

/**
 * Grupo de radio buttons con el patrón de diseño del proyecto: círculo con
 * punto relleno en rojo para la opción seleccionada, texto en rojo/negrita
 * cuando está activa.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {{ value: string, label: string }[]} props.options
 * @param {"row" | "column"} [props.orientation]
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 */
export default function FormRadioGroup({
  label,
  value,
  onChange,
  options,
  orientation = "column",
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
      <div className={`radio-group ${orientation}`}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <label key={opt.value} className={`radio-option ${isSelected ? "selected" : ""}`}>
              <input
                type="radio"
                name={label}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
              />
              <span className="radio-dot" />
              <span className="radio-text">{opt.label}</span>
            </label>
          );
        })}
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}