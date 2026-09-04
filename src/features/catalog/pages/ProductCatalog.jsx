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

  // TODO: conectar con el store/servicio real del carrito
  const handleAddToCart = (product) => {
    console.log("Añadir al carrito:", product);
  };

  const handleViewDetail = (product) => {
    navigate(`/productos/${product.id}`);
  };

  return (
    <div className="catalog-page">
      <div className="container catalog-wrap">
        <h1 className="catalog-title">Catálogo de productos</h1>
        <p className="catalog-subtitle">
          Explora nuestras fresas cubiertas de chocolate para cada ocasión.
        </p>

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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="col-12 col-sm-6 col-lg-3 product-col"
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
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