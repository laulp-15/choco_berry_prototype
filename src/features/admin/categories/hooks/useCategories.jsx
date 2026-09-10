// src/features/admin/categories/hooks/useCategories.jsx
import { useState } from 'react';

export const useCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  // Modales y Estados de Selección
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const [categorias, setCategorias] = useState([
    { id: 1, nombre: 'Día de la Madre', descripcion: 'Detalles especiales para celebrar a mamá en su día.', iconName: 'Heart', estado: 'Activo' },
    { id: 2, nombre: 'Día del Padre', descripcion: 'Empaques y diseños pensados para papá.', iconName: 'User', estado: 'Activo' },
    { id: 3, nombre: 'Día de la Mujer', descripcion: 'Arreglos y fresas especiales para conmemorar este día.', iconName: 'Sparkles', estado: 'Activo' },
    { id: 4, nombre: 'Cumpleaños', descripcion: 'Cajas personalizadas con números y mensajes de cumpleaños.', iconName: 'Cake', estado: 'Activo' },
    { id: 5, nombre: 'Antojos', descripcion: 'Porciones individuales y antojos dulces del día a día.', iconName: 'Sparkles', estado: 'Inactivo' },
    { id: 6, nombre: 'Aniversarios', descripcion: 'Cajas románticas para parejas y fechas especiales.', iconName: 'Calendar', estado: 'Activo' },
    { id: 7, nombre: 'Regalos', descripcion: 'Detalles generales ideales para cualquier ocasión.', iconName: 'Gift', estado: 'Activo' },
  ]);

  // Filtrado
  const filteredCategorias = categorias.filter(cat => {
    const matchesSearch = cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cat.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || cat.estado.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Toggle de Estado
  const handleToggleStatus = (id) => {
    setCategorias(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, estado: cat.estado === 'Activo' ? 'Inactivo' : 'Activo' } : cat
      )
    );
  };

  // Guardar (Crear o Editar)
  const handleSaveCategory = (data) => {
    if (categoryToEdit) {
      setCategorias(prev =>
        prev.map(cat => (cat.id === categoryToEdit.id ? { ...cat, ...data } : cat))
      );
    } else {
      setCategorias(prev => [
        ...prev,
        { id: Date.now(), ...data, iconName: 'Gift', estado: 'Activo' }
      ]);
    }
    setCategoryToEdit(null);
  };

  // Eliminar
  const handleConfirmDelete = () => {
    if (selectedCategory) {
      setCategorias(prev => prev.filter(cat => cat.id !== selectedCategory.id));
      setIsDeleteOpen(false);
      setSelectedCategory(null);
    }
  };

  // Abrir Modales
  const handleOpenCreate = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setCategoryToEdit(cat);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (cat) => {
    setSelectedCategory(cat);
    setIsDetailOpen(true);
  };

  const handleOpenDelete = (cat) => {
    setSelectedCategory(cat);
    setIsDeleteOpen(true);
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    isDetailOpen,
    setIsDetailOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedCategory,
    categoryToEdit,
    filteredCategorias,
    handleToggleStatus,
    handleSaveCategory,
    handleConfirmDelete,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetail,
    handleOpenDelete
  };
};