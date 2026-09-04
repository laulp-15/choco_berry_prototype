// src/features/catalog/components/SearchBar.jsx
import React from "react";
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import "./SearchBar.css";

/**
 * Barra de búsqueda + botón de filtro.
 * Layout con utilidades de Bootstrap (flex), controles con Material UI.
 *
 * @param {object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {boolean} [props.filterActive]
 * @param {() => void} [props.onFilterClick]
 */
export default function SearchBar({ value, onChange, filterActive, onFilterClick }) {
  return (
    <div className="d-flex gap-2 search-row">
      <OutlinedInput
        className="search-pill"
        fullWidth
        placeholder="Buscar productos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <i className="fa-solid fa-magnifying-glass" />
          </InputAdornment>
        }
      />
      <IconButton
        className={`filter-btn ${filterActive ? "active" : ""}`}
        title="Filtrar"
        onClick={onFilterClick}
        disableRipple
      >
        <i className="fa-solid fa-filter" />
      </IconButton>
    </div>
  );
}