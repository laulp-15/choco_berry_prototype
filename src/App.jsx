// src/App.jsx
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './shared/css/tokens.css';

// Importación de componentes compartidos
import Navbar from "./shared/components/Navbar";
import Footer from "./shared/components/Footer";

// Importación de páginas
import HomePage from "./features/home/pages/HomePage";
import ProductCatalog from "./features/catalog/pages/ProductCatalog";
import ProductDetail from "./features/catalog/pages/ProductDetail";
import ReviewsPage from "./features/reviews/pages/ReviewsPage"; // 1. Importación agregada

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navegación Global */}
      <Navbar />

      {/* Contenido Dinámico de las Rutas */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/productos" element={<ProductCatalog />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/reseñas" element={<ReviewsPage />} /> {/* 2. Ruta agregada */}
        </Routes>
      </main>

      {/* Pie de Página Global */}
      <Footer />
    </div>
  );
}

export default App;