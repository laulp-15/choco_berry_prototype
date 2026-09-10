// Simulación de servicios API para productos
export const productService = {
  getProducts: async () => {
    return [
      { id: 1, nombre: 'Caja Corazón Rosas y Fresas', categoria: 'Día de la Madre', precio: 85000, stock: 15, estado: 'Activo', imagen: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300' },
      { id: 2, nombre: 'Arreglo Dulce Papá', categoria: 'Día del Padre', precio: 65000, stock: 10, estado: 'Activo', imagen: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=300' },
      { id: 3, nombre: 'Ramo de Fresas con Chocolates', categoria: 'Aniversarios', precio: 95000, stock: 8, estado: 'Activo', imagen: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=300' },
      { id: 4, nombre: 'Caja Sorpresa Cumpleaños', categoria: 'Cumpleaños', precio: 78000, stock: 20, estado: 'Activo', imagen: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=300' },
      { id: 5, nombre: 'Porción ChocoBerry Fresa', categoria: 'Antojos', precio: 15000, stock: 0, estado: 'Inactivo', imagen: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=300' },
    ];
  }
};