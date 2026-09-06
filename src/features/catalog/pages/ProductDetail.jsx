// src/features/catalog/pages/ProductDetail.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useCart } from "../../cart/hooks/useCart";
import ProductGallery from "../components/ProductGallery";
import QuantitySelector from "../components/QuantitySelector";
import ColorSelector from "../components/ColorSelector";
import FeatureHighlights from "../components/FeatureHighlights";
import RelatedProducts from "../components/RelatedProducts";
import { getProductById, PRODUCTS } from "../data/products";
import { PRICE_BY_QUANTITY, getPriceByQuantity } from "../data/pricing";
import { COLOR_OPTIONS } from "../data/colors";
import { formatPrice } from "../../../shared/utils/formatPrice";
import "./ProductDetail.css";

const QUANTITY_OPTIONS = Object.keys(PRICE_BY_QUANTITY).map(Number); // [6, 8, 12, 16, 30]

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = getProductById(id);

  const [quantity, setQuantity] = useState(12);
  const [color, setColor] = useState("rosa");

  if (!product) {
    return (
      <div className="detail-page">
        <div className="container detail-wrap">
          <p>No encontramos este producto.</p>
        </div>
      </div>
    );
  }

  // El precio depende de la cantidad elegida, es igual para todos los productos.
  const currentPrice = getPriceByQuantity(quantity);
  const selectedColor = COLOR_OPTIONS.find((c) => c.value === color);

  // TODO: reemplazar por una selección real (misma categoría, más vendidos, etc.)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      quantity,
      color: selectedColor?.label ?? color,
      colorHex: selectedColor?.hex,
    });
    navigate("/carrito");
  };

  const handleRelatedViewDetail = (p) => {
    navigate(`/productos/${p.id}`);
  };

  const handleViewAll = () => {
    navigate("/productos");
  };

  return (
    <div className="detail-page">
      <div className="container detail-wrap">
        <div className="row detail-top">
          <div className="col-12 col-lg-6">
            <ProductGallery />
          </div>
          <div className="col-12 col-lg-6">
            <div className="product-info">
              {product.badge && <div className="product-badge">{product.badge}</div>}
              <h1 className="product-title">{product.name}</h1>
              <div className="product-price">{formatPrice(currentPrice)}</div>
              <hr className="product-divider" />
              <p className="product-description">{product.desc}</p>

              <QuantitySelector
                options={QUANTITY_OPTIONS}
                value={quantity}
                onChange={setQuantity}
              />

              <ColorSelector
                options={COLOR_OPTIONS}
                value={color}
                onChange={setColor}
              />

              <Button
                className="btn-add-to-cart"
                variant="contained"
                disableRipple
                fullWidth
                onClick={handleAddToCart}
                startIcon={<i className="fa-solid fa-cart-plus" />}
              >
                Añadir al Carrito
              </Button>
            </div>
          </div>
        </div>

        <FeatureHighlights />

        <RelatedProducts
          products={relatedProducts}
          onViewAll={handleViewAll}
          onViewDetail={handleRelatedViewDetail}
        />
      </div>
    </div>
  );
}