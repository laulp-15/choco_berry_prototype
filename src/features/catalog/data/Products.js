// src/features/catalog/data/products.js
// TODO: reemplazar por fetch a la API real (features/catalog/services)
// Nota: el precio ya no vive aquí, depende de la cantidad (ver pricing.js)

export const CATEGORIES = [
  { value: "todas", label: "Todas" },
  { value: "dia-madre", label: "Día de la Madre" },
  { value: "dia-padre", label: "Día del Padre" },
  { value: "dia-mujer", label: "Día de la Mujer" },
  { value: "cumpleanos", label: "Cumpleaños" },
  { value: "antojos", label: "Antojos" },
  { value: "aniversarios", label: "Aniversarios" },
  { value: "regalos", label: "Regalos" },
];

export const PRODUCTS = [
  { id: "caja-romance", name: "Caja Romance", image:"/img/Productos/Regalo_1.webp", cat: "dia-madre", catLabel: "Día de la Madre", desc: "Un detalle dulce y especial para sorprender con amor." },

  { id: "ramo-dulce-mama", name: "Ramo Dulce Mamá", image:"/img/Productos/Romance_7.webp", cat: "dia-madre", catLabel: "Día de la Madre", desc: "Una dulce forma de celebrar a mamá y hacerla sentir especial." },

  { id: "set-fuerza-papa", name: "Set Fuerza Papá", image:"/img/Productos/img5.png", cat: "dia-padre", catLabel: "Día del Padre", desc: "Un regalo con personalidad para celebrar a ese papá increíble."},

  { id: "caja-clasica-papa", name: "Caja Clásica Papá", image:"/img/Productos/Diaespe_3.webp", cat: "dia-padre", catLabel: "Día del Padre", desc: "Un detalle delicioso y especial para celebrar a papá."},

  { id: "detalle-poder", name: "Detalle Poder", image:"/img/Productos/Diaespe_2.jpg", cat: "dia-mujer", catLabel: "Día de la Mujer", desc: "Un detalle especial para celebrar su esencia, fuerza y elegancia." },

  { id: "fresas-elegancia", name: "Fresas Elegancia", image:"/img/Productos/img9.png", cat: "dia-mujer", catLabel: "Día de la Mujer", desc: "Un detalle sofisticado y delicioso para sorprender a una mujer especial." },

  { id: "torre-cumpleanos", name: "Torre Cumpleaños", image:"/img/Productos/5.jpg", cat: "cumpleanos", catLabel: "Cumpleaños", desc: "Una sorpresa deliciosa para hacer de su cumpleaños un momento inolvidable." },

  { id: "caja-fiesta", name: "Caja Fiesta", image:"/img/Productos/FCA_4.webp", cat: "cumpleanos", catLabel: "Cumpleaños", desc: "Color, dulzura y alegría en un detalle perfecto para celebrar." },

  { id: "mini-antojo", name: "Mini Antojo", image:"/img/Productos/Diaespe_1.jpg", cat: "antojos", catLabel: "Antojos", desc: "El detalle perfecto para consentirte o disfrutar un dulce momento."},

  { id: "combo-antojo-doble", name: "Combo Antojo Doble", image:"/img/Productos/img8.png", cat: "antojos", catLabel: "Antojos", desc: "Una combinación irresistible para disfrutar y compartir un momento delicioso."},

  { id: "caja-aniversario", name: "Caja Aniversario", image:"/img/Productos/img7.png", cat: "aniversarios", catLabel: "Aniversarios", desc: "Un detalle romántico para celebrar juntos una historia llena de momentos especiales."},

  { id: "detalle-sorpresa", name: "Detalle Sorpresa", image:"/img/Productos/Regalo_2.webp", cat: "regalos", catLabel: "Regalos", desc: "Personaliza un detalle único para sorprender a esa persona especial." },
];

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}