// src/features/admin/users/utils/roles.js

/**
 * Un solo lugar con todo lo que depende del rol: cómo se ve el badge en
 * la tabla, y qué permisos se listan en "Detalle del usuario". Si el
 * día de mañana se agrega un rol nuevo, esto es lo único que hay que
 * tocar en este módulo.
 */
export const ROLE_OPTIONS = [
  { value: "cliente", label: "Cliente" },
  { value: "repartidor", label: "Repartidor" },
  { value: "administrador", label: "Admin" },
];

export function roleLabel(role) {
  return ROLE_OPTIONS.find((r) => r.value === role)?.label ?? role;
}

export const ROLE_PERMISSIONS = {
  cliente: [
    {
      icon: "fa-eye",
      title: "Visualizar catálogo de productos",
      description: "Acceso completo a la tienda y precios",
    },
    {
      icon: "fa-cart-shopping",
      title: "Gestionar pedidos personales",
      description: "Crear, cancelar y rastrear compras propias",
    },
    {
      icon: "fa-image",
      title: "Realizar reseñas de productos",
      description: "Calificar y comentar sobre compras realizadas",
    },
    {
      icon: "fa-user-pen",
      title: "Editar información de perfil",
      description: "Actualizar datos personales y de contacto",
    },
  ],
  repartidor: [
    {
      icon: "fa-truck-fast",
      title: "Ver entregas asignadas",
      description: "Consultar los pedidos que debe despachar",
    },
    {
      icon: "fa-box",
      title: "Actualizar estado de un pedido",
      description: "Marcar como despachado o entregado",
    },
    {
      icon: "fa-location-dot",
      title: "Ver dirección e instrucciones de entrega",
      description: "Datos de contacto y ubicación del cliente",
    },
    {
      icon: "fa-user-pen",
      title: "Editar información de perfil",
      description: "Actualizar datos personales y de contacto",
    },
  ],
  administrador: [
    {
      icon: "fa-users",
      title: "Gestionar usuarios y roles",
      description: "Crear, editar, deshabilitar o eliminar cuentas",
    },
    {
      icon: "fa-store",
      title: "Gestionar catálogo",
      description: "Productos, categorías y precios",
    },
    {
      icon: "fa-box",
      title: "Gestionar pedidos y ventas",
      description: "Ver, actualizar y reportar el estado del negocio",
    },
    {
      icon: "fa-chart-line",
      title: "Acceso al dashboard y reportes",
      description: "Métricas e indicadores del negocio",
    },
  ],
};
