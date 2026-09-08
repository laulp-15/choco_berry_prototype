import { useState, useEffect } from 'react';
import { getReviews } from '../services/reviewService';

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  const addReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return { reviews, loading, addReview };
};