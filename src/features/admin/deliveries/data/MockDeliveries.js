// src/features/admin/deliveries/data/MockDeliveries.js
// TODO: reemplazar por fetch a la API real. Cada entrega corresponde a un
// pedido despachado (features/admin/orders); acá se le agrega el repartidor
// asignado y, cuando ya fue entregada, la evidencia que él mismo registró
// (comentarios/observaciones + foto) desde su app.

export const INITIAL_DELIVERIES = [
  {
    id: 501,
    orderId: 103,
    cliente: "Ana Martínez",
    direccion: "Calle 52 # 45-31",
    telefono:"3624580537",
    municipio: "Sabaneta",
    fecha: "2026-09-02",
    estado: "entregado",
    products: [{ productName: "Mini Antojo", quantity: 6, units: 2 }],
    total: 82000,
    evidence: {
      deliveredAt: "2026-09-02T15:42:00.000Z",
      comments:
        "Entrega sin novedad. La cliente recibió personalmente en la portería del conjunto.",
      photoUrl: "/img/Productos/FCA_2.webp",
    },
  },
  {
    id: 502,
    orderId: 107,
    cliente: "Daniela Ramírez",
    direccion: "Calle 10 # 34-56",
    telefono:"3256985236",
    municipio: "Barbosa",
    fecha: "2026-09-05",
    estado: "entregado",
    products: [{ productName: "Caja Aniversario", quantity: 16, units: 1 }],
    total: 95000,
    evidence: {
      deliveredAt: "2026-09-05T18:10:00.000Z",
      comments: "Llamé antes de subir como indicaba el pedido. Cliente muy agradecida.",
      photoUrl: "/img/Productos/Romance_4.jpg",
    },
  },
  {
    id: 503,
    orderId: 106,
    cliente: "Sebastián Torres",
    direccion: "Carrera 43A # 65 Sur-08",
    telefono:"3260146329",
    municipio: "Copacabana",
    fecha: "2026-09-05",
    repartidor: "Mónica Zapata",
    estado: "en_camino",
    products: [{ productName: "Detalle Sorpresa", quantity: 8, units: 3 }],
    total: 150000,
    evidence: null,
  },
  {
    id: 504,
    orderId: 108,
    cliente: "Andrés Herrera",
    telefono:"3105894214",
    direccion: "Carrera 50 # 49-22",
    municipio: "La Estrella",
    fecha: "2026-09-06",
    estado: "fallido",
    products: [{ productName: "Combo Antojo Doble", quantity: 8, units: 2 }],
    total: 103000,
    evidence: null,
  },
  {
    id: 505,
    orderId: 104,
    cliente: "Carlos Pérez",
    direccion: "Carrera 27 # 36 Sur-14",
    telefono:"3254501025",
    municipio: "Itagüí",
    fecha: "2026-09-03",
    estado: "fallido",
    products: [{ productName: "Caja Fiesta", quantity: 16, units: 1 }],
    total: 85000,
    evidence: {
      deliveredAt: "2026-09-03T17:05:00.000Z",
      comments: "Dirección cerrada, nadie respondió tras 3 intentos de llamada. Se reagenda.",
      photoUrl: null,
    },
  },
];
