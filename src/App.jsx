import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar onCartOpen={() => setCartOpen(true)} />
          <div className="flex-1">
            <AppRoutes />
          </div>
          <Footer />
        </div>
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </CartProvider>
    </BrowserRouter>
  );
}
