import { useState } from 'react';
import { mockReviews } from '../services/reviewService';

export const useReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modales
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState(mockReviews);

  // Filtrado por búsqueda y estado
  const filteredReviews = reviews.filter(rev => {
    const matchesSearch = rev.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rev.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rev.comentario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || rev.estado.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Paginación
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);

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
    setReviews(prev =>
      prev.map(item =>
        item.id === id ? { ...item, estado: item.estado === 'Activo' ? 'Inactivo' : 'Activo' } : item
      )
    );
  };

  // Eliminar Reseña
  const handleConfirmDelete = () => {
    if (selectedReview) {
      setReviews(prev => prev.filter(item => item.id !== selectedReview.id));
      setIsDeleteOpen(false);
      setSelectedReview(null);
    }
  };

  const handleOpenDetail = (review) => {
    setSelectedReview(review);
    setIsDetailOpen(true);
  };

  const handleOpenDelete = (review) => {
    setSelectedReview(review);
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
    isDetailOpen,
    setIsDetailOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedReview,
    currentReviews,
    totalReviewsCount: filteredReviews.length,
    handleToggleStatus,
    handleConfirmDelete,
    handleOpenDetail,
    handleOpenDelete
  };
};