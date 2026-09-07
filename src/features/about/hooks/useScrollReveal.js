// src/features/about/hooks/useScrollReveal.js
import { useEffect, useRef, useState } from "react";

/**
 * Hook liviano para animaciones sutiles al hacer scroll.
 * No usa ninguna librería externa (el proyecto no tiene ninguna instalada
 * de animación); solo IntersectionObserver, nativo del navegador.
 *
 * Uso:
 *   const [ref, visible] = useScrollReveal();
 *   <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""}`}>
 *
 * @param {number} threshold - porcentaje visible del elemento para activar
 *                             la animación (0 a 1). Por defecto 0.15.
 */
export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Si el navegador no soporta IntersectionObserver, mostramos todo directo
    // para no dejar contenido oculto por error.
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
