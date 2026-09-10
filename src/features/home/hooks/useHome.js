// src/features/home/hooks/useHome.js
import { useState, useEffect } from "react";
import { homeService } from "../services/homeService";

export const useHome = () => {
  const [banner, setBanner] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [bannerData, categoriesData] = await Promise.all([
          homeService.getBannerData(),
          homeService.getFeaturedCategories(),
        ]);
        setBanner(bannerData);
        setCategories(categoriesData);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return { banner, categories, loading };
};