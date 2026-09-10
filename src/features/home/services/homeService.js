// src/features/home/services/homeService.js

export const homeService = {
  getBannerData: async () => {
    return {
      title: "Sorpresas hechas de Chocolate",
      subtitle: "Descubre nuestros mejores arreglos de fresas, cajas especiales y detalles únicos.",
      buttonText: "Ver Catálogo",
      buttonLink: "/productos",
    };
  },

  getFeaturedCategories: async () => {
    return [
      { id: 1, title: "Fresas con Chocolate", icon: "fa-crown", description: "Arreglos con cobertura belga" },
      { id: 2, title: "Cajas Especiales", icon: "fa-gift", description: "Detalles para momentos inolvidables" },
      { id: 3, title: "Aniversarios", icon: "fa-heart", description: "Demuestra tu amor con dulzura" },
    ];
  },
};