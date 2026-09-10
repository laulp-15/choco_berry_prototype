// src/categories/services/categoryService.js

// Categorías oficiales de ChocoBerry
let categoriesData = [
  { id: 1, name: "Día de la Madre", description: "Detalles especiales para celebrar a mamá en su día.", status: "Activo" },
  { id: 2, name: "Día del Padre", description: "Empaques y diseños pensados para papá.", status: "Activo" },
  { id: 3, name: "Día de la Mujer", description: "Arreglos y fresas especiales para conmemorar este día.", status: "Activo" },
  { id: 4, name: "Cumpleaños", description: "Cajas personalizadas con números y mensajes de cumpleaños.", status: "Activo" },
  { id: 5, name: "Antojos", description: "Porciones individuales y antojos dulces del día a día.", status: "Activo" },
  { id: 6, name: "Aniversarios", description: "Cajas románticas para parejas y fechas especiales.", status: "Activo" },
  { id: 7, name: "Regalos", description: "Detalles generales ideales para cualquier ocasión.", status: "Activo" },
];

export const categoryService = {
  getCategories: async () => {
    return [...categoriesData];
  },
  
  saveCategory: async (category) => {
    if (category.id) {
      categoriesData = categoriesData.map((item) =>
        item.id === category.id ? { ...item, ...category } : item
      );
    } else {
      const newCategory = {
        ...category,
        id: Date.now(),
        status: category.status || "Activo",
      };
      categoriesData.push(newCategory);
    }
    return true;
  },

  toggleCategoryStatus: async (id) => {
    categoriesData = categoriesData.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "Activo" ? "Inactivo" : "Activo" }
        : item
    );
    return true;
  },

  deleteCategory: async (id) => {
    categoriesData = categoriesData.filter((item) => item.id !== id);
    return true;
  },
};