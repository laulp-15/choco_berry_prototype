// src/features/admin/orders/data/mockOrders.js
// TODO: reemplazar por fetch a la API real. Tanto Pedidos como Ventas leen
// de esta misma fuente — Ventas es una VISTA FILTRADA de pedidos
// (en_preparacion / despachado), no una tabla aparte.

export const INITIAL_ORDERS = [
  {
    id: 101, cliente: "Laura Gómez", direccion: "Calle 48 # 72-18", fecha: "2026-09-01",
    municipio: "bello", instrucciones: "Tocar el timbre dos veces.", medioPago: "nequi",
    comprobante: null, cardMessage: "¡Feliz cumpleaños!", estado: "pendiente",
    products: [{ lineId: "l1", productId: "caja-romance", productName: "Caja Romance", quantity: 12, color: "Rosa", colorHex: "#EF818A", decorativeMessage: "TE AMO", extraCustomization: "", units: 1, unitPrice: 55000 }],
    subtotal: 55000, shippingCost: 12000, total: 67000,
  },
  {
    id: 102, cliente: "Mariana Rodríguez", direccion: "Carrera 43 # 33-27", fecha: "2026-09-02",
    municipio: "envigado", instrucciones: "", medioPago: "bancolombia",
    comprobante: null, cardMessage: "", estado: "en_preparacion",
    products: [{ lineId: "l2", productId: "torre-cumpleanos", productName: "Torre Cumpleaños", quantity: 30, color: "Blanco", colorHex: "#FFFFFF", decorativeMessage: "", extraCustomization: "", units: 1, unitPrice: 130000 }],
    subtotal: 130000, shippingCost: 10000, total: 140000,
  },
  {
    id: 103, cliente: "Ana Martínez", direccion: "Calle 52 # 45-31", fecha: "2026-09-02",
    municipio: "sabaneta", instrucciones: "Dejar con el celador.", medioPago: "daviplata",
    comprobante: null, cardMessage: "Gracias por todo", estado: "despachado",
    products: [{ lineId: "l3", productId: "mini-antojo", productName: "Mini Antojo", quantity: 6, color: "Chocolate", colorHex: "#3B2415", decorativeMessage: "", extraCustomization: "", units: 2, unitPrice: 35000 }],
    subtotal: 70000, shippingCost: 12000, total: 82000,
  },
  {
    id: 104, cliente: "Carlos Pérez", direccion: "Carrera 27 # 36 Sur-14", fecha: "2026-09-03",
    municipio: "itagui", instrucciones: "", medioPago: "efectivo",
    comprobante: null, cardMessage: "", estado: "cancelado",
    products: [{ lineId: "l4", productId: "caja-fiesta", productName: "Caja Fiesta", quantity: 16, color: "Amarillo", colorHex: "#FACC15", decorativeMessage: "", extraCustomization: "Sin maní", units: 1, unitPrice: 75000 }],
    subtotal: 75000, shippingCost: 10000, total: 85000,
  },
  {
    id: 105, cliente: "Valentina López", direccion: "Calle 35 # 50-62", fecha: "2026-09-04",
    municipio: "", instrucciones: "Recoge en tienda a las 4pm.", medioPago: "nequi",
    comprobante: null, cardMessage: "Con amor", estado: "pendiente",
    products: [{ lineId: "l5", productId: "fresas-elegancia", productName: "Fresas Elegancia", quantity: 12, color: "Rosa", colorHex: "#EF818A", decorativeMessage: "MAMÁ", extraCustomization: "", units: 1, unitPrice: 55000 }],
    subtotal: 55000, shippingCost: 0, total: 55000,
  },
  {
    id: 106, cliente: "Sebastián Torres", direccion: "Carrera 43A # 65 Sur-08", fecha: "2026-09-05",
    municipio: "copacabana", instrucciones: "", medioPago: "bancolombia",
    comprobante: null, cardMessage: "", estado: "en_preparacion",
    products: [{ lineId: "l6", productId: "detalle-sorpresa", productName: "Detalle Sorpresa", quantity: 8, color: "Verde", colorHex: "#4ADE80", decorativeMessage: "", extraCustomization: "", units: 3, unitPrice: 45000 }],
    subtotal: 135000, shippingCost: 15000, total: 150000,
  },
  {
    id: 107, cliente: "Daniela Ramírez", direccion: "Calle 10 # 34-56", fecha: "2026-09-05",
    municipio: "barbosa", instrucciones: "Llamar antes de subir.", medioPago: "nequi",
    comprobante: null, cardMessage: "Feliz aniversario", estado: "despachado",
    products: [{ lineId: "l7", productId: "caja-aniversario", productName: "Caja Aniversario", quantity: 16, color: "Morado", colorHex: "#A855F7", decorativeMessage: "10 AÑOS", extraCustomization: "", units: 1, unitPrice: 75000 }],
    subtotal: 75000, shippingCost: 20000, total: 95000,
  },
  {
    id: 108, cliente: "Andrés Herrera", direccion: "Carrera 50 # 49-22", fecha: "2026-09-06",
    municipio: "la-estrella", instrucciones: "", medioPago: "daviplata",
    comprobante: null, cardMessage: "", estado: "pendiente",
    products: [{ lineId: "l8", productId: "combo-antojo-doble", productName: "Combo Antojo Doble", quantity: 8, color: "Azul", colorHex: "#3B82F6", decorativeMessage: "", extraCustomization: "", units: 2, unitPrice: 45000 }],
    subtotal: 90000, shippingCost: 13000, total: 103000,
  },
];