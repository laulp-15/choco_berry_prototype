// src/shared/components/DatePicker.jsx
import React, { useEffect, useRef, useState } from "react";
import "./DatePicker.css";

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromISO(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplay(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function isSameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

/** Genera la grilla de 6x7 celdas para un mes, con relleno de mes anterior/siguiente. */
function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7; // 0 = Lunes
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), currentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), currentMonth: true });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    cells.push({ date: next, currentMonth: false });
  }
  return cells;
}

/**
 * Selector de fecha con calendario propio (sin librerías externas).
 * Guarda/emite la fecha en formato ISO ("YYYY-MM-DD") y la muestra como DD/MM/YYYY.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value - fecha en formato ISO, ej: "2026-12-24"
 * @param {(value: string) => void} props.onChange
 * @param {boolean} [props.required]
 * @param {string} [props.error]
 * @param {boolean} [props.disablePast] - si true, no deja elegir fechas anteriores a hoy
 */
export default function DatePicker({ label, value, onChange, required, error, disablePast = true }) {
  const selectedDate = fromISO(value);
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(selectedDate ?? new Date());
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const grid = getMonthGrid(viewDate.getFullYear(), viewDate.getMonth());
  const today = startOfToday();

  const goToMonth = (delta) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const handleSelect = (date) => {
    onChange(toISO(date));
    setOpen(false);
  };

  return (
    <div className="form-field date-picker-wrap" ref={wrapperRef}>
      {label && (
        <label className="form-label">
          {label} {required && "*"}
        </label>
      )}

      <button
        type="button"
        className={`date-picker-input ${error ? "has-error" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="date-picker-icon">
          <i className="fa-solid fa-calendar" />
        </span>
        <span className={value ? "date-picker-value" : "date-picker-placeholder"}>
          {value ? formatDisplay(value) : "Seleccionar fecha"}
        </span>
      </button>
      {error && <div className="form-error">{error}</div>}

      {open && (
        <div className="date-picker-popover">
          <div className="date-picker-header">
            <span className="date-picker-month-label">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <div className="date-picker-nav">
              <button type="button" onClick={() => goToMonth(-1)}>
                <i className="fa-solid fa-arrow-left-long" />
              </button>
              <button type="button" onClick={() => goToMonth(1)}>
                <i className="fa-solid fa-arrow-right-long" />
              </button>
            </div>
          </div>

          <div className="date-picker-weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>

          <div className="date-picker-grid">
            {grid.map(({ date, currentMonth }, i) => {
              const isPast = disablePast && date < today && !isSameDay(date, selectedDate);
              const isSelected = isSameDay(date, selectedDate);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={isPast}
                  className={[
                    "date-picker-day",
                    !currentMonth && "muted",
                    isSelected && "selected",
                    isPast && "disabled",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleSelect(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}