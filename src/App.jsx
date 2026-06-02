import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import LanguagePopup from './components/LanguagePopup/LanguagePopup';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <LanguagePopup />
          <div className="flex flex-col min-h-screen">
            <Navbar onCartOpen={() => setCartOpen(true)} />
            <div className="flex-1">
              <AppRoutes />
            </div>
            <Footer />
          </div>
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
