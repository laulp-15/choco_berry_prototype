// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./features/cart/hooks/useCart";
import ProductCatalog from "./features/catalog/pages/ProductCatalog";
import ProductDetail from "./features/catalog/pages/ProductDetail";
import CartPage from "./features/cart/pages/CartPage";
import CheckoutPage from "./features/cart/pages/CheckoutPage";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/productos" replace />} />
        <Route path="/productos" element={<ProductCatalog />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/carrito/pago" element={<CheckoutPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App