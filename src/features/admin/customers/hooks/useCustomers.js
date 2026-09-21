import { useState } from 'react';
import { mockCustomers } from '../services/customerService';

export const useCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  const [clientes, setClientes] = useState(mockCustomers);

  // Filtrado
  const filteredCustomers = clientes.filter(customer => {
    const matchesSearch = customer.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.telefono.includes(searchTerm) ||
                          customer.direccion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || customer.estado.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Cálculo de Paginación
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Switch de Estado
  const handleToggleStatus = (id) => {
    setClientes(prev =>
      prev.map(item =>
        item.id === id ? { ...item, estado: item.estado === 'Activo' ? 'Inactivo' : 'Activo' } : item
      )
    );
  };

  // Guardar (Crear / Editar)
  const handleSaveCustomer = (data) => {
    if (customerToEdit) {
      setClientes(prev =>
        prev.map(item => (item.id === customerToEdit.id ? { ...item, ...data } : item))
      );
    } else {
      setClientes(prev => [
        ...prev,
        { id: Date.now(), ...data, estado: 'Activo' }
      ]);
    }
    setCustomerToEdit(null);
  };

  // Eliminar
  const handleConfirmDelete = () => {
    if (selectedCustomer) {
      setClientes(prev => prev.filter(item => item.id !== selectedCustomer.id));
      setIsDeleteOpen(false);
      setSelectedCustomer(null);
    }
  };

  // Controladores de apertura de Modales
  const handleOpenCreate = () => {
    setCustomerToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer) => {
    setCustomerToEdit(customer);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const handleOpenDelete = (customer) => {
    setSelectedCustomer(customer);
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
    selectedCustomer,
    customerToEdit,
    currentCustomers,
    totalCustomersCount: filteredCustomers.length,
    handleToggleStatus,
    handleSaveCustomer,
    handleConfirmDelete,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDetail,
    handleOpenDelete
  };
};