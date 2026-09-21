// src/shared/components/StatusToggle.jsx
import { Switch } from "@mui/material";
import "./StatusToggle.css";

/**
 * Toggle de activo/inactivo para columnas "Estado" en cualquier listado
 * (clientes, productos, usuarios...). Verde cuando está activo.
 *
 * @param {object} props
 * @param {boolean} props.checked
 * @param {(checked: boolean) => void} props.onChange
 */
export default function StatusToggle({ checked, onChange }) {
  return (
    <Switch
      className="status-toggle"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disableRipple
    />
  );
}