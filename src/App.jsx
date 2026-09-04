// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './shared/css/tokens.css';
import ProductCatalog from "./features/catalog/pages/ProductCatalog";
import ProductDetail from "./features/catalog/pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/productos" replace />} />
      <Route path="/productos" element={<ProductCatalog />} />
      <Route path="/productos/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App