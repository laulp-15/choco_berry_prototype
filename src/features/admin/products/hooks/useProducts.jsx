import { useState } from 'react';

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Caja Corazón Rosas y Fresas', descripcion: 'Hermosa caja en forma de corazón con fresas chic y rosas.', categoria: 'Día de la Madre', precio: 85000, estado: 'Activo' },
    { id: 2, nombre: 'Arreglo Dulce Papá', descripcion: 'Detalle para papá con cerveza artesanal y fresas con chocolate.', categoria: 'Día del Padre', precio: 65000, estado: 'Activo' },
    { id: 3, nombre: 'Ramo de Fresas con Chocolates', descripcion: 'Ramo bouquet de 12 fresas bañadas en chocolate fino.', categoria: 'Aniversarios', precio: 95000, estado: 'Activo' },
    { id: 4, nombre: 'Caja Sorpresa Cumpleaños', descripcion: 'Caja decorada con globo personalizado y fresas.', categoria: 'Cumpleaños', precio: 78000, estado: 'Activo' },
    { id: 5, nombre: 'Porción ChocoBerry Fresa', descripcion: 'Vaso de fresas frescas con cobertura de chocolate caliente.', categoria: 'Antojos', precio: 15000, estado: 'Inactivo' },
    { id: 6, nombre: 'Caja Romántica Aniversario', descripcion: 'Caja de madera con vino pequeño y fresas con chocolate.', categoria: 'Aniversarios', precio: 110000, estado: 'Activo' },
    { id: 7, nombre: 'Empaque Especial Día de la Mujer', descripcion: 'Caja en forma de flor con trufas de chocolate y fresas.', categoria: 'Regalos', precio: 82000, estado: 'Activo' },
  ]);

  // Filtrado
  const filteredProducts = productos.filter(prod => {
    const matchesSearch = prod.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || prod.estado.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Cálculo de Paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Reset a página 1 al buscar o filtrar
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Toggle de Estado
  const handleToggleStatus = (id) => {
    setProductos(prev =>
      prev.map(prod =>
        prod.id === id ? { ...prod, estado: prod.estado === 'Activo' ? 'Inactivo' : 'Activo' } : prod
      )
    );
  };

  // Guardar (Crear o Editar)
  const handleSaveProduct = (data) => {
    if (productToEdit) {
      setProductos(prev =>
        prev.map(prod => (prod.id === productToEdit.id ? { ...prod, ...data } : prod))
      );
    } else {
      setProductos(prev => [
        ...prev,
        { id: Date.now(), ...data, estado: 'Activo' }
      ]);
    }
    setProductToEdit(null);
  };

  // Eliminar
  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProductos(prev => prev.filter(prod => prod.id !== selectedProduct.id));
      setIsDeleteOpen(false);
      setSelectedProduct(null);
    }
  };

  // Control de Modales
  const handleOpenCreate = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setProductToEdit(prod);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (prod) => {
    setSelectedProduct(prod);
    setIsDetailOpen(true);
  };

  const handleOpenDelete = (prod) => {
    setSelectedProduct(prod);
    setIsDeleteOpen(true);
  };

  return {
    searchTerm,
    handleSearchChange,
    statusFilter,
    handleStatusFilterChange,
    currentPage,
    totalPages,
    handlePageChange,
    isModalOpen,
    setIsModalOpen,
    isDetailOpen,
    setIsDetailOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedProduct,
    productToEdit,
    currentProducts,
    totalProductsCount: filteredProducts.length,
    handleToggleStatus,
    handleSaveProduct,
    handleConfirmDelete,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetail,
    handleOpenDelete
  };
};