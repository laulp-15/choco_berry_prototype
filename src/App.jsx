// src/App.jsx
import { CartProvider } from "./features/cart/hooks/useCart";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App