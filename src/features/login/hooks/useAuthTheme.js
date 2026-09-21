// src/features/login/hooks/useAuthTheme.js
import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "cb_theme";

/**
 * Tema claro/oscuro para las vistas de acceso (login, registro,
 * recuperar y cambiar contraseña).
 *
 * Se guarda en localStorage para que el usuario no tenga que volver a
 * elegirlo cada vez, y respeta prefers-color-scheme la primera vez.
 * Los colores de cada modo viven como variables CSS dentro de
 * AuthLayout.css (con el atributo data-theme), NO se tocan las
 * variables globales de tokens.css para no afectar el resto del sitio.
 */
export default function useAuthTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggleTheme };
}
