// src/features/catalog/pages/ProductCatalog.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CategoryChips from "../components/CategoryChips";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../data/Products";
import "./ProductCatalog.css";

export default function ProductCatalog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("todas");
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCat = activeCategory === "todas" || p.cat === activeCategory;
      const matchesQuery = p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, query]);

  const handleViewDetail = (product) => {
    navigate(`/productos/${product.id}`);
  };

  return (
    <div className="catalog-page">

      <div className="catalog-hero">
        <div className="catalog-hero-overlay"></div>

        <div className="container catalog-hero-inner">
          <span className="catalog-hero-tag">
            <i className="fa-solid fa-heart" aria-hidden="true"></i>
            Hecho para compartir
          </span>

          <h1 className="catalog-hero-title">
            Nuestros productos
          </h1>

          <p className="catalog-hero-subtitle">
            Descubre nuestras fresas cubiertas de chocolate,
            hechas a mano para convertir cada ocasión en un
            momento especial.
          </p>
        </div>
      </div>

      <div className="container catalog-wrap">
        <SearchBar
          value={query}
          onChange={setQuery}
          filterActive={filterOpen}
          onFilterClick={() => setFilterOpen((open) => !open)}
        />

        <CategoryChips
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {filteredProducts.length > 0 ? (
          <div className="row">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="col-12 col-sm-6 col-lg-3 product-col"
                style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
              >
                <ProductCard
                  product={product}
                  onViewDetail={handleViewDetail}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <i className="fa-solid fa-magnifying-glass" />
            No encontramos productos con ese filtro.
          </div>
        )}
      </div>
    </div>
  );
}