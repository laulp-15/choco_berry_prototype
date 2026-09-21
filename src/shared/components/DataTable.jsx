// src/shared/components/DataTable.jsx
import React, { useMemo, useState } from "react";
import { OutlinedInput } from "@mui/material";
import "./DataTable.css";

/**
 * Genera el arreglo de "botones" de paginación con elipsis, ej:
 * [1, "...", 4, 5, 6, "...", 12]
 */
function getPageNumbers(current, total) {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result = [];
  let prev = null;
  for (const p of sorted) {
    if (prev !== null && p - prev > 1) result.push("...");
    result.push(p);
    prev = p;
  }
  return result;
}

/**
 * Listado genérico para el admin: título + descripción, botón "Crear",
 * búsqueda, botón de filtros, tabla y paginación numerada — todo con el
 * mismo look para cualquier módulo (roles, usuarios, clientes, productos...).
 *
 * @param {object} props
 * @param {string} [props.title] - título del módulo, ej: "Clientes"
 * @param {string} [props.description] - subtítulo, ej: "Administra y consulta..."
 * @param {string} [props.createLabel] - ej: "Crear cliente"; si no se pasa, no se muestra el botón
 * @param {() => void} [props.onCreate]
 * @param {() => void} [props.onFiltersClick] - opcional, para un panel de filtros avanzados a futuro
 * @param {React.ReactNode} [props.extraFilter] - slot para un select propio del módulo (ej: "Todos los estados")
 * @param {{ key: string, label: string, render?: (row: object) => React.ReactNode }[]} props.columns
 * @param {object[]} props.data
 * @param {string} [props.searchPlaceholder]
 * @param {number} [props.pageSize]
 * @param {string} [props.emptyMessage]
 */
export default function DataTable({
  title,
  description,
  createLabel,
  onCreate,
  onFiltersClick,
  extraFilter,
  columns,
  data,
  searchPlaceholder = "Buscar...",
  pageSize = 8,
  emptyMessage = "No hay registros para mostrar.",
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.trim().toLowerCase();
    return data.filter((row) =>
      columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q))
    );
  }, [data, query, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handleSearchChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className="data-table-wrap">
      {(title || description) && (
        <div className="data-table-header">
          {title && <h1 className="data-table-title">{title}</h1>}
          {description && <p className="data-table-description">{description}</p>}
        </div>
      )}

      <div className="data-table-toolbar">
        {createLabel && (
          <button type="button" className="btn-create" onClick={onCreate}>
            <i className="fa-solid fa-plus" />
            {createLabel}
          </button>
        )}

        <div className="data-table-search">
          <OutlinedInput
            className="data-table-search-input"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            endAdornment={<i className="fa-solid fa-magnifying-glass" />}
          />
        </div>

        <button type="button" className="btn-filters" onClick={onFiltersClick}>
          <i className="fa-solid fa-filter" />
          Filtros
        </button>

        {extraFilter}
      </div>

      <div className="data-table-card">
        <div className="data-table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td className="data-table-empty" colSpan={columns.length}>
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                pageRows.map((row, i) => (
                  <tr key={row.id ?? i}>
                    {columns.map((col) => (
                      <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="data-table-pagination">
          <span className="data-table-page-info">
            Página {currentPage} de {totalPages}
          </span>

          <div className="data-table-page-controls">
            <button
              type="button"
              className="page-nav"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <i className="fa-solid fa-arrow-left-long" />
              Anterior
            </button>

            {pageNumbers.map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="page-ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  className={`page-number ${p === currentPage ? "active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              )
            )}

            <button
              type="button"
              className="page-nav"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
              <i className="fa-solid fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}